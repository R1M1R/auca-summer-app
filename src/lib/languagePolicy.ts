import i18n from '@/i18n'
import type { AppLanguage, UserRole } from '@/types'

export function languageForRole(role: UserRole, studentPreference?: AppLanguage): AppLanguage {
  if (role === 'family') return 'ru'
  if (role === 'student') return studentPreference ?? 'en'
  return 'en'
}

export function applyInterfaceLanguage(lang: AppLanguage): void {
  void i18n.changeLanguage(lang)
  localStorage.setItem('app_language', lang)
}

/** Migrate persisted role from legacy "host" */
export function normalizeStoredRole(role: unknown): UserRole {
  if (role === 'host' || role === 'family') return 'family'
  if (role === 'student') return 'student'
  return null
}
