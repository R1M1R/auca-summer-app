const STORAGE_KEY = 'timeflow_notified_events'

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function read(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, string[]>
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function write(data: Record<string, string[]>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* quota / private mode */
  }
}

export function hasNotifiedEvent(eventId: string): boolean {
  const day = todayKey()
  return read()[day]?.includes(eventId) ?? false
}

export function markEventNotified(eventId: string): void {
  const day = todayKey()
  const data = read()
  const list = data[day] ?? []
  if (list.includes(eventId)) return
  data[day] = [...list, eventId]
  write(data)
}

export function getNotifiedIdsForToday(): string[] {
  const day = todayKey()
  return read()[day] ?? []
}
