import { controlClasses, Field } from './Field'

interface TextAreaFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  hint?: string
  error?: string
  required?: boolean
  rows?: number
}

export function TextAreaField({ id, label, hint, error, value, onChange, required, rows = 4 }: TextAreaFieldProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {(aria) => (
        <textarea
          id={id}
          name={id}
          rows={rows}
          className={`${controlClasses} h-auto resize-y py-3`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...aria}
        />
      )}
    </Field>
  )
}
