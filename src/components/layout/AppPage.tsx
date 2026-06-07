import type { ReactNode } from 'react'

interface AppPageProps {
  children: ReactNode
  /** e.g. bg-mesh-light / bg-mesh-dark */
  className?: string
}

/** Full-height page shell for tab screens (safe-area padding comes from .page-shell in App). */
export default function AppPage({ children, className = '' }: AppPageProps) {
  return (
    <div className={`min-h-full flex flex-col ${className}`.trim()}>
      {children}
    </div>
  )
}
