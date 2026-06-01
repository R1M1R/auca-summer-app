import { motion } from 'framer-motion'
import { MOOD_CONFIG, type MoodLevel } from '@/types'

interface Props {
  value:    MoodLevel | null
  onChange: (level: MoodLevel) => void
  readOnly?: boolean
  size?:    'sm' | 'md' | 'lg'
}

const SIZE = {
  sm:  { btn: 'w-10 h-10',  emoji: 'text-xl',  label: 'hidden' },
  md:  { btn: 'w-12 h-12',  emoji: 'text-2xl', label: 'text-[9px] mt-1' },
  lg:  { btn: 'w-14 h-14',  emoji: 'text-3xl', label: 'text-[10px] mt-1' },
}

export default function MoodSelector({ value, onChange, readOnly = false, size = 'md' }: Props) {
  const s = SIZE[size]

  return (
    <div className="flex items-center justify-between gap-1">
      {MOOD_CONFIG.map(({ level, emoji, label, gradient }) => {
        const selected = value === level
        return (
          <motion.button
            key={level}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange(level)}
            whileHover={readOnly ? {} : { scale: 1.12 }}
            whileTap={readOnly ? {} : { scale: 0.9 }}
            animate={selected
              ? { scale: 1.18, y: -3 }
              : { scale: 1, y: 0 }
            }
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className={[
              'flex flex-col items-center rounded-2xl transition-all duration-200',
              s.btn,
              readOnly ? 'cursor-default' : 'cursor-pointer',
              selected
                ? `bg-gradient-to-br ${gradient} shadow-lg ring-2 ring-white/60 dark:ring-white/20`
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
              'justify-center',
            ].join(' ')}
            aria-label={label}
            aria-pressed={selected}
          >
            <span className={s.emoji}>{emoji}</span>
            {s.label !== 'hidden' && (
              <span className={`${s.label} font-semibold leading-none ${selected ? 'text-white' : 'text-slate-400'}`}>
                {label}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

/* ── Read-only badge version ─────────────────────────────────── */
export function MoodBadge({ mood }: { mood: MoodLevel }) {
  const cfg = MOOD_CONFIG.find((m) => m.level === mood)!
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r ${cfg.gradient} text-white`}>
      <span>{cfg.emoji}</span>
      {cfg.label}
    </span>
  )
}
