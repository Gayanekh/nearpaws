import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  narrow?: boolean
  className?: string
}

/** Centers content and applies the shared page width and gutter. */
export function Container({ children, narrow = false, className = '' }: ContainerProps) {
  return <div className={`container ${narrow ? 'container--narrow' : ''} ${className}`}>{children}</div>
}
