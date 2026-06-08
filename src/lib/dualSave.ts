import { translateText, translateTextDetailed, translateStringList } from '@/lib/translate'

export interface EventBilingualRu {
  title_ru?:       string
  description_ru?: string
  location_ru?:    string
}

export async function buildEventRussianFields(input: {
  title:       string
  description: string
  location?:   string
}): Promise<EventBilingualRu> {
  const [title_ru, description_ru, location_ru] = await Promise.all([
    translateText(input.title, 'ru'),
    input.description.trim()
      ? translateText(input.description, 'ru')
      : Promise.resolve(''),
    input.location?.trim()
      ? translateText(input.location, 'ru')
      : Promise.resolve(undefined),
  ])

  const out: EventBilingualRu = { title_ru }
  if (description_ru) out.description_ru = description_ru
  if (location_ru) out.location_ru = location_ru
  return out
}

export interface PreferencesBilingualRu {
  allergies_ru?:      string[]
  favoriteFoods_ru?:  string[]
  favoriteDrinks_ru?: string[]
  dislikes_ru?:       string[]
  wishes_ru?:         string
  dietaryNotes_ru?:   string
}

export async function buildPreferencesRussianFields(input: {
  allergies:      string[]
  favoriteFoods:  string[]
  favoriteDrinks: string[]
  dislikes:       string[]
  wishes:         string
  dietaryNotes:   string
}): Promise<PreferencesBilingualRu> {
  const [
    allergies_ru,
    favoriteFoods_ru,
    favoriteDrinks_ru,
    dislikes_ru,
    wishes_ru,
    dietaryNotes_ru,
  ] = await Promise.all([
    translateStringList(input.allergies),
    translateStringList(input.favoriteFoods),
    translateStringList(input.favoriteDrinks),
    translateStringList(input.dislikes),
    input.wishes.trim() ? translateText(input.wishes, 'ru') : Promise.resolve(''),
    input.dietaryNotes.trim() ? translateText(input.dietaryNotes, 'ru') : Promise.resolve(''),
  ])

  const out: PreferencesBilingualRu = {
    allergies_ru,
    favoriteFoods_ru,
    favoriteDrinks_ru,
    dislikes_ru,
  }
  if (wishes_ru) out.wishes_ru = wishes_ru
  if (dietaryNotes_ru) out.dietaryNotes_ru = dietaryNotes_ru
  return out
}

export interface DiaryBilingual {
  textEn:         string
  textRu:         string
  translationOk:  boolean
}

/**
 * Student diary entries are written in English; Russian is auto-translated before save.
 */
export async function buildDiaryBilingualFields(text: string): Promise<DiaryBilingual> {
  const trimmed = text.trim()
  if (!trimmed) return { textEn: '', textRu: '', translationOk: true }

  const { text: textRu, ok: translationOk } = await translateTextDetailed(trimmed, 'ru')
  return { textEn: trimmed, textRu, translationOk }
}
