import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { AppEvent } from '@/types'

const DAYS_BACK = 7
const DAYS_FWD  = 42

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function buildRange(anchor: Date): Date[] {
  const today = startOfDay(anchor)
  const start = new Date(today)
  start.setDate(today.getDate() - DAYS_BACK)
  const out: Date[] = []
  for (let i = 0; i < DAYS_BACK + DAYS_FWD; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    out.push(d)
  }
  return out
}

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

interface Props {
  selectedDate: Date
  onSelectDate: (d: Date) => void
  events:       AppEvent[]
}

export default function WeekCalendar({ selectedDate, onSelectDate, events }: Props) {
  const { t } = useTranslation()
  const lang  = useAppLanguage()
  const locale = lang === 'ru' ? 'ru-RU' : 'en-US'
  const weekdays = t('schedule.calendar.weekdays', { returnObjects: true }) as string[]
  const months   = t('schedule.calendar.months', { returnObjects: true }) as string[]

  const [today, setToday] = useState(() => startOfDay(new Date()))
  const range = useMemo(() => buildRange(today), [today.getTime()])

  useEffect(() => {
    const refresh = () => setToday(startOfDay(new Date()))
    const id = window.setInterval(refresh, 60_000)
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const scrolledToToday = useRef(false)

  const dayCategories = new Map<string, Set<string>>()
  events.forEach((e) => {
    const key = `${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDate()}`
    if (!dayCategories.has(key)) dayCategories.set(key, new Set())
    dayCategories.get(key)!.add(e.category)
  })

  const getCats = (d: Date) =>
    dayCategories.get(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`) ?? new Set<string>()

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

  useEffect(() => {
    if (!scrolledToToday.current) {
      scrollToDate(today)
      scrolledToToday.current = true
    }
  }, [scrollToDate, today])

  const navigate = (dir: -1 | 1) => {
    const next = new Date(selectedDate)
    next.setDate(next.getDate() + dir)
    onSelectDate(next)
    scrollToDate(next)
  }

  const dayEvtCount = events.filter((e) => sameDay(e.date, selectedDate)).length
  const todayMs = today.getTime()

  return (
    <div className="glass-card rounded-none border-x-0 py-4 space-y-3 sticky app-subheader-sticky z-40">
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
          <div className="flex gap-1">
            {([[-1, ChevronLeft], [1, ChevronRight]] as const).map(([dir, Icon]) => (
              <motion.button
                key={dir}
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={() => navigate(dir)}
                className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-5 pb-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {range.map((d) => {
          const isToday_    = sameDay(d, today)
          const isSelected  = sameDay(d, selectedDate)
          const isPast      = d.getTime() < todayMs && !isToday_
          const cats        = getCats(d)
          const catList     = [...cats].slice(0, 3)
          const isWeekend_  = isWeekend(d)

          return (
            <motion.button
              key={d.toDateString()}
              type="button"
              data-date={d.toDateString()}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelectDate(d)}
              className={[
                'relative flex flex-col items-center gap-1 min-w-[3.25rem] py-2 px-1.5 rounded-2xl transition-all duration-200 shrink-0',
                isSelected
                  ? 'bg-gradient-to-br from-primary-500 to-violet-600 text-white shadow-glow-sm'
                  : isToday_
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 ring-2 ring-primary-400/50'
                    : isPast
                      ? 'text-slate-300 dark:text-slate-600'
                      : isWeekend_
                        ? 'text-rose-400 dark:text-rose-500/80 hover:bg-slate-50 dark:hover:bg-white/5'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5',
              ].join(' ')}
            >
              <span className="text-[9px] font-semibold uppercase tracking-wide opacity-70">
                {weekdays[d.getDay()]}
              </span>
              <span className={`text-lg font-black leading-none ${isSelected ? 'text-white' : ''}`}>
                {d.getDate()}
              </span>
              {catList.length > 0 && (
                <div className="flex gap-0.5 mt-0.5">
                  {catList.map((cat) => (
                    <span
                      key={cat}
                      className={`w-1.5 h-1.5 rounded-full ${CAT_DOTS[cat] ?? 'bg-slate-400'} ${isSelected ? 'opacity-90' : ''}`}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
