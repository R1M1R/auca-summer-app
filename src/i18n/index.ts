import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import ru from './locales/ru'
import { languageForRole, normalizeStoredRole } from '@/lib/languagePolicy'
import type { AppLanguage } from '@/types'

function readPersistedState(): { role: ReturnType<typeof normalizeStoredRole>; language: AppLanguage } {
  try {
    const store = localStorage.getItem('app-store')
    if (store) {
      const parsed = JSON.parse(store) as { state?: { role?: unknown; language?: AppLanguage } }
      const role = normalizeStoredRole(parsed?.state?.role)
      const language = parsed?.state?.language ?? 'en'
      return { role, language }
    }
  } catch { /* ignore */ }
  const legacy = localStorage.getItem('app_language') as AppLanguage | null
  return { role: null, language: legacy ?? 'en' }
}

const { role, language } = readPersistedState()
const initialLng = languageForRole(role, language)

i18n.use(initReactI18next).init({
  resources:     { en, ru },
  lng:           initialLng,
  fallbackLng:   'en',
  interpolation: { escapeValue: false },
  react:         { useSuspense: false, bindI18n: 'languageChanged', bindI18nStore: 'added removed' },
})

export default i18n
