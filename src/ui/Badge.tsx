import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  /** Fill of the label: paper (on a tan or panel surface) or accent (on paper). */
  tone?: 'paper' | 'accent'
  className?: string
}

/** Square label with a short word. The word carries the meaning; color is only a secondary cue. */
export function Badge({ children, tone = 'paper', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1.5 font-sans text-label font-semibold tracking-ui text-ink ${tone === 'accent' ? 'bg-accent' : 'bg-paper'} ${className}`}
    >
      {children}
    </span>
  )
}
