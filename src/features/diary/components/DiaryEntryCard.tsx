import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import { MoodBadge } from '@/components/diary/MoodSelector'
import Card from '@/components/ui/Card'
import type { DiaryEntry } from '@/types'

interface DiaryEntryCardProps {
  entry: DiaryEntry
  canDelete: boolean
  onDelete: () => void
  formatDate: (d: Date) => string
}

/** Past diary entry with optional delete confirmation. */
export default function DiaryEntryCard({
  entry,
  canDelete,
  onDelete,
  formatDate,
}: DiaryEntryCardProps) {
  const { t } = useTranslation()
  const [confirmDel, setConfirmDel] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Card interactive className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {formatDate(new Date(entry.date))}
            </span>
            <MoodBadge mood={entry.mood} />
          </div>
          {canDelete && !confirmDel && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.85 }}
              onClick={() => setConfirmDel(true)}
              className="text-slate-300 dark:text-slate-600 hover:text-rose-400 transition-colors p-1"
              aria-label={t('diary.impressions.delete')}
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
            </motion.button>
          )}
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
          {entry.text}
        </p>

        <AnimatePresence>
          {confirmDel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800"
            >
              <span className="text-xs text-slate-500 flex-1">{t('diary.impressions.deleteConfirm')}</span>
              <button
                type="button"
                onClick={() => setConfirmDel(false)}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded-lg"
              >
                {t('diary.impressions.cancel')}
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 px-2.5 py-1 rounded-lg transition-colors"
              >
                {t('diary.impressions.delete')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
