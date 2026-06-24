import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { sanitizeFirestoreData } from '@/lib/firestoreSanitize'
import {
  loadDemoEvents,
  saveDemoEvents,
  notifyDemoEventsUpdate,
  EVENTS_COLLECTION,
} from '@/lib/eventsData'
import type { AppEvent } from '@/types'

export { EVENTS_COLLECTION }

/**
 * Persists a new event document to Firestore.
 * Caller is responsible for building the payload (permissions, field names).
 */
export async function createEventDocument(data: Record<string, unknown>): Promise<void> {
  await addDoc(collection(db, EVENTS_COLLECTION), {
    ...sanitizeFirestoreData(data),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

/**
 * Partial update of an existing event document.
 */
export async function updateEventDocument(
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  await updateDoc(
    doc(db, EVENTS_COLLECTION, id),
    sanitizeFirestoreData({ ...data, updatedAt: serverTimestamp() }),
  )
}

/** Deletes an event document by id. */
export async function deleteEventDocument(id: string): Promise<void> {
  await deleteDoc(doc(db, EVENTS_COLLECTION, id))
}

/**
 * Updates completion fields on an event (student progress).
 * @param field - Firestore field name, e.g. `completed` or `studentCompleted`
 */
export async function updateEventCompletion(
  id: string,
  field: string,
  completed: boolean,
): Promise<void> {
  await updateDoc(doc(db, EVENTS_COLLECTION, id), {
    [field]:   completed,
    updatedAt: serverTimestamp(),
  })
}

/* ── Demo mode (localStorage) ─────────────────────────────────── */

/** Returns whether Firestore writes should use demo storage. */
export function isDemoEventsMode(): boolean {
  return !isConfigured
}

/** Replaces the full demo events list and notifies subscribers. */
export function persistDemoEvents(events: AppEvent[]): void {
  saveDemoEvents(events)
  notifyDemoEventsUpdate()
}

/** Reads the current demo events list. */
export function readDemoEvents(): AppEvent[] {
  return loadDemoEvents()
}
