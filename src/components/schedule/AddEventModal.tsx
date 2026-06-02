import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  X, FileText, Calendar, Clock, Tag, MapPin,
  GraduationCap, Map, Coffee, Heart, Users, Star, Zap, BookUser, ShieldAlert,
} from 'lucide-react'
import { useEventMutations } from '@/hooks/useEvents'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import { getUserFacingError } from '@/lib/userFacingError'
import type { AppEvent, EventCategory } from '@/types'

const HOST_CATEGORIES: { value: EventCategory; color: string; Icon: React.ElementType }[] = [
  { value: 'academic',  color: 'from-indigo-500 to-primary-600', Icon: GraduationCap },
  { value: 'excursion', color: 'from-emerald-500 to-teal-600',   Icon: Map           },
  { value: 'mandatory', color: 'from-orange-500 to-red-600',     Icon: ShieldAlert   },
  { value: 'leisure',   color: 'from-amber-400 to-orange-500',   Icon: Coffee        },
  { value: 'family',    color: 'from-rose-500 to-pink-600',      Icon: Heart         },
  { value: 'social',    color: 'from-violet-500 to-purple-600',  Icon: Users         },
  { value: 'personal',  color: 'from-cyan-500 to-sky-600',       Icon: Star          },
  { value: 'activity',  color: 'from-lime-500 to-green-600',     Icon: Zap           },
]

const STUDENT_CAT = {
  value: 'student_personal' as const,
  color: 'from-fuchsia-500 to-violet-600',
  Icon: BookUser,
}

const DURATIONS = [30, 60, 90, 120, 180, 240, 480] as const

function durLabel(m: number) {
  const h = Math.floor(m / 60)
  const r = m % 60
  if (h === 0) return `${r}m`
  if (r === 0) return `${h}h`
  return `${h}h${r}m`
}

function toLocalDateStr(d: Date): string {
  const y  = d.getFullYear()
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const da = String(d.getDate()).padStart(2, '0')
  return `${y}-${mo}-${da}`
}

