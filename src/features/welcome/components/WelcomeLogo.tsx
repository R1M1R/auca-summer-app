import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { welcomeFadeUp, welcomeStagger } from '@/features/welcome/lib/welcomeMotion'

interface WelcomeLogoProps {
  greeting: string
  appName: string
}

/** Animated TimeFlow logo + title. */
export default function WelcomeLogo({ greeting, appName }: WelcomeLogoProps) {
  return (
    <motion.div
      variants={welcomeStagger}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center gap-3 mb-8"
    >
      <motion.div variants={welcomeFadeUp} className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-glow"
        >
          <Clock className="w-10 h-10 text-white" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 -z-10"
        />
      </motion.div>

      <motion.div variants={welcomeFadeUp} className="text-center">
        <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
          {greeting}
        </p>
        <h1 className="mt-1 text-5xl font-black tracking-tight gradient-text">
          {appName}
        </h1>
      </motion.div>
    </motion.div>
  )
}
