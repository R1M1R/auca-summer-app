import { useState, useCallback } from 'react'
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { useDiaryStore } from '@/store/useDiaryStore'
import { buildDiaryBilingualFields } from '@/lib/dualSave'
import {
  loadDemoDiary,
  notifyDemoDiaryUpdate,
  DIARY_COLLECTION,
} from '@/lib/diaryData'
import { DEMO_DIARY_KEY } from '@/lib/demoStorage'
import type { DiaryEntry, MoodLevel } from '@/types'

export function toDateKey(d: Date): string {
  const y  = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${da}`
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

export function useDiaryEntries() {
  const entries = useDiaryStore((s) => s.entries)
  const loading = useDiaryStore((s) => s.loading)
  const error   = useDiaryStore((s) => s.error)
  return { entries, loading, error }
}

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
        const payload = {
          date:      Timestamp.fromDate(startOfDay(date)),
          text:      bilingual.textEn,
          text_en:   bilingual.textEn,
          text_ru:   bilingual.textRu,
          mood,
          updatedAt: serverTimestamp(),
        }

        if (!isConfigured) {
          const stored = loadDemoDiary()
          const idx = stored.findIndex((e) => e.id === key)
          const entry: DiaryEntry = {
            id: key,
            date: startOfDay(date),
            text: bilingual.textEn,
            textEn: bilingual.textEn,
            textRu: bilingual.textRu,
            mood,
            createdAt: idx >= 0 ? stored[idx].createdAt : new Date(),
            updatedAt: new Date(),
          }
          if (idx >= 0) stored[idx] = entry
          else stored.unshift(entry)
          localStorage.setItem(DEMO_DIARY_KEY, JSON.stringify(stored))
          notifyDemoDiaryUpdate()
          return { translationOk: bilingual.translationOk }
        }

        const ref = doc(db, DIARY_COLLECTION, key)
        const snap = await getDoc(ref)

        await setDoc(ref, {
          ...payload,
          ...(!snap.exists() && { createdAt: serverTimestamp() }),
        }, { merge: true })
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
      const stored = loadDemoDiary().filter((e) => e.id !== id)
      localStorage.setItem(DEMO_DIARY_KEY, JSON.stringify(stored))
      notifyDemoDiaryUpdate()
      return
    }
    const { deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, DIARY_COLLECTION, id))
  }, [])

  return { saveEntry, deleteEntry, saving, error }
}
