import type { StudentProfile } from '@/hooks/useStudentProfile'

/** Heartbeat must arrive within this window while isOnline is true. */
export const STUDENT_ONLINE_WINDOW_MS = 90 * 1000

export type StudentPresenceState = 'awaiting' | 'offline' | 'online'

export function getStudentPresenceState(
  profile: StudentProfile | null,
  nowMs = Date.now(),
  windowMs = STUDENT_ONLINE_WINDOW_MS,
): StudentPresenceState {
  const name = profile?.name?.trim()
  if (!name) return 'awaiting'
  if (profile?.isOnline !== true) return 'offline'
  if (!profile?.lastSeen) return 'offline'
  if (nowMs - profile.lastSeen.getTime() < windowMs) return 'online'
  return 'offline'
}
