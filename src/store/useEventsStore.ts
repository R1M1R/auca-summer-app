import { create } from 'zustand'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import {
  fromFirestore,
  loadDemoEvents,
  subscribeDemoEvents,
  EVENTS_COLLECTION,
} from '@/lib/eventsData'
import type { AppEvent, FirestoreEvent } from '@/types'

interface EventsStore {
  events:  AppEvent[]
  loading: boolean
  error:   string | null
  setEvents:  (events: AppEvent[]) => void
  setLoading: (loading: boolean) => void
  setError:   (error: string | null) => void
}

export const useEventsStore = create<EventsStore>((set) => ({
  events:  [],
  loading: true,
  error:   null,
  setEvents:  (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setError:   (error) => set({ error }),
}))

let stopEventsSync: (() => void) | null = null

export function startEventsSync(): () => void {
  if (stopEventsSync) return stopEventsSync

  const { setEvents, setLoading, setError } = useEventsStore.getState()
  setLoading(true)

  if (!isConfigured) {
    const refresh = () => {
      setEvents(loadDemoEvents())
      setLoading(false)
      setError(null)
    }
    refresh()
    const unsubDemo = subscribeDemoEvents(refresh)
    stopEventsSync = () => {
      unsubDemo()
      stopEventsSync = null
    }
    return stopEventsSync
  }

  const q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'asc'))

  const unsubFirestore = onSnapshot(
    q,
    (snap) => {
      setEvents(snap.docs.map((d) => fromFirestore(d.id, d.data() as FirestoreEvent)))
      setLoading(false)
      setError(null)
    },
    (err) => {
      console.error('[eventsStore]', err)
      setError(err.message)
      setLoading(false)
    },
  )

  stopEventsSync = () => {
    unsubFirestore()
    stopEventsSync = null
  }
  return stopEventsSync
}

export function stopEventsSyncIfRunning(): void {
  stopEventsSync?.()
}
