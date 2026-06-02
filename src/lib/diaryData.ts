import type { DiaryEntry, FirestoreDiaryEntry } from '@/types'
import { DEMO_DIARY_KEY, notifyDemoUpdate, subscribeDemoStorage } from '@/lib/demoStorage'

export const DIARY_COLLECTION = 'diary_entries'

export function parseDiaryEntry(id: string, raw: FirestoreDiaryEntry): DiaryEntry | null {
  if (!raw?.date?.toDate || !raw.mood) return null

  const entryDate = raw.date.toDate()
  if (Number.isNaN(entryDate.getTime())) return null

  return {
    id,
    date:      entryDate,
    text:      raw.text?.trim() || '',
    textRu:    raw.text_ru,
    mood:      raw.mood,
    createdAt: raw.createdAt?.toDate ? raw.createdAt.toDate() : null,
    updatedAt: raw.updatedAt?.toDate ? raw.updatedAt.toDate() : null,
  }
}

export function loadDemoDiary(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(DEMO_DIARY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as DiaryEntry[]
    return parsed.map((e) => ({
      ...e,
      date:      new Date(e.date),
      createdAt: e.createdAt ? new Date(e.createdAt) : null,
      updatedAt: e.updatedAt ? new Date(e.updatedAt) : null,
    }))
  } catch {
    return []
  }
}

export function notifyDemoDiaryUpdate(): void {
  notifyDemoUpdate(DEMO_DIARY_KEY)
}

export function subscribeDemoDiary(cb: () => void): () => void {
  return subscribeDemoStorage(DEMO_DIARY_KEY, cb)
}
