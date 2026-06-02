import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Leaf, Utensils, Coffee, ThumbsDown, MessageSquare,
  FileText, Save, CheckCircle2, Lock, Loader2,
} from 'lucide-react'
import { usePreferences } from '@/hooks/usePreferences'
import ChipInput from '@/components/diary/ChipInput'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { localizePreferences } from '@/lib/localizedContent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import type { StudentPreferences, UserRole } from '@/types'

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { animate: { transition: { staggerChildren: 0.06 } } }

interface Props { role: UserRole }

export default function PreferencesTab({ role }: Props) {
  const { t, i18n } = useTranslation()
  const isFamily = role === 'family'
  const { preferences: remote, loading, saving, lastSaved, savePreferences } = usePreferences()

  const [draft,   setDraft]   = useState(remote)
  const [dirty,   setDirty]   = useState(false)
  const [saved,   setSaved]   = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)

  const lang = useAppLanguage()
  const displayPrefs = localizePreferences(remote, role, lang)

  const CHIP_SECTIONS = useMemo(() => [
    {
      key:         'allergies' as keyof StudentPreferences,
      label:       t('diary.prefs.allergies'),
      placeholder: t('diary.prefs.allergiesPh'),
      Icon:        Leaf,
      gradient:    'from-rose-500 to-red-600',
      chipColor:   'from-rose-400 to-rose-500',
    },
    {
      key:         'favoriteFoods' as keyof StudentPreferences,
      label:       t('diary.prefs.favoriteFoods'),
      placeholder: t('diary.prefs.favoriteFoodsPh'),
      Icon:        Utensils,
      gradient:    'from-emerald-500 to-teal-600',
      chipColor:   'from-emerald-400 to-teal-500',
    },
    {
      key:         'favoriteDrinks' as keyof StudentPreferences,
      label:       t('diary.prefs.favoriteDrinks'),
      placeholder: t('diary.prefs.favoriteDrinksPh'),
      Icon:        Coffee,
      gradient:    'from-amber-500 to-orange-500',
      chipColor:   'from-amber-400 to-orange-500',
    },
    {
      key:         'dislikes' as keyof StudentPreferences,
      label:       t('diary.prefs.dislikes'),
      placeholder: t('diary.prefs.dislikesPh'),
      Icon:        ThumbsDown,
      gradient:    'from-slate-500 to-slate-700',
      chipColor:   'from-slate-400 to-slate-600',
    },
  ], [t])

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
      setSaveErr(e instanceof Error ? e.message : t('diary.prefs.saveFailed'))
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonCard lines={2} />
        <SkeletonCard lines={3} />
        <SkeletonCard lines={2} />
      </div>
    )
  }

  const readOnlyBanner = isFamily && (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40"
    >
      <Lock className="w-4 h-4 text-amber-500 shrink-0" />
      <div>
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">{t('diary.prefs.readOnlyTitle')}</p>
        <p className="text-[11px] text-amber-600/70 dark:text-amber-500/70 mt-0.5">
          {t('diary.prefs.readOnlyHint')}
        </p>
      </div>
    </motion.div>
  )

  const dateLocale = i18n.language === 'ru' ? 'ru-RU' : 'en-US'

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-5 pb-4">
      {readOnlyBanner}

      {CHIP_SECTIONS.map(({ key, label, placeholder, Icon, gradient, chipColor }) => (
        <motion.div key={key} variants={fadeUp} className="glass-card card-pad space-y-3">
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

      <motion.div variants={fadeUp} className="glass-card card-pad space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <MessageSquare className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('diary.prefs.wishes')}</span>
        </div>
        {isFamily ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {displayPrefs.wishes || (
              <span className="text-slate-300 dark:text-slate-600 italic">{t('diary.prefs.wishesEmpty')}</span>
            )}
          </p>
        ) : (
          <textarea
            value={draft.wishes}
            onChange={(e) => update('wishes', e.target.value)}
            placeholder={t('diary.prefs.wishesPh')}
            rows={3}
            className="input-field resize-none text-sm"
          />
        )}
      </motion.div>

      <motion.div variants={fadeUp} className="glass-card card-pad space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white shadow-sm">
            <FileText className="w-4 h-4" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('diary.prefs.dietaryNotes')}</span>
        </div>
        {isFamily ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {displayPrefs.dietaryNotes || (
              <span className="text-slate-300 dark:text-slate-600 italic">{t('diary.prefs.notesEmpty')}</span>
            )}
          </p>
        ) : (
          <textarea
            value={draft.dietaryNotes}
            onChange={(e) => update('dietaryNotes', e.target.value)}
            placeholder={t('diary.prefs.dietaryNotesPh')}
            rows={3}
            className="input-field resize-none text-sm"
          />
        )}
      </motion.div>

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
                <span>{t('diary.prefs.translating')}</span>
              </>
            ) : saved ? (
              <><CheckCircle2 className="w-4 h-4" /> {t('diary.prefs.saved')}</>
            ) : (
              <><Save className="w-4 h-4" /> {t('diary.prefs.save')}</>
            )}
          </motion.button>

          {lastSaved && !dirty && (
            <p className="text-center text-[11px] text-slate-400">
              {t('diary.prefs.lastSaved', {
                time: lastSaved.toLocaleString(dateLocale, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              })}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
