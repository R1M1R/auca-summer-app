import { motion } from 'framer-motion'
import { dashboardScaleIn } from '@/features/dashboard/lib/dashboardMotion'

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  gradient?: string
}

function QuickAction({
  icon,
  label,
  onClick,
  gradient = 'from-primary-500 to-violet-600',
}: QuickActionProps) {
  return (
    <motion.button
      type="button"
      variants={dashboardScaleIn}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="glass-card glass-card-interactive flex flex-col items-center gap-2 p-3 hover:ring-1 hover:ring-primary-400/40"
    >
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
        {icon}
      </div>
      <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 text-center leading-tight">
        {label}
      </span>
    </motion.button>
  )
}

interface QuickActionsGridProps {
  actions: QuickActionProps[]
  sectionLabel: string
}

/** Four-column quick navigation grid. */
export default function QuickActionsGrid({ actions, sectionLabel }: QuickActionsGridProps) {
  return (
    <motion.div variants={{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }}>
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
        {sectionLabel}
      </p>
      <motion.div
        variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
        className="grid grid-cols-4 gap-2"
      >
        {actions.map((action) => (
          <QuickAction key={action.label} {...action} />
        ))}
      </motion.div>
    </motion.div>
  )
}
