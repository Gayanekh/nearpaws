import type { ReactNode } from 'react'

export interface FieldAria {
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
}

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: (aria: FieldAria) => ReactNode
}

/** Shared shell of a form field: the label above, an optional hint, the control, and a linked error message. */
export function Field({ id, label, hint, error, required, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className="mb-6">
      <label htmlFor={id} className="mb-2 block font-sans text-ui font-medium tracking-ui text-ink">
        {label} <OptionalMark required={required} />
      </label>
      {hint && <p id={hintId} className="mb-2 text-caption text-muted">{hint}</p>}
      {children({ 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined, 'aria-required': required || undefined })}
      <FieldError id={errorId} message={error} />
    </div>
  )
}

export function OptionalMark({ required }: { required?: boolean }) {
  return <span className="text-label font-normal text-muted">{required ? '(required)' : '(optional)'}</span>
}

/** An error message that says "Error:" to screen readers and carries an icon, so it never relies on color alone. */
export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-caption font-semibold text-error">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-4 shrink-0 fill-none stroke-current stroke-2">
        <path d="M12 3 2.5 20h19L12 3Z" strokeLinejoin="round" />
        <path d="M12 10v4.5M12 17.5v.01" strokeLinecap="round" />
      </svg>
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  )
}

/** Class list of a text-like control (input, select, textarea): square, 1px border, 48px high, 2px ink focus ring. */
export const controlClasses =
  'block h-12 w-full border border-field-border bg-paper px-4 font-sans text-body-dense text-ink ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-[invalid=true]:border-error'
