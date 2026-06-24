/** Lightweight route transitions — opacity only (avoids layout jump with fixed bottom nav). */
export const routeTransition = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
  },
} as const

export const fadeUpLight = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
} as const

/** Stagger children in lists — use on motion container */
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
} as const

/** Tap feedback for icon buttons */
export const tapScale = { whileTap: { scale: 0.92 } } as const
