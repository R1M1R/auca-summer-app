import { motion } from 'framer-motion'
import type { StudentProfile } from '@/hooks/useStudentProfile'
import type { StudentPresenceState } from '@/lib/studentPresence'
import Card from '@/components/ui/Card'
import { getUserFacingError } from '@/lib/userFacingError'
import { dashboardFadeUp } from '@/features/dashboard/lib/dashboardMotion'
import type { TFunction } from 'i18next'

interface DashboardHeroProps {
  role: 'student' | 'family' | null
  greetingKey: string
  studentName: string
  t: TFunction
  i18nLanguage: string
  profileLoading: boolean
  profileError: string | null
  familyPresence: StudentPresenceState | null
  familyDisplayName: string
  studentProfile: StudentProfile | null
}

/** Greeting block + optional family presence card. */
export default function DashboardHero({
  role,
  greetingKey,
  studentName,
  t,
  i18nLanguage,
  profileLoading,
  profileError,
  familyPresence,
  familyDisplayName,
  studentProfile,
}: DashboardHeroProps) {
  return (
    <motion.div variants={dashboardFadeUp}>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
        {role === 'student'
          ? <>{t(greetingKey)}, <span className="gradient-text">{studentName}</span> 👋</>
          : <>{t(greetingKey)} 👋</>
        }
      </h2>

      {role === 'family' && profileLoading && (
        <div className="mt-3 glass-card px-4 py-3 h-16 animate-pulse rounded-2xl" />
      )}

      {role === 'family' && !profileLoading && profileError && (
        <Card className="mt-3 border-rose-200/70 dark:border-rose-900/50">
          <p className="text-sm text-rose-600 dark:text-rose-400">
            {t('dashboard.profileLoadError', {
              error: getUserFacingError(new Error(profileError), t),
            })}
          </p>
        </Card>
      )}

      {role === 'family' && !profileLoading && !profileError && familyPresence && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            className={`mt-3 !py-3 flex items-center gap-3 ${
              familyPresence === 'online'
                ? 'border-emerald-200/50 dark:border-emerald-800/30'
                : ''
            }`}
          >
            <div className="relative shrink-0">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-sm ${
                familyPresence === 'online'
                  ? 'bg-gradient-to-br from-primary-500 to-violet-600'
                  : 'bg-slate-400 dark:bg-slate-600'
              }`}>
                {familyPresence === 'awaiting'
                  ? '?'
                  : familyDisplayName.charAt(0).toUpperCase()}
              </div>
              {familyPresence === 'online' && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
              )}
              {familyPresence === 'offline' && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white dark:border-slate-900" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {t('dashboard.studentLabel')}{' '}
                <span className={
                  familyPresence === 'awaiting'
                    ? 'text-slate-500 dark:text-slate-400'
                    : 'text-primary-500'
                }>
                  {familyDisplayName}
                </span>
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {familyPresence === 'awaiting'
                  ? t('dashboard.waitingForStudent')
                  : familyPresence === 'online'
                    ? t('dashboard.currentlyActive')
                    : studentProfile?.lastSeen
                      ? t('dashboard.lastActive', {
                          time: studentProfile.lastSeen.toLocaleString(
                            i18nLanguage === 'ru' ? 'ru-RU' : 'en-US',
                            { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
                          ),
                        })
                      : t('dashboard.noActivityYet')}
              </p>
            </div>

            {familyPresence === 'online' ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold">{t('dashboard.active')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 shrink-0">
                <span className="inline-flex rounded-full h-2 w-2 bg-slate-400" />
                <span className="text-[10px] font-bold">
                  {familyPresence === 'awaiting'
                    ? t('dashboard.awaitingRegistration')
                    : t('dashboard.offline')}
                </span>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {t('dashboard.today')}
      </p>
    </motion.div>
  )
}
