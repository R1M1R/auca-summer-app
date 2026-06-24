import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { subscribeStudentActivities } from '@/store/useEventsStore'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification } from '@/lib/browserNotifications'
import { localizeEvent } from '@/lib/localizedContent'
import { formatEventTime } from '@/lib/eventReminderLogic'
import type { StudentActivity, StudentActivityType } from '@/lib/studentActivity'

function activityMessage(
  activity: StudentActivity,
  t: (key: string, opts?: Record<string, string>) => string,
  locale: string,
): { title: string; body: string } {
  const display = localizeEvent(activity.event, 'family', 'ru')
  const timeStr = formatEventTime(activity.event, locale)

  const bodies: Record<StudentActivityType, string> = {
    plan_added:    t('notifications.studentActivity.planAdded', { title: display.title, time: timeStr }),
    plan_updated:  t('notifications.studentActivity.planUpdated', { title: display.title }),
    plan_deleted:  t('notifications.studentActivity.planDeleted', { title: display.title }),
    marked_done:   t('notifications.studentActivity.markedDone', { title: display.title }),
    marked_undone: t('notifications.studentActivity.markedUndone', { title: display.title }),
  }

  return {
    title: t('notifications.studentActivity.title'),
    body:  bodies[activity.type],
  }
}

export function useFamilyStudentActivityAlerts(): void {
  const { role } = useApp()
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const ignoreRef = useRef(true)

  useEffect(() => {
    if (role !== 'family') return

    ignoreRef.current = true
    const primeTimer = window.setTimeout(() => {
      ignoreRef.current = false
    }, 1200)

    const locale = i18n.language === 'ru' ? 'ru-RU' : 'en-US'

    const unsub = subscribeStudentActivities((activities) => {
      if (ignoreRef.current) return

      for (const activity of activities) {
        const { title, body } = activityMessage(activity, t, locale)

        void showBrowserNotification(title, {
          body,
          tag:  `student-activity-${activity.type}-${activity.event.id}`,
          data: { eventId: activity.event.id, type: 'student_activity', activityType: activity.type },
        })
        toast.info(body)
      }
    })

    return () => {
      window.clearTimeout(primeTimer)
      unsub()
    }
  }, [role, toast, t, i18n.language])
}
