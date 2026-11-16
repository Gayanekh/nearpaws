import type { ReactNode } from 'react'

/** Square label with a short word. The word carries the meaning; color is only a secondary cue. */
export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block bg-paper px-3 py-1.5 font-sans text-label font-semibold tracking-ui text-ink ${className}`}>
      {children}
    </span>
  )
}
