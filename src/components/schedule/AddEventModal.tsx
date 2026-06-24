import { useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  X, FileText, Calendar, Clock, Tag, MapPin,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useEventForm } from '@/features/schedule/hooks/useEventForm'
import { EventFormField } from '@/features/schedule/components/EventFormField'
import EventCategoryPicker from '@/features/schedule/components/EventCategoryPicker'
import EventDurationPicker from '@/features/schedule/components/EventDurationPicker'
import {
  HOST_EVENT_CATEGORIES,
  STUDENT_EVENT_CATEGORY,
} from '@/features/schedule/lib/eventCategoryVisuals'
import type { AppEvent } from '@/types'

interface Props {
  open:         boolean
  onClose:      () => void
  editingEvent: AppEvent | null
  defaultDate:  Date
  mode:         'family' | 'student'
}

export default function AddEventModal({ open, onClose, editingEvent, defaultDate, mode }: Props) {
  const { t } = useTranslation()
  const formId = useId()
  const isStudent = mode === 'student'

  const form = useEventForm({
    open,
    editingEvent,
    defaultDate,
    isStudent,
    onClose,
  })

  const categories = isStudent ? [STUDENT_EVENT_CATEGORY] : HOST_EVENT_CATEGORIES
  const selectedCat = categories.find((c) => c.value === form.category) ?? categories[0]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end max-w-lg mx-auto">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div className="glass-card rounded-t-3xl rounded-b-none px-5 pt-3 pb-10 overflow-y-auto max-h-[90dvh]">
              <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${selectedCat.color} flex items-center justify-center text-white shadow-sm`}>
                    <selectedCat.Icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {form.isEdit
                      ? (isStudent ? t('schedule.modal.editMyPlan') : t('schedule.modal.editEvent'))
                      : (isStudent ? t('schedule.modal.addMyPlan') : t('schedule.modal.newEvent'))}
                  </h2>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                  aria-label={t('welcome.close')}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {isStudent && !form.isEdit && (
                <p className="text-xs text-fuchsia-600 dark:text-fuchsia-400 mb-4 -mt-2">
                  {t('schedule.modal.studentHint')}
                </p>
              )}

              <form id={formId} onSubmit={form.handleSubmit} className="space-y-4">
                <EventFormField
                  label={t('schedule.modal.title')}
                  Icon={FileText}
                  error={form.fieldErrors.title}
                >
                  <input
                    value={form.title}
                    onChange={(e) => { form.setTitle(e.target.value); form.clearFieldError('title') }}
                    placeholder={isStudent ? t('schedule.modal.titlePlaceholderStudent') : t('schedule.modal.titlePlaceholderHost')}
                    required
                    className="input-field"
                  />
                </EventFormField>

                <EventFormField
                  label={t('schedule.modal.description')}
                  Icon={FileText}
                  error={form.fieldErrors.description}
                >
                  <textarea
                    value={form.description}
                    onChange={(e) => { form.setDescription(e.target.value); form.clearFieldError('description') }}
                    placeholder={t('schedule.modal.descriptionPlaceholder')}
                    rows={2}
                    className="input-field resize-none"
                  />
                </EventFormField>

                <div className="grid grid-cols-2 gap-3">
                  <EventFormField
                    label={t('schedule.modal.date')}
                    Icon={Calendar}
                    error={form.fieldErrors.date}
                  >
                    <input
                      type="date"
                      value={form.dateStr}
                      onChange={(e) => { form.setDateStr(e.target.value); form.clearFieldError('date') }}
                      required
                      className="input-field"
                    />
                  </EventFormField>
                  <EventFormField
                    label={t('schedule.modal.time')}
                    Icon={Clock}
                    error={form.fieldErrors.time}
                  >
                    <input
                      type="time"
                      value={form.timeStr}
                      onChange={(e) => { form.setTimeStr(e.target.value); form.clearFieldError('time') }}
                      required
                      className="input-field"
                    />
                  </EventFormField>
                </div>

                {!isStudent && (
                  <EventFormField label={t('schedule.modal.category')} Icon={Tag}>
                    <EventCategoryPicker value={form.category} onChange={form.setCategory} />
                  </EventFormField>
                )}

                <EventFormField
                  label={t('schedule.modal.location')}
                  Icon={MapPin}
                  error={form.fieldErrors.location}
                >
                  <input
                    value={form.location}
                    onChange={(e) => { form.setLocation(e.target.value); form.clearFieldError('location') }}
                    placeholder={t('schedule.modal.locationPlaceholder')}
                    className="input-field"
                  />
                </EventFormField>

                <EventFormField
                  label={t('schedule.modal.duration')}
                  Icon={Clock}
                  error={form.fieldErrors.duration}
                >
                  <EventDurationPicker value={form.duration} onChange={form.setDuration} />
                </EventFormField>

                <AnimatePresence>
                  {form.error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-sm"
                    >
                      {form.error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  form={formId}
                  variant="primary"
                  fullWidth
                  isLoading={form.submitting}
                  disabled={!form.title.trim()}
                  className="h-12 mt-2"
                >
                  {form.submitting && isStudent
                    ? t('schedule.modal.translating')
                    : form.isEdit
                      ? t('schedule.modal.saveChanges')
                      : isStudent
                        ? t('schedule.modal.addMyPlan')
                        : t('schedule.modal.addToSchedule')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
