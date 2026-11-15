import type { ReactNode } from 'react'
import { Icon } from './Icon'

/** Explains who can see which personal details. */
export function SafetyNote({ title = 'Your privacy', children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="safety-note" aria-label={title}>
      <Icon name="shield" size={22} />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </aside>
  )
}
