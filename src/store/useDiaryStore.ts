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
let lastDiaryIds = new Set<string>()

type DiaryAddListener = (added: DiaryEntry[]) => void
const diaryAddListeners = new Set<DiaryAddListener>()

/** Fired from Firestore onSnapshot when new diary documents appear */
export function subscribeDiaryAdds(listener: DiaryAddListener): () => void {
  diaryAddListeners.add(listener)
  return () => diaryAddListeners.delete(listener)
}

function notifyDiaryAdds(added: DiaryEntry[]): void {
  if (added.length === 0) return
  diaryAddListeners.forEach((fn) => fn(added))
}

function applyDiaryEntries(entries: DiaryEntry[]): void {
  const added = entries.filter((e) => !lastDiaryIds.has(e.id))
  lastDiaryIds = new Set(entries.map((e) => e.id))
  useDiaryStore.getState().setEntries(entries)
  notifyDiaryAdds(added)
}

export function startDiarySync(): () => void {
  if (stopDiarySync) return stopDiarySync

  const { setLoading, setError } = useDiaryStore.getState()
  setLoading(true)

  if (!isConfigured) {
    const refresh = () => {
      const entries = loadDemoDiary()
      applyDiaryEntries(entries)
      setLoading(false)
      setError(null)
    }
    refresh()
    const unsubDemo = subscribeDemoDiary(refresh)
    stopDiarySync = () => {
      unsubDemo()
      lastDiaryIds = new Set()
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
      const entries = snap.docs
        .map((d) => parseDiaryEntry(d.id, d.data() as FirestoreDiaryEntry))
        .filter((e): e is DiaryEntry => e !== null)

      applyDiaryEntries(entries)
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
    lastDiaryIds = new Set()
    stopDiarySync = null
  }
  return stopDiarySync
}

export function stopDiarySyncIfRunning(): void {
  stopDiarySync?.()
  lastDiaryIds = new Set()
}
