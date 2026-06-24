export const welcomePageIn = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.5 } },
  exit:     { opacity: 0, y: -20, transition: { duration: 0.3 } },
} as const

export const welcomeSlideIn = (dir: 1 | -1) => ({
  initial:  { opacity: 0, x: dir * 40 },
  animate:  { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, x: dir * -30, transition: { duration: 0.25 } },
})

export const welcomeFadeUp = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const

export const welcomeStagger = {
  animate: { transition: { staggerChildren: 0.1 } },
} as const

export const WELCOME_BLOBS = [
  { size: 420, x: -18, y: -12, color: 'from-primary-400/20 to-violet-400/10', delay: 0 },
  { size: 340, x: 68,  y: 55,  color: 'from-rose-400/15   to-pink-400/10',    delay: 2 },
  { size: 300, x: 22,  y: 78,  color: 'from-cyan-400/15   to-teal-400/10',    delay: 4 },
] as const
