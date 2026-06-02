import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Calendar, Plus, Wifi, WifiOff, Bell, X, Sparkles } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useAppStore } from '@/store/useAppStore'
import { useEvents, useEventMutations } from '@/hooks/useEvents'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import { getUserFacingError } from '@/lib/userFacingError'
import { useStudentPlanNotifications } from '@/hooks/useStudentPlanNotifications'
import { isConfigured } from '@/lib/firebase'
import WeekCalendar, { sameDay } from '@/components/schedule/WeekCalendar'
import EventCard from '@/components/schedule/EventCard'
import AddEventModal from '@/components/schedule/AddEventModal'
import BottomNav from '@/components/BottomNav'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { SkeletonTimeline } from '@/components/ui/Skeleton'
import type { AppEvent } from '@/types'

function EmptyDay({ canAdd }: { canAdd: boolean }) {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-20 text-center px-8"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center"
      >
        <Calendar className="w-9 h-9 text-slate-300 dark:text-slate-500" strokeWidth={1.5} />
      </motion.div>
      <div>
        <p className="font-semibold text-slate-600 dark:text-slate-300">{t('schedule.noEventsTitle')}</p>
        <p className="text-sm text-slate-400 mt-1">
          {canAdd ? t('schedule.noEventsAdd') : t('schedule.noEventsLater')}
        </p>
      </div>
    </motion.div>
  )
}

export default function ScheduleDashboard() {
  const { t }      = useTranslation()
  const { role }   = useApp()
  const { isDark } = useTheme()
  const userId     = useAppStore((s) => s.userId)
  const ensureUserId = useAppStore((s) => s.ensureUserId)

  const { events: rawEvents, loading, error } = useEvents()
  const lang = useAppLanguage()
  const { deleteEvent, toggleComplete, canFamilyMutate, canAddStudentPlan } = useEventMutations()
  const { hasNew, count, markSeen } = useStudentPlanNotifications(rawEvents)

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showModal,    setShowModal]    = useState(false)
  const [editingEvent, setEditingEvent] = useState<AppEvent | null>(null)

  const isFamily  = role === 'family'
  const isStudent = role === 'student'
  const canAdd    = isFamily ? canFamilyMutate : canAddStudentPlan
  const modalMode = isStudent ? 'student' : 'family'
  const effectiveUserId = userId || (isStudent ? ensureUserId() : '')

  const dayEvents = useMemo(
    () =>
      rawEvents
        .filter((e) => sameDay(e.date, selectedDate))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [rawEvents, selectedDate],
  )

  const now = new Date()

  const openAdd  = () => { setEditingEvent(null); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditingEvent(null) }

  const handleToggleComplete = useCallback(
    async (id: string, completed: boolean) => {
      await toggleComplete(id, !completed)
    },
    [toggleComplete],
  )

  const handleEditById = useCallback(
    (id: string) => {
      const raw = rawEvents.find((r) => r.id === id)
      if (!raw) return
      setEditingEvent(raw)
      setShowModal(true)
    },
    [rawEvents],
  )

  const handleDeleteById = useCallback(
    async (id: string) => {
      const raw = rawEvents.find((r) => r.id === id)
      if (!raw) return
      await deleteEvent(raw.id, raw)
    },
    [rawEvents, deleteEvent],
  )

  const dateLabel = selectedDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  })
  const isToday = sameDay(selectedDate, now)

  return (
    <div className={`min-h-screen ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`}>
      <header className="sticky top-0 z-30 glass-card rounded-none rounded-b-2xl px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
            <Calendar className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {t('nav.schedule')}
              </p>
              {isToday && (
                <span className="badge bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] px-2 py-0.5">
                  {t('schedule.today')}
                </span>
              )}
            </div>
            <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              {dateLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium ${
            isConfigured
              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
          }`}>
            {isConfigured ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isConfigured ? t('dashboard.firebaseLive') : t('dashboard.firebaseDemo')}
          </div>
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>
      </header>

      {/* Host: new student plan notification */}
      <AnimatePresence>
        {isFamily && hasNew && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -12, height: 0 }}
            className="mx-4 mt-3"
          >
            <div className="glass-card px-4 py-3 flex items-start gap-3 border-fuchsia-300/60 dark:border-fuchsia-700/50 bg-gradient-to-r from-fuchsia-50/90 to-violet-50/90 dark:from-fuchsia-950/40 dark:to-violet-950/30">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('schedule.newPlanTitle')}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {t('schedule.newPlanBody', { count })}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={markSeen}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label={t('dashboard.dismiss')}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WeekCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        events={rawEvents}
      />

      <main className="max-w-lg mx-auto pt-4 pb-4">
        {loading && <SkeletonTimeline />}

        {!loading && error && (
          <div className="mx-4 mt-4 glass-card px-4 py-3 border border-rose-200 dark:border-rose-900/50">
            <p className="text-sm text-rose-500">
              {t('schedule.eventsLoadError', { error: getUserFacingError(new Error(error), t) })}
            </p>
          </div>
        )}

        {!loading && !error && dayEvents.length === 0 && (
          <EmptyDay canAdd={canAdd} />
        )}

        {!loading && !error && dayEvents.length > 0 && (
          <div className="relative px-4">
            <div
              className="absolute top-7 bottom-6 w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent dark:from-slate-600 dark:via-slate-700"
              style={{ left: 'calc(1rem + 52px)' }}
            />

            {dayEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                role={role}
                userId={effectiveUserId}
                onEditById={handleEditById}
                onDeleteById={handleDeleteById}
                onToggleComplete={handleToggleComplete}
              />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: dayEvents.length * 0.065 + 0.2 }}
              className="flex items-center gap-3 px-0 py-2 ml-[52px]"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-[#0f0f1a]" />
              <span className="text-xs text-slate-300 dark:text-slate-600">{t('schedule.endOfDay')}</span>
            </motion.div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {canAdd && (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            onClick={openAdd}
            className={`fixed bottom-[88px] right-5 z-40 w-14 h-14 rounded-2xl flex items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isStudent
                ? 'bg-gradient-to-br from-fuchsia-500 to-violet-600 focus-visible:ring-fuchsia-400'
                : 'bg-gradient-to-br from-primary-500 to-violet-600 focus-visible:ring-primary-400'
            }`}
            aria-label={isStudent ? t('schedule.addMyPlanFab') : t('schedule.addEventFab')}
          >
            <motion.span animate={{ rotate: showModal ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <Plus className="w-7 h-7" strokeWidth={2.5} />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <AddEventModal
        open={showModal}
        onClose={closeModal}
        editingEvent={editingEvent}
        defaultDate={selectedDate}
        mode={modalMode}
      />

      <BottomNav />
    </div>
  )
}
