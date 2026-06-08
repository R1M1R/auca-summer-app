import type { Timestamp } from 'firebase/firestore'

/* ── Roles ──────────────────────────────────────────────────── */
export type UserRole = 'student' | 'family' | null

/* ── Language ───────────────────────────────────────────────── */
export type AppLanguage = 'en' | 'ru'

/** Program / admin-owned events cannot be edited by students */
export const ADMIN_CREATOR = 'admin' as const

/* ── Event categories ───────────────────────────────────────── */
export type EventCategory =
  | 'academic'
  | 'excursion'
  | 'mandatory'
  | 'family'
  | 'student_personal'  // student's own plan
  | 'leisure'
  | 'social'
  | 'personal'
  | 'activity'

/** Categories students must never edit or delete */
export const STUDENT_PROTECTED_CATEGORIES: readonly EventCategory[] = [
  'academic',
  'excursion',
  'mandatory',
  'family',
] as const

/* ── Firestore event ─────────────────────────────────────────── */
export interface FirestoreEvent {
  title:           string
  title_ru?:       string
  description:     string
  description_ru?: string
  date:            Timestamp
  duration?:       number
  location?:       string
  location_ru?:    string
  time_ru?:        string
  time_en?:        string
  hasExactTime?:   boolean
  category:        EventCategory
  /** User id, 'admin', or legacy 'host' */
  createdBy:       string
  isEditable:      boolean
  completed:       boolean
  createdAt:       Timestamp
  updatedAt:       Timestamp
}

/* ── App event ───────────────────────────────────────────────── */
export interface AppEvent {
  id:              string
  title:           string
  titleRu?:        string
  description:     string
  descriptionRu?:  string
  date:            Date
  duration?:       number
  location?:       string
  locationRu?:     string
  /** Shown when hasExactTime is false (e.g. "Around noon") */
  timeRu?:         string
  timeEn?:         string
  /** False → display timeRu/timeEn instead of clock time */
  hasExactTime?:   boolean
  /** Localized TBD label (set by localizeEvent) */
  timeDisplay?:    string
  category:        EventCategory
  createdBy:       string
  isEditable:      boolean
  completed:       boolean
  createdAt:       Date
  updatedAt:       Date
}

export type NewEventPayload = Omit<
  AppEvent,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'completed' | 'isEditable'
>

export type UpdateEventPayload = Partial<
  Omit<AppEvent, 'id' | 'createdAt' | 'createdBy' | 'isEditable'>
>

/* ── Program progress ────────────────────────────────────────── */
export interface ProgramProgress {
  startDate:        Date
  endDate:          Date
  totalDays:        number
  elapsedDays:      number
  remainingDays:    number
  percentage:       number
  isStarted:        boolean
  isCompleted:      boolean
  daysToStart:      number
  currentMilestone: number
  nextMilestone:    number | null
}

/* ── Gamification ────────────────────────────────────────────── */
export interface StudentStats {
  tasksCompleted: number
  totalXP:        number
  streak:         number
  lastActiveDate: string | null
}

/* ── Student Preferences ─────────────────────────────────────── */
export interface StudentPreferences {
  allergies:          string[]
  allergies_ru?:      string[]
  favoriteFoods:      string[]
  favoriteFoods_ru?:  string[]
  favoriteDrinks:     string[]
  favoriteDrinks_ru?: string[]
  dislikes:           string[]
  dislikes_ru?:       string[]
  wishes:             string
  wishes_ru?:         string
  dietaryNotes:       string
  dietaryNotes_ru?:   string
}

export const DEFAULT_PREFERENCES: StudentPreferences = {
  allergies:      [],
  favoriteFoods:  [],
  favoriteDrinks: [],
  dislikes:       [],
  wishes:         '',
  dietaryNotes:   '',
}

/* ── Diary ───────────────────────────────────────────────────── */
export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface MoodConfig {
  level:     MoodLevel
  emoji:     string
  label:     string
  gradient:  string
  bg:        string
}

export const MOOD_CONFIG: MoodConfig[] = [
  { level: 1, emoji: '😔', label: 'Hard day',  gradient: 'from-slate-400 to-slate-500',   bg: 'bg-slate-100  dark:bg-slate-800'   },
  { level: 2, emoji: '😐', label: 'Okay',      gradient: 'from-amber-400 to-yellow-500',  bg: 'bg-amber-50   dark:bg-amber-900/20' },
  { level: 3, emoji: '🙂', label: 'Good',      gradient: 'from-teal-400 to-emerald-500',  bg: 'bg-teal-50    dark:bg-teal-900/20'  },
  { level: 4, emoji: '😊', label: 'Great',     gradient: 'from-primary-400 to-violet-500', bg: 'bg-primary-50 dark:bg-primary-900/20' },
  { level: 5, emoji: '🤩', label: 'Amazing!',  gradient: 'from-rose-400 to-pink-500',     bg: 'bg-rose-50    dark:bg-rose-900/20'  },
]

export interface FirestoreDiaryEntry {
  date:      Timestamp
  /** @deprecated Use text_en — kept for older documents */
  text?:     string
  text_en?:  string
  text_ru?:  string
  mood:      MoodLevel
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface DiaryEntry {
  id:        string
  date:      Date
  /** Localized display text (set by localizeDiaryEntry) */
  text:      string
  textEn:    string
  textRu?:   string
  mood:      MoodLevel
  createdAt: Date | null
  updatedAt: Date | null
}
