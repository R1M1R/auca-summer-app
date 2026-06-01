/**
 * Clears Firestore `events` and re-imports from scheduleData.json.
 * Run: npm run seed:events
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  writeBatch,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { scheduleData } from '../src/data/scheduleData'
import {
  buildRoutineEvent,
  buildSpecialEvent,
  generateWeekdays,
  PROGRAM_START,
  PROGRAM_END,
  shouldSkipDailyRoutine,
  countRoutineEventSlots,
} from '../src/lib/buildScheduleEvents'
import type { AppEvent } from '../src/types'
import { ADMIN_CREATOR } from '../src/types'
import {
  readFirebaseEnv,
  getFirebaseConfigIssues,
  isFirebaseEnvConfigured,
} from '../src/lib/firebaseEnv.ts'

const BATCH_SIZE = 400
const EVENTS_COLL = 'events'

function isFirestoreSetupError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return (
    msg.includes('PERMISSION_DENIED') ||
    msg.includes('permission-denied') ||
    msg.includes('Firestore API has not been used') ||
    msg.includes('has not been enabled')
  )
}

function printFirestoreSetupHelp(projectId: string): void {
  console.error('\n❌ Firestore ещё не включён в проекте Google Cloud.\n')
  console.error('Сделайте один раз в браузере:')
  console.error(`  1. https://console.firebase.google.com/project/${projectId}/firestore`)
  console.error('     → Create database → Start in test mode (или production + rules)')
  console.error(`  2. Или API: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=${projectId}`)
  console.error('     → Enable → подождите 2–5 минут')
  console.error('  3. Затем снова: npm run seed:events\n')
}

async function commitBatch(
  commit: () => Promise<void>,
  projectId: string,
): Promise<void> {
  try {
    await commit()
  } catch (err) {
    if (isFirestoreSetupError(err)) {
      printFirestoreSetupHelp(projectId)
      process.exit(1)
    }
    throw err
  }
}

function loadEnvLocal(): void {
  const path = resolve(process.cwd(), '.env.local')
  if (!existsSync(path)) {
    console.error('Missing .env.local — configure Firebase first.')
    process.exit(1)
  }
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
}

function appEventToFirestore(event: AppEvent, meta: { source: string; routineId?: string }) {
  const doc: Record<string, unknown> = {
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
  if (event.timeRu) doc.time_ru = event.timeRu
  if (event.timeEn) doc.time_en = event.timeEn
  if (meta.routineId) doc.routineId = meta.routineId
  return doc
}

function buildAllPayloads() {
  const docs: ReturnType<typeof appEventToFirestore>[] = []
  const weekdays = generateWeekdays(PROGRAM_START, PROGRAM_END)

  for (const day of weekdays) {
    if (shouldSkipDailyRoutine(day)) continue
    for (const item of scheduleData.dailyRoutine) {
      docs.push(appEventToFirestore(buildRoutineEvent(day, item), {
        source: 'daily_routine',
        routineId: item.id,
      }))
    }
  }

  for (const item of scheduleData.specialEvents) {
    docs.push(appEventToFirestore(buildSpecialEvent(item), { source: 'special_event' }))
  }

  return docs
}

async function main() {
  loadEnvLocal()

  const firebaseConfig = readFirebaseEnv(process.env as Record<string, string>)
  const issues = getFirebaseConfigIssues(firebaseConfig)

  if (!isFirebaseEnvConfigured(firebaseConfig)) {
    console.error('❌ Firebase не настроен (.env.local содержит заглушки):\n')
    issues.forEach((i) => console.error(`   • ${i}`))
    console.error('\nЗапустите npm run check:firebase для подсказок.')
    process.exit(1)
  }

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  const db = getFirestore(app)

  const projectId = firebaseConfig.projectId

  console.log('Deleting existing events…')
  let snap
  try {
    snap = await getDocs(query(collection(db, EVENTS_COLL)))
  } catch (err) {
    if (isFirestoreSetupError(err)) {
      printFirestoreSetupHelp(projectId)
      process.exit(1)
    }
    throw err
  }
  const ids = snap.docs.map((d) => d.id)
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const chunk = ids.slice(i, i + BATCH_SIZE)
    await commitBatch(async () => {
      const batch = writeBatch(db)
      chunk.forEach((id) => batch.delete(doc(db, EVENTS_COLL, id)))
      await batch.commit()
    }, projectId)
    console.log(`  deleted ${Math.min(i + BATCH_SIZE, ids.length)} / ${ids.length}`)
  }

  const payloads = buildAllPayloads()
  const routineCount = countRoutineEventSlots()
  console.log(`Writing ${payloads.length} events (${routineCount} routine + ${scheduleData.specialEvents.length} special)…`)
  console.log(`June 5, 2026: dailyRoutine skipped — only special arrival event`)

  for (let i = 0; i < payloads.length; i += BATCH_SIZE) {
    const chunk = payloads.slice(i, i + BATCH_SIZE)
    await commitBatch(async () => {
      const batch = writeBatch(db)
      chunk.forEach((data) => {
        const ref = doc(collection(db, EVENTS_COLL))
        batch.set(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      })
      await batch.commit()
    }, projectId)
    console.log(`  wrote ${Math.min(i + BATCH_SIZE, payloads.length)} / ${payloads.length}`)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
