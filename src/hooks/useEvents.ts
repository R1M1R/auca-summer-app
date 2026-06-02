import { useCallback } from 'react'
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { useAppStore } from '@/store/useAppStore'
import { useEventsStore } from '@/store/useEventsStore'
import {
  canStudentEditEvent,
  canFamilyManageEvents,
  canToggleEventComplete,
} from '@/lib/eventPermissions'
import { buildEventRussianFields } from '@/lib/dualSave'
import {
  loadDemoEvents,
  saveDemoEvents,
  notifyDemoEventsUpdate,
  EVENTS_COLLECTION,
} from '@/lib/eventsData'
import type { AppEvent, NewEventPayload, UpdateEventPayload } from '@/types'
import { ADMIN_CREATOR } from '@/types'

export function useEvents() {
  const events  = useEventsStore((s) => s.events)
  const loading = useEventsStore((s) => s.loading)
  const error   = useEventsStore((s) => s.error)
  return { events, loading, error }
}

export function useEventMutations() {
  const role         = useAppStore((s) => s.role)
  const userId       = useAppStore((s) => s.userId)
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
            id:            `demo-${Date.now()}`,
            ...payload,
            titleRu:       ruFields.title_ru,
            descriptionRu: ruFields.description_ru,
            locationRu:    ruFields.location_ru,
            category:      'student_personal',
            createdBy:     uid,
            isEditable:    true,
            completed:     false,
            createdAt:     now,
            updatedAt:     now,
          })
          saveDemoEvents(list)
          notifyDemoEventsUpdate()
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
        notifyDemoEventsUpdate()
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
        notifyDemoEventsUpdate()
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
        notifyDemoEventsUpdate()
        return
      }

      await deleteDoc(doc(db, EVENTS_COLLECTION, id))
    },
    [canFamilyMutate, assertCanDelete],
  )

  const toggleComplete = useCallback(
    async (id: string, completed: boolean): Promise<void> => {
      if (!canToggleEventComplete(role)) {
        throw new Error('Only students can change completion status')
      }

      if (!isConfigured) {
        const list = loadDemoEvents()
        const idx  = list.findIndex((e) => e.id === id)
        if (idx === -1) return
        list[idx] = { ...list[idx], completed, updatedAt: new Date() }
        saveDemoEvents(list)
        notifyDemoEventsUpdate()
        return
      }

      await updateDoc(doc(db, EVENTS_COLLECTION, id), {
        completed,
        updatedAt: serverTimestamp(),
      })
    },
    [role],
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
