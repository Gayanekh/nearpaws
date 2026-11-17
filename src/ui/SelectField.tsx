import { controlClasses, Field } from './Field'

interface SelectFieldProps {
  id: string
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
}

/** A select with its own chevron, drawn 1rem from the right edge, the same distance the text keeps from the left edge. */
export function SelectField({ id, label, hint, error, value, options, onChange, placeholder = 'Choose one', required }: SelectFieldProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {(aria) => (
        <div className="relative">
          <select id={id} name={id} className={`${controlClasses} appearance-none pr-11`} value={value} onChange={(e) => onChange(e.target.value)} {...aria}>
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 fill-none stroke-ink stroke-2">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </Field>
  )
}
