import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, MapPin, X } from 'lucide-react'
import { markWelcomeModalSeen } from '@/lib/welcomeStorage'

const CONFETTI_PIECES = Array.from({ length: 48 }, (_, i) => ({
  id:    i,
  left:  `${(i * 17 + 7) % 100}%`,
  delay: `${(i % 12) * 0.12}s`,
  color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'][i % 6],
  rot:   `${(i * 47) % 360}deg`,
  size:  6 + (i % 5),
}))

interface Props {
  open: boolean
  onClose: () => void
}

export default function WelcomeModal({ open, onClose }: Props) {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const dismiss = useCallback(() => {
    markWelcomeModalSeen()
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            aria-label={t('welcome.close')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
          />

          <div className="welcome-confetti pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {CONFETTI_PIECES.map((p) => (
              <span
                key={p.id}
                className="welcome-confetti-piece"
                style={{
                  left:            p.left,
                  animationDelay:  p.delay,
                  backgroundColor: p.color,
                  width:           p.size,
                  height:          p.size * 1.4,
                  ['--rot' as string]: p.rot,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="relative w-full max-w-sm glass-card rounded-3xl p-6 shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-primary-400/30 to-violet-500/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-gradient-to-tr from-rose-400/25 to-amber-400/15 blur-2xl" />

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={dismiss}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              aria-label={t('welcome.close')}
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="relative flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 18 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-glow mb-4"
              >
                <Sparkles className="w-8 h-8 text-white" strokeWidth={1.5} />
              </motion.div>

              <h2
                id="welcome-modal-title"
                className="text-xl font-black text-slate-800 dark:text-slate-100 leading-tight"
              >
                {t('welcome.titleEn')}
              </h2>
              <p className="mt-1 text-lg font-bold gradient-text">
                {t('welcome.titleRu')}
              </p>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('welcome.body')}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-primary-600 dark:text-primary-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{t('welcome.location')}</span>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={dismiss}
                className="mt-6 w-full h-12 rounded-2xl btn-primary text-sm font-bold shadow-glow-sm"
              >
                {t('welcome.cta')}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
