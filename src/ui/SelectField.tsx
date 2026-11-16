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

export function SelectField({ id, label, hint, error, value, options, onChange, placeholder = 'Choose one', required }: SelectFieldProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {(aria) => (
        <select id={id} name={id} className={controlClasses} value={value} onChange={(e) => onChange(e.target.value)} {...aria}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      )}
    </Field>
  )
}
