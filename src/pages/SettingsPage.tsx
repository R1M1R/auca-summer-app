import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Settings, Sun, Moon, Monitor, Globe,
  UserCircle, LogOut, Database, GraduationCap, Home,
  ChevronRight, Loader2,
  type LucideIcon,
} from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAppStore } from '@/store/useAppStore'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'
import { fadeUpLight } from '@/lib/motion'
import NotificationsSettings from '@/components/settings/NotificationsSettings'

const DataImporter = lazy(() => import('@/components/admin/DataImporter'))

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = fadeUpLight

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
        {title}
      </p>
      <div className="glass-card divide-y divide-slate-200/50 dark:divide-slate-700/50 overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}

function Row({
  icon: Icon,
  label,
  children,
  gradient = 'from-slate-400 to-slate-500',
}: {
  icon: LucideIcon
  label: string
  gradient?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm shrink-0`}>
        <Icon className="w-4 h-4" strokeWidth={2} />
      </div>
      <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </div>
  )
}

function ThemeSegment() {
  const { t } = useTranslation()
  const { mode, setMode } = useTheme()
  const OPTIONS = [
    { value: 'light' as const,  Icon: Sun,     label: t('settings.light') },
    { value: 'dark' as const,   Icon: Moon,    label: t('settings.dark') },
    { value: 'system' as const, Icon: Monitor, label: t('settings.system') },
  ]

  return (
    <div className="flex gap-1 p-1 glass-card rounded-xl">
      {OPTIONS.map(({ value, Icon, label }) => {
        const active = mode === value
        return (
          <motion.button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            whileTap={{ scale: 0.9 }}
            className={`relative flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-colors ${
              active ? 'text-white' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {active && (
              <motion.div
                layoutId="settings-theme-seg"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500 to-violet-600"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <Icon className="relative z-10 w-3 h-3" />
            <span className="relative z-10">{label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

function LangToggle() {
  const language = useAppStore((s) => s.language)
  const setLanguage = useAppStore((s) => s.setLanguage)

  return (
    <div className="flex gap-1 p-1 glass-card rounded-xl">
      {(['en', 'ru'] as const).map((lang) => {
        const active = language === lang
        return (
          <motion.button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            whileTap={{ scale: 0.9 }}
            className={`relative flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              active ? 'text-white' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {active && (
              <motion.div
                layoutId="settings-lang-seg"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500 to-violet-600"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{lang}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default function SettingsPage() {
  const { t } = useTranslation()
  const { role, clearRole } = useApp()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  const totalXP = useAppStore((s) => s.totalXP)
  const tasksCompleted = useAppStore((s) => s.tasksCompleted)
  const streak = useAppStore((s) => s.streak)
  const resetStats = useAppStore((s) => s.resetStats)

  if (!role) {
    return null
  }

  const RoleIcon = role === 'student' ? GraduationCap : Home

  const handleLogout = () => {
    clearRole()
    navigate('/', { replace: true })
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <header className="sticky top-0 z-30 glass-card rounded-none rounded-b-2xl px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-sm">
            <Settings className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <p className="text-[15px] font-bold text-slate-700 dark:text-slate-200">
            {t('settings.title')}
          </p>
        </div>
        <ThemeToggle />
      </header>

      <motion.main
        variants={stagger}
        initial={false}
        animate="animate"
        className="px-4 pt-5 space-y-5 max-w-lg mx-auto"
      >
        <Section title={t('settings.appearance')}>
          <Row icon={Sun} label={t('settings.theme')} gradient="from-amber-400 to-orange-500">
            <ThemeSegment />
          </Row>
          {role === 'student' && (
            <Row icon={Globe} label={t('settings.language')} gradient="from-primary-500 to-violet-600">
              <LangToggle />
            </Row>
          )}
          {role === 'family' && (
            <Row icon={Globe} label={t('settings.language')} gradient="from-primary-500 to-violet-600">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('settings.languageLockedRu')}
              </span>
            </Row>
          )}
        </Section>

        <NotificationsSettings />

        <Section title={t('settings.account')}>
          <Row
            icon={RoleIcon}
            label={t('settings.role')}
            gradient={role === 'student' ? 'from-indigo-500 to-primary-600' : 'from-rose-500 to-pink-600'}
          >
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t(`roles.${role}`)}
            </span>
          </Row>

          {role === 'student' && (
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white shadow-sm">
                <UserCircle className="w-4 h-4" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {t('settings.progress')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('settings.progressStats', { xp: totalXP, tasks: tasksCompleted, streak })}
                </p>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={resetStats}
                className="text-xs text-rose-400 hover:text-rose-600 font-medium transition-colors"
              >
                {t('settings.resetStats')}
              </motion.button>
            </div>
          )}

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center text-white shadow-sm">
              <LogOut className="w-4 h-4" strokeWidth={2} />
            </div>
            <span className="flex-1 text-sm font-medium text-rose-600 dark:text-rose-400">
              {t('settings.logout')}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
          </motion.button>
        </Section>

        <Section title={t('settings.about')}>
          <Row icon={Settings} label={t('settings.version')} gradient="from-slate-400 to-slate-600">
            <span className="text-xs text-slate-400 font-mono">0.1.0</span>
          </Row>
          <Row icon={Database} label={t('settings.firestoreCollection')} gradient="from-violet-500 to-primary-600">
            <span className="text-xs text-slate-400 font-mono">events</span>
          </Row>
        </Section>

        {role === 'family' && (
          <motion.div variants={fadeUp} className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 flex items-center gap-1.5">
              <Database className="w-3 h-3" />
              {t('settings.databaseTools')}
            </p>
            <div className="glass-card p-4">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
                  </div>
                }
              >
                <DataImporter />
              </Suspense>
            </div>
          </motion.div>
        )}
      </motion.main>

      <BottomNav />
    </div>
  )
}
