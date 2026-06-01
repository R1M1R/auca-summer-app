import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { useAppStore } from '@/store/useAppStore'
import {
  canStudentEditEvent,
  canFamilyManageEvents,
} from '@/lib/eventPermissions'
import { buildEventRussianFields } from '@/lib/dualSave'
import type {
  AppEvent,
  FirestoreEvent,
  NewEventPayload,
  UpdateEventPayload,
} from '@/types'
import { ADMIN_CREATOR } from '@/types'
import { notifyDemoUpdate, subscribeDemoStorage } from '@/lib/demoStorage'
import { buildEventsFromSchedule } from '@/lib/buildScheduleEvents'

const EVENTS_COLLECTION = 'events'
const DEMO_STORAGE_KEY  = 'app_demo_events_v3'

/* ── Firestore doc → AppEvent ───────────────────────────────── */
function fromFirestore(id: string, raw: FirestoreEvent): AppEvent {
  const legacyHost = raw.createdBy === 'host'
  return {
    id,
    title:           raw.title,
    titleRu:         raw.title_ru,
    description:     raw.description ?? '',
    descriptionRu:   raw.description_ru,
    date:            raw.date.toDate(),
    duration:        raw.duration,
    location:        raw.location,
    locationRu:      raw.location_ru,
    timeRu:          raw.time_ru,
    timeEn:          raw.time_en,
    hasExactTime:    raw.hasExactTime ?? true,
    category:    raw.category,
    createdBy:   legacyHost ? ADMIN_CREATOR : raw.createdBy,
    isEditable:  raw.isEditable ?? (!legacyHost && raw.createdBy !== ADMIN_CREATOR),
    completed:   raw.completed ?? false,
    createdAt:   raw.createdAt?.toDate?.() ?? new Date(),
    updatedAt:   raw.updatedAt?.toDate?.() ?? new Date(),
  }
}

function normalizeAppEvent(e: AppEvent): AppEvent {
  const legacyHost = e.createdBy === 'host'
  return {
    ...e,
    createdBy:  legacyHost ? ADMIN_CREATOR : e.createdBy,
    isEditable: e.isEditable ?? (e.category === 'student_personal' && !legacyHost),
  }
}

/* ── Demo mode persistence ──────────────────────────────────── */
function loadDemoEvents(): AppEvent[] {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AppEvent[]
      return parsed.map((e) => ({
        ...e,
        date:        new Date(e.date),
        createdAt:   new Date(e.createdAt),
        updatedAt:   new Date(e.updatedAt),
      })).map(normalizeAppEvent)
    }
  } catch {
    /* ignore */
  }
  return buildEventsFromSchedule().map(normalizeAppEvent)
}

function saveDemoEvents(events: AppEvent[]) {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(events))
}

function notifyDemoListeners() {
  notifyDemoUpdate(DEMO_STORAGE_KEY)
}

function subscribeDemo(cb: () => void) {
  return subscribeDemoStorage(DEMO_STORAGE_KEY, cb)
}

/* ── useEvents ──────────────────────────────────────────────── */
export function useEvents() {
  const [events,  setEvents]  = useState<AppEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured) {
      const refresh = () => setEvents(loadDemoEvents())
      refresh()
      setLoading(false)
      return subscribeDemo(refresh)
    }

    const q = query(
      collection(db, EVENTS_COLLECTION),
      orderBy('date', 'asc'),
    )

    const unsub = onSnapshot(
      q,
      (snap) => {
        setEvents(
          snap.docs.map((d) => fromFirestore(d.id, d.data() as FirestoreEvent)),
        )
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('[useEvents]', err)
        setError(err.message)
        setLoading(false)
      },
    )

    return unsub
  }, [])

  return { events, loading, error }
}

