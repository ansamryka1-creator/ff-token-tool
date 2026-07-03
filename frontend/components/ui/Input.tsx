import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={clsx(
        'w-full px-4 py-2.5 rounded-lg',
        'bg-card-bg border border-card-border',
        'text-white placeholder-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent',
        'transition-all',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
)

Input.displayName = 'Input'

export { Input }