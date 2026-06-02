import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useRoleLanguage } from '@/hooks/useRoleLanguage'
import FirestoreSync from '@/components/FirestoreSync'
import ErrorBoundary from '@/components/ErrorBoundary'
import PageLoader from '@/components/ui/PageLoader'
import { routeTransition } from '@/lib/motion'
import SOSModal from '@/components/widgets/SOSModal'
import SOSButton from '@/components/widgets/SOSButton'
import UsefulToolsPanel from '@/components/widgets/UsefulToolsPanel'
import InstallPWA from '@/components/install/InstallPWA'

const WelcomeScreen     = lazy(() => import('@/pages/WelcomeScreen'))
const Dashboard         = lazy(() => import('@/pages/Dashboard'))
const ScheduleDashboard = lazy(() => import('@/pages/ScheduleDashboard'))
const SurvivalGuide     = lazy(() => import('@/pages/SurvivalGuide'))
const CultureTips       = lazy(() => import('@/pages/CultureTips'))
const SettingsPage      = lazy(() => import('@/pages/SettingsPage'))
const StudentDiary      = lazy(() => import('@/pages/StudentDiary'))

function RequireRole({ children }: { children: React.ReactNode }) {
  const { role } = useApp()
  return role ? <>{children}</> : <Navigate to="/" replace />
}

function RootRoute() {
  const { role } = useApp()
  return role ? <Navigate to="/dashboard" replace /> : <WelcomeScreen />
}

function RouteShell({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary nested>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

function GlobalWidgets() {
  const { role } = useApp()
  if (!role) return null
  return (
    <>
      <SOSButton />
      <UsefulToolsPanel />
      <SOSModal />
    </>
  )
}

export default function App() {
  const location = useLocation()
  useRoleLanguage()

  return (
    <>
      <FirestoreSync />
      <motion.div
        key={location.pathname}
        className="page-shell min-h-screen"
        variants={routeTransition}
        initial="initial"
        animate="animate"
      >
        <Routes location={location}>
          <Route path="/" element={<RouteShell><RootRoute /></RouteShell>} />

          <Route
            path="/dashboard"
            element={<RouteShell><RequireRole><Dashboard /></RequireRole></RouteShell>}
          />
          <Route
            path="/schedule"
            element={<RouteShell><RequireRole><ScheduleDashboard /></RequireRole></RouteShell>}
          />
          <Route
            path="/guide"
            element={<RouteShell><RequireRole><SurvivalGuide /></RequireRole></RouteShell>}
          />
          <Route
            path="/culture"
            element={<RouteShell><RequireRole><CultureTips /></RequireRole></RouteShell>}
          />
          <Route
            path="/settings"
            element={<RouteShell><RequireRole><SettingsPage /></RequireRole></RouteShell>}
          />
          <Route
            path="/diary"
            element={<RouteShell><RequireRole><StudentDiary /></RequireRole></RouteShell>}
          />

          <Route path="/tasks" element={<Navigate to="/diary" replace />} />
          <Route path="/progress" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>

      <GlobalWidgets />
      <InstallPWA />
    </>
  )
}
