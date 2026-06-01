import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf, Utensils, Coffee, ThumbsDown, MessageSquare,
  FileText, Save, CheckCircle2, Lock, Loader2,
} from 'lucide-react'
import { usePreferences } from '@/hooks/usePreferences'
import ChipInput from '@/components/diary/ChipInput'
import { localizePreferences } from '@/lib/localizedContent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { StudentPreferences, UserRole } from '@/types'

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { animate: { transition: { staggerChildren: 0.06 } } }

/* ── Section config ──────────────────────────────────────────── */
const CHIP_SECTIONS = [
  {
    key:         'allergies'      as keyof StudentPreferences,
    label:       'Allergies & Intolerances',
    placeholder: 'e.g. Gluten, Peanuts…',
    Icon:        Leaf,
    gradient:    'from-rose-500 to-red-600',
    chipColor:   'from-rose-400 to-rose-500',
  },
  {
    key:         'favoriteFoods'  as keyof StudentPreferences,
    label:       'Favorite Foods',
    placeholder: 'e.g. Pizza, Sushi…',
    Icon:        Utensils,
    gradient:    'from-emerald-500 to-teal-600',
    chipColor:   'from-emerald-400 to-teal-500',
  },
  {
    key:         'favoriteDrinks' as keyof StudentPreferences,
    label:       'Favorite Drinks',
    placeholder: 'e.g. Green tea, Lemonade…',
    Icon:        Coffee,
    gradient:    'from-amber-500 to-orange-500',
    chipColor:   'from-amber-400 to-orange-500',
  },
  {
    key:         'dislikes'       as keyof StudentPreferences,
    label:       'Dislikes',
    placeholder: 'e.g. Spicy food, Onions…',
    Icon:        ThumbsDown,
    gradient:    'from-slate-500 to-slate-700',
    chipColor:   'from-slate-400 to-slate-600',
  },
] as const

/* ─────────────────────────────────────────────────────────────── */
interface Props { role: UserRole }

export default function PreferencesTab({ role }: Props) {
  const isFamily = role === 'family'
  const { preferences: remote, loading, saving, lastSaved, savePreferences } = usePreferences()

  /* Local draft — only used when student is editing */
  const [draft,   setDraft]   = useState(remote)
  const [dirty,   setDirty]   = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)

  const lang = useAppLanguage()
  const displayPrefs = localizePreferences(remote, role, lang)

  useEffect(() => {
    if (!dirty && !isFamily) setDraft(remote)
  }, [remote, dirty, isFamily])

  const update = <K extends keyof StudentPreferences>(key: K, value: StudentPreferences[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
    setDirty(true)
    setSaved(false)
  }

  const handleSave = async () => {
    setSaveErr(null)
    try {
      await savePreferences(draft)
      setDirty(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setSaveErr(e instanceof Error ? e.message : 'Save failed')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-7 h-7 text-primary-400 animate-spin" />
      </div>
    )
  }

  /* ── Read-Only banner (family) ── */
  const readOnlyBanner = isFamily && (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40"
    >
      <Lock className="w-4 h-4 text-amber-500 shrink-0" />
      <div>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Read-only view</p>
        <p className="text-[11px] text-amber-600/70 dark:text-amber-500/70 mt-0.5">
          This is the student's personal preference profile. Updates sync in real time.
        </p>
      </div>
    </motion.div>
  )

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5 pb-4">
      {readOnlyBanner}

      {/* Chip sections */}
      {CHIP_SECTIONS.map(({ key, label, placeholder, Icon, gradient, chipColor }) => (
        <motion.div key={key} variants={fadeUp} className="glass-card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm shrink-0`}>
              <Icon className="w-4 h-4" strokeWidth={1.8} />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
          </div>
          <ChipInput
            label=""
            placeholder={placeholder}
            values={(isFamily ? displayPrefs : draft)[key] as string[]}
            onChange={(v) => update(key, v)}
            readOnly={isFamily}
            chipColor={chipColor}
          />
        </motion.div>
      ))}

      {/* Wishes */}
      <motion.div variants={fadeUp} className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <MessageSquare className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">General Wishes</span>
        </div>
        {isFamily ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {displayPrefs.wishes || <span className="text-slate-300 dark:text-slate-600 italic">No wishes specified</span>}
          </p>
        ) : (
          <textarea
            value={draft.wishes}
            onChange={(e) => update('wishes', e.target.value)}
            placeholder="e.g. I'd love to try local Kyrgyz food, especially kuurdak…"
            rows={3}
            className="input-field resize-none text-sm"
          />
        )}
      </motion.div>

      {/* Dietary Notes */}
      <motion.div variants={fadeUp} className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-sm">
            <FileText className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Dietary Notes</span>
        </div>
        {isFamily ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {displayPrefs.dietaryNotes || <span className="text-slate-300 dark:text-slate-600 italic">No notes</span>}
          </p>
        ) : (
          <textarea
            value={draft.dietaryNotes}
            onChange={(e) => update('dietaryNotes', e.target.value)}
            placeholder="e.g. I'm vegetarian, no pork or beef…"
            rows={3}
            className="input-field resize-none text-sm"
          />
        )}
      </motion.div>

      {/* Save button (student only) */}
      {!isFamily && (
        <motion.div variants={fadeUp} className="space-y-2">
          <AnimatePresence>
            {saveErr && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-rose-500 px-1"
              >
                {saveErr}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleSave}
            disabled={saving || (!dirty && !saved)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center justify-center gap-2 h-12 rounded-2xl font-semibold text-sm transition-all ${
              saved
                ? 'bg-emerald-500 text-white'
                : dirty
                ? 'btn-primary'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Translating…</span>
              </>
            ) : saved ? (
              <><CheckCircle2 className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Preferences</>
            )}
          </motion.button>

          {lastSaved && !dirty && (
            <p className="text-center text-[11px] text-slate-400">
              Last saved {lastSaved.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
