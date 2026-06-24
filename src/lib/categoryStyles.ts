import type { EventCategory } from '@/types'

/** Tailwind classes for category pills — shared across Dashboard, EventCard, etc. */
export const CATEGORY_PILL_STYLES: Record<EventCategory, string> = {
  academic:         'bg-indigo-100  text-indigo-700  dark:bg-indigo-900/40  dark:text-indigo-300',
  excursion:        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  mandatory:        'bg-orange-100  text-orange-700  dark:bg-orange-900/40  dark:text-orange-300',
  leisure:          'bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-300',
  family:           'bg-rose-100    text-rose-700    dark:bg-rose-900/40    dark:text-rose-300',
  social:           'bg-violet-100  text-violet-700  dark:bg-violet-900/40  dark:text-violet-300',
  personal:         'bg-cyan-100    text-cyan-700    dark:bg-cyan-900/40    dark:text-cyan-300',
  activity:         'bg-lime-100    text-lime-700    dark:bg-lime-900/40    dark:text-lime-300',
  student_personal: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
}

/** Returns pill className for a category, with a safe fallback. */
export function getCategoryPillClass(category: EventCategory): string {
  return CATEGORY_PILL_STYLES[category] ?? CATEGORY_PILL_STYLES.personal
}
