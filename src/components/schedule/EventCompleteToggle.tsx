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

  const baseClass =
    'mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400'

  if (!canToggle) {
    return (
      <span
        role="img"
        aria-label={label}
        className={`${baseClass} ${
          completed
            ? 'bg-emerald-400 cursor-default'
            : 'border-2 border-slate-300 dark:border-slate-600 opacity-70 cursor-not-allowed'
        } ${className}`}
      >
        {completed && (
          <Check className="w-3 h-3 text-white" strokeWidth={3} aria-hidden />
        )}
      </span>
    )
  }

  if (completed) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.85 }}
        onClick={(e) => {
          e.stopPropagation()
          onToggle?.()
        }}
        className={`${baseClass} bg-emerald-400 hover:bg-emerald-500 ${className}`}
        aria-label={label}
      >
        <Check className="w-3 h-3 text-white" strokeWidth={3} aria-hidden />
      </motion.button>
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
      className={`${baseClass} border-2 border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-400 ${className}`}
      aria-label={label}
    />
  )
}
