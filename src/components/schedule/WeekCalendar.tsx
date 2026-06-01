import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { AppEvent } from '@/types'

/* ── Config ─────────────────────────────────────────────────── */
const TODAY      = new Date()
const DAYS_BACK  = 7
const DAYS_FWD   = 42

/* ── Date helpers ───────────────────────────────────────────── */
function buildRange(): Date[] {
  const out: Date[] = []
  const start = new Date(TODAY)
  start.setDate(TODAY.getDate() - DAYS_BACK)
  for (let i = 0; i < DAYS_BACK + DAYS_FWD; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    d.setHours(0, 0, 0, 0)
    out.push(d)
  }
  return out
}

const RANGE = buildRange()

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  )
}

function isWeekend(d: Date) {
  return d.getDay() === 0 || d.getDay() === 6
}

/* ── Category dot colours (up to 3 dots per day) ────────────── */
const CAT_DOTS: Record<string, string> = {
  academic:         'bg-indigo-400',
  excursion:        'bg-emerald-400',
  mandatory:        'bg-orange-400',
  leisure:          'bg-amber-400',
  family:           'bg-rose-400',
  social:           'bg-violet-400',
  student_personal: 'bg-fuchsia-400',
  personal:  'bg-cyan-400',
  activity:  'bg-lime-400',
}

/* ── Props ──────────────────────────────────────────────────── */
interface Props {
  selectedDate: Date
  onSelectDate: (d: Date) => void
  events:       AppEvent[]
}

/* ─────────────────────────────────────────────────────────────── */
export default function WeekCalendar({ selectedDate, onSelectDate, events }: Props) {
  const { t } = useTranslation()
  const lang  = useAppLanguage()
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  const weekdays = t('schedule.calendar.weekdays', { returnObjects: true }) as string[]
  const months   = t('schedule.calendar.months', { returnObjects: true }) as string[]

  const scrollRef = useRef<HTMLDivElement>(null)

  /* Map: "YYYY-M-D" → unique categories for that day */
  const dayCategories = new Map<string, Set<string>>()
  events.forEach((e) => {
    const key = `${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDate()}`
    if (!dayCategories.has(key)) dayCategories.set(key, new Set())
    dayCategories.get(key)!.add(e.category)
  })

  const getCats = (d: Date) =>
    dayCategories.get(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`) ?? new Set<string>()

  /* Scroll helpers */
  const scrollToDate = useCallback((d: Date) => {
    if (!scrollRef.current) return
    const el = scrollRef.current.querySelector<HTMLElement>(`[data-date="${d.toDateString()}"]`)
    if (!el) return
    const cw = scrollRef.current.offsetWidth
    scrollRef.current.scrollTo({
      left:     el.offsetLeft - cw / 2 + el.offsetWidth / 2,
      behavior: 'smooth',
    })
  }, [])

  /* Scroll to today on mount */
  useEffect(() => { scrollToDate(TODAY) }, [scrollToDate])

  const navigate = (dir: -1 | 1) => {
    const next = new Date(selectedDate)
    next.setDate(next.getDate() + dir)
    onSelectDate(next)
    scrollToDate(next)
  }

  const dayEvtCount = events.filter((e) => sameDay(e.date, selectedDate)).length

  return (
    <div className="glass-card rounded-none border-x-0 py-4 space-y-3 sticky top-[61px] z-20">
      {/* ── Month header ── */}
      <div className="flex items-center justify-between px-5">
        <div>
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {months[selectedDate.getMonth()]}{' '}
            <span className="font-normal text-slate-400">{selectedDate.getFullYear()}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {selectedDate.toLocaleDateString(locale, {
              weekday: 'long', day: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {dayEvtCount > 0 && (
            <span className="badge bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-semibold">
              {t('schedule.calendar.events', { count: dayEvtCount })}
            </span>
          )}
          {/* Prev / Next arrows */}
          <div className="flex gap-1">
            {([[-1, ChevronLeft], [1, ChevronRight]] as const).map(([dir, Icon]) => (
              <motion.button
                key={dir}
                whileTap={{ scale: 0.85 }}
                onClick={() => navigate(dir)}
                className="w-7 h-7 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable day strip ── */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {RANGE.map((d, i) => {
          const isToday_    = sameDay(d, TODAY)
          const isSelected  = sameDay(d, selectedDate)
          const isPast      = d < new Date(TODAY.setHours(0, 0, 0, 0)) && !isToday_
          const cats        = getCats(d)
          const catList     = [...cats].slice(0, 3)
          const isWeekend_  = isWeekend(d)

          return (
            <motion.button
              key={i}
              data-date={d.toDateString()}
              onClick={() => onSelectDate(new Date(d))}
              whileTap={{ scale: 0.86 }}
              className={[
                'flex flex-col items-center gap-1.5 px-2.5 py-3 rounded-2xl flex-shrink-0 w-[52px]',
                'transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
                isSelected
                  ? 'bg-gradient-to-b from-primary-500 to-violet-600 shadow-glow-sm'
                  : isToday_
                  ? 'bg-primary-50/80 dark:bg-primary-900/30 ring-1 ring-primary-300/60 dark:ring-primary-700/40'
                  : isPast
                  ? 'opacity-40 hover:opacity-70 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  : isWeekend_
                  ? 'hover:bg-slate-100 dark:hover:bg-slate-800 bg-slate-50/40 dark:bg-slate-800/20'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800',
              ].join(' ')}
            >
              {/* Day name */}
              <span className={`text-[9px] font-bold uppercase tracking-widest leading-none ${
                isSelected ? 'text-white/60' : isWeekend_ ? 'text-rose-400' : 'text-slate-400 dark:text-slate-500'
              }`}>
                {weekdays[d.getDay()]}
              </span>

              {/* Date number */}
              <span className={`text-lg font-black leading-none ${
                isSelected   ? 'text-white'
                : isToday_   ? 'text-primary-600 dark:text-primary-400'
                : isWeekend_ ? 'text-rose-500 dark:text-rose-400'
                : 'text-slate-700 dark:text-slate-300'
              }`}>
                {d.getDate()}
              </span>

              {/* Event category dots */}
              <div className="flex items-center gap-0.5 h-2">
                {catList.map((cat) => (
                  <div
                    key={cat}
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-white/70' : (CAT_DOTS[cat] ?? 'bg-slate-400')
                    }`}
                  />
                ))}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
