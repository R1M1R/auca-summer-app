import { useEffect, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { subscribeDiaryAdds } from '@/store/useDiaryStore'
import { useToast } from '@/contexts/ToastContext'
import { showBrowserNotification } from '@/lib/browserNotifications'
import type { DiaryEntry } from '@/types'

const DIARY_NOTIFY_TITLE = 'Diary / Дневник'
const DIARY_NOTIFY_BODY =
  'Студент сделал новую запись в дневник / New diary entry'

function entryCreatedAt(entry: DiaryEntry): Date {
  return entry.createdAt ?? entry.date
}

export function useDiaryAlerts(): void {
  const { role } = useApp()
  const { showToast } = useToast()
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

        void showBrowserNotification(DIARY_NOTIFY_TITLE, {
          body: DIARY_NOTIFY_BODY,
          tag:  `diary-${entry.id}`,
          data: { entryId: entry.id, type: 'diary_entry' },
        })
        showToast(DIARY_NOTIFY_BODY)
      }
    })

    return () => {
      window.clearTimeout(primeTimer)
      unsub()
    }
  }, [role, showToast])
}
