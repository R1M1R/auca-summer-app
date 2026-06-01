import type { AppEvent, FirestoreEvent } from '@/types'
import { ADMIN_CREATOR } from '@/types'
import { eventHasExactTime } from '@/lib/eventTime'
import { notifyDemoUpdate, subscribeDemoStorage } from '@/lib/demoStorage'
import { buildEventsFromSchedule } from '@/lib/buildScheduleEvents'

export const EVENTS_COLLECTION = 'events'
export const DEMO_EVENTS_KEY = 'app_demo_events_v3'

export function fromFirestore(id: string, raw: FirestoreEvent): AppEvent {
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
    hasExactTime:    eventHasExactTime({
      hasExactTime: raw.hasExactTime,
      timeRu:       raw.time_ru,
      timeEn:       raw.time_en,
    }),
    category:        raw.category,
    createdBy:       legacyHost ? ADMIN_CREATOR : raw.createdBy,
    isEditable:      raw.isEditable ?? (!legacyHost && raw.createdBy !== ADMIN_CREATOR),
    completed:       raw.completed ?? false,
    createdAt:       raw.createdAt?.toDate?.() ?? new Date(),
    updatedAt:       raw.updatedAt?.toDate?.() ?? new Date(),
  }
}

export function normalizeAppEvent(e: AppEvent): AppEvent {
  const legacyHost = e.createdBy === 'host'
  return {
    ...e,
    createdBy:  legacyHost ? ADMIN_CREATOR : e.createdBy,
    isEditable: e.isEditable ?? (e.category === 'student_personal' && !legacyHost),
  }
}

export function loadDemoEvents(): AppEvent[] {
  try {
    const raw = localStorage.getItem(DEMO_EVENTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AppEvent[]
      return parsed
        .map((e) => ({
          ...e,
          date:      new Date(e.date),
          createdAt: new Date(e.createdAt),
          updatedAt: new Date(e.updatedAt),
        }))
        .map(normalizeAppEvent)
    }
  } catch {
    /* ignore */
  }
  return buildEventsFromSchedule().map(normalizeAppEvent)
}

export function saveDemoEvents(events: AppEvent[]): void {
  localStorage.setItem(DEMO_EVENTS_KEY, JSON.stringify(events))
}

export function notifyDemoEventsUpdate(): void {
  notifyDemoUpdate(DEMO_EVENTS_KEY)
}

export function subscribeDemoEvents(cb: () => void): () => void {
  return subscribeDemoStorage(DEMO_EVENTS_KEY, cb)
}
