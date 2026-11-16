import type { AnchorHTMLAttributes } from 'react'

interface LegacyLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

/**
 * A link to a page that still lives in the original site. It is a plain anchor, so the browser loads that page
 * (and its own CSS) fresh. Replace it with a router <Link> when the page is redesigned.
 */
export function LegacyLink({ to, ...rest }: LegacyLinkProps) {
  return <a href={to} {...rest} />
}
