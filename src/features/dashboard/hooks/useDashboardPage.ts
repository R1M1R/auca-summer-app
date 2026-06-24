import { useEffect, useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { useAppStore } from '@/store/useAppStore'
import { useToast } from '@/contexts/ToastContext'
import { useEvents, useEventMutations } from '@/hooks/useEvents'
import { useLocalizedEvents } from '@/hooks/useLocalizedEvents'
import { useStudentPlanNotifications } from '@/hooks/useStudentPlanNotifications'
import { useStudentProfile } from '@/hooks/useStudentProfile'
import { usePresenceClock } from '@/hooks/usePresenceClock'
import { getStudentPresenceState } from '@/lib/studentPresence'
import { isStudentPlanForFamily, canToggleEventComplete } from '@/lib/eventPermissions'
import { getEventCompleted, canStudentToggleCompletion } from '@/lib/eventCompletion'
import { isWithinNextDays } from '@/lib/eventWindow'
import { sameDay } from '@/components/schedule/WeekCalendar'
import { hasSeenWelcomeModal } from '@/lib/welcomeStorage'
import { getUserFacingError } from '@/lib/userFacingError'
import type { AppEvent } from '@/types'

/**
 * Aggregates dashboard data, side-effects, and event handlers.
 * Keeps `Dashboard.tsx` as a thin layout shell.
 */
export function useDashboardPage() {
  const { t, i18n } = useTranslation()
  const { role } = useApp()
  const { toast } = useToast()

  const updateStreak   = useAppStore((s) => s.updateStreak)
  const tasksCompleted = useAppStore((s) => s.tasksCompleted)
  const incrementTasks = useAppStore((s) => s.incrementTasksCompleted)
  const cachedName     = useAppStore((s) => s.studentName)
  const userId         = useAppStore((s) => s.userId)
  const ensureUserId   = useAppStore((s) => s.ensureUserId)

  const { events: rawEvents, loading, error } = useEvents()
  const events = useLocalizedEvents(rawEvents)
  const { toggleComplete, canFamilyMutate, canAddStudentPlan } = useEventMutations()
  const { hasNew, count, markSeen } = useStudentPlanNotifications(events)

  const { profile: studentProfile, loading: profileLoading, error: profileError } =
    useStudentProfile()
  const presenceNow = usePresenceClock(10_000)

  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    if (role === 'student' && !hasSeenWelcomeModal()) {
      setShowWelcome(true)
    }
  }, [role])

  useEffect(() => {
    updateStreak()
    if (role === 'student') ensureUserId()
  }, [updateStreak, role, ensureUserId])

  const studentName =
    role === 'student'
      ? (studentProfile?.name || cachedName || t('dashboard.studentFallback'))
      : (studentProfile?.name?.trim() || t('dashboard.studentFallback'))

  const familyPresence =
    role === 'family' ? getStudentPresenceState(studentProfile, presenceNow) : null

  const familyDisplayName =
    familyPresence === 'awaiting'
      ? t('dashboard.awaitingRegistration')
      : studentProfile?.name?.trim() || t('dashboard.awaitingRegistration')

  const hour = new Date().getHours()
  const greetingKey =
    hour < 12 ? 'dashboard.greeting_morning'
    : hour < 18 ? 'dashboard.greeting_afternoon'
    : 'dashboard.greeting_evening'

  const today = useMemo(() => new Date(), [])

  const upcomingWindowEvents = useMemo(
    () => events.filter((e) => isWithinNextDays(e.date, 7)),
    [events],
  )

  const pendingEvents = useMemo(
    () => upcomingWindowEvents.filter((e) => !getEventCompleted(e, role)),
    [upcomingWindowEvents, role],
  )

  const completedEvents = useMemo(
    () => upcomingWindowEvents.filter((e) => getEventCompleted(e, role)),
    [upcomingWindowEvents, role],
  )

  const completedToday = useMemo(
    () => events.filter((e) => getEventCompleted(e, role) && sameDay(e.date, today)),
    [events, today, role],
  )

  const studentPlansCount = useMemo(
    () => events.filter((e) => isStudentPlanForFamily(e)).length,
    [events],
  )

  const canToggleRole = canToggleEventComplete(role)

  const handleToggle = useCallback(
    async (event: AppEvent, completed: boolean) => {
      if (!canToggleRole || !canStudentToggleCompletion(event, userId)) return
      try {
        await toggleComplete(event, !completed)
        if (!completed) incrementTasks()
      } catch (err) {
        toast.error(getUserFacingError(err, t))
      }
    },
    [canToggleRole, userId, toggleComplete, incrementTasks, toast, t],
  )

  const formatEventDate = useCallback(
    (d: Date) =>
      d.toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    [i18n.language],
  )

  return {
    role,
    t,
    i18n,
    greetingKey,
    studentName,
    familyPresence,
    familyDisplayName,
    studentProfile,
    profileLoading,
    profileError,
    events,
    loading,
    error,
    pendingEvents,
    completedEvents,
    completedToday,
    studentPlansCount,
    tasksCompleted,
    hasNew,
    count,
    markSeen,
    canFamilyMutate,
    canAddStudentPlan,
    canToggleRole,
    userId,
    handleToggle,
    formatEventDate,
    showPlanModal,
    setShowPlanModal,
    showWelcome,
    setShowWelcome,
  }
}
