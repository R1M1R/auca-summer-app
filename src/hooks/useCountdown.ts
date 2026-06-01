import { useState, useEffect } from 'react'

export interface CountdownValue {
  days:    number
  hours:   number
  minutes: number
  seconds: number
  total:   number   // ms remaining
  past:    boolean  // target date has passed
}

function compute(target: Date): CountdownValue {
  const total = target.getTime() - Date.now()
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, past: true }

  return {
    total,
    past:    false,
    days:    Math.floor(total / 86_400_000),
    hours:   Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000)  / 60_000),
    seconds: Math.floor((total % 60_000)     / 1_000),
  }
}

/**
 * Live countdown to a target date, updating every second.
 * Automatically stops ticking once the target has passed.
 */
export function useCountdown(target: Date): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(() => compute(target))

  useEffect(() => {
    if (value.past) return                     // already passed — no ticker needed
    const id = setInterval(() => {
      const next = compute(target)
      setValue(next)
      if (next.past) clearInterval(id)         // stop once expired
    }, 1_000)
    return () => clearInterval(id)
  }, [target, value.past])

  return value
}

/* ── Shared date constants ───────────────────────────────────── */
/** First in-person student–family meeting */
export const MEETING_DATE  = new Date(2026, 5, 7, 0, 0, 0)   // June 7, 2026
export const PROGRAM_START = new Date(2026, 5, 5, 0, 0, 0)   // June 5, 2026
export const PROGRAM_END   = new Date(2026, 7, 1, 0, 0, 0)   // August 1, 2026
