import { useTranslation } from 'react-i18next'
import { Clock, Wifi, WifiOff, GraduationCap, Home } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { isConfigured } from '@/lib/firebase'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import AppHeader from '@/components/layout/AppHeader'

/** Dashboard sticky header — role badge + Firebase status. */
export default function DashboardHeader() {
  const { t } = useTranslation()
  const { role } = useApp()
  const RoleIcon = role === 'student' ? GraduationCap : Home

  return (
    <AppHeader>
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
    </AppHeader>
  )
}
