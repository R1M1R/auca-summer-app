import { useState, useEffect, useCallback } from 'react'
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, isConfigured } from '@/lib/firebase'
import { buildPreferencesRussianFields } from '@/lib/dualSave'
import {
  DEMO_PREFERENCES_KEY,
  notifyDemoUpdate,
  subscribeDemoStorage,
} from '@/lib/demoStorage'
import type { StudentPreferences } from '@/types'
import { DEFAULT_PREFERENCES } from '@/types'

const COLL = 'users'
const DOC  = 'student_profile'

function parsePreferences(d: Record<string, unknown>): StudentPreferences {
  return {
    allergies:          (d.allergies          as string[] | undefined) ?? [],
    allergies_ru:       (d.allergies_ru       as string[] | undefined) ?? [],
    favoriteFoods:      (d.favoriteFoods      as string[] | undefined) ?? [],
    favoriteFoods_ru:   (d.favoriteFoods_ru   as string[] | undefined) ?? [],
    favoriteDrinks:     (d.favoriteDrinks     as string[] | undefined) ?? [],
    favoriteDrinks_ru:  (d.favoriteDrinks_ru  as string[] | undefined) ?? [],
    dislikes:           (d.dislikes           as string[] | undefined) ?? [],
    dislikes_ru:        (d.dislikes_ru        as string[] | undefined) ?? [],
    wishes:             (d.wishes             as string   | undefined) ?? '',
    wishes_ru:          (d.wishes_ru          as string   | undefined) ?? '',
    dietaryNotes:       (d.dietaryNotes       as string   | undefined) ?? '',
    dietaryNotes_ru:    (d.dietaryNotes_ru    as string   | undefined) ?? '',
  }
}

function loadDemoPreferences(): StudentPreferences {
  try {
    const raw = localStorage.getItem(DEMO_PREFERENCES_KEY)
    if (!raw) return DEFAULT_PREFERENCES
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) as StudentPreferences }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<StudentPreferences>(DEFAULT_PREFERENCES)
  const [loading,     setLoading]     = useState(true)
  const [saving,      setSaving]      = useState(false)
  const [lastSaved,   setLastSaved]   = useState<Date | null>(null)
  const [error,       setError]       = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured) {
      const refresh = () => setPreferences(loadDemoPreferences())
      refresh()
      setLoading(false)
      setError(null)
      return subscribeDemoStorage(DEMO_PREFERENCES_KEY, refresh)
    }

    const ref = doc(db, COLL, DOC)
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setPreferences(parsePreferences(snap.data()))
          if (snap.data().preferencesUpdatedAt?.toDate) {
            setLastSaved(snap.data().preferencesUpdatedAt.toDate())
          }
        } else {
          setPreferences(DEFAULT_PREFERENCES)
          setLastSaved(null)
        }
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('[usePreferences]', err)
        setError(err.message)
        setLoading(false)
      },
    )
    return unsub
  }, [])

  const savePreferences = useCallback(async (prefs: StudentPreferences): Promise<void> => {
    setSaving(true)
    setError(null)
    try {
      const ruFields = await buildPreferencesRussianFields({
        allergies:      prefs.allergies,
        favoriteFoods:  prefs.favoriteFoods,
        favoriteDrinks: prefs.favoriteDrinks,
        dislikes:       prefs.dislikes,
        wishes:         prefs.wishes,
        dietaryNotes:   prefs.dietaryNotes,
      })

      const payload = {
        allergies:            prefs.allergies,
        favoriteFoods:        prefs.favoriteFoods,
        favoriteDrinks:       prefs.favoriteDrinks,
        dislikes:             prefs.dislikes,
        wishes:               prefs.wishes,
        dietaryNotes:         prefs.dietaryNotes,
        ...ruFields,
        preferencesUpdatedAt: serverTimestamp(),
      }

      if (!isConfigured) {
        const merged = { ...prefs, ...ruFields }
        localStorage.setItem(DEMO_PREFERENCES_KEY, JSON.stringify(merged))
        setPreferences(merged)
        setLastSaved(new Date())
        notifyDemoUpdate(DEMO_PREFERENCES_KEY)
        return
      }

      await setDoc(doc(db, COLL, DOC), payload, { merge: true })
      setLastSaved(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
      throw e
    } finally {
      setSaving(false)
    }
  }, [])

  return { preferences, loading, saving, lastSaved, error, savePreferences }
}
