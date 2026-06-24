import { useCallback } from 'react'
import { Timestamp } from 'firebase/firestore'
import { isConfigured } from '@/lib/firebase'
import { useAppStore } from '@/store/useAppStore'
import { useEventsStore } from '@/store/useEventsStore'
import {
  canStudentEditEvent,
  canFamilyManageEvents,
  canFamilyEditEvent,
  canFamilyDeleteEvent,
  canToggleEventComplete,
} from '@/lib/eventPermissions'
import { completionFieldForStudent } from '@/lib/eventCompletion'
import { buildEventRussianFields } from '@/lib/dualSave'
import { sanitizeFirestoreData } from '@/lib/firestoreSanitize'
import {
  createEventDocument,
  updateEventDocument,
  deleteEventDocument,
  updateEventCompletion,
  persistDemoEvents,
  readDemoEvents,
} from '@/repositories/eventsRepository'
import type { AppEvent, NewEventPayload, UpdateEventPayload } from '@/types'
import { ADMIN_CREATOR } from '@/types'

/**
 * Subscribes to the global events store (real-time sync lives in useEventsStore).
 */
export function useEvents() {
  const events  = useEventsStore((s) => s.events)
  const loading = useEventsStore((s) => s.loading)
  const error   = useEventsStore((s) => s.error)
  return { events, loading, error }
}

/**
 * Schedule mutations with role-based permission checks.
 * Firestore field names and collection are unchanged — see eventsRepository.
 */
export function useEventMutations() {
  const role         = useAppStore((s) => s.role)
  const userId       = useAppStore((s) => s.userId)
  const ensureUserId = useAppStore((s) => s.ensureUserId)

  const canFamilyMutate   = canFamilyManageEvents(role)
  const canAddStudentPlan = role === 'student'
  const canMutate         = canFamilyMutate || canAddStudentPlan

  const assertCanEdit = useCallback(
    (event: AppEvent) => {
      if (canFamilyMutate) {
        if (!canFamilyEditEvent(event)) {
          throw new Error('You cannot edit this event')
        }
        return
      }
      const uid = userId || ensureUserId()
      if (!canStudentEditEvent(event, uid)) {
        throw new Error('You cannot edit this event')
      }
    },
    [canFamilyMutate, userId, ensureUserId],
  )

  const assertCanDelete = useCallback(
    (event: AppEvent) => {
      if (canFamilyMutate) {
        if (!canFamilyDeleteEvent(event)) {
          throw new Error('You cannot delete this event')
        }
        return
      }
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

        const docData = sanitizeFirestoreData({
          title:           payload.title,
          description:     payload.description ?? '',
          ...ruFields,
          date:            Timestamp.fromDate(payload.date),
          hasExactTime:    true,
          category:        'student_personal' as const,
          createdBy:       uid,
          isEditable:      true,
          completed:       false,
          duration:        payload.duration,
          location:        payload.location,
        })

        if (!isConfigured) {
          const list = readDemoEvents()
          const now  = new Date()
          list.push({
            id:            `demo-${Date.now()}`,
            ...payload,
            titleRu:       ruFields.title_ru,
            descriptionRu: ruFields.description_ru,
            locationRu:    ruFields.location_ru,
            hasExactTime:  true,
            category:      'student_personal',
            createdBy:     uid,
            isEditable:    true,
            completed:     false,
            createdAt:     now,
            updatedAt:     now,
          })
          persistDemoEvents(list)
          return
        }

        await createEventDocument(docData)
        return
      }

      if (!canFamilyMutate) throw new Error('Only host family can add program events')
      if (!isConfigured) {
        const list = readDemoEvents()
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
        persistDemoEvents(list)
        return
      }

      await createEventDocument(
        sanitizeFirestoreData({
          title:       payload.title,
          description: payload.description ?? '',
          date:        Timestamp.fromDate(payload.date),
          duration:    payload.duration,
          location:    payload.location,
          category:    payload.category,
          createdBy:   ADMIN_CREATOR,
          isEditable:  false,
          completed:   false,
        }),
      )
    },
    [role, canFamilyMutate, ensureUserId],
  )

  const updateEvent = useCallback(
    async (id: string, payload: UpdateEventPayload, existing?: AppEvent): Promise<void> => {
      if (existing) assertCanEdit(existing)

      if (!isConfigured) {
        const list = readDemoEvents()
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
        persistDemoEvents(list)
        return
      }

      if (!canFamilyMutate && !existing) {
        throw new Error('Event context required for student update')
      }

      const data: Record<string, unknown> = {}
      if (payload.title !== undefined) data.title = payload.title
      if (payload.description !== undefined) data.description = payload.description
      if (payload.date) data.date = Timestamp.fromDate(payload.date)
      if (payload.duration !== undefined) data.duration = payload.duration
      if (payload.location !== undefined) data.location = payload.location
      if (payload.completed !== undefined) data.completed = payload.completed

      if (role === 'student') {
        data.category = 'student_personal'
        const ruFields = await buildEventRussianFields({
          title:       (payload.title as string | undefined) ?? existing?.title ?? '',
          description: (payload.description as string | undefined) ?? existing?.description ?? '',
          location:    (payload.location as string | undefined) ?? existing?.location,
        })
        Object.assign(data, ruFields)
      }

      await updateEventDocument(id, data)
    },
    [canFamilyMutate, role, assertCanEdit],
  )

  const deleteEvent = useCallback(
    async (id: string, existing?: AppEvent): Promise<void> => {
      if (existing) assertCanDelete(existing)

      if (!isConfigured) {
        const list = readDemoEvents()
        const ev   = list.find((e) => e.id === id)
        if (!ev) return
        if (!canFamilyMutate) assertCanDelete(ev)
        persistDemoEvents(list.filter((e) => e.id !== id))
        return
      }

      await deleteEventDocument(id)
    },
    [canFamilyMutate, assertCanDelete],
  )

  const toggleComplete = useCallback(
    async (event: AppEvent, completed: boolean): Promise<void> => {
      if (!canToggleEventComplete(role)) {
        throw new Error('Only students can change completion status')
      }

      const uid = userId || ensureUserId()
      const field = completionFieldForStudent(event, uid)
      if (!field) {
        throw new Error('You cannot change completion status for this event')
      }

      if (!isConfigured) {
        const list = readDemoEvents()
        const idx  = list.findIndex((e) => e.id === event.id)
        if (idx === -1) return
        list[idx] = {
          ...list[idx],
          [field]: completed,
          updatedAt: new Date(),
        }
        persistDemoEvents(list)
        return
      }

      await updateEventCompletion(event.id, field, completed)
    },
    [role, userId, ensureUserId],
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