function toLocalTimeStr(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

interface Props {
  open:         boolean
  onClose:      () => void
  editingEvent: AppEvent | null
  defaultDate:  Date
  mode:         'family' | 'student'
}

type FieldName = 'title' | 'description' | 'date' | 'time' | 'location' | 'duration'
type FieldErrors = Partial<Record<FieldName, string>>

export default function AddEventModal({ open, onClose, editingEvent, defaultDate, mode }: Props) {
  const { t } = useTranslation()
  const lang  = useAppLanguage()
  const { addEvent, updateEvent } = useEventMutations()
  const formId   = useId()
  const isEdit   = Boolean(editingEvent)
  const isStudent = mode === 'student'

  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')
  const [dateStr,     setDateStr]     = useState(toLocalDateStr(defaultDate))
  const [timeStr,     setTimeStr]     = useState('09:00')
  const [category,    setCategory]    = useState<EventCategory>(isStudent ? 'student_personal' : 'academic')
  const [location,    setLocation]    = useState('')
  const [duration,    setDuration]    = useState<number>(60)
  const [submitting,  setSubmitting]  = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error,       setError]       = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    if (editingEvent) {
      const useRu = lang === 'ru'
      setTitle(useRu ? (editingEvent.titleRu ?? editingEvent.title) : editingEvent.title)
      setDescription(useRu ? (editingEvent.descriptionRu ?? editingEvent.description) : editingEvent.description)
      setDateStr(toLocalDateStr(editingEvent.date))
      setTimeStr(toLocalTimeStr(editingEvent.date))
      setCategory(editingEvent.category)
      setLocation(useRu ? (editingEvent.locationRu ?? editingEvent.location ?? '') : (editingEvent.location ?? ''))
      setDuration(editingEvent.duration ?? 60)
    } else {
      setTitle('')
      setDescription('')
      setDateStr(toLocalDateStr(defaultDate))
      setTimeStr('09:00')
      setCategory(isStudent ? 'student_personal' : 'academic')
      setLocation('')
      setDuration(60)
    }
    setFieldErrors({})
    setError(null)
  }, [open, editingEvent, defaultDate, isStudent, lang])

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = (): { ok: boolean; parsedDate: Date | null } => {
    const errors: FieldErrors = {}
    const titleValue = title.trim()
    const descriptionValue = description.trim()
    const locationValue = location.trim()

    if (!titleValue) {
      errors.title = t('schedule.modal.validation.titleRequired')
    } else if (titleValue.length < 3) {
      errors.title = t('schedule.modal.validation.titleTooShort')
    } else if (titleValue.length > 80) {
      errors.title = t('schedule.modal.validation.titleTooLong')
    }

    if (descriptionValue.length > 500) {
      errors.description = t('schedule.modal.validation.descriptionTooLong')
    }

    if (!dateStr) {
      errors.date = t('schedule.modal.validation.dateRequired')
    }

    if (!timeStr) {
      errors.time = t('schedule.modal.validation.timeRequired')
    }

    if (locationValue.length > 120) {
      errors.location = t('schedule.modal.validation.locationTooLong')
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      errors.duration = t('schedule.modal.validation.durationInvalid')
    }

    const parsedDate = new Date(`${dateStr}T${timeStr}:00`)
    if (Number.isNaN(parsedDate.getTime())) {
      if (!errors.date) errors.date = t('schedule.modal.validation.dateInvalid')
      if (!errors.time) errors.time = t('schedule.modal.validation.timeInvalid')
    } else if (parsedDate.getTime() <= Date.now()) {
      errors.date = t('schedule.modal.futureDateError')
      errors.time = t('schedule.modal.futureDateError')
    }

    setFieldErrors(errors)
    return { ok: Object.keys(errors).length === 0, parsedDate }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { ok, parsedDate } = validate()
    if (!ok || !parsedDate) return

    setSubmitting(true)
    setError(null)
    try {
      const payload = {
        title:       title.trim(),
        description: description.trim(),
        date:        parsedDate,
        category:    isStudent ? ('student_personal' as const) : category,
        duration,
        location:    location.trim() || undefined,
      }
      if (isEdit && editingEvent) {
        await updateEvent(editingEvent.id, payload, editingEvent)
      } else {
        await addEvent(payload, { asStudent: isStudent })
      }
      onClose()
    } catch (err) {
      setError(getUserFacingError(err, t))
    } finally {
      setSubmitting(false)
    }
  }

  const categories = isStudent ? [STUDENT_CAT] : HOST_CATEGORIES
  const selectedCat = categories.find((c) => c.value === category) ?? categories[0]

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
                    {isEdit
                      ? (isStudent ? t('schedule.modal.editMyPlan') : t('schedule.modal.editEvent'))
                      : (isStudent ? t('schedule.modal.addMyPlan') : t('schedule.modal.newEvent'))}
                  </h2>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {isStudent && !isEdit && (
                <p className="text-xs text-fuchsia-600 dark:text-fuchsia-400 mb-4 -mt-2">
                  {t('schedule.modal.studentHint')}
                </p>
              )}

              <form id={formId} onSubmit={handleSubmit} className="space-y-4">
                <Field label={t('schedule.modal.title')} Icon={FileText}>
                  <input
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); clearFieldError('title') }}
                    placeholder={isStudent ? t('schedule.modal.titlePlaceholderStudent') : t('schedule.modal.titlePlaceholderHost')}
                    required
                    className="input-field"
                  />
                  {fieldErrors.title && <FieldError message={fieldErrors.title} />}
                </Field>

                <Field label={t('schedule.modal.description')} Icon={FileText}>
                  <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); clearFieldError('description') }}
                    placeholder={t('schedule.modal.descriptionPlaceholder')}
                    rows={2}
                    className="input-field resize-none"
                  />
                  {fieldErrors.description && <FieldError message={fieldErrors.description} />}
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label={t('schedule.modal.date')} Icon={Calendar}>
                    <input
                      type="date"
                      value={dateStr}
                      onChange={(e) => { setDateStr(e.target.value); clearFieldError('date') }}
                      required
                      className="input-field"
                    />
                    {fieldErrors.date && <FieldError message={fieldErrors.date} />}
                  </Field>
                  <Field label={t('schedule.modal.time')} Icon={Clock}>
                    <input
                      type="time"
                      value={timeStr}
                      onChange={(e) => { setTimeStr(e.target.value); clearFieldError('time') }}
                      required
                      className="input-field"
                    />
                    {fieldErrors.time && <FieldError message={fieldErrors.time} />}
                  </Field>
                </div>

                {!isStudent && (
                  <Field label={t('schedule.modal.category')} Icon={Tag}>
                    <div className="grid grid-cols-4 gap-2">
                      {HOST_CATEGORIES.map(({ value, color, Icon: CatIcon }) => {
                        const active = category === value
                        return (
                          <motion.button
                            key={value}
                            type="button"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCategory(value)}
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
                            <span>{t(`categories.${value}`)}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </Field>
                )}

                <Field label={t('schedule.modal.location')} Icon={MapPin}>
                  <input
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); clearFieldError('location') }}
                    placeholder={t('schedule.modal.locationPlaceholder')}
                    className="input-field"
                  />
                  {fieldErrors.location && <FieldError message={fieldErrors.location} />}
                </Field>

                <Field label={t('schedule.modal.duration')} Icon={Clock}>
                  <div className="flex gap-2 flex-wrap">
                    {DURATIONS.map((d) => (
                      <motion.button
                        key={d}
                        type="button"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDuration(d)}
                        className={[
                          'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                          duration === d
                            ? 'bg-gradient-to-r from-primary-500 to-violet-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
                        ].join(' ')}
                      >
                        {durLabel(d)}
                      </motion.button>
                    ))}
                  </div>
                  {fieldErrors.duration && <FieldError message={fieldErrors.duration} />}
                </Field>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  form={formId}
                  disabled={submitting || !title.trim()}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full h-12 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <span>
                      {submitting && isStudent
                        ? t('schedule.modal.translating')
                        : (isEdit ? t('schedule.modal.saveChanges') : (isStudent ? t('schedule.modal.addMyPlan') : t('schedule.modal.addToSchedule')))}
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label, Icon, children,
}: {
  label: string
  Icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      {children}
    </div>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="text-xs text-rose-500 dark:text-rose-400 leading-relaxed">
      {message}
    </p>
  )
}
