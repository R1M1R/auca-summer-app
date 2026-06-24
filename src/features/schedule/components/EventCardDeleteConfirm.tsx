import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import type { TFunction } from 'i18next'
import type { EventCategoryVisual } from '@/features/schedule/lib/eventCategoryVisuals'

interface EventCardDeleteConfirmProps {
  title: string
  cfg: EventCategoryVisual
  t: TFunction
  onCancel: () => void
  onConfirm: () => void
}

/** Inline delete confirmation strip inside an event card. */
export default function EventCardDeleteConfirm({
  title,
  cfg,
  t,
  onCancel,
  onConfirm,
}: EventCardDeleteConfirmProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
    >
      <div className={`px-4 pb-3 border-t ${cfg.border} flex items-center gap-3 pt-3`}>
        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
        <p className="text-xs text-slate-600 dark:text-slate-300 flex-1">
          {t('eventCard.deleteConfirm', { title })}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white transition-colors"
          >
            {t('common.delete')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
