import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PenLine, Send, Edit3, CalendarDays } from 'lucide-react'
import { useDiaryMutations } from '@/hooks/useDiaryEntries'
import { useToast } from '@/contexts/ToastContext'
import MoodSelector, { MoodBadge } from '@/components/diary/MoodSelector'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { getUserFacingError } from '@/lib/userFacingError'
import type { DiaryEntry, MoodLevel } from '@/types'

const TODAY = new Date()

interface DiaryEntryComposerProps {
  source:  DiaryEntry | null
  display: DiaryEntry | null
}

/** Today's diary entry — view + edit composer for students. */
export default function DiaryEntryComposer({ source, display }: DiaryEntryComposerProps) {
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const { saveEntry, saving, error } = useDiaryMutations()
  const [text, setText] = useState(source?.textEn ?? source?.text ?? '')
  const [mood, setMood] = useState<MoodLevel | null>(source?.mood ?? null)
  const [editing, setEditing] = useState(!source)

  const dateLocale = i18n.language === 'ru' ? 'ru-RU' : 'en-US'

  useEffect(() => {
    if (!editing) {
      setText(source?.textEn ?? source?.text ?? '')
      setMood(source?.mood ?? null)
    }
  }, [source, editing])

  const handleSave = async () => {
    if (!text.trim() || !mood) return
    try {
      const { translationOk } = await saveEntry(TODAY, text, mood)
      toast.success(t('diary.impressions.saved'))
      if (!translationOk) {
        toast.warning(t('diary.impressions.translationFailed'))
      }
      setEditing(false)
    } catch (err) {
      toast.error(getUserFacingError(err, t))
    }
  }

  if (source && !editing) {
    return (
      <motion.div layout>
        <Card className="space-y-3 border-primary-200/40 dark:border-primary-800/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {t('diary.impressions.todayEntry')}
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => setEditing(true)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary-500 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {t('diary.impressions.edit')}
            </motion.button>
          </div>

          <MoodBadge mood={display?.mood ?? source.mood} />

          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            {display?.text ?? source.textEn ?? source.text}
          </p>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div layout>
      <Card className="space-y-4 border-primary-200/40 dark:border-primary-800/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1.5">
            <PenLine className="w-3.5 h-3.5" />
            {source ? t('diary.impressions.editToday') : t('diary.impressions.todayImpressions')}
          </span>
          <span className="text-[11px] text-slate-400">
            {TODAY.toLocaleDateString(dateLocale, { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {t('diary.impressions.howWasDay')}
          </p>
          <MoodSelector value={mood} onChange={setMood} size="lg" />
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {t('diary.impressions.yourThoughts')}
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('diary.impressions.thoughtsPh')}
            rows={4}
            maxLength={1000}
            className="input-field resize-none text-sm leading-relaxed"
          />
          <p className="text-[10px] text-slate-400">{t('diary.impressions.writeInEnglish')}</p>
          <p className="text-right text-[10px] text-slate-400 tabular-nums">
            {text.length} / 1000
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-rose-500"
            >
              {getUserFacingError(error, t)}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex gap-3">
          {source && (
            <Button
              type="button"
              variant="secondary"
              fullWidth
              className="h-10"
              onClick={() => {
                setEditing(false)
                setText(source.textEn ?? source.text)
                setMood(source.mood)
              }}
            >
              {t('diary.impressions.cancel')}
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            fullWidth
            className="h-10"
            isLoading={saving}
            disabled={!text.trim() || !mood}
            leftIcon={!saving ? <Send className="w-4 h-4" /> : undefined}
            onClick={handleSave}
          >
            {saving ? t('diary.impressions.translating') : t('diary.impressions.saveEntry')}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
