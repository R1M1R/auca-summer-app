import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookHeart, Star, Sliders,
  GraduationCap, Home, Lock,
} from 'lucide-react'
import { useApp }   from '@/contexts/AppContext'
import { useTheme } from '@/contexts/ThemeContext'
import PreferencesTab   from '@/components/diary/PreferencesTab'
import ImpressionsTab   from '@/components/diary/ImpressionsTab'
import BottomNav        from '@/components/BottomNav'
import ThemeToggle      from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'

/* ── Types ───────────────────────────────────────────────────── */
type Tab = 'preferences' | 'impressions'

/* ── Page animation ──────────────────────────────────────────── */

/* ── Tab config ──────────────────────────────────────────────── */
const TABS = [
  {
    id:       'preferences' as Tab,
    label:    'My Preferences',
    Icon:     Sliders,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id:       'impressions' as Tab,
    label:    'Daily Impressions',
    Icon:     Star,
    gradient: 'from-primary-500 to-violet-600',
  },
]

/* ─────────────────────────────────────────────────────────────── */
export default function StudentDiary() {
  const { role }   = useApp()
  const { isDark } = useTheme()
  const [tab, setTab]         = useState<Tab>('preferences')
  const [tabDir, setTabDir]   = useState<1 | -1>(1)

  const isFamily  = role === 'family'
  const isStudent = role === 'student'

  const RoleIcon = isStudent ? GraduationCap : Home

  const switchTab = (next: Tab) => {
    const nextIdx = TABS.findIndex((t) => t.id === next)
    const curIdx  = TABS.findIndex((t) => t.id === tab)
    setTabDir(nextIdx > curIdx ? 1 : -1)
    setTab(next)
  }

  return (
    <div className={`min-h-screen pb-28 ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <header className="sticky top-0 z-30 glass-card rounded-none rounded-b-2xl px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-primary-600 flex items-center justify-center shadow-sm">
            <BookHeart className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Student Diary
              </p>
              {isFamily && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                  <Lock className="w-2.5 h-2.5" />
                  Read-only
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <RoleIcon className="w-3.5 h-3.5 text-primary-400" strokeWidth={2} />
              <span className="text-[11px] font-medium text-primary-500 dark:text-primary-400">
                {isStudent ? 'Your diary' : "Student's profile"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Tab bar (sticky below header) ── */}
      <div className="sticky top-[61px] z-20 mx-4 mt-3">
        <div className="glass-card p-1 flex gap-1 rounded-2xl">
          {TABS.map(({ id, label, Icon, gradient }) => {
            const active = tab === id
            return (
              <motion.button
                key={id}
                onClick={() => switchTab(id)}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 ${
                  active ? 'text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="diary-tab"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5 shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                <span className="relative z-10">{label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="px-4 pt-4 max-w-lg mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: tabDir * 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: tabDir * -6 }}
            transition={{ duration: 0.18 }}
          >
            {tab === 'preferences' && <PreferencesTab role={role} />}
            {tab === 'impressions' && <ImpressionsTab  role={role} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  )
}
