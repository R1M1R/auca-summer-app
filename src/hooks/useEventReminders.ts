import { useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { useApp } from '@/contexts/AppContext'
import { useEventsStore, subscribeEventsAdds } from '@/store/useEventsStore'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification, notificationPermission } from '@/lib/browserNotifications'
import { hasNotifiedEvent, markEventNotified } from '@/lib/notifiedEventsStorage'
import {
  shouldRemindEvent,
  REMINDER_CHECK_MS,
} from '@/lib/eventReminderLogic'
import {
  syncRemindersToServiceWorker,
  stopServiceWorkerScheduler,
  listenForSwReminderFired,
} from '@/lib/swReminderBridge'
import type { AppEvent } from '@/types'

const PERM_HINT_KEY = 'timeflow_perm_denied_hint_shown'

function runReminderPass(events: AppEvent[], t: TFunction): void {
  const now = new Date()

  for (const event of events) {
    if (!shouldRemindEvent(event, now)) continue
    if (hasNotifiedEvent(event.id)) continue

    markEventNotified(event.id)
    void showBrowserNotification(t('notifications.reminderTitle'), {
      body: t('notifications.reminderBody', { title: event.title }),
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
    runReminderPass(list, t)
    void syncRemindersToServiceWorker(list, t)

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
    if (role !== 'student') {
      stopServiceWorkerScheduler()
      return
    }

    checkReminders()

    const intervalId = window.setInterval(checkReminders, REMINDER_CHECK_MS)
    const unsubAdds = subscribeEventsAdds(() => {
      const list = useEventsStore.getState().events
      runReminderPass(list, t)
      void syncRemindersToServiceWorker(list, t)
    })

    const unsubSw = listenForSwReminderFired((eventId) => {
      markEventNotified(eventId)
    })

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkReminders()
      } else {
        void syncRemindersToServiceWorker(useEventsStore.getState().events, t)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearInterval(intervalId)
      unsubAdds()
      unsubSw()
      document.removeEventListener('visibilitychange', onVisibility)
      stopServiceWorkerScheduler()
    }
  }, [role, checkReminders, t])

  useEffect(() => {
    if (role === 'student') checkReminders()
  }, [role, events, checkReminders])
}
