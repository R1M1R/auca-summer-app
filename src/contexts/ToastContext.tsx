import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X, CheckCircle2, AlertCircle, Info, AlertTriangle, BookHeart,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning'

interface ToastItem {
  id:      string
  message: string
  variant: ToastVariant
}

interface ToastApi {
  success: (message: string) => void
  error:   (message: string) => void
  info:    (message: string) => void
  warning: (message: string) => void
  default: (message: string) => void
}

interface ToastContextValue {
  /** @deprecated Prefer `toast.success()` / `toast.error()` — kept for backward compatibility */
  showToast: (message: string, variant?: ToastVariant) => void
  toast: ToastApi
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_MS = 5000

const VARIANT_STYLE: Record<ToastVariant, { icon: LucideIcon; iconWrap: string; border: string }> = {
  default: {
    icon: BookHeart,
    iconWrap: 'from-violet-500 to-primary-600',
    border: 'border-primary-200/50 dark:border-primary-800/40',
  },
  success: {
    icon: CheckCircle2,
    iconWrap: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-200/60 dark:border-emerald-800/40',
  },
  error: {
    icon: AlertCircle,
    iconWrap: 'from-rose-500 to-orange-500',
    border: 'border-rose-200/60 dark:border-rose-800/40',
  },
  info: {
    icon: Info,
    iconWrap: 'from-sky-500 to-primary-600',
    border: 'border-sky-200/60 dark:border-sky-800/40',
  },
  warning: {
    icon: AlertTriangle,
    iconWrap: 'from-amber-500 to-orange-500',
    border: 'border-amber-200/60 dark:border-amber-800/40',
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const push = useCallback((message: string, variant: ToastVariant = 'default') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setToasts((prev) => [...prev, { id, message, variant }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, TOAST_MS)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useMemo<ToastApi>(
    () => ({
      success: (m) => push(m, 'success'),
      error:   (m) => push(m, 'error'),
      info:    (m) => push(m, 'info'),
      warning: (m) => push(m, 'warning'),
      default: (m) => push(m, 'default'),
    }),
    [push],
  )

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'default') => push(message, variant),
    [push],
  )

  const value = useMemo(() => ({ showToast, toast }), [showToast, toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed left-0 right-0 z-[100] flex flex-col items-center gap-2.5 px-4 pointer-events-none"
        style={{ bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 5rem))' }}
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toastItem) => {
            const style = VARIANT_STYLE[toastItem.variant]
            const Icon = style.icon
            return (
              <motion.div
                key={toastItem.id}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto w-full max-w-sm glass-card card-pad flex items-start gap-3 shadow-lg ${style.border}`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${style.iconWrap} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug pt-0.5">
                  {toastItem.message}
                </p>
                <button
                  type="button"
                  onClick={() => dismiss(toastItem.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
