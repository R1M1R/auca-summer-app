import { useStudentPresenceReporter } from '@/hooks/useStudentPresenceReporter'

/** No UI — syncs student online status to Firestore for the family dashboard. */
export default function StudentPresenceReporter() {
  useStudentPresenceReporter()
  return null
}
