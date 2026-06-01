import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore'

/* ── Config read from .env.local ─────────────────────────────── */
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            as string,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        as string,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         as string,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             as string,
}

/* ── Validate that env vars are present ──────────────────────── */
const isConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.startsWith('your-'),
)

/* ── Singleton: avoid re-initialising on HMR ─────────────────── */
let app: FirebaseApp
let db: Firestore

if (isConfigured) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  db  = getFirestore(app)

  /* Connect to local emulator in dev if VITE_USE_EMULATOR=true */
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_USE_EMULATOR === 'true' &&
    !(db as unknown as { _settings?: { host?: string } })._settings?.host?.includes('localhost')
  ) {
    connectFirestoreEmulator(db, 'localhost', 8080)
    console.info('[Firebase] Using Firestore emulator on :8080')
  }
} else {
  console.warn(
    '[Firebase] No valid config found. Copy .env.example → .env.local and fill in your values.\n' +
    'The app will run without Firestore until then.',
  )
  /* Provide a stub so imports don't crash at module level */
  app = {} as FirebaseApp
  db  = {} as Firestore
}

export { db, isConfigured }
export default app
