import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * The way back to the page before, in the same design as TextLink: the label with a tan underline and a thin arrow, here
 * pointing left in front of the label and nudging left on hover. Used at the top of a page.
 */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="group mb-10 inline-flex min-h-11 items-center gap-[0.6rem] py-3 font-sans text-ui font-medium text-ink no-underline" to={to}>
      <svg
        viewBox="0 0 36 16"
        aria-hidden="true"
        className="h-4 w-9 fill-none stroke-current stroke-[1.25] transition-transform duration-350 ease-out group-hover:-translate-x-[0.35rem]"
      >
        <path d="M35 8H3M10 2 3 8l7 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="pb-[0.4rem] [background:linear-gradient(var(--color-accent),var(--color-accent))_0_100%/100%_2px_no-repeat]">{children}</span>
    </Link>
  )
}
