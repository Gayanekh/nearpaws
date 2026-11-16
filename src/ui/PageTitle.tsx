import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface PageTitleProps {
  eyebrow: string
  title: string
  children?: ReactNode
}

/** Eyebrow, the page's one h1 in Roboto Slab Light, and an optional lead paragraph. */
export function PageTitle({ eyebrow, title, children }: PageTitleProps) {
  return (
    <header>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-slab text-display-lg font-light tracking-tight text-ink">{title}</h1>
      {children && <p className="mt-6 max-w-[34rem] text-lead text-copy">{children}</p>}
    </header>
  )
}
