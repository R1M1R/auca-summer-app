import type { AppLanguage } from '@/types'

const API_BASE = 'https://api.mymemory.translated.net/get'

/**
 * Free MyMemory translation (en ↔ ru).
 * Student content is assumed to be written in English.
 */
export async function translateText(
  text: string,
  targetLang: AppLanguage,
): Promise<string> {
  const trimmed = text.trim()
  if (!trimmed) return text

  const sourceLang: AppLanguage = targetLang === 'ru' ? 'en' : 'ru'
  const langpair = `${sourceLang}|${targetLang}`
  const url = `${API_BASE}?q=${encodeURIComponent(trimmed)}&langpair=${langpair}`

  try {
    const res = await fetch(url)
    if (!res.ok) return trimmed

    const data = (await res.json()) as {
      responseStatus?: number
      responseData?: { translatedText?: string }
    }

    if (data.responseStatus !== 200) return trimmed

    const translated = data.responseData?.translatedText?.trim()
    return translated || trimmed
  } catch (err) {
    console.warn('[translateText]', err)
    return trimmed
  }
}

/** Translate each non-empty string in parallel */
export async function translateStringList(items: string[]): Promise<string[]> {
  if (items.length === 0) return []
  return Promise.all(items.map((item) => translateText(item, 'ru')))
}
