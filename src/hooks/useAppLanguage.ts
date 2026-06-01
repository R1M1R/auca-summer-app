import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'
import type { AppLanguage } from '@/types'

/** Subscribes to i18n.language; family role is always Russian. */
export function useAppLanguage(): AppLanguage {
  const { i18n } = useTranslation()
  const role = useAppStore((s) => s.role)
  if (role === 'family') return 'ru'
  return i18n.language.slice(0, 2) === 'ru' ? 'ru' : 'en'
}
