import type { ReactNode } from 'react'

/** Explains who can see which personal details. Sits on paper inside a panel or on its own on a panel. */
export function SafetyNote({ title = 'Your privacy', children }: { title?: string; children: ReactNode }) {
  return (
    <aside aria-label={title} className="flex gap-4 border border-ink/15 bg-paper p-5">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-6 shrink-0 fill-none stroke-ink stroke-[1.5]">
        <path d="M12 3 5 6v5.5c0 4.2 2.8 7.4 7 9.5 4.2-2.1 7-5.3 7-9.5V6l-7-3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <h3 className="font-slab text-title font-medium text-ink">{title}</h3>
        <p className="mt-1 text-body-dense text-copy">{children}</p>
      </div>
    </aside>
  )
}
