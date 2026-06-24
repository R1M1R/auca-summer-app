import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

/**
 * Premium empty state — floating icon + balanced typography.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center gap-4 py-16 text-center px-8 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-[4.5rem] h-[4.5rem] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/90 dark:from-slate-800 dark:to-slate-700/90 flex items-center justify-center shadow-sm ring-1 ring-slate-200/60 dark:ring-white/5"
      >
        <Icon className="w-9 h-9 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
      </motion.div>
      <div className="max-w-xs">
        <p className="font-semibold text-slate-700 dark:text-slate-200 text-base">{title}</p>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  )
}
