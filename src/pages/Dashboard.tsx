import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { EventCategory } from '@/types'
import {
  CheckCircle2, Clock, ListTodo, Plus, ChevronRight,
  Calendar, GraduationCap, Home, Wifi, WifiOff,
  BookOpen, Phone, Bell, Sparkles, X, BookUser,
} from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useAppStore } from '@/store/useAppStore'
import { useTheme } from '@/contexts/ThemeContext'
import { useUI }   from '@/contexts/UIContext'
import { useEvents, useEventMutations } from '@/hooks/useEvents'
import { useLocalizedEvents } from '@/hooks/useLocalizedEvents'
import { useStudentPlanNotifications } from '@/hooks/useStudentPlanNotifications'
import { useStudentProfile } from '@/hooks/useStudentProfile'
import { getStudentPresenceState } from '@/lib/studentPresence'
import { isStudentPlanForFamily } from '@/lib/eventPermissions'
import AddEventModal from '@/components/schedule/AddEventModal'
import { isConfigured } from '@/lib/firebase'
import { MEETING_DATE } from '@/hooks/useCountdown'
import CountdownTimer from '@/components/countdown/CountdownTimer'
import PreArrivalCard from '@/components/onboarding/PreArrivalCard'
import ProgramProgressBar from '@/components/ProgramProgressBar'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { fadeUpLight } from '@/lib/motion'
import { isWithinNextDays } from '@/lib/eventWindow'
import { hasSeenWelcomeModal } from '@/lib/welcomeStorage'
import WelcomeModal from '@/components/welcome/WelcomeModal'
import { SkeletonEventList } from '@/components/ui/Skeleton'

const BEFORE_MEETING = Date.now() < MEETING_DATE.getTime()

/* ── Category pill colours ──────────────────────────────────── */
const CATEGORY_COLORS: Record<EventCategory, string> = {
  academic:         'bg-indigo-100  text-indigo-700  dark:bg-indigo-900/40  dark:text-indigo-300',
  excursion:        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  mandatory:        'bg-orange-100  text-orange-700  dark:bg-orange-900/40  dark:text-orange-300',
  leisure:          'bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-300',
  family:           'bg-rose-100    text-rose-700    dark:bg-rose-900/40    dark:text-rose-300',
  social:           'bg-violet-100  text-violet-700  dark:bg-violet-900/40  dark:text-violet-300',
  personal:         'bg-cyan-100    text-cyan-700    dark:bg-cyan-900/40    dark:text-cyan-300',
  activity:         'bg-lime-100    text-lime-700    dark:bg-lime-900/40    dark:text-lime-300',
  student_personal: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
}

