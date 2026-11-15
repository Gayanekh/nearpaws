import type { InputHTMLAttributes } from 'react'
import { Field } from './Field'

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'onChange'> {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  hint?: string
  error?: string
}

export function TextField({ id, label, hint, error, value, onChange, required, ...inputProps }: TextFieldProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required}>
      {(aria) => (
        <input
          id={id}
          name={id}
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...aria}
          {...inputProps}
        />
      )}
    </Field>
  )
}
