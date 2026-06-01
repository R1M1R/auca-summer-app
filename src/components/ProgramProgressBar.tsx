import { motion } from 'framer-motion'
import { Rocket, Zap, Star, Trophy, Flag } from 'lucide-react'
import { useProgramProgress, formatProgramDate, PROGRAM_START, PROGRAM_END } from '@/hooks/useProgramProgress'
import { useAppStore } from '@/store/useAppStore'

/* ── Milestone config ───────────────────────────────────────── */
const MILESTONES = [
  { value: 0,   Icon: Rocket, label: 'Start',  color: 'text-slate-400'  },
  { value: 25,  Icon: Zap,    label: '25%',    color: 'text-sky-400'    },
  { value: 50,  Icon: Star,   label: 'Half',   color: 'text-amber-400'  },
  { value: 75,  Icon: Trophy, label: '75%',    color: 'text-violet-400' },
  { value: 100, Icon: Flag,   label: 'Done',   color: 'text-emerald-400'},
]

/* ── XP level thresholds ────────────────────────────────────── */
function getLevel(xp: number) {
  if (xp < 50)  return { level: 1, title: 'Newcomer',   next: 50  }
  if (xp < 150) return { level: 2, title: 'Explorer',   next: 150 }
  if (xp < 350) return { level: 3, title: 'Achiever',   next: 350 }
  if (xp < 700) return { level: 4, title: 'Champion',   next: 700 }
  return          { level: 5, title: 'Legend',           next: null }
}

/* ─────────────────────────────────────────────────────────────── */
export default function ProgramProgressBar() {
  const lang  = useAppStore((s) => s.language)
  const xp    = useAppStore((s) => s.totalXP)
  const streak = useAppStore((s) => s.streak)
  const p     = useProgramProgress()
  const lvl   = getLevel(xp)

  const startLabel = formatProgramDate(PROGRAM_START, lang)
  const endLabel   = formatProgramDate(PROGRAM_END,   lang)

  return (
    <div className="glass-card p-5 space-y-5">
      {/* ── Header row ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Rocket className="w-4 h-4 text-primary-400" />
            Program Progress
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            {p.isStarted
              ? `Day ${p.elapsedDays} of ${p.totalDays}`
              : `Starts in ${p.daysToStart} day${p.daysToStart !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* Big % */}
        <div className="text-right shrink-0">
          <motion.span
            key={p.percentage}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-black gradient-text tabular-nums"
          >
            {p.percentage}%
          </motion.span>
          <p className="text-xs text-slate-400 mt-0.5">
            {p.remainingDays}d remaining
          </p>
        </div>
      </div>

      {/* ── Progress track ── */}
      <div className="space-y-2">
        {/* Bar */}
        <div className="relative h-4 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-visible">
          {/* Fill */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 via-violet-500 to-pink-500 shadow-glow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${p.percentage}%` }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${p.percentage}%`,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1.8 }}
          />

          {/* Milestone dots */}
          {MILESTONES.map(({ value, Icon, color }) => {
            const reached = p.percentage >= value
            return (
              <motion.div
                key={value}
                className="absolute top-1/2 -translate-y-1/2 z-10"
                style={{ left: `${value}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + value * 0.01, type: 'spring', stiffness: 500 }}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                    reached
                      ? 'bg-white dark:bg-slate-900 border-primary-400'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <Icon className={`w-2.5 h-2.5 ${reached ? color : 'text-slate-400'}`} strokeWidth={2.5} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Date labels */}
        <div className="flex justify-between text-xs text-slate-400 px-0.5">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {/* XP */}
        <div className="glass-card !rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-amber-500 tabular-nums">{xp}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Total XP</p>
        </div>

        {/* Level */}
        <div className="glass-card !rounded-xl p-3 text-center">
          <p className="text-lg font-bold gradient-text">Lv.{lvl.level}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{lvl.title}</p>
        </div>

        {/* Streak */}
        <div className="glass-card !rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-orange-500 tabular-nums">🔥 {streak}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Day streak</p>
        </div>
      </div>

      {/* ── XP to next level ── */}
      {lvl.next !== null && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Progress to Lv.{lvl.level + 1}</span>
            <span>{xp} / {lvl.next} XP</span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (xp / lvl.next) * 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* ── Next program milestone badge ── */}
      {p.nextMilestone !== null && p.isStarted && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60"
        >
          <span className="text-xs text-slate-400">
            Next milestone:
          </span>
          <span className="badge bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-semibold">
            {p.nextMilestone}% — in ~{Math.ceil(
              ((p.nextMilestone - p.percentage) / 100) * p.totalDays,
            )}d
          </span>
        </motion.div>
      )}

      {/* ── Not yet started ── */}
      {!p.isStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60"
        >
          <span className="text-xs text-slate-400">
            Program begins {startLabel} — get ready! 🚀
          </span>
        </motion.div>
      )}

      {/* ── Completed ── */}
      {p.isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
            Program completed! Congratulations 🎉
          </span>
        </motion.div>
      )}
    </div>
  )
}
