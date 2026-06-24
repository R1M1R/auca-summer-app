import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/contexts/AppContext'
import { subscribeDiaryAdds } from '@/store/useDiaryStore'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification } from '@/lib/browserNotifications'
import type { DiaryEntry } from '@/types'

function entryCreatedAt(entry: DiaryEntry): Date {
  return entry.createdAt ?? entry.date
}

export function useDiaryAlerts(): void {
  const { role } = useApp()
  const { t } = useTranslation()
  const { toast } = useToast()
  const sessionStartedAt = useRef(0)
  const ignoreAdds       = useRef(true)

  useEffect(() => {
    if (role !== 'family') return

    sessionStartedAt.current = Date.now()
    ignoreAdds.current = true

    const primeTimer = window.setTimeout(() => {
      ignoreAdds.current = false
    }, 800)

    const unsub = subscribeDiaryAdds((added) => {
      if (ignoreAdds.current) return

      const sessionStart = sessionStartedAt.current

      for (const entry of added) {
        const created = entryCreatedAt(entry)
        if (created.getTime() < sessionStart) continue

        const title = t('notifications.diaryTitle')
        const body = t('notifications.diaryBody')

        void showBrowserNotification(title, {
          body,
          tag:  `diary-${entry.id}`,
          data: { entryId: entry.id, type: 'diary_entry' },
        })
        toast.info(body)
      }
    })

    return () => {
      window.clearTimeout(primeTimer)
      unsub()
    }
  }, [role, toast, t])
}
