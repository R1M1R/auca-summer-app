import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Subtle lift on hover — use for clickable cards */
  interactive?: boolean
  padding?: 'none' | 'default'
}

/**
 * Glass card wrapper — uses design tokens from index.css.
 */
export default function Card({
  children,
  className = '',
  interactive = false,
  padding = 'default',
}: CardProps) {
  return (
    <div
      className={[
        'glass-card',
        padding === 'default' ? 'card-pad' : '',
        interactive ? 'glass-card-interactive' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}

export function CardHeader({ title, subtitle, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-3 mb-4 ${className}`}>
      <div className="min-w-0">
        <h2 className="text-title truncate">{title}</h2>
        {subtitle && (
          <p className="text-body-muted text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}
