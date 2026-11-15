import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

interface MockConfirmationProps {
  title: string
  children: ReactNode
  actions: ReactNode
}

/** Confirmation screen. It always states plainly that nothing was sent or saved. */
export function MockConfirmation({ title, children, actions }: MockConfirmationProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <div className="confirmation card">
      <span className="confirmation__icon"><Icon name="check" size={28} /></span>
      <p className="badge badge--warn">Prototype confirmation. Nothing was sent or saved.</p>
      <h1 ref={ref} tabIndex={-1}>{title}</h1>
      <p>
        This is a demonstration screen. No real booking or application was submitted, no message was sent, and the details you
        typed are discarded when you leave this page.
      </p>
      {children}
      <div className="confirmation__actions">{actions}</div>
    </div>
  )
}
