import { useCallback, useEffect, useState } from 'react'
import {
  notificationsSupported,
  notificationPermission,
  showBrowserNotification,
} from '@/lib/browserNotifications'

export type NotificationPermissionState = NotificationPermission | 'unsupported'

export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermissionState>(
    () => notificationPermission(),
  )
  const [busy, setBusy] = useState(false)

  const refresh = useCallback(() => {
    setPermission(notificationPermission())
  }, [])

  useEffect(() => {
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [refresh])

  const request = useCallback(async (): Promise<NotificationPermissionState> => {
    if (!notificationsSupported()) {
      setPermission('unsupported')
      return 'unsupported'
    }

    setBusy(true)
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      sessionStorage.setItem('timeflow_notif_permission_asked', '1')
      return result
    } finally {
      setBusy(false)
    }
  }, [])

  const sendTest = useCallback(async (title: string, body: string): Promise<boolean> => {
    const current = notificationPermission()
    setPermission(current)
    if (current !== 'granted') return false
    return showBrowserNotification(title, { body, tag: 'test-notification' })
  }, [])

  return {
    permission,
    supported: notificationsSupported(),
    granted:   permission === 'granted',
    denied:    permission === 'denied',
    default:   permission === 'default',
    busy,
    request,
    sendTest,
    refresh,
  }
}
