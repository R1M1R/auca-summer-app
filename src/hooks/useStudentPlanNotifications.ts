import { useMemo, useCallback, useState } from 'react'
import type { AppEvent } from '@/types'
import { isStudentPlanForFamily } from '@/lib/eventPermissions'

const STORAGE_KEY = 'host_seen_student_plans_at'

function readLastSeen(): number {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? Number(raw) : 0
}

function writeLastSeen(ts: number) {
  localStorage.setItem(STORAGE_KEY, String(ts))
}

/** Host family: detect new student_personal plans since last dismiss */
export function useStudentPlanNotifications(events: AppEvent[]) {
  const [seenAt, setSeenAt] = useState(readLastSeen)

  const newPlans = useMemo(() => {
    return events.filter((e) => {
      if (!isStudentPlanForFamily(e)) return false
      const created = e.createdAt?.getTime() ?? e.date.getTime()
      return created > seenAt
    })
  }, [events, seenAt])

  const markSeen = useCallback(() => {
    const now = Date.now()
    writeLastSeen(now)
    setSeenAt(now)
  }, [])

  return {
    hasNew:  newPlans.length > 0,
    count:   newPlans.length,
    newPlans,
    markSeen,
  }
}
