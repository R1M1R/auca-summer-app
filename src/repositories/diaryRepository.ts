import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import {
  loadDemoDiary,
  notifyDemoDiaryUpdate,
  DIARY_COLLECTION,
} from '@/lib/diaryData'
import { DEMO_DIARY_KEY } from '@/lib/demoStorage'
import type { DiaryEntry, MoodLevel } from '@/types'

export { DIARY_COLLECTION }

export interface DiarySavePayload {
  dateKey: string
  date: Date
  textEn: string
  textRu: string
  mood: MoodLevel
}

/**
 * Upserts a diary entry in Firestore (document id = date key YYYY-MM-DD).
 */
export async function upsertDiaryEntry(payload: DiarySavePayload): Promise<void> {
  const ref = doc(db, DIARY_COLLECTION, payload.dateKey)
  const snap = await getDoc(ref)

  await setDoc(
    ref,
    {
      date:      Timestamp.fromDate(payload.date),
      text:      payload.textEn,
      text_en:   payload.textEn,
      text_ru:   payload.textRu,
      mood:      payload.mood,
      updatedAt: serverTimestamp(),
      ...(!snap.exists() && { createdAt: serverTimestamp() }),
    },
    { merge: true },
  )
}

/** Removes a diary entry from Firestore. */
export async function deleteDiaryEntry(id: string): Promise<void> {
  await deleteDoc(doc(db, DIARY_COLLECTION, id))
}

export function isDemoDiaryMode(): boolean {
  return !isConfigured
}

/** Persists diary entries to localStorage demo storage. */
export function persistDemoDiary(entries: DiaryEntry[]): void {
  localStorage.setItem(DEMO_DIARY_KEY, JSON.stringify(entries))
  notifyDemoDiaryUpdate()
}

export function readDemoDiary(): DiaryEntry[] {
  return loadDemoDiary()
}
