import type { TFunction } from 'i18next'
import type { EventCategory } from '@/types'

/** Localized label for an event category pill. */
export function categoryLabel(t: TFunction, category: EventCategory): string {
  return t(`categories.${category}`)
}
