import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { usePreferences } from '@/hooks/usePreferences'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification } from '@/lib/browserNotifications'

/** Notifies host family when the student updates food/preferences profile. */
export function useFamilyPreferencesAlert(): void {
  const { role } = useApp()
  const { t } = useTranslation()
  const { toast } = useToast()
  const { lastSaved } = usePreferences()
  const prevSavedRef = useRef<Date | null>(null)
  const ignoreRef    = useRef(true)

  useEffect(() => {
    if (role !== 'family') {
      prevSavedRef.current = null
      return
    }

    ignoreRef.current = true
    const primeTimer = window.setTimeout(() => {
      ignoreRef.current = false
      prevSavedRef.current = lastSaved
    }, 1200)

    return () => window.clearTimeout(primeTimer)
  }, [role, lastSaved])

  useEffect(() => {
    if (role !== 'family' || !lastSaved || ignoreRef.current) return

    const prev = prevSavedRef.current
    if (prev && lastSaved.getTime() > prev.getTime()) {
      const title = t('notifications.studentActivity.prefsTitle')
      const body  = t('notifications.studentActivity.prefsUpdated')

      void showBrowserNotification(title, { body, tag: 'student-prefs', data: { type: 'student_prefs' } })
      toast.info(body)
    }

    prevSavedRef.current = lastSaved
  }, [lastSaved, role, toast, t])
}
