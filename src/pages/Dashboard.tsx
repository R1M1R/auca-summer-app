import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle2, ListTodo, Plus, Calendar,
  BookOpen, Phone, BookUser,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useUI } from '@/contexts/UIContext'
import CountdownTimer from '@/components/countdown/CountdownTimer'
import PreArrivalCard from '@/components/onboarding/PreArrivalCard'
import ProgramProgressBar from '@/components/ProgramProgressBar'
import AddEventModal from '@/components/schedule/AddEventModal'
import WelcomeModal from '@/components/welcome/WelcomeModal'
import AppPage from '@/components/layout/AppPage'
import { useBeforeMeeting } from '@/features/dashboard/hooks/useBeforeMeeting'
import { useDashboardPage } from '@/features/dashboard/hooks/useDashboardPage'
import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import DashboardHero from '@/features/dashboard/components/DashboardHero'
import DashboardStatsGrid from '@/features/dashboard/components/DashboardStatsGrid'
import StudentPlanAlert from '@/features/dashboard/components/StudentPlanAlert'
import AddMyPlanCta from '@/features/dashboard/components/AddMyPlanCta'
import QuickActionsGrid from '@/features/dashboard/components/QuickActionsGrid'
import UpcomingEventsSection from '@/features/dashboard/components/UpcomingEventsSection'
import { dashboardContainer, dashboardScaleIn } from '@/features/dashboard/lib/dashboardMotion'

/**
 * Home dashboard — orchestrates role-specific widgets.
 * Business logic lives in `useDashboardPage`; UI in `features/dashboard/components`.
 */
export default function Dashboard() {
  const beforeMeeting = useBeforeMeeting()
  const { isDark } = useTheme()
  const { openSOS } = useUI()
  const navigate = useNavigate()

  const page = useDashboardPage()

  const statsItems = useMemo(
    () =>
      page.role === 'family'
        ? [
            {
              icon:     <ListTodo className="w-4 h-4" />,
              value:    page.pendingEvents.length,
              label:    page.t('dashboard.familyUpcoming'),
              gradient: 'from-primary-500 to-violet-600',
            },
            {
              icon:     <BookUser className="w-4 h-4" />,
              value:    page.studentPlansCount,
              label:    page.t('dashboard.familyStudentPlans'),
              gradient: 'from-fuchsia-500 to-violet-600',
            },
            {
              icon:     <CheckCircle2 className="w-4 h-4" />,
              value:    page.completedToday.length,
              label:    page.t('dashboard.familyDoneToday'),
              gradient: 'from-emerald-500 to-teal-600',
            },
          ]
        : [
            {
              icon:     <ListTodo className="w-4 h-4" />,
              value:    page.pendingEvents.length,
              label:    page.t('dashboard.tasksLeft'),
              gradient: 'from-primary-500 to-violet-600',
            },
            {
              icon:     <CheckCircle2 className="w-4 h-4" />,
              value:    page.tasksCompleted,
              label:    page.t('dashboard.tasksDone'),
              gradient: 'from-emerald-500 to-teal-600',
            },
            {
              icon:     <Calendar className="w-4 h-4" />,
              value:    page.completedToday.length,
              label:    page.t('dashboard.doneToday'),
              gradient: 'from-orange-500 to-rose-500',
            },
          ],
    [
      page.role,
      page.pendingEvents.length,
      page.studentPlansCount,
      page.completedToday.length,
      page.tasksCompleted,
      page.t,
    ],
  )

  const quickActions = useMemo(
    () => [
      {
        icon:     <Plus className="w-4 h-4" />,
        label:    page.role === 'student' ? page.t('dashboard.myPlan') : page.t('dashboard.addTask'),
        gradient: 'from-fuchsia-500 to-violet-600',
        onClick:  page.role === 'student'
          ? () => page.setShowPlanModal(true)
          : () => navigate('/schedule'),
      },
      {
        icon:     <Calendar className="w-4 h-4" />,
        label:    page.t('dashboard.schedule'),
        gradient: 'from-emerald-500 to-teal-600',
        onClick:  () => navigate('/schedule'),
      },
      {
        icon:     <BookOpen className="w-4 h-4" />,
        label:    page.t('dashboard.guide'),
        gradient: 'from-amber-500 to-orange-600',
        onClick:  () => navigate('/guide'),
      },
      {
        icon:     <Phone className="w-4 h-4" />,
        label:    page.t('dashboard.sos'),
        gradient: 'from-rose-500 to-red-600',
        onClick:  openSOS,
      },
    ],
    [page.role, page.t, page.setShowPlanModal, navigate, openSOS],
  )

  return (
    <AppPage className={isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}>
      <DashboardHeader />

      <motion.main
        variants={dashboardContainer}
        initial="initial"
        animate="animate"
        className="app-main"
      >
        <DashboardHero
          role={page.role}
          greetingKey={page.greetingKey}
          studentName={page.studentName}
          t={page.t}
          i18nLanguage={page.i18n.language}
          profileLoading={page.profileLoading}
          profileError={page.profileError}
          familyPresence={page.familyPresence}
          familyDisplayName={page.familyDisplayName}
          studentProfile={page.studentProfile}
        />

        {beforeMeeting && (
          <motion.div variants={dashboardScaleIn}>
            <CountdownTimer />
          </motion.div>
        )}

        {beforeMeeting && (
          <motion.div variants={dashboardScaleIn}>
            <PreArrivalCard role={page.role} />
          </motion.div>
        )}

        {page.role === 'student' && !beforeMeeting && (
          <motion.div variants={dashboardScaleIn}>
            <ProgramProgressBar />
          </motion.div>
        )}

        <DashboardStatsGrid items={statsItems} />

        <StudentPlanAlert
          visible={page.role === 'family' && page.hasNew}
          count={page.count}
          t={page.t}
          onDismiss={page.markSeen}
        />

        {page.role === 'student' && page.canAddStudentPlan && (
          <AddMyPlanCta
            t={page.t}
            onClick={() => page.setShowPlanModal(true)}
          />
        )}

        <QuickActionsGrid
          sectionLabel={page.t('dashboard.quickActions')}
          actions={quickActions}
        />

        <UpcomingEventsSection
          role={page.role}
          t={page.t}
          loading={page.loading}
          error={page.error}
          pendingEvents={page.pendingEvents}
          completedEvents={page.completedEvents}
          canAddStudentPlan={page.canAddStudentPlan}
          canFamilyMutate={page.canFamilyMutate}
          canToggleRole={page.canToggleRole}
          userId={page.userId}
          formatEventDate={page.formatEventDate}
          onToggle={page.handleToggle}
          onAddPlan={() => page.setShowPlanModal(true)}
        />
      </motion.main>

      {page.role === 'student' && (
        <AddEventModal
          open={page.showPlanModal}
          onClose={() => page.setShowPlanModal(false)}
          editingEvent={null}
          defaultDate={new Date()}
          mode="student"
        />
      )}

      {page.role === 'student' && (
        <WelcomeModal
          open={page.showWelcome}
          onClose={() => page.setShowWelcome(false)}
        />
      )}
    </AppPage>
  )
}
