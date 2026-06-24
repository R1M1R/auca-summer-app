import { motion } from 'framer-motion'
import { EVENT_DURATIONS, formatDurationShort } from '@/features/schedule/lib/eventCategoryVisuals'

interface EventDurationPickerProps {
  value: number
  onChange: (minutes: number) => void
}

/** Duration chip selector for event form. */
export default function EventDurationPicker({ value, onChange }: EventDurationPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {EVENT_DURATIONS.map((d) => (
        <motion.button
          key={d}
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(d)}
          className={[
            'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
            value === d
              ? 'bg-gradient-to-r from-primary-500 to-violet-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
          ].join(' ')}
        >
          {formatDurationShort(d)}
        </motion.button>
      ))}
    </div>
  )
}
