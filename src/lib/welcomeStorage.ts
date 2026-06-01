export const WELCOME_SEEN_KEY = 'timeflow_student_welcome_seen'

export function hasSeenWelcomeModal(): boolean {
  try {
    return localStorage.getItem(WELCOME_SEEN_KEY) === '1'
  } catch {
    return true
  }
}

export function markWelcomeModalSeen(): void {
  try {
    localStorage.setItem(WELCOME_SEEN_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}
