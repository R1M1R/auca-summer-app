import { memo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Pencil, Trash2, Clock } from 'lucide-react'
import { showEditDeleteOnCard, isStudentPlanForFamily, canToggleEventComplete } from '@/lib/eventPermissions'
import { getEventCompleted, canStudentToggleCompletion } from '@/lib/eventCompletion'
import EventCompleteToggle from '@/components/schedule/EventCompleteToggle'
import { useDisplayEvent } from '@/hooks/useDisplayEvent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import { getEventCategoryVisual } from '@/features/schedule/lib/eventCategoryVisuals'
import EventCardDeleteConfirm from '@/features/schedule/components/EventCardDeleteConfirm'
import EventCardExpandedDetails from '@/features/schedule/components/EventCardExpandedDetails'
import type { AppEvent, UserRole } from '@/types'

interface Props {
  event:              AppEvent
  role:               UserRole
  userId:             string
  onEditById:         (id: string) => void
  onDeleteById:       (id: string) => void
  onToggleComplete?: (event: AppEvent, completed: boolean) => void
}

function eventCardPropsEqual(prev: Props, next: Props): boolean {
  const a = prev.event
  const b = next.event
  return (
    a.id === b.id &&
    a.updatedAt.getTime() === b.updatedAt.getTime() &&
    a.completed === b.completed &&
    a.studentCompleted === b.studentCompleted &&
    a.title === b.title &&
    a.titleRu === b.titleRu &&
    a.date.getTime() === b.date.getTime() &&
    prev.role === next.role &&
    prev.userId === next.userId &&
    prev.onEditById === next.onEditById &&
    prev.onDeleteById === next.onDeleteById &&
    prev.onToggleComplete === next.onToggleComplete
  )
}

function EventCard({ event, role, userId, onEditById, onDeleteById, onToggleComplete }: Props) {
  const { t } = useTranslation()
  const lang  = useAppLanguage()
  const display = useDisplayEvent(event)

  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const cfg = getEventCategoryVisual(display.category)
  const { Icon } = cfg
  const categoryLabel = t(`categories.${display.category}`)

  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  const timeLabel = (d: Date) =>
    d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })

  const durationLabel = (min: number): string => {
    const h = Math.floor(min / 60)
    const m = min % 60
    if (h === 0) return t('eventCard.durationMinutes', { m })
    if (m === 0) return t('eventCard.durationHours', { h })
    return t('eventCard.durationBoth', { h, m })
  }

  const now = new Date()
  const isPast = display.date < now
  const useExact = display.hasExactTime !== false && !display.timeDisplay

  const startStr = useExact ? timeLabel(display.date) : (display.timeDisplay ?? '—')
  const endStr = useExact && display.duration
    ? timeLabel(new Date(display.date.getTime() + display.duration * 60_000))
    : null

  const isStudent = role === 'student'
  const isFamily = role === 'family'
  const canExpand = isStudent || isFamily
  const isDone = getEventCompleted(display, role)
  const canToggleDone = canToggleEventComplete(role) && canStudentToggleCompletion(event, userId)
  const isStudentPlan = isStudentPlanForFamily(display)
  const { canEdit, canDelete } = showEditDeleteOnCard(event, role, userId)

  const cardRing = isStudentPlan && isFamily
    ? 'ring-2 ring-fuchsia-400/60 dark:ring-fuchsia-500/40'
    : ''

  return (
    <div className="flex gap-3" style={{ opacity: isPast ? 0.45 : 1 }}>
      <div className="flex flex-col items-center gap-0 w-[52px] shrink-0">
        <span className={`text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-3.5 leading-tight text-center ${
          useExact ? 'tabular-nums' : 'max-w-[52px]'
        }`}>
          {startStr}
        </span>
        <div className="flex-1 flex flex-col items-center mt-1">
          <div className={`w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0f0f1a] ${cfg.dot} z-10`} />
        </div>
      </div>

      <div className={`flex-1 min-w-0 border rounded-2xl mb-3 overflow-hidden glass-card-interactive ${cfg.lightBg} ${cfg.border} ${cardRing}`}>
        <div
          role={canExpand ? 'button' : undefined}
          tabIndex={canExpand ? 0 : undefined}
          onClick={() => canExpand && setExpanded((v) => !v)}
          onKeyDown={(e) => canExpand && e.key === 'Enter' && setExpanded((v) => !v)}
          className={`flex gap-3 p-5 ${canExpand ? 'cursor-pointer' : ''}`}
        >
          <EventCompleteToggle
            completed={isDone}
            canToggle={canToggleDone}
            onToggle={
              canToggleDone && onToggleComplete
                ? () => onToggleComplete(event, isDone)
                : undefined
            }
            ariaLabel={
              isDone
                ? t('eventCard.markIncomplete', { title: display.title })
                : t('eventCard.markComplete', { title: display.title })
            }
            ariaLabelReadOnly={
              isDone
                ? (isFamily
                    ? t('eventCard.familyStudentDone', { title: display.title })
                    : t('eventCard.completedReadOnly', { title: display.title }))
                : (isFamily
                    ? t('eventCard.familyStudentPending', { title: display.title })
                    : t('eventCard.pendingReadOnly', { title: display.title }))
            }
          />

          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm`}>
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <p className={`text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug flex-1 ${isDone ? 'line-through opacity-50' : ''}`}>
                {display.title}
              </p>

              {canExpand && (
                <span
                  className="shrink-0 mt-0.5 transition-transform duration-200"
                  style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <ChevronDown className={`w-4 h-4 ${cfg.textColor}`} />
                </span>
              )}

              {(canEdit || canDelete) && !confirmDelete && (
                <div className="flex gap-0.5 shrink-0">
                  {canEdit && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onEditById(event.id) }}
                      className={`p-1.5 rounded-lg ${cfg.lightBg} hover:brightness-95 ${cfg.textColor} transition-all`}
                      aria-label={t('eventCard.edit')}
                    >
                      <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  )}
                  {canDelete && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setConfirmDelete(true) }}
                      className="p-1.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-500 transition-all"
                      aria-label={t('eventCard.delete')}
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3 h-3" />
                {useExact && endStr ? `${startStr} – ${endStr}` : startStr}
                {useExact && display.duration && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600 mx-0.5">·</span>
                    <span>{durationLabel(display.duration)}</span>
                  </>
                )}
              </span>
              <span className={`badge border text-[10px] px-2 py-0.5 ${cfg.lightBg} ${cfg.textColor} ${cfg.border}`}>
                {categoryLabel}
              </span>
              {isStudentPlan && (
                <span className="badge bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white border-0 text-[10px] px-2 py-0.5">
                  {t('eventCard.studentsPlan')}
                </span>
              )}
              {isDone && (
                <span className="badge bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] px-2 py-0.5">
                  {isFamily ? t('eventCard.studentDoneBadge') : t('eventCard.done')}
                </span>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {confirmDelete && (
            <EventCardDeleteConfirm
              title={display.title}
              cfg={cfg}
              t={t}
              onCancel={() => setConfirmDelete(false)}
              onConfirm={() => { setConfirmDelete(false); onDeleteById(event.id) }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {expanded && canExpand && (
            <EventCardExpandedDetails
              display={display}
              event={event}
              cfg={cfg}
              t={t}
              isDone={isDone}
              isPast={isPast}
              useExact={useExact}
              durationLabel={durationLabel}
              canEdit={canEdit}
              canDelete={canDelete}
              onEdit={() => onEditById(event.id)}
              onDelete={() => setConfirmDelete(true)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default memo(EventCard, eventCardPropsEqual)
