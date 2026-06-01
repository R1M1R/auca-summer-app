/**
 * Проверка связи с Firestore и ключевых данных расписания.
 * Run: npm run probe:firestore
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore'
import {
  readFirebaseEnv,
  getFirebaseConfigIssues,
  isFirebaseEnvConfigured,
} from '../src/lib/firebaseEnv.ts'

function loadEnvLocal(): void {
  const path = resolve(process.cwd(), '.env.local')
  if (!existsSync(path)) {
    console.error('❌ Нет .env.local')
    process.exit(1)
  }
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    process.env[key] = val
  }
}

function isSetupError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return msg.includes('PERMISSION_DENIED') || msg.includes('Firestore API has not been used')
}

loadEnvLocal()
const config = readFirebaseEnv(process.env as Record<string, string>)

if (!isFirebaseEnvConfigured(config)) {
  console.error('❌ .env.local не заполнен')
  getFirebaseConfigIssues(config).forEach((i) => console.error(`   • ${i}`))
  process.exit(1)
}

const app = getApps().length === 0 ? initializeApp(config) : getApps()[0]
const db = getFirestore(app)

async function main() {
  try {
    const snap = await getDocs(query(collection(db, 'events'), orderBy('date', 'asc')))
    const events = snap.docs.map((d) => {
      const data = d.data()
      const date = data.date?.toDate?.() as Date | undefined
      return { title: data.title as string, date }
    })

    const jun5 = events.filter((e) => e.date?.toISOString().slice(0, 10) === '2026-06-05')

    console.log(`✅ Firestore доступен — project: ${config.projectId}`)
    console.log(`   Событий в коллекции events: ${events.length}`)
    console.log(`   5 июня 2026: ${jun5.length} событие(й)`)
    jun5.forEach((e) => console.log(`     • ${e.title}`))

    if (jun5.length !== 1) {
      console.error('\n⚠️  Ожидалось 1 событие на 5 июня (только прилёт). Запустите: npm run seed:events')
      process.exit(1)
    }

    console.log('\n✅ Расписание в базе в порядке.')
  } catch (err) {
    if (isSetupError(err)) {
      console.error(`❌ Firestore не готов в проекте ${config.projectId}`)
      console.error(`   https://console.firebase.google.com/project/${config.projectId}/firestore`)
      process.exit(1)
    }
    throw err
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
