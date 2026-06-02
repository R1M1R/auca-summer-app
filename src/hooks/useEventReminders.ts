import { useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { useEvents } from '@/hooks/useEvents'
import { useLocalizedEvents } from '@/hooks/useLocalizedEvents'
import { sameDay } from '@/components/schedule/WeekCalendar'
import { eventHasExactTime } from '@/lib/eventTime'
import { showBrowserNotification } from '@/lib/browserNotifications'
import { hasNotifiedEvent, markEventNotified } from '@/lib/notifiedEventsStorage'
import type { AppEvent } from '@/types'

const CHECK_MS = 60_000
const REMINDER_WINDOW_MIN = 30

const NOTIFY_TITLE = 'Soon / Скоро'

function minutesUntilStart(event: AppEvent, now: Date): number | null {
  if (!eventHasExactTime(event)) return null
  if (event.completed) return null
  if (!sameDay(event.date, now)) return null

  const diffMs = event.date.getTime() - now.getTime()
  if (diffMs <= 0) return null

  return Math.floor(diffMs / 60_000)
}

function shouldRemind(event: AppEvent, now: Date): boolean {
  const minutes = minutesUntilStart(event, now)
  if (minutes === null) return false
  return minutes <= REMINDER_WINDOW_MIN
}

export function useEventReminders(): void {
  const { role } = useApp()
  const { events: rawEvents } = useEvents()
  const events = useLocalizedEvents(rawEvents)

  useEffect(() => {
    if (role !== 'student') return

    const runCheck = () => {
      const now = new Date()

      for (const event of events) {
        if (!shouldRemind(event, now)) continue
        if (hasNotifiedEvent(event.id)) continue

        markEventNotified(event.id)
        void showBrowserNotification(NOTIFY_TITLE, {
          body: event.title,
          tag:  `event-${event.id}`,
          data: { eventId: event.id, type: 'event_reminder' },
        })
      }
    }

    runCheck()
    const id = window.setInterval(runCheck, CHECK_MS)
    return () => window.clearInterval(id)
  }, [role, events])
}
