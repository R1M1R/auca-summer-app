/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>
}

precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()
void self.skipWaiting()
clientsClaim()

interface ReminderJob {
  id: string
  title: string
  body: string
  fireAt: number
}

const notifiedIds = new Set<string>()
let jobs: ReminderJob[] = []
const timers = new Map<string, ReturnType<typeof setTimeout>>()
let pollId: ReturnType<typeof setInterval> | null = null

function clearTimers(): void {
  for (const timer of timers.values()) clearTimeout(timer)
  timers.clear()
}

async function fireReminder(job: ReminderJob): Promise<void> {
  if (notifiedIds.has(job.id)) return
  notifiedIds.add(job.id)

  try {
    await self.registration.showNotification(job.title, {
      body: job.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `event-${job.id}`,
      data: { eventId: job.id, type: 'event_reminder' },
    })

    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    for (const client of clients) {
      client.postMessage({ type: 'REMINDER_FIRED', eventId: job.id })
    }
  } catch (err) {
    console.warn('[sw] showNotification failed', err)
  }
}

function scheduleJobs(): void {
  clearTimers()
  const now = Date.now()

  for (const job of jobs) {
    if (notifiedIds.has(job.id)) continue
    const delay = job.fireAt - now
    if (delay <= 0) {
      void fireReminder(job)
      continue
    }
    if (delay > 40 * 60_000) continue

    timers.set(
      job.id,
      setTimeout(() => {
        void fireReminder(job)
      }, delay),
    )
  }
}

function runPoll(): void {
  const now = Date.now()
  for (const job of jobs) {
    if (notifiedIds.has(job.id)) continue
    if (job.fireAt <= now + 1000) void fireReminder(job)
  }
}

function startPoll(): void {
  if (pollId) return
  pollId = setInterval(runPoll, 15_000)
}

function stopPoll(): void {
  if (!pollId) return
  clearInterval(pollId)
  pollId = null
}

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const data = event.data as {
    type?: string
    jobs?: ReminderJob[]
    notifiedIds?: string[]
  } | null

  if (!data?.type) return

  switch (data.type) {
    case 'SYNC_REMINDERS':
      jobs = Array.isArray(data.jobs) ? data.jobs : []
      if (Array.isArray(data.notifiedIds)) {
        notifiedIds.clear()
        for (const id of data.notifiedIds) notifiedIds.add(id)
      }
      scheduleJobs()
      startPoll()
      break
    case 'MARK_NOTIFIED':
      if (typeof (data as { eventId?: string }).eventId === 'string') {
        notifiedIds.add((data as { eventId: string }).eventId)
        const timer = timers.get((data as { eventId: string }).eventId)
        if (timer) clearTimeout(timer)
      }
      break
    case 'STOP_SCHEDULER':
      jobs = []
      clearTimers()
      stopPoll()
      break
    default:
      break
  }
})

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      if (list.length > 0) {
        return list[0].focus()
      }
      return self.clients.openWindow('/dashboard')
    }),
  )
})
