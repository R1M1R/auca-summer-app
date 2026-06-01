import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Home, Lock, X, ArrowRight } from 'lucide-react'
import { isFamilyPinConfigured, verifyFamilyPin } from '@/lib/familyPin'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function FamilyPinModal({ open, onClose, onSuccess }: Props) {
  const { t } = useTranslation()
  const [pin, setPin]       = useState('')
  const [error, setError]   = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const pinConfigured = isFamilyPinConfigured()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      setPin('')
      setError(null)
      return
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 200)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const handleSubmit = useCallback(() => {
    if (!pinConfigured) {
      setError(t('welcome.pin.notConfigured'))
      setPin('')
      return
    }
    if (!verifyFamilyPin(pin)) {
      setError(t('welcome.pin.incorrect'))
      setPin('')
      inputRef.current?.focus()
      return
    }
    setError(null)
    onSuccess()
  }, [pin, pinConfigured, onSuccess, t])

  const handleClose = useCallback(() => {
    setPin('')
    setError(null)
    onClose()
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="family-pin-title"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-md"
            aria-label={t('welcome.pin.cancel')}
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="relative w-full max-w-sm glass-card rounded-3xl p-6 shadow-2xl border border-rose-200/40 dark:border-rose-800/30"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
              aria-label={t('welcome.pin.cancel')}
            >
              <X className="w-4 h-4" />
            </motion.button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-glow-sm mb-4">
                <Lock className="w-7 h-7 text-white" strokeWidth={1.8} />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400 mb-1">
                <Home className="w-3.5 h-3.5" />
                {t('welcome.family')}
              </div>

              <h2
                id="family-pin-title"
                className="text-lg font-black text-slate-800 dark:text-slate-100"
              >
                {t('welcome.pin.title')}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('welcome.pin.subtitle')}
              </p>

              <div className="w-full mt-5 space-y-2">
                <input
                  ref={inputRef}
                  type="password"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value)
                    if (error) setError(null)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={t('welcome.pin.placeholder')}
                  className={`input-field text-center text-lg font-bold tracking-[0.35em] ${
                    error ? 'ring-2 ring-rose-400/60' : ''
                  }`}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'family-pin-error' : undefined}
                />

                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="family-pin-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-500 font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={!pin.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 w-full h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('welcome.pin.submit')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <button
                type="button"
                onClick={handleClose}
                className="mt-3 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {t('welcome.pin.cancel')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
