import { useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, onSnapshot, serverTimestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { reportStudentPresence } from '@/lib/studentProfileWrite'

export interface StudentProfile {
  name:      string
  lastSeen:  Date | null
  isOnline:  boolean
  createdAt: Date | null
}

const COLL = 'users'
const DOC  = 'student_profile'

export function useStudentProfile() {
  const [profile,  setProfile]  = useState<StudentProfile | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured) {
      setProfile(null)
      setLoading(false)
      setError(null)
      return
    }

    const ref = doc(db, COLL, DOC)
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const d = snap.data()
          setProfile({
            name:      (d.name as string | undefined) ?? '',
            lastSeen:  d.lastSeen?.toDate  ? d.lastSeen.toDate()  : null,
            isOnline:  d.isOnline === true,
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate() : null,
          })
        } else {
          setProfile(null)
        }
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('[useStudentProfile]', err)
        setError(err.message)
        setLoading(false)
      },
    )
    return unsub
  }, [])

  /**
   * Write/update student name.
   * Uses merge:true so preferences fields are never overwritten.
   */
  const saveProfile = useCallback(async (name: string): Promise<void> => {
    if (!isConfigured) return

    const ref  = doc(db, COLL, DOC)
    const snap = await getDoc(ref)

    await setDoc(
      ref,
      {
        name,
        isOnline:  true,
        lastSeen:  serverTimestamp(),
        ...(!snap.exists() && { createdAt: serverTimestamp() }),
      },
      { merge: true },   // ← preserves preferences fields
    )
  }, [])

  const reportPresence = useCallback(
    (online: boolean) => reportStudentPresence(online),
    [],
  )

  return { profile, loading, error, saveProfile, reportPresence }
}
