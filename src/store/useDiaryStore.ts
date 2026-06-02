import { create } from 'zustand'
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import {
  parseDiaryEntry,
  loadDemoDiary,
  subscribeDemoDiary,
  DIARY_COLLECTION,
} from '@/lib/diaryData'
import type { DiaryEntry, FirestoreDiaryEntry } from '@/types'

interface DiaryStore {
  entries: DiaryEntry[]
  loading: boolean
  error:   string | null
  setEntries: (entries: DiaryEntry[]) => void
  setLoading: (loading: boolean) => void
  setError:   (error: string | null) => void
}

export const useDiaryStore = create<DiaryStore>((set) => ({
  entries: [],
  loading: true,
  error:   null,
  setEntries: (entries) => set({ entries }),
  setLoading: (loading) => set({ loading }),
  setError:   (error) => set({ error }),
}))

let stopDiarySync: (() => void) | null = null

export function startDiarySync(): () => void {
  if (stopDiarySync) return stopDiarySync

  const { setEntries, setLoading, setError } = useDiaryStore.getState()
  setLoading(true)

  if (!isConfigured) {
    const refresh = () => {
      setEntries(loadDemoDiary())
      setLoading(false)
      setError(null)
    }
    refresh()
    const unsubDemo = subscribeDemoDiary(refresh)
    stopDiarySync = () => {
      unsubDemo()
      stopDiarySync = null
    }
    return stopDiarySync
  }

  const q = query(
    collection(db, DIARY_COLLECTION),
    orderBy('date', 'desc'),
    limit(60),
  )

  const unsubFirestore = onSnapshot(
    q,
    (snap) => {
      setEntries(
        snap.docs
          .map((d) => parseDiaryEntry(d.id, d.data() as FirestoreDiaryEntry))
          .filter((e): e is DiaryEntry => e !== null),
      )
      setLoading(false)
      setError(null)
    },
    (err) => {
      console.error('[diaryStore]', err)
      setError(err.message)
      setLoading(false)
    },
  )

  stopDiarySync = () => {
    unsubFirestore()
    stopDiarySync = null
  }
  return stopDiarySync
}

export function stopDiarySyncIfRunning(): void {
  stopDiarySync?.()
}
