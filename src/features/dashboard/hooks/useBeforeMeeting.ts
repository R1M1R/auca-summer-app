import { useEffect, useState } from 'react'
import { MEETING_DATE } from '@/hooks/useCountdown'

/**
 * Returns true while the program meeting date (June 7) is still in the future.
 * Re-evaluates every minute so countdown/pre-arrival blocks hide automatically.
 */
export function useBeforeMeeting(): boolean {
  const [before, setBefore] = useState(() => Date.now() < MEETING_DATE.getTime())

  useEffect(() => {
    const tick = () => setBefore(Date.now() < MEETING_DATE.getTime())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  return before
}
