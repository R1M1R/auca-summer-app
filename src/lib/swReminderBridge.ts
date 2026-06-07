import type { TFunction } from 'i18next'
import { sameDay } from '@/components/schedule/WeekCalendar'
import { REMINDER_WINDOW_MIN } from '@/lib/eventReminderLogic'
import { eventHasExactTime } from '@/lib/eventTime'
import { getNotifiedIdsForToday, hasNotifiedEvent } from '@/lib/notifiedEventsStorage'
import type { AppEvent } from '@/types'

export interface SwReminderJob {
  id: string
  title: string
  body: string
  fireAt: number
}

const SCHEDULE_BUFFER_MIN = 5

export function buildReminderJobs(events: AppEvent[], t: TFunction): SwReminderJob[] {
  const now = new Date()
  const nowMs = now.getTime()
  const jobs: SwReminderJob[] = []

  for (const event of events) {
    if (!eventHasExactTime(event) || event.completed) continue
    if (!sameDay(event.date, now)) continue
    if (hasNotifiedEvent(event.id)) continue

    const startMs = event.date.getTime()
    const diffMs = startMs - nowMs
    if (diffMs <= 0) continue
    if (diffMs > (REMINDER_WINDOW_MIN + SCHEDULE_BUFFER_MIN) * 60_000) continue

    const remindAt = startMs - REMINDER_WINDOW_MIN * 60_000

    jobs.push({
      id: event.id,
      title: t('notifications.reminderTitle'),
      body: t('notifications.reminderBody', { title: event.title }),
      fireAt: Math.max(remindAt, nowMs + 500),
    })
  }

  return jobs
}

export async function syncRemindersToServiceWorker(
  events: AppEvent[],
  t: TFunction,
): Promise<void> {
  if (!('serviceWorker' in navigator)) return

  try {
    const reg = await navigator.serviceWorker.ready
    const worker = reg.active ?? navigator.serviceWorker.controller
    if (!worker) return

    worker.postMessage({
      type: 'SYNC_REMINDERS',
      jobs: buildReminderJobs(events, t),
      notifiedIds: getNotifiedIdsForToday(),
    })
  } catch {
    /* SW not ready */
  }
}

export function stopServiceWorkerScheduler(): void {
  const worker = navigator.serviceWorker?.controller
  worker?.postMessage({ type: 'STOP_SCHEDULER' })
}

export function listenForSwReminderFired(
  onFired: (eventId: string) => void,
): () => void {
  if (!('serviceWorker' in navigator)) return () => {}

  const handler = (event: MessageEvent) => {
    const data = event.data as { type?: string; eventId?: string } | null
    if (data?.type === 'REMINDER_FIRED' && data.eventId) {
      onFired(data.eventId)
    }
  }

  navigator.serviceWorker.addEventListener('message', handler)
  return () => navigator.serviceWorker.removeEventListener('message', handler)
}
