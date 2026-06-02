import { useEffect, useState } from 'react'

/** Re-render on an interval so presence UI expires without a Firestore change. */
export function usePresenceClock(intervalMs = 10_000): number {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return now
}
