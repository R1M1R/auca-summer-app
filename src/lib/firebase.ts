import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore'
import {
  readFirebaseEnv,
  isFirebaseEnvConfigured,
  getFirebaseConfigIssues,
} from '@/lib/firebaseEnv'

const firebaseConfig = readFirebaseEnv({
  VITE_FIREBASE_API_KEY:            import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID:             import.meta.env.VITE_FIREBASE_APP_ID,
})

export const isConfigured = isFirebaseEnvConfigured(firebaseConfig)

export function getFirebaseSetupIssues(): string[] {
  return getFirebaseConfigIssues(firebaseConfig)
}

let app: FirebaseApp
let db: Firestore

if (isConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  db  = getFirestore(app)

  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_USE_EMULATOR === 'true' &&
    !(db as unknown as { _settings?: { host?: string } })._settings?.host?.includes('localhost')
  ) {
    connectFirestoreEmulator(db, 'localhost', 8080)
    console.info('[Firebase] Firestore emulator: localhost:8080')
  }
} else {
  const issues = getFirebaseConfigIssues(firebaseConfig)
  console.warn(
    '[Firebase] Демо-режим: Firestore отключён.\n' +
    'Скопируйте .env.example → .env.local и вставьте ключи из Firebase Console → Project settings → Your apps.\n' +
    (issues.length ? issues.map((i) => `  • ${i}`).join('\n') : ''),
  )
  app = {} as FirebaseApp
  db  = {} as Firestore
}

export { db }
export default app
