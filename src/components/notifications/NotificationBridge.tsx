import { useNotifications } from '@/hooks/useNotifications'
import { useEventReminders } from '@/hooks/useEventReminders'
import { useDiaryAlerts } from '@/hooks/useDiaryAlerts'

/** Wires browser notifications + in-app toasts to the active role. */
export default function NotificationBridge() {
  useNotifications()
  useEventReminders()
  useDiaryAlerts()
  return null
}
