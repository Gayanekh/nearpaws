import { FieldError, OptionalMark } from './Field'

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

/**
 * Radio or checkbox options in a labelled fieldset. The native input stays in the page (hidden, still focusable and
 * keyboard operable); the box next to the label is drawn from it. Selected state is an ink fill with a mark inside
 * (a dot for radios, a check for checkboxes), so it is never shown by color alone.
 */
export function ChoiceGroup({ id, legend, type, options, selected, onChange, error, required, hint }: ChoiceGroupProps) {
  const toggle = (value: string) => {
    if (type === 'radio') return onChange([value])
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  }
  const errorId = error ? `${id}-error` : undefined
  const round = type === 'radio'
  return (
    <fieldset id={id} aria-describedby={errorId} className="mb-6 min-w-0 border-0 p-0">
      <legend className="mb-2 p-0 font-sans text-ui font-medium tracking-ui text-ink">
        {legend} <OptionalMark required={required} />
      </legend>
      {hint && <p className="mb-2 text-caption text-muted">{hint}</p>}
      <div className="grid gap-1">
        {options.map((o) => (
          <label key={o.value} className="flex min-h-11 cursor-pointer items-start gap-3 py-2">
            <input
              type={type}
              name={id}
              value={o.value}
              checked={selected.includes(o.value)}
              onChange={() => toggle(o.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={`mt-px grid size-6 shrink-0 place-items-center border border-field-border bg-paper text-paper transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 ${round ? 'rounded-full' : ''}`}
            >
              {round ? (
                <svg viewBox="0 0 24 24" className="size-2.5 fill-current"><circle cx="12" cy="12" r="12" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[2.5]"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              )}
            </span>
            <span className="grid">
              <span className="text-body-dense text-ink">{o.label}</span>
              {o.description && <span className="text-caption text-muted">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  )
}
