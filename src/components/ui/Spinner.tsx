interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const SIZE_MAP = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-[3px]',
  lg: 'w-11 h-11 border-[3px]',
} as const

/** Accessible loading spinner. */
export default function Spinner({ size = 'md', className = '', label = 'Loading' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block rounded-full border-slate-200 dark:border-slate-600 border-t-primary-500 animate-spin ${SIZE_MAP[size]} ${className}`}
    />
  )
}

interface PageSpinnerProps {
  label?: string
}

/** Centered fullscreen-style loader for route suspense. */
export function PageSpinner({ label }: PageSpinnerProps) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" label={label ?? 'Loading'} />
    </div>
  )
}
