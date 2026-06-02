import { useEffect, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { isConfigured } from '@/lib/firebase'
import { reportStudentPresence } from '@/lib/studentProfileWrite'

const HEARTBEAT_MS = 45_000

/**
 * Keeps Firestore student presence in sync while the student has the app open.
 * Family reads isOnline + lastSeen to show accurate online/offline status.
 */
export function useStudentPresenceReporter(): void {
  const { role } = useApp()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (role !== 'student' || !isConfigured) return

    const clearHeartbeat = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    const goOnline = () => {
      if (document.visibilityState !== 'visible') return
      reportStudentPresence(true).catch(() => {})
      clearHeartbeat()
      intervalRef.current = setInterval(() => {
        if (document.visibilityState === 'visible') {
          reportStudentPresence(true).catch(() => {})
        }
      }, HEARTBEAT_MS)
    }

    const goOffline = () => {
      clearHeartbeat()
      reportStudentPresence(false).catch(() => {})
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible') goOnline()
      else goOffline()
    }

    if (document.visibilityState === 'visible') goOnline()
    else goOffline()

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', goOffline)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', goOffline)
      goOffline()
    }
  }, [role])
}