/* ── Animation variants ─────────────────────────────────────── */
const container = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = fadeUpLight
const scaleIn = {
  initial: { opacity: 0, scale: 0.93 },
  animate: { opacity: 1, scale: 1,    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

/* ─────────────────────────────────────────────────────────────── */
/* ── Quick-action button ─────────────────────────────────────── */
function QuickAction({
  icon, label, onClick, gradient = 'from-primary-500 to-violet-600',
}: {
  icon: React.ReactNode; label: string; onClick?: () => void; gradient?: string
}) {
  return (
    <motion.button
      variants={scaleIn}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="glass-card flex flex-col items-center gap-2 p-3 cursor-pointer hover:ring-1 hover:ring-primary-400/40 transition-all"
    >
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight">{label}</span>
    </motion.button>
  )
}

function categoryLabel(t: (key: string) => string, category: EventCategory): string {
  return t(`categories.${category}`)
}

export default function Dashboard() {
  const { t, i18n }     = useTranslation()
  const { role }        = useApp()
  const { isDark }      = useTheme()
  const { openSOS }     = useUI()
  const navigate        = useNavigate()
  const updateStreak    = useAppStore((s) => s.updateStreak)
  const tasksCompleted  = useAppStore((s) => s.tasksCompleted)
  const incrementTasks  = useAppStore((s) => s.incrementTasksCompleted)
  /* Locally cached name (instant, no flicker) */
  const cachedName      = useAppStore((s) => s.studentName)

  const { events: rawEvents, loading, error } = useEvents()
  const events = useLocalizedEvents(rawEvents)
  const { toggleComplete, canFamilyMutate, canAddStudentPlan } = useEventMutations()
  const ensureUserId = useAppStore((s) => s.ensureUserId)
  const { hasNew, count, markSeen } = useStudentPlanNotifications(events)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    if (role === 'student' && !hasSeenWelcomeModal()) {
      setShowWelcome(true)
    }
  }, [role])

  /* For family: subscribe to live student profile */
  const { profile: studentProfile, loading: profileLoading, touchLastSeen } = useStudentProfile()

  /* Update streak + student lastSeen on mount */
  useEffect(() => {
    updateStreak()
    if (role === 'student') {
      ensureUserId()
      touchLastSeen().catch(() => {})
    }
  }, [updateStreak, role, touchLastSeen, ensureUserId])

  /* Student name: Firestore for student; local cache only for student role */
  const studentName =
    role === 'student'
      ? (studentProfile?.name || cachedName || t('dashboard.studentFallback'))
      : (studentProfile?.name?.trim() || t('dashboard.studentFallback'))

  const familyPresence =
    role === 'family' ? getStudentPresenceState(studentProfile) : null
  const familyDisplayName =
    familyPresence === 'awaiting'
      ? t('dashboard.awaitingRegistration')
      : studentProfile?.name?.trim() || t('dashboard.awaitingRegistration')

  const hour = new Date().getHours()
  const greetingKey =
    hour < 12 ? 'dashboard.greeting_morning'  :
    hour < 18 ? 'dashboard.greeting_afternoon' :
                'dashboard.greeting_evening'

  const RoleIcon = role === 'student' ? GraduationCap : Home

  const upcomingWindowEvents = useMemo(
    () => events.filter((e) => isWithinNextDays(e.date, 7)),
    [events],
  )
  const pendingEvents   = upcomingWindowEvents.filter((e) => !e.completed)
  const completedEvents = upcomingWindowEvents.filter((e) =>  e.completed)

  const handleToggle = async (id: string, completed: boolean) => {
    await toggleComplete(id, !completed)
    if (!completed) incrementTasks()
  }

  /* ── Helper: event date label ── */
  const formatDate = (d: Date) =>
    d.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
    })

  return (
    <div className={`min-h-screen ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-30 glass-card rounded-none rounded-b-2xl px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-glow-sm">
            <Clock className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-slate-400 leading-none">TimeFlow</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <RoleIcon className="w-3.5 h-3.5 text-primary-400" strokeWidth={2} />
              <span className="text-xs font-medium text-primary-500 dark:text-primary-400">
                {t(`roles.${role ?? 'student'}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Firebase connection badge */}
          <div
            title={isConfigured ? t('dashboard.firebaseConnected') : t('dashboard.firebaseNotConfigured')}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${
              isConfigured
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
            }`}
          >
            {isConfigured ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isConfigured ? t('dashboard.firebaseLive') : t('dashboard.firebaseDemo')}
          </div>
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>
      </header>

      {/* ── Main content ── */}
      <motion.main
        variants={container}
        initial="initial"
        animate="animate"
        className="px-4 pt-5 space-y-5 max-w-lg mx-auto"
      >
        {/* Greeting */}
        <motion.div variants={fadeUp}>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {role === 'student'
              ? <>{t(greetingKey)}, <span className="gradient-text">{studentName}</span> 👋</>
              : <>{t(greetingKey)} 👋</>
            }
          </h2>

          {/* Family: live student status card */}
          {role === 'family' && profileLoading && (
            <div className="mt-3 glass-card px-4 py-3 h-16 animate-pulse" />
          )}
          {role === 'family' && !profileLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mt-3 glass-card px-4 py-3 flex items-center gap-3 ${
                familyPresence === 'online'
                  ? 'border-emerald-200/50 dark:border-emerald-800/30'
                  : 'border-slate-200/50 dark:border-slate-700/40'
              }`}
            >
              <div className="relative">
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
                  <span className={familyPresence === 'awaiting'
                    ? 'text-slate-500 dark:text-slate-400'
                    : 'text-primary-500'
                  }>
                    {familyDisplayName}
                  </span>
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {familyPresence === 'awaiting'
                    ? t('dashboard.waitingForStudent')
                    : familyPresence === 'online'
                      ? t('dashboard.currentlyActive')
                      : studentProfile?.lastSeen
                        ? t('dashboard.lastActive', {
                            time: studentProfile.lastSeen.toLocaleString(
                              i18n.language === 'ru' ? 'ru-RU' : 'en-US',
                              { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
                            ),
                          })
                        : t('dashboard.noActivityYet')
                  }
                </p>
              </div>
              {familyPresence === 'online' ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-bold">{t('dashboard.active')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400">
                  <span className="inline-flex rounded-full h-2 w-2 bg-slate-400" />
                  <span className="text-[10px] font-bold">
                    {familyPresence === 'awaiting'
                      ? t('dashboard.awaitingRegistration')
                      : t('dashboard.offline')}
                  </span>
                </div>
              )}
            </motion.div>
          )}

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {t('dashboard.today')}
          </p>
        </motion.div>

        {/* ── Countdown timer (both roles, before June 7) ── */}
        {BEFORE_MEETING && (
          <motion.div variants={scaleIn}>
            <CountdownTimer />
          </motion.div>
        )}

        {/* ── Pre-arrival onboarding (before June 7, role-specific) ── */}
        {BEFORE_MEETING && (
          <motion.div variants={scaleIn}>
            <PreArrivalCard role={role} />
          </motion.div>
        )}

        {/* ── Program progress bar (student only, after meeting date) ── */}
        {role === 'student' && !BEFORE_MEETING && (
          <motion.div variants={scaleIn}>
            <ProgramProgressBar />
          </motion.div>
        )}

        {/* ── Quick stats row ── */}
        <motion.div variants={container} className="grid grid-cols-3 gap-3">
          {[
            {
              icon:     <ListTodo className="w-4 h-4" />,
              value:    pendingEvents.length,
              label:    t('dashboard.tasksLeft'),
              gradient: 'from-primary-500 to-violet-600',
            },
            {
              icon:     <CheckCircle2 className="w-4 h-4" />,
              value:    tasksCompleted,
              label:    t('dashboard.tasksDone'),
              gradient: 'from-emerald-500 to-teal-600',
            },
            {
              icon:     <Calendar className="w-4 h-4" />,
              value:    completedEvents.length,
              label:    t('dashboard.doneToday'),
              gradient: 'from-orange-500 to-rose-500',
            },
          ].map((s, i) => (
            <motion.div key={i} variants={scaleIn} className="glass-card p-4 flex flex-col gap-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-sm`}>
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none tabular-nums">
                {s.value}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Host: student plan notification */}
        <AnimatePresence>
          {role === 'family' && hasNew && (
            <motion.div
              variants={scaleIn}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass-card px-4 py-3 flex items-start gap-3 border-fuchsia-300/50 dark:border-fuchsia-700/40 bg-gradient-to-r from-fuchsia-50/80 to-violet-50/80 dark:from-fuchsia-950/30 dark:to-violet-950/20"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('dashboard.newPlanTitle')}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t('dashboard.newPlanEntries', { count })}
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/schedule')}
                  className="mt-2 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
                >
                  {t('dashboard.viewScheduleLink')}
                </button>
              </div>
              <button type="button" onClick={markSeen} className="text-slate-400 p-1" aria-label={t('dashboard.dismiss')}>
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Student: Add My Plan CTA */}
        {role === 'student' && canAddStudentPlan && (
          <motion.button
            variants={scaleIn}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPlanModal(true)}
            className="w-full glass-card px-4 py-4 flex items-center gap-4 border-fuchsia-200/60 dark:border-fuchsia-800/40 bg-gradient-to-r from-fuchsia-50/90 to-violet-50/90 dark:from-fuchsia-950/30 dark:to-violet-950/20"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white shadow-sm">
              <BookUser className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{t('dashboard.addMyPlan')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t('dashboard.addMyPlanHint')}
              </p>
            </div>
            <Plus className="w-5 h-5 text-fuchsia-500" />
          </motion.button>
        )}

        {/* ── Quick actions ── */}
        <motion.div variants={fadeUp}>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
            {t('dashboard.quickActions')}
          </p>
          <motion.div variants={container} className="grid grid-cols-4 gap-2">
            <QuickAction
              icon={<Plus className="w-4 h-4" />}
              label={role === 'student' ? t('dashboard.myPlan') : t('dashboard.addTask')}
              gradient="from-fuchsia-500 to-violet-600"
              onClick={role === 'student' ? () => setShowPlanModal(true) : undefined}
            />
            <QuickAction
              icon={<Calendar className="w-4 h-4" />}
              label={t('dashboard.schedule')}
              gradient="from-emerald-500 to-teal-600"
              onClick={() => navigate('/schedule')}
            />
            <QuickAction
              icon={<BookOpen className="w-4 h-4" />}
              label={t('dashboard.guide')}
              gradient="from-amber-500 to-orange-600"
              onClick={() => navigate('/guide')}
            />
            <QuickAction
              icon={<Phone className="w-4 h-4" />}
              label={t('dashboard.sos')}
              gradient="from-rose-500 to-red-600"
              onClick={openSOS}
            />
          </motion.div>
        </motion.div>

        {/* ── Upcoming events ── */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {t('dashboard.upcoming')}
            </p>
            {role === 'student' && canAddStudentPlan && (
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setShowPlanModal(true)}
                className="flex items-center gap-1 text-xs font-semibold text-fuchsia-500 hover:text-fuchsia-400"
              >
                <Plus className="w-3.5 h-3.5" />
                {t('dashboard.addMyPlan')}
              </motion.button>
            )}
            {role === 'family' && canFamilyMutate && (
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/schedule')}
                className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-400"
              >
                <Plus className="w-3.5 h-3.5" />
                {t('dashboard.addTask')}
              </motion.button>
            )}
          </div>

          {/* Loading skeleton */}
          {loading && <SkeletonEventList count={3} />}

          {/* Error state */}
          {error && !loading && (
            <div className="glass-card px-4 py-3 border border-rose-200 dark:border-rose-900/50">
              <p className="text-sm text-rose-500">{t('dashboard.eventsLoadError', { error })}</p>
            </div>
          )}

          {/* Event list */}
          {!loading && !error && (
            <div className="space-y-3">
              {pendingEvents.length === 0 && (
                <motion.p
                  variants={fadeUp}
                  className="text-center text-sm text-slate-400 py-8"
                >
                  {t('dashboard.noTasks')}
                </motion.p>
              )}

              {pendingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  variants={scaleIn}
                  custom={i}
                  layout
                  className="glass-card card-pad flex items-start gap-3 group"
                >
                  {/* Checkbox */}
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handleToggle(event.id, event.completed)}
                    className="mt-0.5 w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600
                               hover:border-primary-400 dark:hover:border-primary-400
                               flex-shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    aria-label={t('dashboard.markDone', { title: event.title })}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {event.title}
                    </p>
                    {event.description && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{event.description}</p>
                    )}
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(event.date)}
                    </p>
                  </div>

                  {/* Category + actions */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {isStudentPlanForFamily(event) && role === 'family' && (
                      <span className="badge bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-[10px] px-2 py-0.5 border-0">
                        {t('dashboard.studentsPlanBadge')}
                      </span>
                    )}
                    <span className={`badge ${CATEGORY_COLORS[event.category]}`}>
                      {categoryLabel(t, event.category)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Completed section */}
              {completedEvents.length > 0 && (
                <motion.details variants={fadeUp} className="group">
                  <summary className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 list-none select-none mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {t('dashboard.completedCount', { count: completedEvents.length })}
                    <ChevronRight className="w-3 h-3 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="space-y-2">
                    {completedEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        layout
                        className="glass-card px-4 py-2.5 flex items-center gap-3 opacity-60"
                      >
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => handleToggle(event.id, event.completed)}
                          className="w-5 h-5 rounded-full bg-emerald-400 flex-shrink-0 flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.button>
                        <p className="flex-1 text-sm text-slate-500 dark:text-slate-400 line-through truncate">
                          {event.title}
                        </p>
                        <span className={`badge ${CATEGORY_COLORS[event.category]}`}>
                          {categoryLabel(t, event.category)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.details>
              )}
            </div>
          )}
        </motion.div>
      </motion.main>

      {role === 'student' && (
        <AddEventModal
          open={showPlanModal}
          onClose={() => setShowPlanModal(false)}
          editingEvent={null}
          defaultDate={new Date()}
          mode="student"
        />
      )}

      {role === 'student' && (
        <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
      )}

      <BottomNav />
    </div>
  )
}
