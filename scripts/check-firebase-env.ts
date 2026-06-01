/**
 * Проверка .env.local перед импортом в Firestore.
 * Run: npm run check:firebase
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  readFirebaseEnv,
  getFirebaseConfigIssues,
  isFirebaseEnvConfigured,
} from '../src/lib/firebaseEnv.ts'

function loadEnvLocal(): void {
  const path = resolve(process.cwd(), '.env.local')
  if (!existsSync(path)) {
    console.error('❌ Нет файла .env.local')
    console.error('   Скопируйте:  copy .env.example .env.local')
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

loadEnvLocal()

const config = readFirebaseEnv(process.env as Record<string, string>)
const issues = getFirebaseConfigIssues(config)

if (!isFirebaseEnvConfigured(config)) {
  console.error('❌ Firebase не настроен — в .env.local остались заглушки:\n')
  issues.forEach((i) => console.error(`   • ${i}`))
  console.error('\nКак исправить:')
  console.error('  1. Firebase Console → ваш проект → ⚙ Project settings → General')
  console.error('  2. Your apps → Web app → скопируйте firebaseConfig')
  console.error('  3. Вставьте значения в .env.local и перезапустите npm run dev')
  console.error('  4. Включите Firestore: Build → Firestore Database → Create database')
  console.error('  5. Deploy rules: firebase deploy --only firestore:rules')
  process.exit(1)
}

console.log(`✅ Firebase OK — project: ${config.projectId}`)
console.log('   Дальше: npm run probe:firestore  →  npm run seed:events')
console.log('   Или: Настройки → DataImporter (роль family)')
