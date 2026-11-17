import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Badge } from './Badge'

interface MockConfirmationProps {
  title: string
  children: ReactNode
  actions: ReactNode
}

/** Confirmation screen. It always states plainly that nothing was sent. The headline takes focus on arrival. */
export function MockConfirmation({ title, children, actions }: MockConfirmationProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <div>
      <Badge tone="accent">Prototype confirmation. Nothing was sent.</Badge>
      <h1 ref={ref} tabIndex={-1} className="mt-6 font-slab text-display-lg font-light tracking-tight text-ink outline-none">
        {title}
      </h1>
      <p className="mt-6 mb-10 max-w-[34rem] text-lead text-copy">
        This is a demonstration screen. No real booking or application was submitted and no message was sent.
      </p>
      {children}
      <div className="mt-10 flex flex-wrap gap-4">{actions}</div>
    </div>
  )
}
