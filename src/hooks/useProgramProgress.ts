import { useMemo } from 'react'
import type { ProgramProgress } from '@/types'

/* ── Program boundaries ─────────────────────────────────────── */
export const PROGRAM_START = new Date('2026-06-05T00:00:00')
export const PROGRAM_END   = new Date('2026-08-01T00:00:00')

const TOTAL_MS = PROGRAM_END.getTime() - PROGRAM_START.getTime()
export const TOTAL_DAYS = Math.ceil(TOTAL_MS / 86_400_000) // 57 days

const MILESTONES = [0, 25, 50, 75, 100] as const

/* ── XP awarded at each milestone ──────────────────────────── */
export const MILESTONE_XP: Record<number, number> = {
  25:  50,
  50:  100,
  75:  150,
  100: 300,
}

/* ── Hook ───────────────────────────────────────────────────── */
export function useProgramProgress(): ProgramProgress {
  return useMemo(() => {
    const now       = new Date()
    const elapsedMs = Math.max(0, Math.min(now.getTime() - PROGRAM_START.getTime(), TOTAL_MS))

    const elapsedDays   = Math.floor(elapsedMs / 86_400_000)
    const remainingDays = Math.max(0, TOTAL_DAYS - elapsedDays)
    const percentage    = Math.min(100, Math.round((elapsedMs / TOTAL_MS) * 100))

    const isStarted   = now >= PROGRAM_START
    const isCompleted = now >= PROGRAM_END

    const daysToStart = isStarted
      ? 0
      : Math.ceil((PROGRAM_START.getTime() - now.getTime()) / 86_400_000)

    const currentMilestone =
      [...MILESTONES].reverse().find((m) => percentage >= m) ?? 0

    const nextMilestone =
      MILESTONES.find((m) => m > percentage) ?? null

    return {
      startDate: PROGRAM_START,
      endDate:   PROGRAM_END,
      totalDays: TOTAL_DAYS,
      elapsedDays,
      remainingDays,
      percentage,
      isStarted,
      isCompleted,
      daysToStart,
      currentMilestone,
      nextMilestone,
    }
  }, [])
}

/* ── Utility: human-readable date label ─────────────────────── */
export function formatProgramDate(date: Date, lang: string): string {
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    day:   'numeric',
    month: 'short',
  })
}
