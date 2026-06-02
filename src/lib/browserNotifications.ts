export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function notificationPermission(): NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) return 'unsupported'
  return Notification.permission
}

/** System notification via Service Worker (PWA) or Notification API */
export async function showBrowserNotification(
  title: string,
  options?: NotificationOptions,
): Promise<void> {
  if (!notificationsSupported()) return
  if (Notification.permission !== 'granted') return

  const payload: NotificationOptions = {
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    ...options,
  }

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready
      if (reg?.showNotification) {
        await reg.showNotification(title, payload)
        return
      }
    }
  } catch {
    /* fall through */
  }

  try {
    new Notification(title, payload)
  } catch (err) {
    console.warn('[notifications]', err)
  }
}
