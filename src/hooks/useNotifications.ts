import { useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { notificationsSupported } from '@/lib/browserNotifications'

const SESSION_ASK_KEY = 'timeflow_notif_permission_asked'

/**
 * Softly requests Notification permission once per session after the user picks a role.
 */
export function useNotifications(): void {
  const { role } = useApp()

  useEffect(() => {
    if (!role) return
    if (!notificationsSupported()) return
    if (Notification.permission !== 'default') return
    if (sessionStorage.getItem(SESSION_ASK_KEY)) return

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_ASK_KEY, '1')
      void Notification.requestPermission().then((result) => {
        if (import.meta.env.DEV) {
          console.info('[notifications] permission:', result)
        }
      }).catch(() => {})
    }, 1500)

    return () => window.clearTimeout(timer)
  }, [role])
}
