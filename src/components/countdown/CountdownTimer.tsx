import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCountdown, MEETING_DATE } from '@/hooks/useCountdown'

function DigitCell({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-b from-primary-500 to-violet-600 shadow-glow-sm overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0,  opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
            exit={{   y:  20, opacity: 0, transition: { duration: 0.15 } }}
            className="relative z-10 text-2xl font-black text-white tabular-nums tracking-tight"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

function Sep() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      className="text-2xl font-black text-primary-400 dark:text-primary-500 mb-5 select-none"
    >
      :
    </motion.span>
  )
}

export default function CountdownTimer() {
  const { t } = useTranslation()
  const { days, hours, minutes, seconds, past } = useCountdown(MEETING_DATE)

  if (past) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-primary-500 via-violet-500 to-pink-500" />

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-sm"
            >
              <Calendar className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </motion.div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {t('countdown.title')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('countdown.subtitle')}
              </p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-primary-400" />
        </div>

        <div className="flex items-end justify-center gap-2">
          <DigitCell value={days}    label={t('countdown.days')} />
          <Sep />
          <DigitCell value={hours}   label={t('countdown.hours')} />
          <Sep />
          <DigitCell value={minutes} label={t('countdown.minutes')} />
          <Sep />
          <DigitCell value={seconds} label={t('countdown.seconds')} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <p className="text-[11px] text-slate-400 font-medium px-2">
            {t('countdown.footer')}
          </p>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </motion.div>
      </div>
    </motion.div>
  )
}
