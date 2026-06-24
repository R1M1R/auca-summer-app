import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PenLine, CalendarDays, Wifi } from 'lucide-react'
import { useDiaryEntries, useDiaryMutations, toDateKey } from '@/hooks/useDiaryEntries'
import { useToast } from '@/contexts/ToastContext'
import { MoodBadge } from '@/components/diary/MoodSelector'
import { SkeletonCard } from '@/components/ui/Skeleton'
import Card from '@/components/ui/Card'
import EmptyState from '@/components/ui/EmptyState'
import DiaryEntryComposer from '@/features/diary/components/DiaryEntryComposer'
import DiaryEntryCard from '@/features/diary/components/DiaryEntryCard'
import { localizeDiaryEntry } from '@/lib/localizedContent'
import { useAppLanguage } from '@/hooks/useAppLanguage'
import { getUserFacingError } from '@/lib/userFacingError'
import { isConfigured } from '@/lib/firebase'
import type { UserRole } from '@/types'

const TODAY = new Date()
const TODAY_KEY = toDateKey(TODAY)

function formatEntryDate(d: Date, t: (key: string) => string, locale: string): string {
  const diff = Math.floor(
    (new Date().setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) / 86_400_000,
  )
  if (diff === 0) return t('diary.impressions.today')
  if (diff === 1) return t('diary.impressions.yesterday')
  return d.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })
}

interface Props { role: UserRole }

export default function ImpressionsTab({ role }: Props) {
  const { t, i18n } = useTranslation()
  const { toast } = useToast()
  const isStudent = role === 'student'
  const lang = useAppLanguage()
  const { entries, loading, error } = useDiaryEntries()
  const { deleteEntry } = useDiaryMutations()

  const dateLocale = i18n.language === 'ru' ? 'ru-RU' : 'en-US'
  const formatDate = (d: Date) => formatEntryDate(d, t, dateLocale)

  const todayEntry = entries.find((e) => toDateKey(e.date) === TODAY_KEY) ?? null
  const todayDisplay = todayEntry ? localizeDiaryEntry(todayEntry, role, lang) : null
  const pastEntries = entries
    .filter((e) => toDateKey(e.date) !== TODAY_KEY)
    .map((e) => localizeDiaryEntry(e, role, lang))

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id)
      toast.success(t('diary.impressions.deleted'))
    } catch (err) {
      toast.error(getUserFacingError(err, t))
    }
  }

  return (
    <div className="space-y-5 pb-4">
      {role === 'family' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30"
        >
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {isConfigured
              ? t('diary.impressions.liveSync')
              : t('diary.impressions.liveSyncDemo')}
          </span>
        </motion.div>
      )}

      {isStudent && (
        <DiaryEntryComposer source={todayEntry} display={todayDisplay} />
      )}

      {loading && (
        <div className="space-y-3">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={2} />
        </div>
      )}

      {!loading && error && (
        <Card className="border-rose-200/70 dark:border-rose-800/40">
          <p className="text-sm text-rose-600 dark:text-rose-400">{getUserFacingError(error, t)}</p>
        </Card>
      )}

      {role === 'family' && todayDisplay && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="space-y-2.5 border-primary-200/40 dark:border-primary-800/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {t('diary.impressions.today')}
              </span>
              <MoodBadge mood={todayDisplay.mood} />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {todayDisplay.text}
            </p>
          </Card>
        </motion.div>
      )}

      {!loading && (
        <div className="space-y-3">
          {pastEntries.length > 0 && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              {t('diary.impressions.previousEntries', { count: pastEntries.length })}
            </p>
          )}

          <AnimatePresence mode="popLayout">
            {pastEntries.map((entry) => (
              <DiaryEntryCard
                key={entry.id}
                entry={entry}
                canDelete={isStudent}
                onDelete={() => handleDelete(entry.id)}
                formatDate={formatDate}
              />
            ))}
          </AnimatePresence>

          {entries.length === 0 && !loading && (
            <EmptyState
              icon={PenLine}
              title={t('diary.impressions.noEntries')}
              description={isStudent ? t('diary.impressions.writeFirst') : undefined}
            />
          )}
        </div>
      )}
    </div>
  )
}
