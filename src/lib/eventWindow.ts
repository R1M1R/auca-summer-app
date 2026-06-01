/** Calendar-day window: today 00:00 through today + `days` (inclusive span). */
export function isWithinNextDays(date: Date, days = 7, now = new Date()): boolean {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = new Date(start)
  end.setDate(end.getDate() + days)
  end.setHours(23, 59, 59, 999)
  const eventDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  eventDay.setHours(12, 0, 0, 0)
  return eventDay >= start && eventDay <= end
}
