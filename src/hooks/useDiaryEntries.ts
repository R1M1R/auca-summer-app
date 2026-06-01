import { useState, useEffect, useCallback } from 'react'
import {
  collection, query, orderBy, limit,
  doc, getDoc, setDoc,
  onSnapshot, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { buildDiaryRussianFields } from '@/lib/dualSave'
import {
  DEMO_DIARY_KEY,
  notifyDemoUpdate,
  subscribeDemoStorage,
} from '@/lib/demoStorage'
import type { DiaryEntry, FirestoreDiaryEntry, MoodLevel } from '@/types'

const COLL = 'diary_entries'

export function toDateKey(d: Date): string {
  const y  = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${da}`
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

function parseEntry(id: string, raw: FirestoreDiaryEntry): DiaryEntry {
  return {
    id,
    date:      raw.date?.toDate      ? raw.date.toDate()      : new Date(),
    text:      raw.text,
    textRu:    raw.text_ru,
    mood:      raw.mood,
    createdAt: raw.createdAt?.toDate ? raw.createdAt.toDate() : null,
    updatedAt: raw.updatedAt?.toDate ? raw.updatedAt.toDate() : null,
  }
}

function loadDemoDiary(): DiaryEntry[] {
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

export function useDiaryEntries() {
  const [entries,  setEntries]  = useState<DiaryEntry[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured) {
      const refresh = () => setEntries(loadDemoDiary())
      refresh()
      setLoading(false)
      setError(null)
      return subscribeDemoStorage(DEMO_DIARY_KEY, refresh)
    }

    const q = query(
      collection(db, COLL),
      orderBy('date', 'desc'),
      limit(60),
    )

    const unsub = onSnapshot(
      q,
      (snap) => {
        setEntries(
          snap.docs.map((d) =>
            parseEntry(d.id, d.data() as FirestoreDiaryEntry),
          ),
        )
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('[useDiaryEntries]', err)
        setError(err.message)
        setLoading(false)
      },
    )

    return unsub
  }, [])

  return { entries, loading, error }
}

export function useDiaryMutations() {
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  const saveEntry = useCallback(
    async (date: Date, text: string, mood: MoodLevel): Promise<void> => {
      setSaving(true)
      setError(null)
      try {
        const trimmed = text.trim()
        const ruFields = await buildDiaryRussianFields(trimmed)
        const key = toDateKey(date)
        const payload = {
          date:      Timestamp.fromDate(startOfDay(date)),
          text:      trimmed,
          ...ruFields,
          mood,
          updatedAt: serverTimestamp(),
        }

        if (!isConfigured) {
          const stored = loadDemoDiary()
          const idx = stored.findIndex((e) => e.id === key)
          const entry: DiaryEntry = {
            id: key,
            date: startOfDay(date),
            text: trimmed,
            textRu: ruFields.text_ru,
            mood,
            createdAt: idx >= 0 ? stored[idx].createdAt : new Date(),
            updatedAt: new Date(),
          }
          if (idx >= 0) stored[idx] = entry
          else stored.unshift(entry)
          localStorage.setItem(DEMO_DIARY_KEY, JSON.stringify(stored))
          notifyDemoUpdate(DEMO_DIARY_KEY)
          return
        }

        const ref = doc(db, COLL, key)
        const snap = await getDoc(ref)

        await setDoc(ref, {
          ...payload,
          ...(!snap.exists() && { createdAt: serverTimestamp() }),
        }, { merge: true })
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
      notifyDemoUpdate(DEMO_DIARY_KEY)
      return
    }
    const { deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, COLL, id))
  }, [])

  return { saveEntry, deleteEntry, saving, error }
}
