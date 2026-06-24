import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useEventMutations } from '@/hooks/useEvents'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import { useToast } from '@/contexts/ToastContext'
import { getUserFacingError } from '@/lib/userFacingError'
import { toLocalDateStr, toLocalTimeStr } from '@/features/schedule/lib/eventCategoryVisuals'
import type { AppEvent, EventCategory } from '@/types'

export type EventFormField = 'title' | 'description' | 'date' | 'time' | 'location' | 'duration'
export type EventFieldErrors = Partial<Record<EventFormField, string>>

interface UseEventFormOptions {
  open: boolean
  editingEvent: AppEvent | null
  defaultDate: Date
  isStudent: boolean
  onClose: () => void
}

/**
 * Form state, validation, and Firebase mutations for AddEventModal.
 */
export function useEventForm({
  open,
  editingEvent,
  defaultDate,
  isStudent,
  onClose,
}: UseEventFormOptions) {
  const { t } = useTranslation()
  const lang = useAppLanguage()
  const { toast } = useToast()
  const { addEvent, updateEvent } = useEventMutations()

  const isEdit = Boolean(editingEvent)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dateStr, setDateStr] = useState(toLocalDateStr(defaultDate))
  const [timeStr, setTimeStr] = useState('09:00')
  const [category, setCategory] = useState<EventCategory>(isStudent ? 'student_personal' : 'academic')
  const [location, setLocation] = useState('')
  const [duration, setDuration] = useState<number>(60)
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<EventFieldErrors>({})
  const [error, setError] = useState<string | null>(null)

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

  const clearFieldError = useCallback((field: EventFormField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const validate = useCallback((): { ok: boolean; parsedDate: Date | null } => {
    const errors: EventFieldErrors = {}
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

    if (!dateStr) errors.date = t('schedule.modal.validation.dateRequired')
    if (!timeStr) errors.time = t('schedule.modal.validation.timeRequired')
    if (locationValue.length > 120) errors.location = t('schedule.modal.validation.locationTooLong')
    if (!Number.isFinite(duration) || duration <= 0) {
      errors.duration = t('schedule.modal.validation.durationInvalid')
    }

    const parsedDate = new Date(`${dateStr}T${timeStr}:00`)
    if (Number.isNaN(parsedDate.getTime())) {
      if (!errors.date) errors.date = t('schedule.modal.validation.dateInvalid')
      if (!errors.time) errors.time = t('schedule.modal.validation.timeInvalid')
    } else if (!isEdit && parsedDate.getTime() <= Date.now()) {
      errors.date = t('schedule.modal.futureDateError')
      errors.time = t('schedule.modal.futureDateError')
    } else if (isEdit && isStudent && parsedDate.getTime() <= Date.now()) {
      errors.date = t('schedule.modal.futureDateError')
      errors.time = t('schedule.modal.futureDateError')
    }

    setFieldErrors(errors)
    return { ok: Object.keys(errors).length === 0, parsedDate }
  }, [title, description, dateStr, timeStr, location, duration, isEdit, isStudent, t])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
          toast.success(t('schedule.eventUpdated'))
        } else {
          await addEvent(payload, { asStudent: isStudent })
          toast.success(t('schedule.eventSaved'))
        }
        onClose()
      } catch (err) {
        setError(getUserFacingError(err, t))
      } finally {
        setSubmitting(false)
      }
    },
    [
      validate, title, description, isStudent, category, duration, location,
      isEdit, editingEvent, updateEvent, addEvent, toast, t, onClose,
    ],
  )

  return {
    isEdit,
    title, setTitle,
    description, setDescription,
    dateStr, setDateStr,
    timeStr, setTimeStr,
    category, setCategory,
    location, setLocation,
    duration, setDuration,
    submitting,
    fieldErrors,
    error,
    clearFieldError,
    handleSubmit,
  }
}
