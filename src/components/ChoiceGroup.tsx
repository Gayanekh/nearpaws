import { Icon } from './Icon'

interface ChoiceGroupProps {
  id: string
  legend: string
  type: 'radio' | 'checkbox'
  options: { value: string; label: string; description?: string }[]
  selected: string[]
  onChange: (selected: string[]) => void
  error?: string
  required?: boolean
  hint?: string
}

/** Radio or checkbox options shown as large tappable cards inside a labelled fieldset. */
export function ChoiceGroup({ id, legend, type, options, selected, onChange, error, required, hint }: ChoiceGroupProps) {
  const toggle = (value: string) => {
    if (type === 'radio') return onChange([value])
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  }
  const errorId = error ? `${id}-error` : undefined
  return (
    <fieldset className={`choice-group ${error ? 'field--error' : ''}`} aria-describedby={errorId} id={id}>
      <legend className="field__label">
        {legend} {required ? <span className="field__req">(required)</span> : <span className="field__opt">(optional)</span>}
      </legend>
      {hint && <p className="field__hint">{hint}</p>}
      <div className="choice-group__options">
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input
              type={type}
              name={id}
              value={o.value}
              checked={selected.includes(o.value)}
              onChange={() => toggle(o.value)}
            />
            <span className="choice__box">
              <span className="choice__label">{o.label}</span>
              {o.description && <span className="choice__desc">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="field__error">
          <Icon name="alert" size={16} /> <span><span className="visually-hidden">Error: </span>{error}</span>
        </p>
      )}
    </fieldset>
  )
}
