import { HTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'glass-card-lg',
        variant === 'glow' && 'neon-glow',
        className
      )}
      {...props}
    />
  )
)

Card.displayName = 'Card'

export { Card }