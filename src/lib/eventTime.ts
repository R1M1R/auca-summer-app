/** True when the event should show a clock time from `date`, not timeRu/timeEn. */
export function eventHasExactTime(event: {
  hasExactTime?: boolean
  timeRu?: string
  timeEn?: string
}): boolean {
  if (event.hasExactTime === false) return false
  if (event.hasExactTime === true) return true
  return !(event.timeRu?.trim() || event.timeEn?.trim())
}
