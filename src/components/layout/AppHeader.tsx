import type { ReactNode } from 'react'

interface AppHeaderProps {
  children: ReactNode
  className?: string
}

/** Sticky page header with iOS safe-area top inset and opaque backdrop. */
export default function AppHeader({ children, className = '' }: AppHeaderProps) {
  return (
    <header className={`app-header ${className}`.trim()}>
      {children}
    </header>
  )
}
