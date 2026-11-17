import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** A quiet link for a next step: the label with a tan underline, and a thin arrow that nudges right on hover. */
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="group inline-flex min-h-11 items-center gap-[0.6rem] py-3 font-sans text-ui font-medium text-ink no-underline" to={to}>
      <span className="pb-[0.4rem] [background:linear-gradient(var(--color-accent),var(--color-accent))_0_100%/100%_2px_no-repeat]">{children}</span>
      <svg
        viewBox="0 0 36 16"
        aria-hidden="true"
        className="h-4 w-9 fill-none stroke-current stroke-[1.25] transition-transform duration-350 ease-out group-hover:translate-x-[0.35rem]"
      >
        <path d="M1 8h32M26 2l7 6-7 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}
