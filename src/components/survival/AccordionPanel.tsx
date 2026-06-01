import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Props {
  title:        string
  subtitle?:    string
  Icon:         React.ElementType
  gradient:     string
  children:     React.ReactNode
  defaultOpen?: boolean
  badge?:       string
}

export default function AccordionPanel({
  title, subtitle, Icon, gradient, children, defaultOpen = false, badge,
}: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <motion.div
      layout
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center gap-4 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-inset"
      >
        {/* Icon blob */}
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm shrink-0`}>
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{title}</p>
            {badge && (
              <span className="badge bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 text-[10px] px-2">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.button>

      {/* Divider when open */}
      {open && (
        <div className="mx-4 h-px bg-slate-200/60 dark:bg-slate-700/60" />
      )}

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-4 pt-4 pb-5 text-sm text-slate-600 dark:text-slate-300 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Reusable sub-components for rich accordion content ───────── */

export function InfoRow({ icon: Icon, label, value, mono }: {
  icon?: React.ElementType; label: string; value: React.ReactNode; mono?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" strokeWidth={2} />}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className={`mt-0.5 text-slate-700 dark:text-slate-200 ${mono ? 'font-mono text-lg tracking-widest' : 'text-sm'}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2.5">
      {steps.map((step, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex gap-3"
        >
          <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step}</span>
        </motion.li>
      ))}
    </ol>
  )
}

export function TipBox({ children, color = 'amber' }: { children: React.ReactNode; color?: 'amber' | 'blue' | 'emerald' | 'rose' }) {
  const colors = {
    amber:   'bg-amber-50   border-amber-200   text-amber-800   dark:bg-amber-950/30 dark:border-amber-800/50 dark:text-amber-300',
    blue:    'bg-blue-50    border-blue-200    text-blue-800    dark:bg-blue-950/30  dark:border-blue-800/50  dark:text-blue-300',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-300',
    rose:    'bg-rose-50    border-rose-200    text-rose-800    dark:bg-rose-950/30  dark:border-rose-800/50  dark:text-rose-300',
  }
  return (
    <div className={`px-4 py-3 rounded-2xl border text-sm leading-relaxed ${colors[color]}`}>
      {children}
    </div>
  )
}

export function CredentialBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/60 dark:border-slate-700/60">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="font-mono text-xl font-bold tracking-widest text-slate-800 dark:text-slate-100 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  )
}

export function PriceRow({ item, price }: { item: string; price: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <span className="text-sm text-slate-600 dark:text-slate-300">{item}</span>
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 tabular-nums">{price}</span>
    </div>
  )
}

export function PhraseRow({ phrase, translation, phonetic }: {
  phrase: string; translation: string; phonetic?: string
}) {
  return (
    <div className="py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{phrase}</p>
          {phonetic && <p className="text-[11px] text-slate-400 italic mt-0.5">{phonetic}</p>}
        </div>
        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium text-right shrink-0">{translation}</p>
      </div>
    </div>
  )
}
