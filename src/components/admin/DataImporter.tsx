import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  writeBatch, doc, collection,
  serverTimestamp, Timestamp,
  getDocs, query,
} from 'firebase/firestore'
import {
  Database, Play, CheckCircle2, AlertTriangle,
  Trash2, RefreshCw, ChevronDown, Info,
} from 'lucide-react'
import { db, isConfigured, getFirebaseSetupIssues } from '@/lib/firebase'
import { useApp } from '@/contexts/AppContext'
import { scheduleData } from '@/data/scheduleData'
import {
  buildRoutineEvent,
  buildSpecialEvent,
  generateWeekdays,
  PROGRAM_START,
  PROGRAM_END,
  shouldSkipDailyRoutine,
  countRoutineEventSlots,
} from '@/lib/buildScheduleEvents'
import type { AppEvent } from '@/types'
import { ADMIN_CREATOR } from '@/types'

const BATCH_SIZE    = 400
const EVENTS_COLL   = 'events'

function formatSpecialTime(e: (typeof scheduleData.specialEvents)[number]): string {
  if (e.startTime) {
    return e.endTime ? `${e.startTime}–${e.endTime}` : e.startTime
  }
  return e.timeEn ?? e.timeRu ?? 'TBD'
}

interface FirestoreEventPayload {
  title:          string
  title_ru:       string
  description:    string
  description_ru: string
  date:           Timestamp
  duration:       number
  category:       AppEvent['category']
  time_ru?:       string
  time_en?:       string
  hasExactTime:   boolean
  createdBy:      typeof ADMIN_CREATOR
  isEditable:     boolean
  completed:      boolean
  source:         'daily_routine' | 'special_event'
  routineId?:     string
}

function appEventToPayload(
  event: AppEvent,
  meta: { source: 'daily_routine' | 'special_event'; routineId?: string },
): FirestoreEventPayload {
  const payload: FirestoreEventPayload = {
    title:          event.title,
    title_ru:       event.titleRu ?? event.title,
    description:    event.description ?? '',
    description_ru: event.descriptionRu ?? '',
    date:           Timestamp.fromDate(event.date),
    duration:       event.duration ?? 60,
    category:       event.category,
    hasExactTime:   event.hasExactTime !== false,
    createdBy:      ADMIN_CREATOR,
    isEditable:     false,
    completed:      false,
    source:         meta.source,
  }
  if (event.timeRu) payload.time_ru = event.timeRu
  if (event.timeEn) payload.time_en = event.timeEn
  if (meta.routineId) payload.routineId = meta.routineId
  return payload
}

function buildAllPayloads(): FirestoreEventPayload[] {
  const docs: FirestoreEventPayload[] = []
  const weekdays = generateWeekdays(PROGRAM_START, PROGRAM_END)

  for (const day of weekdays) {
    if (shouldSkipDailyRoutine(day)) continue
    for (const item of scheduleData.dailyRoutine) {
      docs.push(appEventToPayload(buildRoutineEvent(day, item), {
        source:    'daily_routine',
        routineId: item.id,
      }))
    }
  }

  for (const item of scheduleData.specialEvents) {
    docs.push(appEventToPayload(buildSpecialEvent(item), { source: 'special_event' }))
  }

  return docs
}

function computePreview() {
  const weekdays = generateWeekdays(PROGRAM_START, PROGRAM_END)
  const routineCount = countRoutineEventSlots()
  const specialCount = scheduleData.specialEvents.length
  return {
    weekdays: weekdays.length,
    routineCount,
    specialCount,
    total:     routineCount + specialCount,
    batches:   Math.ceil((routineCount + specialCount) / BATCH_SIZE),
  }
}

type Phase = 'idle' | 'confirming' | 'clearing' | 'writing' | 'done' | 'error'

interface Progress {
  current: number
  total:   number
  label:   string
}

interface Result {
  routineCount: number
  specialCount: number
  totalWritten: number
  batchesUsed:  number
  deletedCount: number
}

