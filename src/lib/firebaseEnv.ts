/** Shared Firebase env validation (Vite app + Node seed scripts). */

export interface FirebaseEnvConfig {
  apiKey:            string
  authDomain:        string
  projectId:         string
  storageBucket:     string
  messagingSenderId: string
  appId:             string
}

const PLACEHOLDER_PATTERNS = [
  /^your-/i,
  /^AIza\.\.\.$/,
  /^123456789$/,
  /^abc123$/i,
]

function isPlaceholder(value: string | undefined): boolean {
  if (!value || !value.trim()) return true
  const v = value.trim()
  return PLACEHOLDER_PATTERNS.some((re) => re.test(v))
}

export function readFirebaseEnv(
  source: Record<string, string | undefined>,
): FirebaseEnvConfig {
  return {
    apiKey:            source.VITE_FIREBASE_API_KEY            ?? '',
    authDomain:        source.VITE_FIREBASE_AUTH_DOMAIN        ?? '',
    projectId:         source.VITE_FIREBASE_PROJECT_ID         ?? '',
    storageBucket:     source.VITE_FIREBASE_STORAGE_BUCKET     ?? '',
    messagingSenderId: source.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId:             source.VITE_FIREBASE_APP_ID             ?? '',
  }
}

export function getFirebaseConfigIssues(config: FirebaseEnvConfig): string[] {
  const issues: string[] = []

  if (isPlaceholder(config.apiKey)) {
    issues.push('VITE_FIREBASE_API_KEY — укажите ключ из Firebase Console (не your-api-key)')
  }
  if (isPlaceholder(config.projectId)) {
    issues.push('VITE_FIREBASE_PROJECT_ID — укажите ID проекта (не your-project-id)')
  }
  if (isPlaceholder(config.authDomain)) {
    issues.push('VITE_FIREBASE_AUTH_DOMAIN — домен вида your-project.firebaseapp.com')
  }
  if (isPlaceholder(config.appId)) {
    issues.push('VITE_FIREBASE_APP_ID — App ID веб-приложения')
  }

  return issues
}

export function isFirebaseEnvConfigured(config: FirebaseEnvConfig): boolean {
  return getFirebaseConfigIssues(config).length === 0
}
