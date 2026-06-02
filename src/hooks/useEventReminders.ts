import { useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { useEventsStore, subscribeEventsAdds } from '@/store/useEventsStore'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification, notificationPermission } from '@/lib/browserNotifications'
import { hasNotifiedEvent, markEventNotified } from '@/lib/notifiedEventsStorage'
import {
  shouldRemindEvent,
  REMINDER_CHECK_MS,
  REMINDER_TITLE,
} from '@/lib/eventReminderLogic'
import type { AppEvent } from '@/types'

const PERM_HINT_KEY = 'timeflow_perm_denied_hint_shown'

function runReminderPass(events: AppEvent[]): void {
  const now = new Date()

  for (const event of events) {
    if (!shouldRemindEvent(event, now)) continue
    if (hasNotifiedEvent(event.id)) continue

    markEventNotified(event.id)
    void showBrowserNotification(REMINDER_TITLE, {
      body: event.title,
      tag:  `event-${event.id}`,
      data: { eventId: event.id, type: 'event_reminder' },
    })
  }
}

export function useEventReminders(): void {
  const { role } = useApp()
  const events = useEventsStore((s) => s.events)
  const { t } = useTranslation()
  const { showToast } = useToast()
  const hintedDenied = useRef(false)

  const checkReminders = useCallback(() => {
    if (role !== 'student') return

    const list = useEventsStore.getState().events
    runReminderPass(list)

    if (
      !hintedDenied.current &&
      notificationPermission() === 'denied' &&
      list.some((e) => shouldRemindEvent(e, new Date()) && !hasNotifiedEvent(e.id))
    ) {
      hintedDenied.current = true
      if (!sessionStorage.getItem(PERM_HINT_KEY)) {
        sessionStorage.setItem(PERM_HINT_KEY, '1')
        showToast(t('notifications.permissionDeniedHint'))
      }
    }
  }, [role, showToast, t])

  useEffect(() => {
    if (role !== 'student') return

    checkReminders()

    const intervalId = window.setInterval(checkReminders, REMINDER_CHECK_MS)
    const unsubAdds = subscribeEventsAdds(() => {
      runReminderPass(useEventsStore.getState().events)
    })

    return () => {
      window.clearInterval(intervalId)
      unsubAdds()
    }
  }, [role, checkReminders])

  useEffect(() => {
    if (role === 'student') checkReminders()
  }, [role, events, checkReminders])
}
