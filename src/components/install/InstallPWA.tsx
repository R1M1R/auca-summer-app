import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Download, Smartphone, Plus } from 'lucide-react'
import { usePWAInstall } from '@/hooks/usePWAInstall'
import { useAppStore } from '@/store/useAppStore'

const COPY = {
  en: {
    title:       'Install TimeFlow',
    iosBody:     'To install the app, tap the Share button in your browser and choose Add to Home Screen.',
    shareLabel:  'Share',
    homeLabel:   'Add to Home Screen',
    installBtn:  'Install App',
    close:       'Close',
    androidHint: 'Or use ⋮ → Install app in your browser menu',
  },
  ru: {
    title:       'Установить TimeFlow',
    iosBody:     'Чтобы установить приложение, нажмите иконку «Поделиться» в браузере и выберите «На экран Домой».',
    shareLabel:  'Поделиться',
    homeLabel:   'На экран Домой',
    installBtn:  'Установить приложение',
    close:       'Закрыть',
    androidHint: 'Или: ⋮ → «Установить приложение» в меню браузера',
  },
} as const

type InstallCopy = (typeof COPY)[keyof typeof COPY]

function AppIconBadge() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}icon.svg`}
      alt=""
      className="w-11 h-11 rounded-2xl shadow-glow-sm shrink-0"
      width={44}
      height={44}
    />
  )
}

/* ── iOS bottom sheet ─────────────────────────────────────────── */
function IOSInstallSheet({
  copy,
  onClose,
}: {
  copy: InstallCopy
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="fixed inset-x-0 bottom-0 z-[65] max-w-lg mx-auto pb-safe-bottom pointer-events-none"
    >
      <div className="pointer-events-auto mx-3 mb-3 glass-card rounded-2xl px-4 py-4 border-primary-200/50 dark:border-primary-800/40 shadow-glow">
        <div className="flex items-start gap-3">
          <AppIconBadge />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{copy.title}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              {copy.iosBody}
            </p>

            <div className="flex items-center justify-center gap-3 mt-4 py-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/60">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-sky-600 dark:text-sky-400" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-medium text-slate-500">{copy.shareLabel}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center border border-dashed border-primary-300 dark:border-primary-700">
                  <Plus className="w-5 h-5 text-primary-600 dark:text-primary-400" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-medium text-slate-500 text-center max-w-[72px] leading-tight">
                  {copy.homeLabel}
                </span>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0"
            aria-label={copy.close}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="mt-3 w-full py-2.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80"
        >
          {copy.close}
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── Android / Desktop install bar ──────────────────────────── */
function NativeInstallBar({
  copy,
  onInstall,
  installing,
  onClose,
  showMenuHint,
}: {
  copy: InstallCopy
  onInstall: () => void
  installing: boolean
  onClose: () => void
  showMenuHint: boolean
}) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="install-banner-above-nav fixed inset-x-0 max-w-lg mx-auto px-3 pointer-events-none"
    >
      <div className="pointer-events-auto glass-card rounded-2xl px-4 py-3 flex items-center gap-3 border-emerald-200/50 dark:border-emerald-800/40 bg-gradient-to-r from-emerald-50/95 to-teal-50/95 dark:from-emerald-950/50 dark:to-teal-950/40">
        <AppIconBadge />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{copy.title}</p>
          {showMenuHint && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{copy.androidHint}</p>
          )}
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          disabled={installing}
          onClick={onInstall}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-violet-600 text-white text-xs font-bold shadow-glow-sm flex items-center gap-1.5 disabled:opacity-60"
        >
          {installing ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4" strokeWidth={2.5} />
          )}
          {copy.installBtn}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/60 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0"
          aria-label={copy.close}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── Android fallback (no beforeinstallprompt yet) ───────────── */
function AndroidHintBar({
  copy,
  onClose,
}: {
  copy: InstallCopy
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="install-banner-above-nav fixed inset-x-0 max-w-lg mx-auto px-3 pointer-events-none"
    >
      <div className="pointer-events-auto glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white shrink-0">
          <Smartphone className="w-5 h-5" />
        </div>
        <p className="flex-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {copy.androidHint}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-slate-500 px-2 py-1"
        >
          {copy.close}
        </button>
      </div>
    </motion.div>
  )
}

/**
 * Global PWA install prompt — student & family, all routes.
 * iOS: bottom sheet with Share → Add to Home Screen.
 * Android / Desktop: beforeinstallprompt + Install button.
 */
export default function InstallPWA() {
  const role     = useAppStore((s) => s.role)
  const language = useAppStore((s) => s.language)

  const {
    shouldShow,
    canPrompt,
    triggerInstall,
    dismiss,
    os,
    deferredPrompt,
  } = usePWAInstall()

  const [installing, setInstalling] = useState(false)

  const langKey = role === 'family' || language === 'ru' ? 'ru' : 'en'
  const copy = COPY[langKey]

  if (!shouldShow) return null

  const handleInstall = async () => {
    setInstalling(true)
    try {
      await triggerInstall()
    } finally {
      setInstalling(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {os === 'ios' && (
        <IOSInstallSheet key="ios" copy={copy} onClose={dismiss} />
      )}

      {canPrompt && os !== 'ios' && (
        <NativeInstallBar
          key="native"
          copy={copy}
          onInstall={handleInstall}
          installing={installing}
          onClose={dismiss}
          showMenuHint={os === 'android'}
        />
      )}

      {os === 'android' && !deferredPrompt && !canPrompt && (
        <AndroidHintBar key="android-hint" copy={copy} onClose={dismiss} />
      )}
    </AnimatePresence>
  )
}
