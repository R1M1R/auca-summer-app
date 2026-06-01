import { motion } from 'framer-motion'
import { useUI } from '@/contexts/UIContext'

export default function SOSButton() {
  const { openSOS } = useUI()

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={openSOS}
      className="fixed bottom-[88px] left-4 z-40 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl
                 bg-gradient-to-r from-rose-500 to-red-600
                 text-white text-xs font-black tracking-widest uppercase
                 shadow-[0_0_20px_rgba(239,68,68,0.5)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
      aria-label="Open emergency contacts"
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <motion.span
          animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      SOS
    </motion.button>
  )
}
