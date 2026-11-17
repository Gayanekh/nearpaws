import { useState } from 'react'
import { firstBusyDay, isOpenDay, lastBookableIso } from '../data/availability'
import { toIso, todayIso } from '../utils/validation'

interface AvailabilityCalendarProps {
  caregiverId: string
  /** The chosen first and last day (yyyy-mm-dd), or empty strings. */
  start: string
  end: string
  onChange: (start: string, end: string) => void
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const day =
  'grid aspect-square place-items-center rounded-[0.625rem] font-sans text-ui font-medium tabular-nums transition-colors duration-200 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed'

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

/**
 * A month calendar of one caregiver's sample availability, made to sit on the tan block of the profile page. Open days
 * are buttons; taken and past days are disabled. The visitor picks a first and a last day: the first click sets the
 * arrival, the second the departure (the same day is a one-day visit). A range that would cross a taken day starts over
 * from the day that was clicked.
 */
export function AvailabilityCalendar({ caregiverId, start, end, onChange }: AvailabilityCalendarProps) {
  const today = todayIso()
  const last = lastBookableIso(today)
  const [ty, tm] = today.split('-').map(Number)
  const [ly, lm] = last.split('-').map(Number)
  const maxOffset = (ly! - ty!) * 12 + (lm! - tm!)
  const [offset, setOffset] = useState(0)

  const first = new Date(ty!, tm! - 1 + offset, 1)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const leading = (first.getDay() + 6) % 7
  const cells: (string | null)[] = [
    ...Array<null>(leading).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toIso(new Date(first.getFullYear(), first.getMonth(), i + 1))),
  ]

  const pick = (iso: string) => {
    if (!start || end) return onChange(iso, '')
    if (iso < start) return onChange(iso, '')
    if (firstBusyDay(caregiverId, start, iso)) return onChange(iso, '')
    return onChange(start, iso)
  }

  const arrow = 'grid size-11 place-items-center text-ink disabled:text-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" className={arrow} aria-label="Previous month" disabled={offset === 0} onClick={() => setOffset((o) => o - 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.5]"><path d="m15 4-8 8 8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <p className="font-slab text-title font-medium text-ink" aria-live="polite">
          {first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        <button type="button" className={arrow} aria-label="Next month" disabled={offset >= maxOffset} onClick={() => setOffset((o) => o + 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.5]"><path d="m9 4 8 8-8 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1" role="group" aria-label={`Availability, ${first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}>
        {WEEKDAYS.map((w) => (
          <span key={w} className="pb-1 text-center font-sans text-label font-semibold tracking-label text-ink uppercase">{w}</span>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <span key={`blank-${i}`} aria-hidden="true" />
          const open = isOpenDay(caregiverId, iso, today)
          const isEdge = iso === start || iso === end
          const inRange = Boolean(start && end && iso > start && iso < end)
          const state = !open ? (iso < today ? 'past' : 'busy') : 'open'
          const label = `${longDate(iso)}, ${isEdge ? (iso === start ? 'first day' : 'last day') : state === 'open' ? 'available' : 'not available'}`
          const look = isEdge
            ? 'bg-ink text-paper'
            : inRange
              ? 'bg-ink/20 text-ink'
              : state === 'open'
                ? 'bg-paper text-ink hover:bg-ink hover:text-paper'
                : state === 'busy'
                  ? 'text-ink/45 line-through'
                  : 'text-ink/30'
          return (
            <button
              key={iso}
              type="button"
              className={`${day} ${look}`}
              disabled={!open}
              aria-pressed={isEdge}
              aria-label={label}
              onClick={() => pick(iso)}
            >
              {Number(iso.slice(8))}
            </button>
          )
        })}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-caption text-ink" aria-label="Legend">
        <li className="flex items-center gap-2"><span className="size-3.5 rounded-[0.25rem] bg-paper" aria-hidden="true" />Available</li>
        <li className="flex items-center gap-2"><span className="size-3.5 rounded-[0.25rem] border border-ink/30" aria-hidden="true" />Busy</li>
        <li className="flex items-center gap-2"><span className="size-3.5 rounded-[0.25rem] bg-ink" aria-hidden="true" />Your days</li>
      </ul>
    </div>
  )
}
