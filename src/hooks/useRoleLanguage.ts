import { useEffect } from 'react'
import i18n from '@/i18n'
import { useAppStore } from '@/store/useAppStore'
import { applyInterfaceLanguage, languageForRole } from '@/lib/languagePolicy'

/**
 * Keeps i18next in sync with role-based language policy.
 * Family → forced ru; student → persisted preference (default en).
 */
export function useRoleLanguage(): void {
  const role     = useAppStore((s) => s.role)
  const language = useAppStore((s) => s.language)

  useEffect(() => {
    if (!role) return
    const lang = languageForRole(role, language)
    if (i18n.language.slice(0, 2) !== lang) {
      applyInterfaceLanguage(lang)
    }
  }, [role, language])
}
