import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Smartphone, Share2, MoreVertical, Plus } from 'lucide-react'
import { fadeUpLight } from '@/lib/motion'

const fadeUp = fadeUpLight

function StepIcon({
  Icon,
  className,
  label,
}: {
  Icon: React.ElementType
  className: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 min-w-[4.5rem]">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${className}`}>
        <Icon className="w-5 h-5" strokeWidth={2} />
      </div>
      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 text-center leading-snug max-w-[88px]">
        {label}
      </span>
    </div>
  )
}

export default function AppInstallationSettings() {
  const { t } = useTranslation()

  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
        {t('settings.installation.sectionTitle')}
      </p>

      <div className="glass-card card-pad space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <Smartphone className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {t('settings.installation.title')}
            </p>
            <p className="text-[15px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {t('settings.installation.lead')}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-200/50 dark:border-sky-800/40 bg-sky-50/80 dark:bg-sky-950/25 px-4 py-4 space-y-3">
          <p className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
            {t('settings.installation.iosTitle')}
          </p>
          <div className="flex items-center justify-center gap-3 py-1">
            <StepIcon
              Icon={Share2}
              className="bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400"
              label={t('settings.installation.iosShare')}
            />
            <span className="text-slate-300 dark:text-slate-600 text-lg" aria-hidden>→</span>
            <StepIcon
              Icon={Plus}
              className="bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 border border-dashed border-primary-300/80 dark:border-primary-700/80"
              label={t('settings.installation.iosAddHome')}
            />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {t('settings.installation.iosHint')}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200/50 dark:border-emerald-800/40 bg-emerald-50/80 dark:bg-emerald-950/25 px-4 py-4 space-y-3">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            {t('settings.installation.androidTitle')}
          </p>
          <div className="flex items-center justify-center gap-3 py-1">
            <StepIcon
              Icon={MoreVertical}
              className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
              label={t('settings.installation.androidMenu')}
            />
            <span className="text-slate-300 dark:text-slate-600 text-lg" aria-hidden>→</span>
            <StepIcon
              Icon={Smartphone}
              className="bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400"
              label={t('settings.installation.androidInstall')}
            />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {t('settings.installation.androidHint')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
