import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'

interface Props {
  label:        string
  placeholder?: string
  values:       string[]
  onChange:     (next: string[]) => void
  readOnly?:    boolean
  chipColor?:   string   // tailwind gradient classes
  max?:         number
}

export default function ChipInput({
  label, placeholder = 'Type and press Enter…',
  values, onChange, readOnly = false,
  chipColor = 'from-primary-500 to-violet-600',
  max = 20,
}: Props) {
  const [draft,   setDraft]   = useState('')
  const inputRef              = useRef<HTMLInputElement>(null)
  const id                    = useId()

  const addChip = (raw: string) => {
    const trimmed = raw.trim().replace(/,+$/, '')
    if (!trimmed || values.includes(trimmed) || values.length >= max) return
    onChange([...values, trimmed])
    setDraft('')
  }

  const removeChip = (val: string) => {
    onChange(values.filter((v) => v !== val))
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addChip(draft)
    } else if (e.key === 'Backspace' && !draft && values.length > 0) {
      onChange(values.slice(0, -1))
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        {label}
      </label>

      <div
        className={`flex flex-wrap gap-2 p-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 backdrop-blur-sm min-h-[52px] ${
          readOnly ? '' : 'cursor-text'
        }`}
        onClick={() => !readOnly && inputRef.current?.focus()}
      >
        {/* Chips */}
        <AnimatePresence initial={false}>
          {values.map((v) => (
            <motion.span
              key={v}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 500, damping: 22 } }}
              exit={{   scale: 0, opacity: 0, transition: { duration: 0.15 } }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r ${chipColor} text-white text-xs font-semibold select-none`}
            >
              {v}
              {!readOnly && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeChip(v) }}
                  className="w-3.5 h-3.5 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center transition-colors"
                >
                  <X className="w-2.5 h-2.5" strokeWidth={3} />
                </button>
              )}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Input (hidden in read-only) */}
        {!readOnly && values.length < max && (
          <input
            id={id}
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            onBlur={() => draft.trim() && addChip(draft)}
            placeholder={values.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600"
          />
        )}

        {/* Empty read-only state */}
        {readOnly && values.length === 0 && (
          <span className="text-xs text-slate-300 dark:text-slate-600 italic">Not specified</span>
        )}
      </div>

      {/* Hint */}
      {!readOnly && (
        <div className="flex items-center gap-1.5 px-1">
          <Plus className="w-3 h-3 text-slate-400" />
          <p className="text-[10px] text-slate-400">
            Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[9px]">Enter</kbd> or <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[9px]">,</kbd> to add · max {max}
          </p>
        </div>
      )}
    </div>
  )
}
