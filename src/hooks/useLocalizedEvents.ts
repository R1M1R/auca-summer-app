import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { localizeEvent } from '@/lib/localizedContent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { AppEvent } from '@/types'

export function useLocalizedEvents(events: AppEvent[]): AppEvent[] {
  const role = useAppStore((s) => s.role)
  const lang = useAppLanguage()

  return useMemo(
    () => events.map((e) => localizeEvent(e, role, lang)),
    [events, role, lang],
  )
}
