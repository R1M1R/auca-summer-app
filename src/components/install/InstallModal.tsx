import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Share2, Plus, Smartphone, Download,
  CheckCircle2, ExternalLink,
} from 'lucide-react'
import { usePWAInstall, type DetectedOS } from '@/hooks/usePWAInstall'

/* ── Props ───────────────────────────────────────────────────── */
interface Props {
  open:    boolean
  onClose: () => void
}

/* ── iOS instruction steps ───────────────────────────────────── */
const IOS_STEPS = [
  {
    Icon:     Share2,
    gradient: 'from-sky-500 to-blue-600',
    title:    'Tap the Share button',
    desc:     'Find the ↑ Share icon at the bottom of your Safari browser bar.',
  },
  {
    Icon:     Plus,
    gradient: 'from-primary-500 to-violet-600',
    title:    'Add to Home Screen',
    desc:     'Scroll down the share sheet and tap "Add to Home Screen".',
  },
  {
    Icon:     Smartphone,
    gradient: 'from-emerald-500 to-teal-600',
    title:    'Tap "Add"',
    desc:     'Confirm by tapping "Add" in the top-right corner. Done!',
  },
] as const

/* ── iOS panel ───────────────────────────────────────────────── */
function IOSPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400 text-center">
        Open this page in <strong>Safari</strong> to install
      </p>
      {IOS_STEPS.map(({ Icon, gradient, title, desc }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-start gap-4"
        >
          {/* Step number + icon */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
              <Icon className="w-5 h-5" strokeWidth={1.8} />
            </div>
            {i < IOS_STEPS.length - 1 && (
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
            )}
          </div>
          {/* Text */}
          <div className="pt-1.5">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
          </div>
        </motion.div>
      ))}

      {/* Visual hint: iOS share icon SVG */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-blue-500" strokeWidth={2} />
          </div>
          <span className="text-[9px] text-slate-400">Share</span>
        </div>
        <span className="text-slate-300 dark:text-slate-600 text-lg">→</span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
            <Plus className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
          </div>
          <span className="text-[9px] text-slate-400">Add to Home</span>
        </div>
        <span className="text-slate-300 dark:text-slate-600 text-lg">→</span>
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-black">TF</span>
          </div>
          <span className="text-[9px] text-slate-400">Installed!</span>
        </div>
      </div>
    </div>
  )
}

/* ── Android panel ───────────────────────────────────────────── */
function AndroidPanel({ onInstall, installed }: { onInstall: () => void; installed: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4 py-4">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-glow"
        >
          <Download className="w-9 h-9 text-white" strokeWidth={1.5} />
        </motion.div>

        <div className="text-center space-y-1">
          <p className="text-base font-bold text-slate-700 dark:text-slate-200">
            Install TimeFlow
          </p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Add the app to your home screen for the best experience — works offline too.
          </p>
        </div>
      </div>

      {installed ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold text-sm"
        >
          <CheckCircle2 className="w-5 h-5" />
          App installed successfully!
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onInstall}
          className="btn-primary w-full flex items-center justify-center gap-2 h-12"
        >
          <Download className="w-5 h-5" strokeWidth={2} />
          Install App
        </motion.button>
      )}

      <p className="text-center text-[11px] text-slate-400">
        No app store needed · Updates automatically
      </p>
    </div>
  )
}

/* ── Desktop / Other panel ───────────────────────────────────── */
function DesktopPanel() {
  return (
    <div className="space-y-4 py-2 text-center">
      <ExternalLink className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" strokeWidth={1.5} />
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Use on your phone
        </p>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Open this app on your iOS or Android device to install it on your home screen.
        </p>
      </div>
    </div>
  )
}

/* ── Gradient badge per OS ────────────────────────────────────── */
const OS_BADGE: Record<DetectedOS, { label: string; gradient: string }> = {
  ios:     { label: 'iOS',     gradient: 'from-slate-700 to-slate-900' },
  android: { label: 'Android', gradient: 'from-emerald-500 to-teal-600' },
  desktop: { label: 'Desktop', gradient: 'from-slate-500 to-slate-700'  },
  other:   { label: 'Web',     gradient: 'from-slate-500 to-slate-700'  },
}

/* ── Modal ───────────────────────────────────────────────────── */
export default function InstallModal({ open, onClose }: Props) {
  const { canPrompt, triggerInstall, installed, os } = usePWAInstall()
  const badge = OS_BADGE[os]

  const handleInstall = async () => {
    const accepted = await triggerInstall()
    if (accepted) onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center max-w-lg mx-auto">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            <div className="glass-card rounded-t-3xl rounded-b-none px-5 pt-3 pb-10 overflow-y-auto max-h-[85dvh]">
              {/* Handle */}
              <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-5" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white shadow-sm">
                    <Smartphone className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
                      Install the App
                    </h2>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${badge.gradient}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* OS-specific content */}
              {os === 'ios'     && <IOSPanel />}
              {os === 'android' && (
                <AndroidPanel
                  onInstall={handleInstall}
                  installed={installed}
                />
              )}
              {(os === 'desktop' || os === 'other') && <DesktopPanel />}

              {/* If Android but no prompt yet (already installed or not triggered) */}
              {os === 'android' && !canPrompt && !installed && (
                <p className="text-center text-xs text-slate-400 mt-3">
                  Look for the "Install" option in your browser menu (⋮).
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
