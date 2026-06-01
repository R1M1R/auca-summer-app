import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/useAppStore'
import type { AppLanguage } from '@/types'

const LANGS: { code: AppLanguage; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

interface Props {
  compact?: boolean
  /** Hide on welcome screen when family card is selected */
  previewFamily?: boolean
}

export default function LanguageSwitcher({ compact = false, previewFamily = false }: Props) {
  const { i18n, t } = useTranslation()
  const role       = useAppStore((s) => s.role)
  const setLanguage = useAppStore((s) => s.setLanguage)
  const current = (i18n.language.slice(0, 2) as AppLanguage)

  if (role === 'family' || previewFamily) return null

  const toggle = () => setLanguage(current === 'en' ? 'ru' : 'en')

  if (compact) {
    return (
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-9 h-9 rounded-xl glass-card flex items-center justify-center
                   text-xs font-bold text-slate-500 dark:text-slate-400
                   hover:text-slate-800 dark:hover:text-slate-100
                   transition-colors duration-200"
        aria-label={t('common.switchLanguage')}
      >
        {current.toUpperCase()}
      </motion.button>
    )
  }

  return (
    <div className="flex items-center gap-1 p-1 glass-card rounded-xl">
      {LANGS.map(({ code, label }) => {
        const active = current === code
        return (
          <motion.button
            key={code}
            onClick={() => setLanguage(code)}
            whileTap={{ scale: 0.93 }}
            className={[
              'relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200',
              active
                ? 'text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ].join(' ')}
          >
            {active && (
              <motion.div
                layoutId="lang-pill"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500 to-violet-600"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
