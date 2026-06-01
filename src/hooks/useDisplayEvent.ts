import { useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { localizeEvent } from '@/lib/localizedContent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { AppEvent } from '@/types'

/** Picks titleEn/titleRu (and description/location) from current i18n.language. */
export function useDisplayEvent(event: AppEvent): AppEvent {
  const role = useAppStore((s) => s.role)
  const lang = useAppLanguage()

  return useMemo(
    () => localizeEvent(event, role, lang),
    [event, role, lang],
  )
}
