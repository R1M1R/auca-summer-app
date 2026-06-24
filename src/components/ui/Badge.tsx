import type { EventCategory } from '@/types'
import { getCategoryPillClass } from '@/lib/categoryStyles'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

/** Generic pill badge. */
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`badge ${className}`}>
      {children}
    </span>
  )
}

interface CategoryBadgeProps {
  label: string
  category: EventCategory
  className?: string
}

/** Event category pill with consistent colors app-wide. */
export function CategoryBadge({ label, category, className = '' }: CategoryBadgeProps) {
  return (
    <span className={`badge ${getCategoryPillClass(category)} ${className}`}>
      {label}
    </span>
  )
}
