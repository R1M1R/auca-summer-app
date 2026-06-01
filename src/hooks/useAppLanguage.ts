import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '@/types'

/** Subscribes to i18n.language so components re-render on RU/EN toggle. */
export function useAppLanguage(): AppLanguage {
  const { i18n } = useTranslation()
  return i18n.language.slice(0, 2) === 'ru' ? 'ru' : 'en'
}
