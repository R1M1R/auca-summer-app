import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, Clock, Plus } from 'lucide-react'
import type { TFunction } from 'i18next'
import type { AppEvent, UserRole } from '@/types'
import EventCompleteToggle from '@/components/schedule/EventCompleteToggle'
import { getCategoryPillClass } from '@/lib/categoryStyles'
import { getEventCompleted, canStudentToggleCompletion } from '@/lib/eventCompletion'
import { isStudentPlanForFamily } from '@/lib/eventPermissions'
import { categoryLabel } from '@/features/dashboard/lib/categoryLabel'
import { dashboardFadeUp, dashboardScaleIn } from '@/features/dashboard/lib/dashboardMotion'
import Card from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SkeletonEventList } from '@/components/ui/Skeleton'
import { getUserFacingError } from '@/lib/userFacingError'

interface UpcomingEventsSectionProps {
  role: UserRole
  t: TFunction
  loading: boolean
  error: string | null
  pendingEvents: AppEvent[]
  completedEvents: AppEvent[]
  canAddStudentPlan: boolean
  canFamilyMutate: boolean
  canToggleRole: boolean
  userId: string
  formatEventDate: (d: Date) => string
  onToggle: (event: AppEvent, completed: boolean) => void
  onAddPlan: () => void
}

/** Upcoming 7-day events with completion toggles. */
export default function UpcomingEventsSection({
  role,
  t,
  loading,
  error,
  pendingEvents,
  completedEvents,
  canAddStudentPlan,
  canFamilyMutate,
  canToggleRole,
  userId,
  formatEventDate,
  onToggle,
  onAddPlan,
}: UpcomingEventsSectionProps) {
  const navigate = useNavigate()

  return (
    <motion.div variants={dashboardFadeUp}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {t('dashboard.upcoming')}
        </p>
        {role === 'student' && canAddStudentPlan && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddPlan}
            className="flex items-center gap-1 text-xs font-semibold text-fuchsia-500 hover:text-fuchsia-400"
          >
            <Plus className="w-3.5 h-3.5" />
            {t('dashboard.addMyPlan')}
          </motion.button>
        )}
        {role === 'family' && canFamilyMutate && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/schedule')}
            className="flex items-center gap-1 text-xs font-semibold text-primary-500 hover:text-primary-400"
          >
            <Plus className="w-3.5 h-3.5" />
            {t('dashboard.addTask')}
          </motion.button>
        )}
      </div>

      {loading && <SkeletonEventList count={3} />}

      {error && !loading && (
        <Card className="border-rose-200/70 dark:border-rose-900/50">
          <p className="text-sm text-rose-600 dark:text-rose-400">
            {t('dashboard.eventsLoadError', {
              error: getUserFacingError(new Error(error), t),
            })}
          </p>
        </Card>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {pendingEvents.length === 0 && (
            <motion.p variants={dashboardFadeUp} className="text-center text-sm text-slate-400 py-8">
              {t('dashboard.noTasks')}
            </motion.p>
          )}

          {pendingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              variants={dashboardScaleIn}
              custom={i}
              layout
            >
              <Card interactive className="flex items-start gap-3">
                <EventCompleteToggle
                  completed={getEventCompleted(event, role)}
                  canToggle={canToggleRole && canStudentToggleCompletion(event, userId)}
                  onToggle={() => onToggle(event, getEventCompleted(event, role))}
                  ariaLabel={t('dashboard.markDone', { title: event.title })}
                  ariaLabelReadOnly={
                    role === 'family'
                      ? (getEventCompleted(event, role)
                          ? t('dashboard.familyStudentDone', { title: event.title })
                          : t('dashboard.familyStudentPending', { title: event.title }))
                      : t('dashboard.pendingReadOnly', { title: event.title })
                  }
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                    {event.title}
                  </p>
                  {event.description && (
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{event.description}</p>
                  )}
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {formatEventDate(event.date)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {isStudentPlanForFamily(event) && role === 'family' && (
                    <Badge className="bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white text-[10px] px-2 py-0.5 border-0">
                      {t('dashboard.studentsPlanBadge')}
                    </Badge>
                  )}
                  <Badge className={getCategoryPillClass(event.category)}>
                    {categoryLabel(t, event.category)}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}

          {completedEvents.length > 0 && (
            <motion.details variants={dashboardFadeUp} className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 list-none select-none mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {t('dashboard.completedCount', { count: completedEvents.length })}
                <ChevronRight className="w-3 h-3 transition-transform group-open:rotate-90" />
              </summary>
              <div className="space-y-2">
                {completedEvents.map((event) => (
                  <motion.div key={event.id} layout>
                    <Card className="!py-2.5 flex items-center gap-3 opacity-60">
                      <EventCompleteToggle
                        completed={getEventCompleted(event, role)}
                        canToggle={canToggleRole && canStudentToggleCompletion(event, userId)}
                        onToggle={() => onToggle(event, getEventCompleted(event, role))}
                        ariaLabel={t('dashboard.markUndone', { title: event.title })}
                        ariaLabelReadOnly={t('dashboard.familyStudentDone', { title: event.title })}
                        className="mt-0"
                      />
                      <p className="flex-1 text-sm text-slate-500 dark:text-slate-400 line-through truncate">
                        {event.title}
                      </p>
                      <Badge className={getCategoryPillClass(event.category)}>
                        {categoryLabel(t, event.category)}
                      </Badge>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.details>
          )}
        </div>
      )}
    </motion.div>
  )
}
