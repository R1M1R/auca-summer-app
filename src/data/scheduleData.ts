/**
 * Typed re-export of /scheduleData.json (project root).
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – root-level JSON, resolved by Vite at bundle time
import raw from '../../scheduleData.json'

export type RoutineEventType = 'academic' | 'break'
export type SpecialEventType = 'academic' | 'excursion' | 'leisure' | 'mandatory' | 'family'

export interface DailyRoutineItem {
  id:        string
  startTime: string
  endTime:   string
  titleRu:   string
  titleEn:   string
  type:      RoutineEventType
}

export interface SpecialEventItem {
  date:       string
  endDate?:   string
  startTime?: string
  endTime?:   string
  timeRu?:    string
  timeEn?:    string
  titleRu:    string
  titleEn:    string
  type:       SpecialEventType
}

export interface ScheduleData {
  dailyRoutine:  DailyRoutineItem[]
  specialEvents: SpecialEventItem[]
}

export const scheduleData = raw as ScheduleData
