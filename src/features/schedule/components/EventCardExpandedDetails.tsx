import { motion } from 'framer-motion'
import { Clock, MapPin, CheckCircle2, Circle } from 'lucide-react'
import type { TFunction } from 'i18next'
import type { AppEvent } from '@/types'
import type { EventCategoryVisual } from '@/features/schedule/lib/eventCategoryVisuals'

interface DisplayEvent {
  title: string
  description: string
  location?: string
  duration?: number
  timeDisplay?: string
  date: Date
  hasExactTime?: boolean
}

interface EventCardExpandedDetailsProps {
  display: DisplayEvent
  event: AppEvent
  cfg: EventCategoryVisual
  t: TFunction
  isDone: boolean
  isPast: boolean
  useExact: boolean
  durationLabel: (min: number) => string
  canEdit: boolean
  canDelete: boolean
  onEdit: () => void
  onDelete: () => void
}

/** Expandable detail panel for schedule event cards. */
export default function EventCardExpandedDetails({
  display,
  cfg,
  t,
  isDone,
  isPast,
  useExact,
  durationLabel,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: EventCardExpandedDetailsProps) {
  return (
    <motion.div
      key="details"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`px-4 pt-3 pb-4 border-t ${cfg.border} space-y-3`}>
        {display.description && (
          <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
            {display.description}
          </p>
        )}
        {display.location && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className={`w-3.5 h-3.5 shrink-0 ${cfg.textColor}`} />
            <span>{display.location}</span>
          </div>
        )}
        {useExact && display.duration && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className={`w-3.5 h-3.5 shrink-0 ${cfg.textColor}`} />
            <span>{durationLabel(display.duration)}</span>
          </div>
        )}
        {!useExact && display.timeDisplay && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className={`w-3.5 h-3.5 shrink-0 ${cfg.textColor}`} />
            <span>{display.timeDisplay}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs">
          {isDone
            ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            : <Circle className={`w-3.5 h-3.5 ${cfg.textColor}`} />
          }
          <span className={isDone ? 'text-emerald-500' : 'text-slate-400'}>
            {isDone
              ? t('eventCard.completed')
              : isPast
                ? t('eventCard.missed')
                : t('eventCard.upcoming')}
          </span>
        </div>
        {(canEdit || canDelete) && (
          <div className="flex gap-2 pt-1">
            {canEdit && (
              <button
                type="button"
                onClick={onEdit}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
              >
                {t('eventCard.editPlan')}
              </button>
            )}
            {canDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
              >
                {t('common.delete')}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
