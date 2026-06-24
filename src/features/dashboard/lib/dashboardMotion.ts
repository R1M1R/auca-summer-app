import { fadeUpLight } from '@/lib/motion'

export const dashboardContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
} as const

export const dashboardFadeUp = fadeUpLight

export const dashboardScaleIn = {
  initial: { opacity: 0, scale: 0.93 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
} as const