export default function DataImporter() {
  const { role } = useApp()

  const [phase,       setPhase]       = useState<Phase>('idle')
  const [progress,    setProgress]    = useState<Progress | null>(null)
  const [result,      setResult]      = useState<Result | null>(null)
  const [errorMsg,    setErrorMsg]    = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const preview = useMemo(computePreview, [])

  if (role !== 'family') return null

  if (!isConfigured) {
    const issues = getFirebaseSetupIssues()
    return (
      <div className="glass-card p-5 border-amber-200 dark:border-amber-800/40 space-y-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Firebase не настроен
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Скопируйте <code className="text-primary-500">.env.example</code> →{' '}
              <code className="text-primary-500">.env.local</code> и вставьте ключи из Firebase Console.
              Затем перезапустите <code className="text-primary-500">npm run dev</code>.
            </p>
            {issues.length > 0 && (
              <ul className="text-xs text-amber-700 dark:text-amber-300/90 list-disc pl-4 space-y-0.5">
                {issues.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            )}
            <p className="text-[11px] text-slate-400">
              Проверка: <code className="text-primary-500">npm run check:firebase</code>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const runImport = async () => {
    setPhase('clearing')
    setErrorMsg(null)
    let deletedCount = 0

    try {
      setProgress({ current: 0, total: 1, label: 'Querying existing events…' })
      const snap = await getDocs(query(collection(db, EVENTS_COLL)))
      const existingIds = snap.docs.map((d) => d.id)
      const deleteTotal = existingIds.length

      if (deleteTotal > 0) {
        setProgress({ current: 0, total: deleteTotal, label: `Deleting ${deleteTotal} existing events…` })

        for (let i = 0; i < existingIds.length; i += BATCH_SIZE) {
          const batch = writeBatch(db)
          existingIds.slice(i, i + BATCH_SIZE).forEach((id) =>
            batch.delete(doc(db, EVENTS_COLL, id)),
          )
          await batch.commit()
          deletedCount += Math.min(BATCH_SIZE, existingIds.length - i)
          setProgress({
            current: deletedCount,
            total: deleteTotal,
            label: `Deleted ${deletedCount} / ${deleteTotal}…`,
          })
        }
      }

      setPhase('writing')
      const docs = buildAllPayloads()
      const total = docs.length
      setProgress({ current: 0, total, label: 'Writing events…' })

      let written = 0
      let batchesUsed = 0

      for (let i = 0; i < docs.length; i += BATCH_SIZE) {
        const batch = writeBatch(db)
        const chunk = docs.slice(i, i + BATCH_SIZE)

        chunk.forEach((data) => {
          const ref = doc(collection(db, EVENTS_COLL))
          batch.set(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
        })

        await batch.commit()
        batchesUsed++
        written += chunk.length
        setProgress({
          current: written,
          total,
          label: `Batch ${batchesUsed} — wrote ${written} / ${total}`,
        })
      }

      setResult({
        routineCount: countRoutineEventSlots(),
        specialCount: scheduleData.specialEvents.length,
        totalWritten: written,
        batchesUsed,
        deletedCount,
      })
      setPhase('done')
    } catch (err) {
      console.error('[DataImporter]', err)
      const raw = err instanceof Error ? err.message : 'Unknown error'
      const friendly =
        raw.includes('PERMISSION_DENIED') || raw.includes('permission-denied')
          ? 'Нет доступа к Firestore: проверьте .env.local (реальный project ID), включите Firestore API в Google Cloud и задеплойте firestore.rules.'
          : raw
      setErrorMsg(friendly)
      setPhase('error')
    }
  }

  const reset = () => {
    setPhase('idle')
    setProgress(null)
    setResult(null)
    setErrorMsg(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-primary-600 flex items-center justify-center text-white shadow-sm">
          <Database className="w-5 h-5" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Initialize Database</p>
          <p className="text-xs text-slate-400">Replace all events from <code>scheduleData.json</code></p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="glass-card p-4 space-y-3">
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Import Preview
                </span>
                <motion.div animate={{ rotate: showDetails ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Weekdays (Mon–Fri)', value: preview.weekdays, color: 'text-primary-500' },
                  { label: 'Routine events/day', value: scheduleData.dailyRoutine.length, color: 'text-violet-500' },
                  { label: 'Routine docs total', value: preview.routineCount, color: 'text-indigo-500' },
                  { label: 'Special events', value: preview.specialCount, color: 'text-emerald-500' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="glass-card px-3 py-2.5">
                    <p className={`text-xl font-black tabular-nums ${color}`}>{value}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between px-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-semibold text-slate-500">Total documents</span>
                <span className="text-xl font-black gradient-text tabular-nums">{preview.total}</span>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Program period
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        June 5, 2026 → August 1, 2026 · Mon–Fri routine + special dates
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        June 5: no daily classes — only the AUCA arrival event
                      </p>

                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                        Special events ({scheduleData.specialEvents.length})
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                        {scheduleData.specialEvents.map((e, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-slate-400 tabular-nums shrink-0 w-20">{e.date}</span>
                            <span className="text-slate-400 tabular-nums shrink-0 w-24">{formatSpecialTime(e)}</span>
                            <span className={`badge text-[10px] px-1.5 shrink-0 ${
                              e.type === 'excursion' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                              e.type === 'academic'  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                              e.type === 'leisure'   ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                              e.type === 'mandatory' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                              'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                            }`}>{e.type}</span>
                            <span className="text-slate-600 dark:text-slate-300 truncate">{e.titleEn}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-start gap-2 glass-card px-4 py-3 border-amber-200/50 dark:border-amber-800/40">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Import always <strong className="text-slate-600 dark:text-slate-300">deletes every event</strong> in Firestore, then loads the new schedule (including TBD times).
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase('confirming')}
              className="btn-primary w-full h-12 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Review &amp; Import
            </motion.button>
          </motion.div>
        )}

        {phase === 'confirming' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card p-5 space-y-4 border-rose-200/60 dark:border-rose-800/40"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Confirm full replace</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  This will delete all existing events and write <strong>{preview.total}</strong> new documents from the updated program schedule.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={reset} className="flex-1 h-11 rounded-xl glass-card text-sm font-semibold text-slate-500">
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={runImport}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-bold"
              >
                Yes, replace all
              </motion.button>
            </div>
          </motion.div>
        )}

        {(phase === 'clearing' || phase === 'writing') && progress && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-5 space-y-3"
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary-500 animate-spin" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{progress.label}</p>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-violet-600"
                animate={{ width: progress.total ? `${(progress.current / progress.total) * 100}%` : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-slate-400 tabular-nums text-right">
              {progress.current} / {progress.total}
            </p>
          </motion.div>
        )}

        {phase === 'done' && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 space-y-4 border-emerald-200/50 dark:border-emerald-800/40"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Import complete</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Deleted {result.deletedCount} · Wrote {result.totalWritten} events
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="glass-card px-3 py-2">
                <p className="font-bold text-slate-700 dark:text-slate-200">{result.routineCount}</p>
                <p className="text-slate-400">Routine events</p>
              </div>
              <div className="glass-card px-3 py-2">
                <p className="font-bold text-slate-700 dark:text-slate-200">{result.specialCount}</p>
                <p className="text-slate-400">Special events</p>
              </div>
            </div>
            <button onClick={reset} className="btn-primary w-full h-10 text-sm">
              Done
            </button>
          </motion.div>
        )}

        {phase === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-5 space-y-3 border-rose-200 dark:border-rose-900/50"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-rose-600">Import failed</p>
                <p className="text-xs text-slate-500 mt-1">{errorMsg}</p>
              </div>
            </div>
            <button onClick={reset} className="w-full h-10 rounded-xl glass-card text-sm font-semibold text-slate-500 flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Reset
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
