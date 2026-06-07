import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X, Phone, MessageCircle, Shield, Activity, AlertTriangle } from 'lucide-react'
import { useUI } from '@/contexts/UIContext'

const EMERGENCY = [
  {
    type:     'call' as const,
    labelKey: 'sos.police',
    number:   '102',
    display:  '102',
    gradient: 'from-blue-500 to-indigo-600',
    Icon:     Shield,
  },
  {
    type:     'call' as const,
    labelKey: 'sos.ambulance',
    number:   '103',
    display:  '103',
    gradient: 'from-rose-500 to-red-600',
    Icon:     Activity,
  },
] as const

const FAMILY = [
  {
    labelKey: 'sos.contacts.emir',
    number:   '+996505442925',
    display:  '+996 505 442 925',
    gradient: 'from-emerald-500 to-teal-600',
    emoji:    '👨',
  },
  {
    labelKey: 'sos.contacts.indira',
    number:   '+996550606426',
    display:  '+996 550 606 426',
    gradient: 'from-violet-500 to-purple-600',
    emoji:    '👩',
  },
  {
    labelKey: 'sos.contacts.raisa',
    number:   '+996558800137',
    display:  '+996 558 800 137',
    gradient: 'from-amber-500 to-orange-500',
    emoji:    '👵',
  },
] as const

function waLink(num: string) {
  return `https://wa.me/${num.replace(/\D/g, '')}`
}

function EmergencyCard({
  gradient, Icon, label, number, display,
}: {
  gradient: string; Icon: React.ElementType;
  label: string; number: string; display: string;
}) {
  return (
    <motion.a
      href={`tel:${number}`}
      whileTap={{ scale: 0.96 }}
      className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white shadow-lg`}
    >
      <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black tabular-nums leading-tight">{display}</p>
      </div>
      <Phone className="w-5 h-5 opacity-70 shrink-0" />
    </motion.a>
  )
}

function FamilyCard({
  gradient, emoji, label, number, display, whatsappLabel, callLabel,
}: {
  gradient: string; emoji: string;
  label: string; number: string; display: string;
  whatsappLabel: string; callLabel: string;
}) {
  return (
    <motion.a
      href={waLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.96 }}
      className="glass-card flex items-center gap-4 p-4 hover:ring-1 hover:ring-emerald-400/50 transition-all"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shrink-0`}>
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums mt-0.5">
          {display}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
          <MessageCircle className="w-3 h-3" />
          {whatsappLabel}
        </div>
        <motion.a
          href={`tel:${number}`}
          onClick={(e) => e.stopPropagation()}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-medium"
        >
          <Phone className="w-3 h-3" />
          {callLabel}
        </motion.a>
      </div>
    </motion.a>
  )
}

export default function SOSModal() {
  const { sosOpen, closeSOS } = useUI()
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {sosOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center max-w-lg mx-auto">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSOS}
          />

          <motion.div
            className="relative w-full"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            <div className="glass-card rounded-t-3xl rounded-b-none px-5 pt-3 pb-10 overflow-y-auto max-h-[90dvh]">
              <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg"
                  >
                    <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                      {t('sos.title')}
                    </h2>
                    <p className="text-xs text-slate-400">{t('sos.subtitle')}</p>
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.88 }}
                  onClick={closeSOS}
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {t('sos.emergencySection')}
                </p>
                {EMERGENCY.map((c) => (
                  <EmergencyCard key={c.number} {...c} label={t(c.labelKey)} />
                ))}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <MessageCircle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {t('sos.familySection')}
                </p>
                {FAMILY.map((c) => (
                  <FamilyCard
                    key={c.number}
                    {...c}
                    label={t(c.labelKey)}
                    whatsappLabel={t('sos.whatsapp')}
                    callLabel={t('sos.call')}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
