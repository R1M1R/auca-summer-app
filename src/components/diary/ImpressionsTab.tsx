import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PenLine, Send, Trash2, Edit3,
  Loader2, CalendarDays, Wifi,
} from 'lucide-react'
import { useDiaryEntries, useDiaryMutations, toDateKey } from '@/hooks/useDiaryEntries'
import MoodSelector, { MoodBadge } from '@/components/diary/MoodSelector'
import { localizeDiaryEntry } from '@/lib/localizedContent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { DiaryEntry, MoodLevel, UserRole } from '@/types'

/* ── Helpers ─────────────────────────────────────────────────── */
const TODAY       = new Date()
const TODAY_KEY   = toDateKey(TODAY)

function formatEntryDate(d: Date): string {
  const diff = Math.floor((new Date().setHours(0,0,0,0) - d.setHours(0,0,0,0)) / 86_400_000)
  if (diff === 0)  return 'Today'
  if (diff === 1)  return 'Yesterday'
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

/* ── Entry composer (today) ─────────────────────────────────── */
interface ComposerProps {
  existing: DiaryEntry | null
}

function EntryComposer({ existing }: ComposerProps) {
  const { saveEntry, saving, error } = useDiaryMutations()
  const [text,    setText]   = useState(existing?.text  ?? '')
  const [mood,    setMood]   = useState<MoodLevel | null>(existing?.mood ?? null)
  const [editing, setEditing] = useState(!existing)
  const [saved,   setSaved]   = useState(false)

  /* Sync if Firestore pushes an update while we're viewing */
  useEffect(() => {
    if (!editing) {
      setText(existing?.text  ?? '')
      setMood(existing?.mood  ?? null)
    }
  }, [existing, editing])

  const handleSave = async () => {
    if (!text.trim() || !mood) return
    await saveEntry(TODAY, text, mood)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  /* ── View mode ── */
  if (existing && !editing) {
    return (
      <motion.div
        layout
        className="glass-card p-4 space-y-3 border-primary-200/40 dark:border-primary-800/30"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            Today's Entry
          </span>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary-500 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </motion.button>
        </div>

        <MoodBadge mood={existing.mood} />

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
          {existing.text}
        </p>

        {saved && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-[11px] text-emerald-500 font-medium"
          >
            ✓ Saved
          </motion.p>
        )}
      </motion.div>
    )
  }

  /* ── Edit / New mode ── */
  return (
    <motion.div layout className="glass-card p-4 space-y-4 border-primary-200/40 dark:border-primary-800/30">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1.5">
          <PenLine className="w-3.5 h-3.5" />
          {existing ? 'Edit Today' : "Today's Impressions"}
        </span>
        <span className="text-[11px] text-slate-400">
          {TODAY.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>

      {/* Mood picker */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">How was your day?</p>
        <MoodSelector value={mood} onChange={setMood} size="lg" />
      </div>

      {/* Text */}
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your thoughts</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a few sentences about your day…"
          rows={4}
          maxLength={1000}
          className="input-field resize-none text-sm leading-relaxed"
        />
        <p className="text-right text-[10px] text-slate-400 tabular-nums">
          {text.length} / 1000
        </p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="text-xs text-rose-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-3">
        {existing && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => { setEditing(false); setText(existing.text); setMood(existing.mood) }}
            className="flex-1 h-10 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-500"
          >
            Cancel
          </motion.button>
        )}
        <motion.button
          onClick={handleSave}
          disabled={saving || !text.trim() || !mood}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <><Send className="w-4 h-4" /> Save Entry</>
          }
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── Past entry card ─────────────────────────────────────────── */
function EntryCard({ entry, canDelete, onDelete }: {
  entry: DiaryEntry; canDelete: boolean; onDelete: () => void
}) {
  const [confirmDel, setConfirmDel] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass-card p-4 space-y-2.5"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {formatEntryDate(new Date(entry.date))}
          </span>
          <MoodBadge mood={entry.mood} />
        </div>
        {canDelete && !confirmDel && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setConfirmDel(true)}
            className="text-slate-300 dark:text-slate-600 hover:text-rose-400 transition-colors p-1"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
          </motion.button>
        )}
      </div>

      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
        {entry.text}
      </p>

      {/* Inline delete confirm */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
          >
            <span className="text-xs text-slate-500 flex-1">Delete this entry?</span>
            <button onClick={() => setConfirmDel(false)} className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-lg">
              Cancel
            </button>
            <button onClick={onDelete} className="text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 px-2.5 py-1 rounded-lg transition-colors">
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main ImpressionsTab ─────────────────────────────────────── */
interface Props { role: UserRole }

export default function ImpressionsTab({ role }: Props) {
  const isStudent = role === 'student'
  const lang      = useAppLanguage()
  const { entries, loading, error } = useDiaryEntries()
  const { deleteEntry } = useDiaryMutations()

  const todayEntry = entries.find((e) => toDateKey(e.date) === TODAY_KEY) ?? null
  const todayDisplay = todayEntry ? localizeDiaryEntry(todayEntry, role, lang) : null
  const pastEntries = entries
    .filter((e) => toDateKey(e.date) !== TODAY_KEY)
    .map((e) => localizeDiaryEntry(e, role, lang))

  return (
    <div className="space-y-5 pb-4">
      {/* Family live sync indicator */}
      {role === 'family' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30"
        >
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Live sync — updates appear automatically
          </span>
        </motion.div>
      )}

      {/* Today's entry composer (student only) */}
      {isStudent && <EntryComposer existing={todayEntry} />}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="glass-card px-4 py-3 border-rose-200 dark:border-rose-800/40">
          <p className="text-sm text-rose-500">{error}</p>
        </div>
      )}

      {/* Family: today's entry read-only */}
      {role === 'family' && todayDisplay && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 space-y-2.5 border-primary-200/40 dark:border-primary-800/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              Today
            </span>
            <MoodBadge mood={todayDisplay.mood} />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            {todayDisplay.text}
          </p>
        </motion.div>
      )}

      {/* Past entries section */}
      {!loading && (
        <div className="space-y-3">
          {pastEntries.length > 0 && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Previous entries ({pastEntries.length})
            </p>
          )}

          <AnimatePresence mode="popLayout">
            {pastEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                canDelete={isStudent}
                onDelete={() => deleteEntry(entry.id)}
              />
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {entries.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 py-14 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <PenLine className="w-7 h-7 text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No diary entries yet</p>
              {isStudent && (
                <p className="text-xs text-slate-400">Write your first impression above ↑</p>
              )}
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
