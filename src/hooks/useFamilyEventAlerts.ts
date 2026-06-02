import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { subscribeEventsAdds } from '@/store/useEventsStore'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification } from '@/lib/browserNotifications'
import { isStudentPlanForFamily } from '@/lib/eventPermissions'
import { formatEventTime } from '@/lib/eventReminderLogic'
const NOTIFY_TITLE = 'Student plan / План студента'

export function useFamilyEventAlerts(): void {
  const { role } = useApp()
  const { t, i18n } = useTranslation()
  const { showToast } = useToast()
  const ignoreAdds = useRef(true)

  useEffect(() => {
    if (role !== 'family') return

    ignoreAdds.current = true

    const primeTimer = window.setTimeout(() => {
      ignoreAdds.current = false
    }, 800)

    const locale = i18n.language === 'ru' ? 'ru-RU' : 'en-US'

    const unsub = subscribeEventsAdds((added) => {
      if (ignoreAdds.current) return

      for (const event of added) {
        if (!isStudentPlanForFamily(event)) continue

        const timeStr = formatEventTime(event, locale)
        const body = t('notifications.familyNewEventBody', {
          title: event.title,
          time:  timeStr,
        })

        void showBrowserNotification(NOTIFY_TITLE, {
          body,
          tag:  `student-event-${event.id}`,
          data: { eventId: event.id, type: 'student_event' },
        })
        showToast(body)
      }
    })

    return () => {
      window.clearTimeout(primeTimer)
      unsub()
    }
  }, [role, showToast, t, i18n.language])
}
