import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Wrench, DollarSign, Clock, RefreshCw,
  ArrowRight, TrendingUp,
} from 'lucide-react'
import { useUI } from '@/contexts/UIContext'
import { useTheme } from '@/contexts/ThemeContext'

/* ═══════════════════════════════════════════════════════════════
   CURRENCY CONVERTER
   ════════════════════════════════════════════════════════════ */

const FALLBACK_RATE = 89.5  // KGS per 1 USD (fallback if API fails)

function useCurrencyRate() {
  const [rate,    setRate]    = useState<number>(FALLBACK_RATE)
  const [updated, setUpdated] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(false)

  const fetch_ = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res  = await fetch('https://open.er-api.com/v6/latest/USD')
      const data = await res.json() as {
        result: string
        rates:  Record<string, number>
        time_last_update_utc: string
      }
      if (data.result === 'success' && data.rates.KGS) {
        setRate(data.rates.KGS)
        setUpdated(new Date(data.time_last_update_utc).toLocaleDateString())
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch_() }, [fetch_])

  return { rate, updated, loading, error, refresh: fetch_ }
}

function CurrencyConverter() {
  const [usd, setUsd] = useState('1')
  const { rate, updated, loading, error, refresh } = useCurrencyRate()

  const kgs = parseFloat(usd || '0') * rate
  const validUsd = !isNaN(parseFloat(usd)) && parseFloat(usd) >= 0

  return (
    <div className="space-y-3">
      {/* Rate header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            1 USD = <span className="text-primary-500">{rate.toFixed(2)}</span> KGS
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.88, rotate: 180 }}
          onClick={refresh}
          disabled={loading}
          className="p-1.5 rounded-lg text-slate-400 hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {/* USD input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">$</span>
        <input
          type="number"
          inputMode="decimal"
          value={usd}
          onChange={(e) => setUsd(e.target.value)}
          placeholder="0"
          className="input-field pl-8 text-xl font-bold tabular-nums"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">USD</span>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-primary-500 rotate-90" />
        </div>
      </div>

      {/* KGS result */}
      <div className="px-4 py-3.5 rounded-2xl bg-gradient-to-r from-primary-500/10 to-violet-500/10 dark:from-primary-900/30 dark:to-violet-900/30 border border-primary-200/50 dark:border-primary-800/30">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Result</p>
        <p className="text-3xl font-black gradient-text tabular-nums mt-0.5">
          {validUsd ? kgs.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '–'}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">Kyrgyzstani Som (KGS)</p>
      </div>

      {/* Quick presets */}
      <div className="grid grid-cols-4 gap-1.5">
        {[5, 10, 20, 50, 100, 200, 500, 1000].map((v) => (
          <motion.button
            key={v}
            whileTap={{ scale: 0.88 }}
            onClick={() => setUsd(String(v))}
            className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
              usd === String(v)
                ? 'bg-gradient-to-r from-primary-500 to-violet-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            ${v}
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-slate-400">
        {error
          ? <span className="text-amber-500">Using fallback rate</span>
          : <span>{updated ? `Updated ${updated}` : 'Loading…'}</span>
        }
        <span>Source: open.er-api.com</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   WORLD CLOCKS
   ════════════════════════════════════════════════════════════ */

const CLOCKS = [
  {
    city:     'Bishkek',
    country:  'Kyrgyzstan 🇰🇬',
    tz:       'Asia/Bishkek',
    offset:   'UTC+6',
    gradient: 'from-primary-500 to-violet-600',
  },
  {
    city:     'New York',
    country:  'USA 🇺🇸',
    tz:       'America/New_York',
    offset:   'EST / EDT',
    gradient: 'from-rose-500 to-orange-500',
  },
] as const

function useClockTick() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 1000)
    return () => clearInterval(id)
  }, [])
  return tick
}

function getTime(tz: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone:   tz,
    hour:       '2-digit',
    minute:     '2-digit',
    second:     '2-digit',
    hour12:     false,
    weekday:    'short',
    month:      'short',
    day:        'numeric',
  }).formatToParts(now)

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const hh = get('hour')
  const mm = get('minute')
  const ss = get('second')
  const date = `${get('weekday')}, ${get('month')} ${get('day')}`
  const isNight = parseInt(hh, 10) >= 21 || parseInt(hh, 10) < 6

  return { hh, mm, ss, date, isNight }
}

