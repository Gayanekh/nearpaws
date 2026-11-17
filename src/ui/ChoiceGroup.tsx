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
  /** "list": a box and a label per row (default). "chips": soft pill buttons side by side; the chosen ones are filled with ink. */
  variant?: 'list' | 'chips'
}

/**
 * Radio or checkbox options in a labelled fieldset. The native input stays in the page (hidden, still focusable and
 * keyboard operable); the box next to the label is drawn from it. Selected state is an ink fill with a mark inside
 * (a dot for radios, a check for checkboxes), so it is never shown by color alone.
 * With variant="chips" each option is a soft pill that fills with ink (and turns its text light) when chosen.
 */
export function ChoiceGroup({ id, legend, type, options, selected, onChange, error, required, hint, variant = 'list' }: ChoiceGroupProps) {
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
      {variant === 'chips' ? (
        <div className="flex flex-wrap gap-2.5">
          {options.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input
                type={type}
                name={id}
                value={o.value}
                checked={selected.includes(o.value)}
                onChange={() => toggle(o.value)}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-[1.375rem] border border-hair bg-paper px-5 py-2 text-left font-sans text-ui font-medium text-ink transition-colors duration-200 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      ) : (
      <div className="grid gap-2">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-center gap-2 ">
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
              className={` grid size-4 shrink-0 place-items-center border border-field-border bg-paper text-paper transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 ${round ? 'rounded-full' : ''}`}
            >
              {round ? (
                <svg viewBox="0 0 24 24" className="size-2 fill-current"><circle cx="12" cy="12" r="12" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-3 fill-none stroke-current stroke-[3]"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              )}
            </span>
            <span className="grid">
              <span className="text-body-dense text-ink font-sm">{o.label}</span>
              {o.description && <span className="text-caption text-muted">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
      )}
      <FieldError id={errorId} message={error} />
    </fieldset>
  )
}
