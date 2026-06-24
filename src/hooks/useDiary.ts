/**
 * Public diary API for UI layers.
 */
export {
  useDiaryEntries,
  useDiaryMutations,
  toDateKey,
} from '@/hooks/useDiaryEntries'

import { useDiaryEntries, useDiaryMutations } from '@/hooks/useDiaryEntries'

/** Combined hook for diary screens. */
export function useDiary() {
  const { entries, loading, error: loadError } = useDiaryEntries()
  const { saveEntry, deleteEntry, saving, error: saveError } = useDiaryMutations()
  return {
    entries,
    loading,
    loadError,
    saveError,
    saveEntry,
    deleteEntry,
    saving,
  }
}
