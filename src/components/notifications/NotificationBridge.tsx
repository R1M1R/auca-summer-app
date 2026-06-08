import { useNotifications } from '@/hooks/useNotifications'
import { useEventReminders } from '@/hooks/useEventReminders'
import { useDiaryAlerts } from '@/hooks/useDiaryAlerts'
import { useDiarySwWatcher } from '@/hooks/useDiarySwWatcher'
import { useFamilyStudentActivityAlerts } from '@/hooks/useFamilyStudentActivityAlerts'
import { useFamilyPreferencesAlert } from '@/hooks/useFamilyPreferencesAlert'

/** Wires browser notifications + in-app toasts to the active role. */
export default function NotificationBridge() {
  useNotifications()
  useEventReminders()
  useDiaryAlerts()
  useDiarySwWatcher()
  useFamilyStudentActivityAlerts()
  useFamilyPreferencesAlert()
  return null
}
