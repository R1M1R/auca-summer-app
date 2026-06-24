import { motion } from 'framer-motion'
import { Plus, BookUser } from 'lucide-react'
import type { TFunction } from 'i18next'
import { dashboardScaleIn } from '@/features/dashboard/lib/dashboardMotion'

interface AddMyPlanCtaProps {
  t: TFunction
  onClick: () => void
}

/** Student CTA to open the personal plan modal. */
export default function AddMyPlanCta({ t, onClick }: AddMyPlanCtaProps) {
  return (
    <motion.button
      type="button"
      variants={dashboardScaleIn}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full glass-card glass-card-interactive px-4 py-4 flex items-center gap-4 border-fuchsia-200/60 dark:border-fuchsia-800/40 bg-gradient-to-r from-fuchsia-50/90 to-violet-50/90 dark:from-fuchsia-950/30 dark:to-violet-950/20"
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
  )
}
