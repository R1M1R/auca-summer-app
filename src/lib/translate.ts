import type { AppLanguage } from '@/types'

const API_BASE = 'https://api.mymemory.translated.net/get'
/** MyMemory free tier limit per request (~500 bytes) */
const MAX_CHUNK_LEN = 450

export interface TranslateResult {
  text: string
  ok:   boolean
}

async function translateChunk(
  chunk: string,
  targetLang: AppLanguage,
): Promise<TranslateResult> {
  const trimmed = chunk.trim()
  if (!trimmed) return { text: chunk, ok: true }

  const sourceLang: AppLanguage = targetLang === 'ru' ? 'en' : 'ru'
  const langpair = `${sourceLang}|${targetLang}`
  const url = `${API_BASE}?q=${encodeURIComponent(trimmed)}&langpair=${langpair}`

  try {
    const res = await fetch(url)
    if (!res.ok) return { text: trimmed, ok: false }

    const data = (await res.json()) as {
      responseStatus?: number
      responseData?: { translatedText?: string }
    }

    if (data.responseStatus !== 200) return { text: trimmed, ok: false }

    const translated = data.responseData?.translatedText?.trim()
    if (!translated || translated === trimmed) {
      return { text: translated || trimmed, ok: false }
    }
    return { text: translated, ok: true }
  } catch (err) {
    console.warn('[translateText]', err)
    return { text: trimmed, ok: false }
  }
}

function splitForTranslation(text: string): string[] {
  if (text.length <= MAX_CHUNK_LEN) return [text]

  const chunks: string[] = []
  let rest = text

  while (rest.length > MAX_CHUNK_LEN) {
    const slice = rest.slice(0, MAX_CHUNK_LEN)
    const breakAt = Math.max(
      slice.lastIndexOf('\n'),
      slice.lastIndexOf('. '),
      slice.lastIndexOf(' '),
    )
    const cut = breakAt > 80 ? breakAt + (slice[breakAt] === ' ' ? 1 : 2) : MAX_CHUNK_LEN
    chunks.push(rest.slice(0, cut))
    rest = rest.slice(cut)
  }
  if (rest) chunks.push(rest)
  return chunks
}

/**
 * Free MyMemory translation (en ↔ ru).
 * Student content is assumed to be written in English.
 */
export async function translateText(
  text: string,
  targetLang: AppLanguage,
): Promise<string> {
  const result = await translateTextDetailed(text, targetLang)
  return result.text
}

export async function translateTextDetailed(
  text: string,
  targetLang: AppLanguage,
): Promise<TranslateResult> {
  const trimmed = text.trim()
  if (!trimmed) return { text, ok: true }

  const chunks = splitForTranslation(trimmed)
  if (chunks.length === 1) {
    return translateChunk(chunks[0], targetLang)
  }

  const parts: string[] = []
  let allOk = true
  for (const chunk of chunks) {
    const part = await translateChunk(chunk, targetLang)
    parts.push(part.text)
    if (!part.ok) allOk = false
  }
  return { text: parts.join(''), ok: allOk }
}

/** Translate each non-empty string in parallel */
export async function translateStringList(items: string[]): Promise<string[]> {
  if (items.length === 0) return []
  return Promise.all(items.map((item) => translateText(item, 'ru')))
}
