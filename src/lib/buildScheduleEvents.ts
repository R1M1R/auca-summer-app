import { scheduleData } from '@/data/scheduleData'
import type { DailyRoutineItem, SpecialEventItem } from '@/data/scheduleData'
import type { AppEvent, EventCategory } from '@/types'
import { ADMIN_CREATOR } from '@/types'

export const PROGRAM_START = new Date(2026, 5, 5)
export const PROGRAM_END   = new Date(2026, 7, 1)

/** Weekday with no classes — arrival day (special event only). */
export const ARRIVAL_DAY_ISO = '2026-06-05'

export function formatDayISO(day: Date): string {
  const y = day.getFullYear()
  const m = String(day.getMonth() + 1).padStart(2, '0')
  const d = String(day.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Skip dailyRoutine on June 5, 2026 (arrival — specialEvents only). */
export function shouldSkipDailyRoutine(day: Date): boolean {
  return formatDayISO(day) === ARRIVAL_DAY_ISO
}

export function countRoutineEventSlots(): number {
  let count = 0
  for (const day of generateWeekdays(PROGRAM_START, PROGRAM_END)) {
    if (!shouldSkipDailyRoutine(day)) {
      count += scheduleData.dailyRoutine.length
    }
  }
  return count
}

const TYPE_MAP: Record<string, EventCategory> = {
  academic:  'academic',
  excursion: 'excursion',
  leisure:   'leisure',
  break:     'leisure',
  mandatory: 'mandatory',
  family:    'family',
}

export function generateWeekdays(start: Date, end: Date): Date[] {
  const days: Date[] = []
  const cur = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  while (cur < end) {
    const dow = cur.getDay()
    if (dow !== 0 && dow !== 6) days.push(new Date(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

function parseTime(t: string): { h: number; m: number } {
  const [h, m] = t.split(':').map(Number)
  return { h, m }
}

function buildDate(base: Date, timeStr: string): Date {
  const { h, m } = parseTime(timeStr)
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, 0, 0)
}

function parseDateOnly(dateStr: string, hour = 12, minute = 0): Date {
  const [yr, mo, da] = dateStr.split('-').map(Number)
  return new Date(yr, mo - 1, da, hour, minute, 0, 0)
}

function parseSpecialDate(dateStr: string, timeStr: string): Date {
  const [yr, mo, da] = dateStr.split('-').map(Number)
  const { h, m } = parseTime(timeStr)
  return new Date(yr, mo - 1, da, h, m, 0, 0)
}

function calcDuration(start: string, end: string): number {
  const s = parseTime(start)
  const e = parseTime(end)
  return (e.h * 60 + e.m) - (s.h * 60 + s.m)
}

function calcMultiDayDuration(start: Date, endDateStr: string, endHour = 23, endMin = 59): number {
  const [ey, em, ed] = endDateStr.split('-').map(Number)
  const end = new Date(ey, em - 1, ed, endHour, endMin, 0)
  return Math.max(60, Math.round((end.getTime() - start.getTime()) / 60_000))
}

let _idSeq = 0
function nextId(prefix: string): string {
  _idSeq += 1
  return `${prefix}-${_idSeq}`
}

export function buildRoutineEvent(day: Date, item: DailyRoutineItem): AppEvent {
  const now = new Date()
  const date = buildDate(day, item.startTime)
  return {
    id:           nextId('routine'),
    title:        item.titleEn,
    titleRu:      item.titleRu,
    description:  '',
    descriptionRu: '',
    date,
    duration:     calcDuration(item.startTime, item.endTime),
    category:     TYPE_MAP[item.type] ?? 'academic',
    createdBy:    ADMIN_CREATOR,
    isEditable:   false,
    completed:    false,
    hasExactTime: true,
    createdAt:    now,
    updatedAt:    now,
  }
}

export function buildSpecialEvent(item: SpecialEventItem): AppEvent {
  const now = new Date()
  const hasStart = Boolean(item.startTime)

  let date: Date
  let duration = 60
  let hasExactTime = true

  if (hasStart) {
    date = parseSpecialDate(item.date, item.startTime!)
    if (item.endTime) {
      duration = calcDuration(item.startTime!, item.endTime)
    } else if (item.endDate) {
      duration = calcMultiDayDuration(date, item.endDate)
    }
  } else {
    date = parseDateOnly(item.date, 12, 0)
    hasExactTime = false
    if (item.endDate) {
      duration = calcMultiDayDuration(date, item.endDate)
    }
  }

  return {
    id:            nextId('special'),
    title:         item.titleEn,
    titleRu:       item.titleRu,
    description:   '',
    descriptionRu: '',
    date,
    duration,
    category:      TYPE_MAP[item.type] ?? 'personal',
    createdBy:     ADMIN_CREATOR,
    isEditable:    false,
    completed:     false,
    hasExactTime,
    timeRu:        item.timeRu,
    timeEn:        item.timeEn,
    createdAt:     now,
    updatedAt:     now,
  }
}

/** Build full program schedule for demo mode (mirrors DataImporter logic). */
export function buildEventsFromSchedule(): AppEvent[] {
  _idSeq = 0
  const events: AppEvent[] = []

  for (const day of generateWeekdays(PROGRAM_START, PROGRAM_END)) {
    if (shouldSkipDailyRoutine(day)) continue
    for (const item of scheduleData.dailyRoutine) {
      events.push(buildRoutineEvent(day, item))
    }
  }

  for (const item of scheduleData.specialEvents) {
    events.push(buildSpecialEvent(item))
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime())
}
