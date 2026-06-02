import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, BookHeart } from 'lucide-react'

interface ToastItem {
  id:      string
  message: string
}

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_MS = 5000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setToasts((prev) => [...prev, { id, message }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, TOAST_MS)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none"
        style={{ bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 5rem))' }}
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-sm glass-card card-pad flex items-start gap-3 border-primary-200/50 dark:border-primary-800/40 shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-primary-600 flex items-center justify-center shrink-0">
                <BookHeart className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug pt-0.5">
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
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
