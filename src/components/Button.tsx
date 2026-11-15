import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost'

interface CommonProps {
  variant?: Variant
  size?: 'md' | 'lg'
  children: ReactNode
  className?: string
}

type ButtonProps = CommonProps &
  (({ to: string } & Partial<ButtonHTMLAttributes<HTMLButtonElement>>) | ({ to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>))

/** One button for the whole site. Pass `to` to render a router link instead of a <button>. */
export function Button({ variant = 'primary', size = 'md', children, className = '', ...rest }: ButtonProps) {
  const classes = `btn btn--${variant} btn--${size} ${className}`
  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
      </Link>
    )
  }
  const { to: _to, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined }
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
