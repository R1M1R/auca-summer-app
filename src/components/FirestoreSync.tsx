import { useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { startEventsSync, stopEventsSyncIfRunning } from '@/store/useEventsStore'
import { startDiarySync, stopDiarySyncIfRunning } from '@/store/useDiaryStore'

/** Single Firestore onSnapshot per collection — survives tab/route changes. */
export default function FirestoreSync() {
  const { role } = useApp()

  useEffect(() => {
    if (!role) {
      stopEventsSyncIfRunning()
      stopDiarySyncIfRunning()
      return
    }

    const stopEvents = startEventsSync()
    const stopDiary = startDiarySync()

    return () => {
      stopEvents()
      stopDiary()
    }
  }, [role])

  return null
}
