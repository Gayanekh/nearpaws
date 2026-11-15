import { Icon } from './Icon'

interface StepIndicatorProps {
  steps: string[]
  current: number
}

/** Shows form progress with text ("Step 2 of 3"), numbers and a check mark, not just color. */
export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <nav aria-label="Form progress" className="steps">
      <p className="visually-hidden">Step {current + 1} of {steps.length}: {steps[current]}</p>
      <ol>
        {steps.map((label, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'todo'
          return (
            <li key={label} className={`steps__item steps__item--${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="steps__num" aria-hidden="true">{state === 'done' ? <Icon name="check" size={16} /> : i + 1}</span>
              <span className="steps__label">{label}{state === 'done' ? ' (done)' : ''}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
