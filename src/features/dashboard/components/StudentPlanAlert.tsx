import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bell, Sparkles, X } from 'lucide-react'
import type { TFunction } from 'i18next'
import Card from '@/components/ui/Card'
import { dashboardScaleIn } from '@/features/dashboard/lib/dashboardMotion'

interface StudentPlanAlertProps {
  visible: boolean
  count: number
  t: TFunction
  onDismiss: () => void
}

/** Host-family banner when the student adds new personal plans. */
export default function StudentPlanAlert({ visible, count, t, onDismiss }: StudentPlanAlertProps) {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={dashboardScaleIn}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <Card
            padding="none"
            className="!p-4 flex items-start gap-3 border-fuchsia-300/50 dark:border-fuchsia-700/40 bg-gradient-to-r from-fuchsia-50/80 to-violet-50/80 dark:from-fuchsia-950/30 dark:to-violet-950/20"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {t('dashboard.newPlanTitle')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
            <button
              type="button"
              onClick={onDismiss}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 transition-colors"
              aria-label={t('dashboard.dismiss')}
            >
              <X className="w-4 h-4" />
            </button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
