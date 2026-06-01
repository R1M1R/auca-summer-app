import { useState, useEffect, useCallback } from 'react'

const DISMISS_KEY = 'pwa_install_dismissed'

/* ── OS detection ────────────────────────────────────────────── */
export type DetectedOS = 'ios' | 'android' | 'desktop' | 'other'

export function detectOS(): DetectedOS {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua) && !('MSStream' in window)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  if (/Win|Mac|Linux|CrOS/.test(navigator.platform ?? ua)) return 'desktop'
  return 'other'
}

/** True when running in installed PWA mode */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function readDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/* ── Hook ────────────────────────────────────────────────────── */
export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState<boolean>(() => {
    try { return isStandalone() } catch { return false }
  })
  const [dismissed, setDismissed] = useState<boolean>(readDismissed)

  useEffect(() => {
    const onPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const dismiss = useCallback(() => {
    try { localStorage.setItem(DISMISS_KEY, '1') } catch { /* ignore */ }
    setDismissed(true)
  }, [])

  const triggerInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    if (outcome === 'accepted') setInstalled(true)
    return outcome === 'accepted'
  }, [deferredPrompt])

  const os = detectOS()

  /** Android / Desktop Chrome — native install dialog available */
  const canPrompt = Boolean(deferredPrompt) && (os === 'android' || os === 'desktop')

  /** Legacy helper used on WelcomeScreen */
  const showHint = !installed && !dismissed && (os === 'ios' || os === 'android' || canPrompt)

  /** Global InstallPWA visibility */
  const shouldShow = !installed && !dismissed && (os === 'ios' || canPrompt || os === 'android')

  return {
    canPrompt,
    triggerInstall,
    installed,
    dismissed,
    dismiss,
    showHint,
    shouldShow,
    os,
    deferredPrompt: Boolean(deferredPrompt),
  }
}
