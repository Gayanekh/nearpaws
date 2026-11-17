import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface TextLinkProps {
  to: string
  /** A link back: the arrow comes first, points left, and nudges left on hover. */
  back?: boolean
  children: ReactNode
}

/** A quiet link for a next step: the label with a tan underline, and a thin arrow that nudges right on hover. */
export function TextLink({ to, back, children }: TextLinkProps) {
  const arrow = (
    <svg
      viewBox="0 0 36 16"
      aria-hidden="true"
      className={`h-4 w-9 fill-none stroke-current stroke-[1.25] transition-transform duration-350 ease-out ${back ? 'group-hover:-translate-x-[0.35rem]' : 'group-hover:translate-x-[0.35rem]'}`}
    >
      <path d={back ? 'M35 8H3M10 2 3 8l7 6' : 'M1 8h32M26 2l7 6-7 6'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  return (
    <Link className="group inline-flex min-h-11 items-center gap-[0.6rem] py-3 font-sans text-ui font-medium text-ink no-underline" to={to}>
      {back && arrow}
      <span className="pb-[0.4rem] [background:linear-gradient(var(--color-accent),var(--color-accent))_0_100%/100%_2px_no-repeat]">{children}</span>
      {!back && arrow}
    </Link>
  )
}
