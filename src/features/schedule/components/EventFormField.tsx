import type { ReactNode } from 'react'

interface EventFormFieldProps {
  label: string
  Icon: React.ElementType
  children: ReactNode
  error?: string
}

/** Labeled form field with icon — used in AddEventModal. */
export function EventFormField({ label, Icon, children, error }: EventFormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-rose-500 dark:text-rose-400 leading-relaxed">{error}</p>
      )}
    </div>
  )
}
