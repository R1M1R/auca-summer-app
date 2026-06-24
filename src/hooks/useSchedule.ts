/**
 * Public schedule API for UI layers.
 * Thin re-export — keeps Firebase details in useEvents + repositories.
 */
export { useEvents, useEventMutations } from '@/hooks/useEvents'

import { useEvents, useEventMutations } from '@/hooks/useEvents'

/**
 * Combined hook for schedule screens: read events + mutations in one call.
 */
export function useSchedule() {
  const { events, loading, error } = useEvents()
  const mutations = useEventMutations()
  return {
    events,
    loading,
    error,
    ...mutations,
  }
}