function ClockCard({ city, country, tz, offset, gradient }: typeof CLOCKS[number]) {
  useClockTick()
  const { hh, mm, ss, date } = getTime(tz)

  return (
    <div className="glass-card p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{city}</p>
          <p className="text-[10px] text-slate-400">{country}</p>
        </div>
        <span className={`badge bg-gradient-to-r ${gradient} text-white text-[9px] font-bold px-2 py-1`}>
          {offset}
        </span>
      </div>

      {/* Digital display */}
      <div className="flex items-end gap-1.5">
        <span className={`font-mono text-3xl font-black tabular-nums bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {hh}:{mm}
        </span>
        <span className="font-mono text-base font-bold text-slate-400 dark:text-slate-500 tabular-nums mb-0.5">
          :{ss}
        </span>
      </div>

      <p className="text-[11px] text-slate-400">{date}</p>
    </div>
  )
}

function WorldClocks() {
  return (
    <div className="space-y-3">
      {CLOCKS.map((c) => <ClockCard key={c.tz} {...c} />)}

      {/* Time difference */}
      <TimeDiff />
    </div>
  )
}

function TimeDiff() {
  useClockTick()
  const bishkekH  = parseInt(getTime('Asia/Bishkek').hh,     10)
  const nycH      = parseInt(getTime('America/New_York').hh,  10)
  let diff = bishkekH - nycH
  if (diff < 0) diff += 24

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
      <Clock className="w-3.5 h-3.5 text-primary-400 shrink-0" />
      <span>
        Bishkek is <strong className="text-slate-700 dark:text-slate-200">{diff}h ahead</strong> of New York
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PANEL SHELL
   ════════════════════════════════════════════════════════════ */

type Tab = 'currency' | 'clocks'

export default function UsefulToolsPanel() {
  const { toolsOpen, closeTools, toggleTools } = useUI()
  const { isDark } = useTheme()
  const [tab, setTab] = useState<Tab>('currency')

  return (
    <>
      {/* ── Toggle pill (right-center) ── */}
      <motion.button
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 24 }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTools}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40
                   flex flex-col items-center gap-1 px-2 py-3
                   rounded-l-2xl bg-white/80 dark:bg-slate-800/80
                   backdrop-blur-md border border-r-0 border-slate-200 dark:border-slate-700
                   text-slate-500 dark:text-slate-400 shadow-lg
                   focus-visible:outline-none"
        aria-label="Toggle tools panel"
      >
        <Wrench className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-45 text-primary-500' : ''}`} />
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ writingMode: 'vertical-rl' }}>
          Tools
        </span>
      </motion.button>

      {/* ── Sliding drawer ── */}
      <AnimatePresence>
        {toolsOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTools}
            />

            {/* Panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-[88vw] max-w-sm flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <div className={`flex flex-col h-full glass-card rounded-l-3xl rounded-r-none border-r-0 overflow-hidden ${isDark ? 'bg-[#0f0f1a]/90' : 'bg-white/90'}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-safe-top pb-4 pt-6 border-b border-slate-200/50 dark:border-slate-700/50 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-sm">
                      <Wrench className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Useful Tools</p>
                      <p className="text-[10px] text-slate-400">Currency & Clocks</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={closeTools}
                    className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Tab bar */}
                <div className="flex gap-1 mx-5 mt-4 p-1 glass-card rounded-xl shrink-0">
                  {([
                    { id: 'currency', label: 'Currency', Icon: DollarSign },
                    { id: 'clocks',   label: 'Clocks',   Icon: Clock      },
                  ] as const).map(({ id, label, Icon: TabIcon }) => {
                    const active = tab === id
                    return (
                      <motion.button
                        key={id}
                        onClick={() => setTab(id)}
                        whileTap={{ scale: 0.93 }}
                        className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                          active ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="tool-tab"
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500 to-violet-600"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                        <TabIcon className="relative z-10 w-3.5 h-3.5" />
                        <span className="relative z-10">{label}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, x: tab === 'currency' ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tab === 'currency' ? <CurrencyConverter /> : <WorldClocks />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
