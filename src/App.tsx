import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useApp }          from '@/contexts/AppContext'
import { useRoleLanguage } from '@/hooks/useRoleLanguage'
import SOSModal            from '@/components/widgets/SOSModal'
import SOSButton           from '@/components/widgets/SOSButton'
import UsefulToolsPanel    from '@/components/widgets/UsefulToolsPanel'
import InstallPWA          from '@/components/install/InstallPWA'

const WelcomeScreen     = lazy(() => import('@/pages/WelcomeScreen'))
const Dashboard         = lazy(() => import('@/pages/Dashboard'))
const ScheduleDashboard = lazy(() => import('@/pages/ScheduleDashboard'))
const SurvivalGuide     = lazy(() => import('@/pages/SurvivalGuide'))
const CultureTips       = lazy(() => import('@/pages/CultureTips'))
const SettingsPage      = lazy(() => import('@/pages/SettingsPage'))
const StudentDiary      = lazy(() => import('@/pages/StudentDiary'))

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f0f1a]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-[3px] border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    </div>
  )
}

function RequireRole({ children }: { children: React.ReactNode }) {
  const { role } = useApp()
  return role ? <>{children}</> : <Navigate to="/" replace />
}

/** Root: auto-redirect if session exists (device recognition) */
function RootRoute() {
  const { role } = useApp()
  return role ? <Navigate to="/dashboard" replace /> : <WelcomeScreen />
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
      <Suspense fallback={<Loader />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<RootRoute />} />

            <Route path="/dashboard"
              element={<RequireRole><Dashboard /></RequireRole>}
            />
            <Route path="/schedule"
              element={<RequireRole><ScheduleDashboard /></RequireRole>}
            />
            <Route path="/guide"
              element={<RequireRole><SurvivalGuide /></RequireRole>}
            />
            <Route path="/culture"
              element={<RequireRole><CultureTips /></RequireRole>}
            />
            <Route path="/settings"
              element={<RequireRole><SettingsPage /></RequireRole>}
            />
            <Route path="/diary"
              element={<RequireRole><StudentDiary /></RequireRole>}
            />

            {/* Legacy redirects */}
            <Route path="/tasks"    element={<Navigate to="/diary"     replace />} />
            <Route path="/progress" element={<Navigate to="/dashboard" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <GlobalWidgets />
      <InstallPWA />
    </>
  )
}
