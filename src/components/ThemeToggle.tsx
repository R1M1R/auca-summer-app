import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center
                 text-slate-500 dark:text-slate-400
                 hover:text-slate-800 dark:hover:text-slate-100
                 transition-colors duration-200 overflow-hidden"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  30, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {isDark
            ? <Moon className="w-4 h-4" strokeWidth={2} />
            : <Sun  className="w-4 h-4" strokeWidth={2} />
          }
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
