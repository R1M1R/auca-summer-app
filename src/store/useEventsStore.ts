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
import { detectStudentActivities, type StudentActivity } from '@/lib/studentActivity'
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
let lastEventIds = new Set<string>()
let lastEventsById = new Map<string, AppEvent>()
let eventsSnapshotPrimed = false

type EventsAddListener = (added: AppEvent[]) => void
const eventsAddListeners = new Set<EventsAddListener>()

type StudentActivityListener = (activities: StudentActivity[]) => void
const studentActivityListeners = new Set<StudentActivityListener>()

/** Fired from Firestore/demo sync when new event documents appear */
export function subscribeEventsAdds(listener: EventsAddListener): () => void {
  eventsAddListeners.add(listener)
  return () => eventsAddListeners.delete(listener)
}

/** Fired when student schedule activity is detected (plans, completion, edits). */
export function subscribeStudentActivities(listener: StudentActivityListener): () => void {
  studentActivityListeners.add(listener)
  return () => studentActivityListeners.delete(listener)
}

function notifyEventsAdds(added: AppEvent[]): void {
  if (added.length === 0) return
  eventsAddListeners.forEach((fn) => fn(added))
}

function notifyStudentActivities(activities: StudentActivity[]): void {
  if (activities.length === 0) return
  studentActivityListeners.forEach((fn) => fn(activities))
}

function applyEvents(entries: AppEvent[]): void {
  if (!eventsSnapshotPrimed) {
    lastEventIds = new Set(entries.map((e) => e.id))
    lastEventsById = new Map(entries.map((e) => [e.id, e]))
    eventsSnapshotPrimed = true
    useEventsStore.getState().setEvents(entries)
    return
  }

  const added = entries.filter((e) => !lastEventIds.has(e.id))
  const activities = detectStudentActivities(lastEventsById, entries)

  lastEventIds = new Set(entries.map((e) => e.id))
  lastEventsById = new Map(entries.map((e) => [e.id, e]))
  useEventsStore.getState().setEvents(entries)
  notifyEventsAdds(added)
  notifyStudentActivities(activities)
}

export function startEventsSync(): () => void {
  if (stopEventsSync) return stopEventsSync

  const { setLoading, setError } = useEventsStore.getState()
  setLoading(true)

  if (!isConfigured) {
    const refresh = () => {
      applyEvents(loadDemoEvents())
      setLoading(false)
      setError(null)
    }
    refresh()
    const unsubDemo = subscribeDemoEvents(refresh)
    stopEventsSync = () => {
      unsubDemo()
      lastEventIds = new Set()
      lastEventsById = new Map()
      eventsSnapshotPrimed = false
      stopEventsSync = null
    }
    return stopEventsSync
  }

  const q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'asc'))

  const unsubFirestore = onSnapshot(
    q,
    (snap) => {
      const entries = snap.docs
        .map((d) => fromFirestore(d.id, d.data() as FirestoreEvent))
        .filter((e): e is AppEvent => e !== null)

      applyEvents(entries)
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
    lastEventIds = new Set()
    lastEventsById = new Map()
    eventsSnapshotPrimed = false
    stopEventsSync = null
  }
  return stopEventsSync
}

export function stopEventsSyncIfRunning(): void {
  stopEventsSync?.()
  lastEventIds = new Set()
  lastEventsById = new Map()
  eventsSnapshotPrimed = false
}
