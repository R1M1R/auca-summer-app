import { sameDay } from '@/components/schedule/WeekCalendar'
import { eventHasExactTime } from '@/lib/eventTime'
import type { AppEvent } from '@/types'

export const REMINDER_WINDOW_MIN = 30
export const REMINDER_CHECK_MS = 30_000

export const REMINDER_TITLE = 'Soon / Скоро'

export function minutesUntilStart(event: AppEvent, now: Date): number | null {
  if (!eventHasExactTime(event)) return null
  if (event.completed) return null
  if (!sameDay(event.date, now)) return null

  const diffMs = event.date.getTime() - now.getTime()
  if (diffMs <= 0) return null

  return Math.floor(diffMs / 60_000)
}

export function shouldRemindEvent(event: AppEvent, now: Date): boolean {
  const minutes = minutesUntilStart(event, now)
  if (minutes === null) return false
  return minutes <= REMINDER_WINDOW_MIN
}

export function formatEventTime(event: AppEvent, locale: string): string {
  return event.date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
}
