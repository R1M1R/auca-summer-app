import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  GraduationCap, Map, Coffee, Heart, Star, Users, Zap,
  ChevronDown, Pencil, Trash2, Clock, MapPin,
  CheckCircle2, Circle, AlertTriangle, BookUser, ShieldAlert,
} from 'lucide-react'
import { showEditDeleteOnCard, isStudentPlanForFamily } from '@/lib/eventPermissions'
import { useDisplayEvent } from '@/hooks/useDisplayEvent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { AppEvent, EventCategory, UserRole } from '@/types'

interface CatConfig {
  gradient:  string
  lightBg:   string
  border:    string
  textColor: string
  Icon:      React.ElementType
  dot:       string
}

const CAT: Record<EventCategory, CatConfig> = {
  academic: {
    gradient:  'from-indigo-500 to-primary-600',
    lightBg:   'bg-indigo-50/80 dark:bg-indigo-950/30',
    border:    'border-indigo-200/70 dark:border-indigo-800/40',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    Icon:      GraduationCap, dot: 'bg-indigo-500',
  },
  excursion: {
    gradient:  'from-emerald-500 to-teal-600',
    lightBg:   'bg-emerald-50/80 dark:bg-emerald-950/30',
    border:    'border-emerald-200/70 dark:border-emerald-800/40',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    Icon:      Map, dot: 'bg-emerald-500',
  },
  mandatory: {
    gradient:  'from-orange-500 to-red-600',
    lightBg:   'bg-orange-50/80 dark:bg-orange-950/30',
    border:    'border-orange-200/70 dark:border-orange-800/40',
    textColor: 'text-orange-600 dark:text-orange-400',
    Icon:      ShieldAlert, dot: 'bg-orange-500',
  },
  leisure: {
    gradient:  'from-amber-400 to-orange-500',
    lightBg:   'bg-amber-50/80 dark:bg-amber-950/30',
    border:    'border-amber-200/70 dark:border-amber-800/40',
    textColor: 'text-amber-600 dark:text-amber-400',
    Icon:      Coffee, dot: 'bg-amber-400',
  },
  family: {
    gradient:  'from-rose-500 to-pink-600',
    lightBg:   'bg-rose-50/80 dark:bg-rose-950/30',
    border:    'border-rose-200/70 dark:border-rose-800/40',
    textColor: 'text-rose-600 dark:text-rose-400',
    Icon:      Heart, dot: 'bg-rose-500',
  },
  social: {
    gradient:  'from-violet-500 to-purple-600',
    lightBg:   'bg-violet-50/80 dark:bg-violet-950/30',
    border:    'border-violet-200/70 dark:border-violet-800/40',
    textColor: 'text-violet-600 dark:text-violet-400',
    Icon:      Users, dot: 'bg-violet-500',
  },
  personal: {
    gradient:  'from-cyan-500 to-sky-600',
    lightBg:   'bg-cyan-50/80 dark:bg-cyan-950/30',
    border:    'border-cyan-200/70 dark:border-cyan-800/40',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    Icon:      Star, dot: 'bg-cyan-500',
  },
  activity: {
    gradient:  'from-lime-500 to-green-600',
    lightBg:   'bg-lime-50/80 dark:bg-lime-950/30',
    border:    'border-lime-200/70 dark:border-lime-800/40',
    textColor: 'text-lime-600 dark:text-lime-400',
    Icon:      Zap, dot: 'bg-lime-500',
  },
  student_personal: {
    gradient:  'from-fuchsia-500 to-violet-600',
    lightBg:   'bg-fuchsia-50/90 dark:bg-fuchsia-950/40',
    border:    'border-fuchsia-300/80 dark:border-fuchsia-700/50',
    textColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    Icon:      BookUser, dot: 'bg-fuchsia-500',
  },
}

interface Props {
  event:        AppEvent
  role:         UserRole
  userId:       string
  onEditById:   (id: string) => void
  onDeleteById: (id: string) => void
}

function eventCardPropsEqual(prev: Props, next: Props): boolean {
  const a = prev.event
  const b = next.event
  return (
    a.id === b.id &&
    a.updatedAt.getTime() === b.updatedAt.getTime() &&
    a.completed === b.completed &&
    a.title === b.title &&
    a.titleRu === b.titleRu &&
    a.date.getTime() === b.date.getTime() &&
    prev.role === next.role &&
    prev.userId === next.userId &&
    prev.onEditById === next.onEditById &&
    prev.onDeleteById === next.onDeleteById
  )
}

function EventCard({ event, role, userId, onEditById, onDeleteById }: Props) {
  const { t } = useTranslation()
  const lang  = useAppLanguage()
  const display = useDisplayEvent(event)

  const [expanded,      setExpanded]      = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const cfg  = CAT[display.category] ?? CAT.personal
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

  const now       = new Date()
  const isPast    = display.date < now
  const useExact  = display.hasExactTime !== false

  const startStr = useExact
    ? timeLabel(display.date)
    : (display.timeDisplay ?? '—')

  const endStr = useExact && display.duration
    ? timeLabel(new Date(display.date.getTime() + display.duration * 60_000))
    : null

  const isStudent = role === 'student'
  const isFamily  = role === 'family'
  const isStudentPlan = isStudentPlanForFamily(display)
  const { canEdit, canDelete } = showEditDeleteOnCard(event, role, userId)

  const cardRing = isStudentPlan && isFamily
    ? 'ring-2 ring-fuchsia-400/60 dark:ring-fuchsia-500/40'
    : ''

  return (
    <div
      className="flex gap-3"
      style={{ opacity: isPast ? 0.45 : 1 }}
    >
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

      <div
        className={`flex-1 min-w-0 border rounded-2xl mb-3 overflow-hidden ${cfg.lightBg} ${cfg.border} ${cardRing}`}
      >
        <div
          role={isStudent ? 'button' : undefined}
          tabIndex={isStudent ? 0 : undefined}
          onClick={() => isStudent && setExpanded((v) => !v)}
          onKeyDown={(e) => isStudent && e.key === 'Enter' && setExpanded((v) => !v)}
          className={`flex gap-3 p-3.5 ${isStudent ? 'cursor-pointer' : ''}`}
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center text-white shrink-0 mt-0.5`}>
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <p className={`text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-snug flex-1 ${display.completed ? 'line-through opacity-50' : ''}`}>
                {display.title}
              </p>

              {isStudent && (
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
              {display.completed && (
                <span className="badge bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] px-2 py-0.5">
                  {t('eventCard.done')}
                </span>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className={`px-4 pb-3 border-t ${cfg.border} flex items-center gap-3 pt-3`}>
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <p className="text-xs text-slate-600 dark:text-slate-300 flex-1">
                  {t('eventCard.deleteConfirm', { title: display.title })}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setConfirmDelete(false); onDeleteById(event.id) }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white transition-colors"
                  >
                    {t('common.delete')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {expanded && isStudent && (
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
                  {display.completed
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    : <Circle className={`w-3.5 h-3.5 ${cfg.textColor}`} />
                  }
                  <span className={display.completed ? 'text-emerald-500' : 'text-slate-400'}>
                    {display.completed
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
                        onClick={() => onEditById(event.id)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {t('eventCard.editPlan')}
                      </button>
                    )}
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/30"
                      >
                        {t('common.delete')}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default memo(EventCard, eventCardPropsEqual)
