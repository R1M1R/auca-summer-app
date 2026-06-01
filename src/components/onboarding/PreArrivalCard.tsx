import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import {
  CheckCircle2, Circle, ArrowRight,
  Bed, ShoppingCart, ClipboardList,
  UtensilsCrossed, Wifi, Package, MapPin, CalendarCheck,
  HeartHandshake, Star,
} from 'lucide-react'
import type { UserRole } from '@/types'
import { MEETING_DATE } from '@/hooks/useCountdown'

const CHECKLIST = [
  { id: 'room',     Icon: Bed },
  { id: 'fridge',   Icon: ShoppingCart },
  { id: 'prefs',    Icon: ClipboardList },
  { id: 'dinner',   Icon: UtensilsCrossed },
  { id: 'wifi',     Icon: Wifi },
  { id: 'space',    Icon: Package },
  { id: 'address',  Icon: MapPin },
  { id: 'schedule', Icon: CalendarCheck },
] as const

type ChecklistId = typeof CHECKLIST[number]['id']

const STORAGE_KEY = 'pre_arrival_checklist'

function loadChecked(): Set<ChecklistId> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return new Set(saved ? (JSON.parse(saved) as ChecklistId[]) : [])
  } catch { return new Set() }
}

function saveChecked(set: Set<ChecklistId>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

function FamilyChecklist() {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<Set<ChecklistId>>(loadChecked)
  const navigate = useNavigate()

  const toggle = useCallback((id: ChecklistId) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      saveChecked(next)
      return next
    })
  }, [])

  const done  = checked.size
  const total = CHECKLIST.length
  const pct   = Math.round((done / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-primary-500" />

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-sm">
              <HeartHandshake className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {t('preArrival.family.title')}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('preArrival.family.progress', { done, total })}
              </p>
            </div>
          </div>
          <span className={`text-sm font-black tabular-nums ${
            pct === 100 ? 'text-emerald-500' : 'gradient-text'
          }`}>
            {pct}%
          </span>
        </div>

        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-1">
          {CHECKLIST.map(({ id, Icon }, i) => {
            const isChecked = checked.has(id)
            return (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggle(id)}
                className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                  isChecked
                    ? 'bg-emerald-50 dark:bg-emerald-900/15'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <AnimatePresence mode="wait" initial={false}>
                    {isChecked ? (
                      <motion.div
                        key="checked"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { type: 'spring', stiffness: 600 } }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <motion.div key="unchecked" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Circle className="w-4.5 h-4.5 text-slate-300 dark:text-slate-600" strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} strokeWidth={2} />
                  <span className={`text-xs leading-relaxed ${
                    isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'
                  }`}>
                    {t(`preArrival.family.checklist.${id}`)}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/diary')}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold shadow-sm mt-1"
        >
          {t('preArrival.family.cta')}
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

function StudentPreArrivalBanner() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const daysLeft = Math.max(0, Math.ceil((MEETING_DATE.getTime() - Date.now()) / 86_400_000))
  const daysWord = daysLeft === 1 ? t('preArrival.student.day') : t('preArrival.student.days')

  const tipKeys = ['allergies', 'favFoods', 'wishes'] as const
  const tipEmojis: Record<typeof tipKeys[number], string> = {
    allergies: '🌿',
    favFoods:  '🍽️',
    wishes:    '💬',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-primary-500 via-violet-500 to-pink-500" />

      <div className="p-5 space-y-4">
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl shrink-0"
          >
            🏠
          </motion.div>
          <div>
            <p className="text-base font-black text-slate-800 dark:text-slate-100 leading-tight">
              {t('preArrival.student.title')}
            </p>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-0.5">
              {t('preArrival.student.dateLine', { count: daysLeft, daysWord })}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <Trans
            i18nKey="preArrival.student.message"
            components={{ strong: <strong /> }}
          />
        </p>

        <div className="grid grid-cols-3 gap-2">
          {tipKeys.map((key) => (
            <div key={key} className="glass-card px-2 py-2.5 flex flex-col items-center gap-1">
              <span className="text-xl">{tipEmojis[key]}</span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 text-center leading-tight">
                {t(`preArrival.student.${key}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 400 }}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </motion.div>
          ))}
          <span className="text-xs text-slate-400 ml-1.5">{t('preArrival.student.excited')}</span>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/diary')}
          className="btn-primary w-full flex items-center justify-center gap-2 h-12 text-sm"
        >
          {t('preArrival.student.cta')}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

interface Props { role: UserRole }

export default function PreArrivalCard({ role }: Props) {
  const before = Date.now() < MEETING_DATE.getTime()
  if (!before) return null

  if (role === 'family')  return <FamilyChecklist />
  if (role === 'student') return <StudentPreArrivalBanner />
  return null
}
