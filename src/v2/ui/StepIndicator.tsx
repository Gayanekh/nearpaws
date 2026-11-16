interface StepIndicatorProps {
  steps: string[]
  current: number
}

/**
 * Form progress as large numerals ("01", "02", "03") with the step title beside the current one. Done steps get a check
 * and the word "done", the current step is underlined in tan, so it is never color alone. Screen readers get one
 * sentence: "Step 2 of 3: Your pet".
 */
export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <nav aria-label="Form progress" className="mb-10">
      <p className="sr-only">Step {current + 1} of {steps.length}: {steps[current]}</p>
      <ol className="grid list-none gap-4 p-0 sm:grid-cols-3">
        {steps.map((label, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'todo'
          return (
            <li
              key={label}
              aria-current={state === 'current' ? 'step' : undefined}
              className={`border-t-2 pt-3 ${state === 'current' ? 'border-accent' : 'border-ink/15'}`}
            >
              <span aria-hidden="true" className={`block font-slab text-numeral font-medium ${state === 'todo' ? 'text-muted' : 'text-ink'}`}>
                {String(i + 1).padStart(2, '0')}
                <span className="text-body-dense font-normal text-muted"> / {String(steps.length).padStart(2, '0')}</span>
              </span>
              <span className={`mt-1 flex items-center gap-2 font-sans text-ui font-medium tracking-ui ${state === 'todo' ? 'text-muted' : 'text-ink'}`}>
                {state === 'done' && (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0 fill-none stroke-current stroke-2">
                    <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {label}
                {state === 'done' ? ' (done)' : ''}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
