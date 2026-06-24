import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import Spinner from '@/components/ui/Spinner'

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'btn-primary shadow-glow-sm hover:shadow-glow',
  ghost: 'btn-ghost',
  danger:
    'px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 active:scale-[0.97] transition-all duration-200 shadow-sm',
  secondary:
    'px-6 py-3 rounded-2xl font-medium text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-white/10 border border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-white/15 active:scale-[0.97] transition-all duration-200',
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-7 py-3.5 text-base rounded-2xl',
}

/**
 * Primary action button with loading state and glass-friendly variants.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    disabled,
    children,
    ...rest
  },
  ref,
) {
  const isPrimary = variant === 'primary'
  const sizeOverride = !isPrimary ? SIZE_CLASS[size] : size === 'md' ? '' : SIZE_CLASS[size]

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || isLoading}
      className={[
        VARIANT_CLASS[variant],
        sizeOverride,
        fullWidth ? 'w-full' : '',
        'inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none',
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading ? (
        <Spinner size="sm" className={variant === 'primary' || variant === 'danger' ? 'border-white/30 border-t-white' : ''} />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
})

export default Button
