export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function notificationPermission(): NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) return 'unsupported'
  return Notification.permission
}

export function canShowNotifications(): boolean {
  return notificationPermission() === 'granted'
}

async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null
  try {
    const ready = navigator.serviceWorker.ready
    const timeout = new Promise<null>((resolve) => {
      window.setTimeout(() => resolve(null), 2000)
    })
    const reg = await Promise.race([ready, timeout])
    return reg ?? null
  } catch {
    return null
  }
}

/**
 * System notification (foreground: Notification API; PWA: SW when available).
 * Returns true if a notification was shown.
 */
export async function showBrowserNotification(
  title: string,
  options?: NotificationOptions,
): Promise<boolean> {
  if (!notificationsSupported()) return false
  if (Notification.permission !== 'granted') return false

  const payload: NotificationOptions = {
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    ...options,
  }

  /* Foreground tab: direct API is most reliable (avoids SW hang in dev) */
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    try {
      new Notification(title, payload)
      return true
    } catch (err) {
      console.warn('[notifications] Notification API', err)
    }
  }

  try {
    const reg = await getServiceWorkerRegistration()
    if (reg?.showNotification) {
      await reg.showNotification(title, payload)
      return true
    }
  } catch (err) {
    console.warn('[notifications] Service Worker', err)
  }

  try {
    new Notification(title, payload)
    return true
  } catch (err) {
    console.warn('[notifications] fallback', err)
    return false
  }
}
