import type { StudentProfile } from '@/hooks/useStudentProfile'

/** Consider the student "in app" if lastSeen is within this window. */
export const STUDENT_ONLINE_WINDOW_MS = 15 * 60 * 1000

export type StudentPresenceState = 'awaiting' | 'offline' | 'online'

export function getStudentPresenceState(
  profile: StudentProfile | null,
  windowMs = STUDENT_ONLINE_WINDOW_MS,
): StudentPresenceState {
  const name = profile?.name?.trim()
  if (!name) return 'awaiting'
  if (!profile?.lastSeen) return 'offline'
  if (Date.now() - profile.lastSeen.getTime() < windowMs) return 'online'
  return 'offline'
}
