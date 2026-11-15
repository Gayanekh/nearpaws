import { useEffect, useRef } from 'react'

interface ErrorSummaryProps {
  errors: Record<string, string>
}

/** Lists every problem after a failed submit, moves focus to it, and links to each field. */
export function ErrorSummary({ errors }: ErrorSummaryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const entries = Object.entries(errors)

  useEffect(() => {
    if (entries.length) ref.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length])

  if (!entries.length) return null
  return (
    <div ref={ref} tabIndex={-1} className="error-summary" role="alert">
      <h2 className="error-summary__title">Please fix {entries.length === 1 ? '1 thing' : `${entries.length} things`} to continue</h2>
      <ul>
        {entries.map(([id, message]) => (
          <li key={id}>
            <a
              href={`#${id}`}
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
