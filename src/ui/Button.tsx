import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ink'

const base =
  'inline-flex min-h-12 items-center justify-center gap-4 px-8 py-2.5 font-sans text-ui font-medium tracking-ui no-underline ' +
  'transition-[background-color,color,transform] [transition-duration:200ms,200ms,160ms] ease-out active:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:text-muted'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-ink hover:text-paper disabled:bg-accent/35',
  secondary: 'border border-ink bg-paper text-ink hover:bg-ink hover:text-paper disabled:bg-panel',
  /** For use on a tan block, where the tan primary button would disappear. */
  ink: 'bg-ink text-paper hover:bg-paper hover:text-ink disabled:bg-panel',
}

interface CommonProps {
  variant?: Variant
  /** Soft corners (0.875rem), the same as the form controls. Square by default. */
  soft?: boolean
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  (
    | ({ to: string } & Partial<ButtonHTMLAttributes<HTMLButtonElement>>)
    | ({ to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

/**
 * The one button of the redesign: primary (tan block), secondary (hairline) or ink (on a tan block), 48px high.
 * Pass `to` for a router link and `soft` for rounded corners.
 */
export function Button({ variant = 'primary', soft = false, className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${soft ? 'rounded-[0.875rem]' : ''} ${className}`
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
