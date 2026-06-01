/** Cross-tab + same-tab sync for demo mode (no Firebase) */

export const DEMO_DIARY_KEY        = 'demo_diary'
export const DEMO_PREFERENCES_KEY  = 'demo_preferences'

export function notifyDemoUpdate(key: string): void {
  window.dispatchEvent(new CustomEvent('demo-storage', { detail: key }))
}

export function subscribeDemoStorage(key: string, onUpdate: () => void): () => void {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<string>).detail
    if (detail === key) onUpdate()
  }
  const storageHandler = (e: StorageEvent) => {
    if (e.key === key) onUpdate()
  }
  window.addEventListener('demo-storage', handler)
  window.addEventListener('storage', storageHandler)
  return () => {
    window.removeEventListener('demo-storage', handler)
    window.removeEventListener('storage', storageHandler)
  }
}
