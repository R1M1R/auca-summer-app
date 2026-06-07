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

function isStandalonePwa(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) return null
  try {
    const ready = navigator.serviceWorker.ready
    const timeout = new Promise<null>((resolve) => {
      window.setTimeout(() => resolve(null), 3000)
    })
    const reg = await Promise.race([ready, timeout])
    return reg ?? null
  } catch {
    return null
  }
}

/**
 * System notification — prefers Service Worker when tab is hidden or app is installed PWA
 * so reminders can appear while the app is in the background.
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

  const hidden = typeof document !== 'undefined' && document.visibilityState === 'hidden'
  const preferSw = hidden || isStandalonePwa()

  if (preferSw) {
    try {
      const reg = await getServiceWorkerRegistration()
      if (reg?.showNotification) {
        await reg.showNotification(title, payload)
        return true
      }
    } catch (err) {
      console.warn('[notifications] Service Worker', err)
    }
  }

  if (!hidden) {
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
    console.warn('[notifications] Service Worker fallback', err)
  }

  try {
    new Notification(title, payload)
    return true
  } catch (err) {
    console.warn('[notifications] fallback', err)
    return false
  }
}
