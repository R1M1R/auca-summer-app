import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Card from '@/components/ui/Card'
import { dashboardScaleIn } from '@/features/dashboard/lib/dashboardMotion'

interface StatItem {
  icon: ReactNode
  value: number
  label: string
  gradient: string
}

interface DashboardStatsGridProps {
  items: StatItem[]
}

/** Three-column stats row with glass cards. */
export default function DashboardStatsGrid({ items }: DashboardStatsGridProps) {
  return (
    <motion.div
      variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
      className="grid grid-cols-3 gap-3"
    >
      {items.map((s) => (
        <motion.div key={s.label} variants={dashboardScaleIn}>
          <Card interactive className="!p-4 flex flex-col gap-2">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shadow-sm`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none tabular-nums">
              {s.value}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{s.label}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
