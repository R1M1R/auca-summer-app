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

/* ── Diary background watch (family role) ───────────────────── */

interface DiaryWatchEntry {
  id:        string
  updatedAt: number
}

interface DiaryWatchState {
  projectId:    string
  apiKey:       string
  sessionStart: number
  known:        Map<string, number>
  notifyTitle:  string
  notifyBody:   string
}

let diaryWatch: DiaryWatchState | null = null
let diaryPollId: ReturnType<typeof setInterval> | null = null
const diaryNotifiedKeys = new Set<string>()

function parseFirestoreTimestamp(fields: Record<string, unknown> | undefined): number {
  if (!fields?.updatedAt) return 0
  const ts = fields.updatedAt as { timestampValue?: string }
  if (!ts.timestampValue) return 0
  return new Date(ts.timestampValue).getTime()
}

async function pollDiaryEntries(): Promise<void> {
  if (!diaryWatch) return

  const { projectId, apiKey, sessionStart, notifyTitle, notifyBody } = diaryWatch
  const url =
    `https://firestore.googleapis.com/v1/projects/${projectId}` +
    `/databases/(default)/documents/diary_entries?key=${encodeURIComponent(apiKey)}&pageSize=30`

  try {
    const res = await fetch(url)
    if (!res.ok) return

    const data = (await res.json()) as {
      documents?: Array<{
        name?: string
        fields?: Record<string, unknown>
      }>
    }

    for (const doc of data.documents ?? []) {
      const id = doc.name?.split('/').pop()
      if (!id) continue

      const updatedAt = parseFirestoreTimestamp(doc.fields)
      const prevUpdated = diaryWatch.known.get(id) ?? 0
      const notifyKey = `${id}:${updatedAt}`

      if (diaryNotifiedKeys.has(notifyKey)) continue

      const isNew = !diaryWatch.known.has(id)
      const isUpdated = updatedAt > prevUpdated && updatedAt >= sessionStart

      if (!isNew && !isUpdated) continue
      if (updatedAt > 0 && updatedAt < sessionStart && isNew) continue

      diaryNotifiedKeys.add(notifyKey)
      diaryWatch.known.set(id, updatedAt)

      await self.registration.showNotification(notifyTitle, {
        body:  notifyBody,
        icon:  '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag:   `diary-${id}`,
        data:  { entryId: id, type: 'diary_entry' },
      })
    }
  } catch (err) {
    console.warn('[sw] diary poll failed', err)
  }
}

function startDiaryPoll(intervalMs: number): void {
  if (diaryPollId) return
  void pollDiaryEntries()
  diaryPollId = setInterval(() => { void pollDiaryEntries() }, intervalMs)
}

function stopDiaryPoll(): void {
  if (!diaryPollId) return
  clearInterval(diaryPollId)
  diaryPollId = null
}

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  const data = event.data as {
    type?: string
    jobs?: ReminderJob[]
    notifiedIds?: string[]
    config?: {
      projectId:     string
      apiKey:        string
      sessionStart:  number
      knownEntries:  DiaryWatchEntry[]
      notifyTitle:   string
      notifyBody:    string
    }
    pollMs?: number
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
    case 'DIARY_WATCH_START': {
      const cfg = data.config
      if (!cfg?.projectId || !cfg.apiKey) break
      const known = new Map<string, number>()
      for (const entry of cfg.knownEntries ?? []) {
        known.set(entry.id, entry.updatedAt)
      }
      diaryWatch = {
        projectId:    cfg.projectId,
        apiKey:       cfg.apiKey,
        sessionStart: cfg.sessionStart,
        known,
        notifyTitle:  cfg.notifyTitle,
        notifyBody:   cfg.notifyBody,
      }
      startDiaryPoll(typeof data.pollMs === 'number' ? data.pollMs : 180_000)
      break
    }
    case 'DIARY_WATCH_STOP':
      diaryWatch = null
      stopDiaryPoll()
      break
    default:
      break
  }
})

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close()
  const notifType = (event.notification.data as { type?: string } | undefined)?.type
  const targetPath =
    notifType === 'diary_entry' ? '/diary'
    : notifType === 'student_prefs' ? '/diary'
    : notifType === 'student_activity' ? '/schedule'
    : '/dashboard'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const match = list.find((c) => 'focus' in c)
      if (match && 'focus' in match) {
        return (match as WindowClient).focus()
      }
      return self.clients.openWindow(targetPath)
    }),
  )
})
