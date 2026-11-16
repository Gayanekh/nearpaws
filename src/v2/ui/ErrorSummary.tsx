import { useEffect, useRef } from 'react'

/** Lists every problem after a failed submit, moves focus to the list, and links each message to its field. */
export function ErrorSummary({ errors }: { errors: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null)
  const entries = Object.entries(errors)

  useEffect(() => {
    if (entries.length) ref.current?.focus()
    // Only when the number of problems changes, as in the original form.
  }, [entries.length])

  if (!entries.length) return null
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="mb-8 border border-error p-6 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
      <h2 className="mb-3 font-sans text-body-dense font-semibold text-error">
        Error: please fix {entries.length === 1 ? '1 thing' : `${entries.length} things`} to continue
      </h2>
      <ul className="grid gap-2">
        {entries.map(([id, message]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="text-body-dense text-error underline underline-offset-[0.25em]"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById(id)
                target?.scrollIntoView({ block: 'center' })
                // Fieldsets are not focusable, so focus the first input inside instead.
                ;(target?.matches('input,select,textarea') ? target : target?.querySelector<HTMLElement>('input'))?.focus()
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
