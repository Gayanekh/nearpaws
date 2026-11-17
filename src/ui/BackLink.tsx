import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** The way back to the page before: a left arrow, the label and a tan underline. Used at the top of a page. */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="mb-10 inline-flex min-h-11 items-center font-sans text-ui font-medium tracking-ui text-ink underline decoration-accent decoration-2 underline-offset-[0.3em]"
    >
      <span aria-hidden="true">←</span>&nbsp;{children}
    </Link>
  )
}