/* ── useEventMutations ──────────────────────────────────────── */
export function useEventMutations() {
  const role       = useAppStore((s) => s.role)
  const userId     = useAppStore((s) => s.userId)
  const ensureUserId = useAppStore((s) => s.ensureUserId)

  const canFamilyMutate   = canFamilyManageEvents(role)
  const canAddStudentPlan = role === 'student'
  const canMutate         = canFamilyMutate || canAddStudentPlan

  const assertCanEdit = useCallback(
    (event: AppEvent) => {
      if (canFamilyMutate) return
      const uid = userId || ensureUserId()
      if (!canStudentEditEvent(event, uid)) {
        throw new Error('You cannot edit this event')
      }
    },
    [canFamilyMutate, userId, ensureUserId],
  )

  const assertCanDelete = useCallback(
    (event: AppEvent) => {
      if (canFamilyMutate) return
      const uid = userId || ensureUserId()
      if (!canStudentEditEvent(event, uid)) {
        throw new Error('You cannot delete this event')
      }
    },
    [canFamilyMutate, userId, ensureUserId],
  )

  const addEvent = useCallback(
    async (
      payload: NewEventPayload,
      options?: { asStudent?: boolean },
    ): Promise<void> => {
      const asStudent = options?.asStudent ?? role === 'student'

      if (asStudent) {
        if (role !== 'student') throw new Error('Only students can add personal plans')
        const uid = ensureUserId()
        const ruFields = await buildEventRussianFields({
          title:       payload.title,
          description: payload.description,
          location:    payload.location,
        })

        const docData = {
          title:           payload.title,
          description:     payload.description,
          ...ruFields,
          date:            Timestamp.fromDate(payload.date),
          category:        'student_personal' as const,
          createdBy:       uid,
          isEditable:      true,
          completed:       false,
          ...(payload.duration !== undefined && { duration: payload.duration }),
          ...(payload.location !== undefined && { location: payload.location }),
        }

        if (!isConfigured) {
          const list = loadDemoEvents()
          const now  = new Date()
          list.push({
            id:              `demo-${Date.now()}`,
            ...payload,
            titleRu:         ruFields.title_ru,
            descriptionRu:   ruFields.description_ru,
            locationRu:      ruFields.location_ru,
            category:        'student_personal',
            createdBy:       uid,
            isEditable:      true,
            completed:       false,
            createdAt:       now,
            updatedAt:       now,
          })
          saveDemoEvents(list)
          notifyDemoListeners()
          return
        }

        await addDoc(collection(db, EVENTS_COLLECTION), {
          ...docData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        return
      }

      if (!canFamilyMutate) throw new Error('Only host family can add program events')
      if (!isConfigured) {
        const list = loadDemoEvents()
        const now  = new Date()
        list.push({
          id:          `demo-${Date.now()}`,
          ...payload,
          createdBy:   ADMIN_CREATOR,
          isEditable:  false,
          completed:   false,
          createdAt:   now,
          updatedAt:   now,
        })
        saveDemoEvents(list)
        notifyDemoListeners()
        return
      }

      await addDoc(collection(db, EVENTS_COLLECTION), {
        title:       payload.title,
        description: payload.description,
        date:        Timestamp.fromDate(payload.date),
        ...(payload.duration !== undefined && { duration: payload.duration }),
        ...(payload.location !== undefined && { location: payload.location }),
        category:    payload.category,
        createdBy:   ADMIN_CREATOR,
        isEditable:  false,
        completed:   false,
        createdAt:   serverTimestamp(),
        updatedAt:   serverTimestamp(),
      })
    },
    [role, canFamilyMutate, ensureUserId],
  )

  const updateEvent = useCallback(
    async (id: string, payload: UpdateEventPayload, existing?: AppEvent): Promise<void> => {
      if (existing) assertCanEdit(existing)

      if (!isConfigured) {
        const list = loadDemoEvents()
        const idx  = list.findIndex((e) => e.id === id)
        if (idx === -1) throw new Error('Event not found')
        if (!canFamilyMutate) assertCanEdit(list[idx])
        const merged = {
          ...list[idx],
          ...payload,
          ...(payload.date && { date: payload.date }),
          updatedAt: new Date(),
        }
        if (role === 'student') {
          const ruFields = await buildEventRussianFields({
            title:       payload.title ?? list[idx].title,
            description: payload.description ?? list[idx].description,
            location:    payload.location ?? list[idx].location,
          })
          merged.titleRu = ruFields.title_ru
          merged.descriptionRu = ruFields.description_ru
          merged.locationRu = ruFields.location_ru
        }
        list[idx] = merged
        saveDemoEvents(list)
        notifyDemoListeners()
        return
      }

      if (!canFamilyMutate && !existing) {
        throw new Error('Event context required for student update')
      }

      const data: Record<string, unknown> = { ...payload, updatedAt: serverTimestamp() }
      if (payload.date) data.date = Timestamp.fromDate(payload.date)
      if (role === 'student') {
        data.category = 'student_personal'
        const ruFields = await buildEventRussianFields({
          title:       (payload.title as string | undefined) ?? existing?.title ?? '',
          description: (payload.description as string | undefined) ?? existing?.description ?? '',
          location:    (payload.location as string | undefined) ?? existing?.location,
        })
        Object.assign(data, ruFields)
      }

      await updateDoc(doc(db, EVENTS_COLLECTION, id), data)
    },
    [canFamilyMutate, role, assertCanEdit],
  )

  const deleteEvent = useCallback(
    async (id: string, existing?: AppEvent): Promise<void> => {
      if (existing) assertCanDelete(existing)

      if (!isConfigured) {
        const list = loadDemoEvents()
        const ev   = list.find((e) => e.id === id)
        if (!ev) return
        if (!canFamilyMutate) assertCanDelete(ev)
        saveDemoEvents(list.filter((e) => e.id !== id))
        notifyDemoListeners()
        return
      }

      await deleteDoc(doc(db, EVENTS_COLLECTION, id))
    },
    [canFamilyMutate, assertCanDelete],
  )

  const toggleComplete = useCallback(
    async (id: string, completed: boolean): Promise<void> => {
      if (!isConfigured) {
        const list = loadDemoEvents()
        const idx  = list.findIndex((e) => e.id === id)
        if (idx === -1) return
        list[idx] = { ...list[idx], completed, updatedAt: new Date() }
        saveDemoEvents(list)
        notifyDemoListeners()
        return
      }

      await updateDoc(doc(db, EVENTS_COLLECTION, id), {
        completed,
        updatedAt: serverTimestamp(),
      })
    },
    [],
  )

  return {
    addEvent,
    updateEvent,
    deleteEvent,
    toggleComplete,
    canMutate,
    canFamilyMutate,
    canHostMutate: canFamilyMutate,
    canAddStudentPlan,
    userId,
    ensureUserId,
  }
}
