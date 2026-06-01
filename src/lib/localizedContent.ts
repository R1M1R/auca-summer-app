import type { AppLanguage, AppEvent, DiaryEntry, StudentPreferences, UserRole } from '@/types'
import { eventHasExactTime } from '@/lib/eventTime'

/** Family always reads Russian stored fields */
export function audienceForRole(role: UserRole): 'family' | 'student' {
  return role === 'family' ? 'family' : 'student'
}

/** title / description / location on AppEvent are English (titleEn); *Ru fields are Russian. */
export function pickLocalized(
  titleEn: string,
  titleRu: string | undefined,
  role: UserRole,
  lang: AppLanguage,
): string {
  if (role === 'family') return titleRu?.trim() || titleEn
  if (lang === 'ru') return titleRu?.trim() || titleEn
  return titleEn
}

export function pickLocalizedTime(
  timeEn: string | undefined,
  timeRu: string | undefined,
  role: UserRole,
  lang: AppLanguage,
): string | undefined {
  if (!timeEn?.trim() && !timeRu?.trim()) return undefined
  return pickLocalized(timeEn ?? '', timeRu, role, lang)
}

export function localizeEvent(event: AppEvent, role: UserRole, lang: AppLanguage): AppEvent {
  const exactTime = eventHasExactTime(event)
  return {
    ...event,
    title:       pickLocalized(event.title,       event.titleRu,       role, lang),
    description: pickLocalized(event.description, event.descriptionRu, role, lang),
    location:    event.location
      ? pickLocalized(event.location, event.locationRu, role, lang)
      : undefined,
    timeRu:      event.timeRu,
    timeEn:      event.timeEn,
    hasExactTime: exactTime,
    timeDisplay: exactTime
      ? undefined
      : pickLocalizedTime(event.timeEn, event.timeRu, role, lang),
  }
}

export function localizeDiaryEntry(entry: DiaryEntry, role: UserRole, lang: AppLanguage): DiaryEntry {
  return {
    ...entry,
    text: pickLocalized(entry.text, entry.textRu, role, lang),
  }
}

export interface DisplayPreferences extends StudentPreferences {
  allergies:      string[]
  favoriteFoods:  string[]
  favoriteDrinks: string[]
  dislikes:       string[]
  wishes:         string
  dietaryNotes:   string
}

export function localizePreferences(
  prefs: StudentPreferences,
  role: UserRole,
  lang: AppLanguage,
): DisplayPreferences {
  const pickList = (en: string[], ru?: string[]) => {
    if (role === 'family') return ru?.length ? ru : en
    if (lang === 'ru' && ru?.length) return ru
    return en
  }

  return {
    allergies:      pickList(prefs.allergies,      prefs.allergies_ru),
    favoriteFoods:  pickList(prefs.favoriteFoods,  prefs.favoriteFoods_ru),
    favoriteDrinks: pickList(prefs.favoriteDrinks, prefs.favoriteDrinks_ru),
    dislikes:       pickList(prefs.dislikes,       prefs.dislikes_ru),
    wishes:         pickLocalized(prefs.wishes,       prefs.wishes_ru,       role, lang),
    dietaryNotes:   pickLocalized(prefs.dietaryNotes, prefs.dietaryNotes_ru, role, lang),
  }
}
