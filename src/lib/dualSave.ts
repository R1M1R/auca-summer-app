import { translateText, translateStringList } from '@/lib/translate'

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

  return {
    title_ru,
    description_ru: description_ru || undefined,
    location_ru:    location_ru || undefined,
  }
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

  return {
    allergies_ru,
    favoriteFoods_ru,
    favoriteDrinks_ru,
    dislikes_ru,
    wishes_ru:       wishes_ru || undefined,
    dietaryNotes_ru: dietaryNotes_ru || undefined,
  }
}

export async function buildDiaryRussianFields(text: string): Promise<{ text_ru: string }> {
  const text_ru = await translateText(text, 'ru')
  return { text_ru }
}
