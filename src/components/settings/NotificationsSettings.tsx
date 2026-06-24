import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Bell, BellOff, BellRing, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useApp } from '@/contexts/AppContext'
import { useToast } from '@/contexts/ToastContext'
import { useNotificationPermission } from '@/hooks/useNotificationPermission'
import { fadeUpLight } from '@/lib/motion'

const fadeUp = fadeUpLight

function StatusBadge({ label, tone }: { label: string; tone: 'granted' | 'denied' | 'default' | 'unsupported' }) {
  const styles: Record<string, string> = {
    granted:     'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    denied:      'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    default:     'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    unsupported: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  }

  return (
    <span className={`badge text-[10px] font-bold border-0 ${styles[tone]}`}>
      {label}
    </span>
  )
}

export default function NotificationsSettings() {
  const { t } = useTranslation()
  const { role } = useApp()
  const { toast } = useToast()
  const {
    permission,
    supported,
    granted,
    denied,
    default: isDefault,
    busy,
    request,
    sendTest,
  } = useNotificationPermission()

  const [testing, setTesting] = useState(false)

  const handleEnable = async () => {
    const result = await request()
    if (result === 'granted') {
      toast.success(t('notifications.settings.enabledToast'))
    } else if (result === 'denied') {
      toast.warning(t('notifications.settings.deniedToast'))
    }
  }

  const handleTest = async () => {
    setTesting(true)
    try {
      const ok = await sendTest(
        t('notifications.settings.testTitle'),
        t('notifications.settings.testBody'),
      )
      if (ok) {
        toast.success(t('notifications.settings.testSent'))
      } else {
        toast.error(t('notifications.settings.testFailed'))
      }
    } finally {
      setTesting(false)
    }
  }

  const hintKey =
    role === 'student'
      ? 'notifications.settings.hintStudent'
      : 'notifications.settings.hintFamily'

  const statusTone = !supported
    ? 'unsupported' as const
    : permission === 'granted'
      ? 'granted' as const
      : permission === 'denied'
        ? 'denied' as const
        : 'default' as const

  const statusLabel = !supported
    ? '—'
    : permission === 'granted'
      ? t('notifications.settings.statusGranted')
      : permission === 'denied'
        ? t('notifications.settings.statusDenied')
        : t('notifications.settings.statusDefault')

  return (
    <motion.div variants={fadeUp} className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
        {t('notifications.settings.sectionTitle')}
      </p>

      <div className="glass-card card-pad space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-primary-600 flex items-center justify-center text-white shadow-sm shrink-0">
            {granted ? (
              <BellRing className="w-5 h-5" strokeWidth={2} />
            ) : denied ? (
              <BellOff className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Bell className="w-5 h-5" strokeWidth={2} />
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t('notifications.settings.title')}
              </p>
              <StatusBadge label={statusLabel} tone={statusTone} />
            </div>
            <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(hintKey)}
            </p>
          </div>
        </div>

        {!supported && (
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {t('notifications.settings.unsupported')}
          </p>
        )}

        {supported && isDefault && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            disabled={busy}
            onClick={() => void handleEnable()}
            className="btn-primary w-full h-11 flex items-center justify-center gap-2 text-base disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Bell className="w-4 h-4" />
            )}
            {t('notifications.settings.enableButton')}
          </motion.button>
        )}

        {supported && denied && (
          <div className="rounded-xl px-4 py-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/40 space-y-2">
            <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed">
              {t('notifications.settings.deniedHelp')}
            </p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              disabled={busy}
              onClick={() => void handleEnable()}
              className="w-full h-10 rounded-xl border border-rose-300 dark:border-rose-700 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-100/80 dark:hover:bg-rose-900/30 transition-colors disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                t('notifications.settings.retryButton')
              )}
            </motion.button>
          </div>
        )}

        {supported && granted && (
          <div className="space-y-2">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {t('notifications.settings.grantedHint')}
            </p>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              disabled={testing}
              onClick={() => void handleTest()}
              className="w-full h-10 rounded-xl glass-card text-sm font-semibold text-slate-700 dark:text-slate-200 hover:ring-1 hover:ring-primary-400/40 transition-all flex items-center justify-center gap-2"
            >
              {testing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BellRing className="w-4 h-4" />
              )}
              {t('notifications.settings.testButton')}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
