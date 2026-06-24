import { useState, useCallback } from 'react'
import { isConfigured } from '@/lib/firebase'
import { useDiaryStore } from '@/store/useDiaryStore'
import { buildDiaryBilingualFields } from '@/lib/dualSave'
import {
  upsertDiaryEntry,
  deleteDiaryEntry,
  persistDemoDiary,
  readDemoDiary,
} from '@/repositories/diaryRepository'
import type { DiaryEntry, MoodLevel } from '@/types'

/** Formats a date as YYYY-MM-DD (Firestore document key). */
export function toDateKey(d: Date): string {
  const y  = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${da}`
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

/** Read-only diary entries from the global store. */
export function useDiaryEntries() {
  const entries = useDiaryStore((s) => s.entries)
  const loading = useDiaryStore((s) => s.loading)
  const error   = useDiaryStore((s) => s.error)
  return { entries, loading, error }
}

/** Diary write operations with bilingual auto-translation. */
export function useDiaryMutations() {
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  const saveEntry = useCallback(
    async (
      date: Date,
      text: string,
      mood: MoodLevel,
    ): Promise<{ translationOk: boolean }> => {
      setSaving(true)
      setError(null)
      try {
        const trimmed = text.trim()
        const bilingual = await buildDiaryBilingualFields(trimmed)
        const key = toDateKey(date)
        const dayStart = startOfDay(date)

        if (!isConfigured) {
          const stored = readDemoDiary()
          const idx = stored.findIndex((e) => e.id === key)
          const entry: DiaryEntry = {
            id: key,
            date: dayStart,
            text: bilingual.textEn,
            textEn: bilingual.textEn,
            textRu: bilingual.textRu,
            mood,
            createdAt: idx >= 0 ? stored[idx].createdAt : new Date(),
            updatedAt: new Date(),
          }
          if (idx >= 0) stored[idx] = entry
          else stored.unshift(entry)
          persistDemoDiary(stored)
          return { translationOk: bilingual.translationOk }
        }

        await upsertDiaryEntry({
          dateKey: key,
          date: dayStart,
          textEn: bilingual.textEn,
          textRu: bilingual.textRu,
          mood,
        })
        return { translationOk: bilingual.translationOk }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Save failed'
        setError(msg)
        throw e
      } finally {
        setSaving(false)
      }
    },
    [],
  )

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    if (!isConfigured) {
      persistDemoDiary(readDemoDiary().filter((e) => e.id !== id))
      return
    }
    await deleteDiaryEntry(id)
  }, [])

  return { saveEntry, deleteEntry, saving, error }
}
