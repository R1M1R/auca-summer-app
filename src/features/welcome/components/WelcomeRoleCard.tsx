import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { UserRole } from '@/types'

interface WelcomeRoleCardProps {
  roleKey:   'student' | 'family'
  selected:  UserRole
  onSelect:  (r: UserRole) => void
  icon:      React.ReactNode
  label:     string
  sublabel:  string
  gradient:  string
  ringColor: string
}

/** Role picker card on the welcome screen. */
export default function WelcomeRoleCard({
  roleKey,
  selected,
  onSelect,
  icon,
  label,
  sublabel,
  gradient,
  ringColor,
}: WelcomeRoleCardProps) {
  const isSelected = selected === roleKey

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(roleKey)}
      className={[
        'relative flex flex-col items-center gap-4 p-6 rounded-2xl text-center w-full',
        'glass-card glass-card-interactive cursor-pointer select-none transition-all duration-300',
        isSelected
          ? `ring-2 ${ringColor} shadow-glow`
          : 'ring-1 ring-white/20 dark:ring-white/10 hover:ring-white/40',
      ].join(' ')}
      aria-pressed={isSelected}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 600 } }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={isSelected ? { rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{label}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{sublabel}</p>
      </div>
    </motion.button>
  )
}
