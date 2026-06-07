import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Props {
  completed: boolean
  canToggle: boolean
  onToggle?: () => void
  ariaLabel: string
  ariaLabelReadOnly?: string
  className?: string
}

export default function EventCompleteToggle({
  completed,
  canToggle,
  onToggle,
  ariaLabel,
  ariaLabelReadOnly,
  className = '',
}: Props) {
  const label = canToggle ? ariaLabel : (ariaLabelReadOnly ?? ariaLabel)

  const inner = completed ? (
    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} aria-hidden />
  ) : null

  if (!canToggle) {
    return (
      <span
        role="img"
        aria-label={label}
        className={`mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center ${className}`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200 ${
            completed
              ? 'bg-emerald-400 opacity-90'
              : 'border-2 border-slate-300 dark:border-slate-600 opacity-70'
          }`}
        >
          {inner}
        </span>
      </span>
    )
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.stopPropagation()
        onToggle?.()
      }}
      className={`mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${className}`}
      aria-label={label}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200 ${
          completed
            ? 'bg-emerald-400 hover:bg-emerald-500'
            : 'border-2 border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-400'
        }`}
      >
        {inner}
      </span>
    </motion.button>
  )
}
