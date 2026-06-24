import {
  GraduationCap, Map, Coffee, Heart, Star, Users, Zap,
  BookUser, ShieldAlert,
} from 'lucide-react'
import type { EventCategory } from '@/types'

export interface EventCategoryVisual {
  gradient:  string
  lightBg:   string
  border:    string
  textColor: string
  Icon:      React.ElementType
  dot:       string
}

/** Full visual config for timeline event cards. */
export const EVENT_CATEGORY_VISUALS: Record<EventCategory, EventCategoryVisual> = {
  academic: {
    gradient:  'from-indigo-500 to-primary-600',
    lightBg:   'bg-indigo-50/80 dark:bg-indigo-950/30',
    border:    'border-indigo-200/70 dark:border-indigo-800/40',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    Icon:      GraduationCap,
    dot:       'bg-indigo-500',
  },
  excursion: {
    gradient:  'from-emerald-500 to-teal-600',
    lightBg:   'bg-emerald-50/80 dark:bg-emerald-950/30',
    border:    'border-emerald-200/70 dark:border-emerald-800/40',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    Icon:      Map,
    dot:       'bg-emerald-500',
  },
  mandatory: {
    gradient:  'from-orange-500 to-red-600',
    lightBg:   'bg-orange-50/80 dark:bg-orange-950/30',
    border:    'border-orange-200/70 dark:border-orange-800/40',
    textColor: 'text-orange-600 dark:text-orange-400',
    Icon:      ShieldAlert,
    dot:       'bg-orange-500',
  },
  leisure: {
    gradient:  'from-amber-400 to-orange-500',
    lightBg:   'bg-amber-50/80 dark:bg-amber-950/30',
    border:    'border-amber-200/70 dark:border-amber-800/40',
    textColor: 'text-amber-600 dark:text-amber-400',
    Icon:      Coffee,
    dot:       'bg-amber-400',
  },
  family: {
    gradient:  'from-rose-500 to-pink-600',
    lightBg:   'bg-rose-50/80 dark:bg-rose-950/30',
    border:    'border-rose-200/70 dark:border-rose-800/40',
    textColor: 'text-rose-600 dark:text-rose-400',
    Icon:      Heart,
    dot:       'bg-rose-500',
  },
  social: {
    gradient:  'from-violet-500 to-purple-600',
    lightBg:   'bg-violet-50/80 dark:bg-violet-950/30',
    border:    'border-violet-200/70 dark:border-violet-800/40',
    textColor: 'text-violet-600 dark:text-violet-400',
    Icon:      Users,
    dot:       'bg-violet-500',
  },
  personal: {
    gradient:  'from-cyan-500 to-sky-600',
    lightBg:   'bg-cyan-50/80 dark:bg-cyan-950/30',
    border:    'border-cyan-200/70 dark:border-cyan-800/40',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    Icon:      Star,
    dot:       'bg-cyan-500',
  },
  activity: {
    gradient:  'from-lime-500 to-green-600',
    lightBg:   'bg-lime-50/80 dark:bg-lime-950/30',
    border:    'border-lime-200/70 dark:border-lime-800/40',
    textColor: 'text-lime-600 dark:text-lime-400',
    Icon:      Zap,
    dot:       'bg-lime-500',
  },
  student_personal: {
    gradient:  'from-fuchsia-500 to-violet-600',
    lightBg:   'bg-fuchsia-50/90 dark:bg-fuchsia-950/40',
    border:    'border-fuchsia-300/80 dark:border-fuchsia-700/50',
    textColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    Icon:      BookUser,
    dot:       'bg-fuchsia-500',
  },
}

export function getEventCategoryVisual(category: EventCategory): EventCategoryVisual {
  return EVENT_CATEGORY_VISUALS[category] ?? EVENT_CATEGORY_VISUALS.personal
}

/** Category picker options for host-family event modal. */
export const HOST_EVENT_CATEGORIES = (
  Object.entries(EVENT_CATEGORY_VISUALS) as [EventCategory, EventCategoryVisual][]
)
  .filter(([cat]) => cat !== 'student_personal')
  .map(([value, v]) => ({ value, color: v.gradient, Icon: v.Icon }))

export const STUDENT_EVENT_CATEGORY = {
  value: 'student_personal' as const,
  color: EVENT_CATEGORY_VISUALS.student_personal.gradient,
  Icon:  BookUser,
}

export const EVENT_DURATIONS = [30, 60, 90, 120, 180, 240, 480] as const

export function formatDurationShort(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const r = minutes % 60
  if (h === 0) return `${r}m`
  if (r === 0) return `${h}h`
  return `${h}h${r}m`
}

export function toLocalDateStr(d: Date): string {
  const y  = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${da}`
}

export function toLocalTimeStr(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
