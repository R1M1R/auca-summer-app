import type { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

export default function GuideAddressLink({ href, children, className = '' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sky-600 dark:text-sky-400 underline decoration-sky-400/50 underline-offset-2 hover:text-sky-700 dark:hover:text-sky-300 transition-colors ${className}`}
    >
      {children}
    </a>
  )
}
