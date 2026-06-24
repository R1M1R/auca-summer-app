import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HOST_EVENT_CATEGORIES } from '@/features/schedule/lib/eventCategoryVisuals'
import type { EventCategory } from '@/types'

interface EventCategoryPickerProps {
  value: EventCategory
  onChange: (category: EventCategory) => void
}

/** Grid of host-family event categories. */
export default function EventCategoryPicker({ value, onChange }: EventCategoryPickerProps) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-4 gap-2">
      {HOST_EVENT_CATEGORIES.map(({ value: catValue, color, Icon: CatIcon }) => {
        const active = value === catValue
        return (
          <motion.button
            key={catValue}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(catValue)}
            className={[
              'flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border text-[10px] font-semibold transition-all duration-200',
              active
                ? 'border-transparent text-white shadow-sm'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400',
            ].join(' ')}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${active ? `bg-gradient-to-br ${color}` : 'bg-slate-100 dark:bg-slate-800'}`}>
              <CatIcon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-400'}`} strokeWidth={2} />
            </div>
            <span>{t(`categories.${catValue}`)}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
