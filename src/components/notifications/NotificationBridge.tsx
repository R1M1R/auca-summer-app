import { useNotifications } from '@/hooks/useNotifications'
import { useEventReminders } from '@/hooks/useEventReminders'
import { useDiaryAlerts } from '@/hooks/useDiaryAlerts'
import { useFamilyEventAlerts } from '@/hooks/useFamilyEventAlerts'

/** Wires browser notifications + in-app toasts to the active role. */
export default function NotificationBridge() {
  useNotifications()
  useEventReminders()
  useDiaryAlerts()
  useFamilyEventAlerts()
  return null
}
