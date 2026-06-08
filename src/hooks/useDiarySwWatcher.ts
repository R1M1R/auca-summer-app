import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { useDiaryEntries } from '@/hooks/useDiaryEntries'
import { canShowNotifications } from '@/lib/browserNotifications'
import { isConfigured } from '@/lib/firebase'
import { readFirebaseEnv } from '@/lib/firebaseEnv'
import {
  buildDiaryWatchConfig,
  startDiaryWatchInServiceWorker,
  stopDiaryWatchInServiceWorker,
} from '@/lib/diarySwBridge'

const firebaseEnv = readFirebaseEnv({
  VITE_FIREBASE_API_KEY:            import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID:             import.meta.env.VITE_FIREBASE_APP_ID,
})

/**
 * Polls Firestore from the service worker so the host family gets diary
 * notifications even when the PWA is in the background (Android / installed PWA).
 */
export function useDiarySwWatcher(): void {
  const { role } = useApp()
  const { t } = useTranslation()
  const { entries } = useDiaryEntries()
  const sessionStartRef = useRef(0)

  useEffect(() => {
    if (role !== 'family') {
      sessionStartRef.current = 0
      stopDiaryWatchInServiceWorker()
      return
    }
    if (!isConfigured || !canShowNotifications()) {
      stopDiaryWatchInServiceWorker()
      return
    }

    if (!sessionStartRef.current) {
      sessionStartRef.current = Date.now()
    }

    const config = buildDiaryWatchConfig(
      entries.map((e) => ({ id: e.id, updatedAt: e.updatedAt })),
      firebaseEnv.projectId,
      firebaseEnv.apiKey,
      t('notifications.diaryTitle'),
      t('notifications.diaryBody'),
    )
    config.sessionStart = sessionStartRef.current

    void startDiaryWatchInServiceWorker(config)

    return () => {
      stopDiaryWatchInServiceWorker()
    }
  }, [role, entries, t])
}
