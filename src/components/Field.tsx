import type { ReactNode } from 'react'
import { Icon } from './Icon'

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: (aria: { 'aria-describedby'?: string; 'aria-invalid': boolean }) => ReactNode
}

/**
 * Shared wrapper for every single-input field: label, optional hint, and an error message.
 * Errors use an icon and the words "Error:" so they never rely on color alone.
 */
export function Field({ id, label, hint, error, required, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label} {required ? <span className="field__req">(required)</span> : <span className="field__opt">(optional)</span>}
      </label>
      {hint && <p id={hintId} className="field__hint">{hint}</p>}
      {children({ 'aria-describedby': describedBy, 'aria-invalid': Boolean(error) })}
      {error && (
        <p id={errorId} className="field__error">
          <Icon name="alert" size={16} /> <span><span className="visually-hidden">Error: </span>{error}</span>
        </p>
      )}
    </div>
  )
}
