import { STATUS_LABELS } from '../../data/statusLabels'
import type { RequestStatus } from '../../data/statusLabels'

/** A small mark per status, drawn from lines so the shape (not only a color) tells the states apart. */
const MARKS: Record<RequestStatus, string> = {
  requested: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
  'more-info': 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z',
  confirmed: 'm6 12.5 4 4 8-9',
  declined: 'm7 7 10 10M17 7 7 17',
}

/** Request status as a square label: a short mark and the word. The word carries the meaning; color is not used at all. */
export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className="inline-flex items-center gap-2 bg-paper px-3 py-1.5 font-sans text-label font-semibold tracking-ui text-ink">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0 fill-none stroke-current stroke-[1.75]">
        <path d={MARKS[status]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {STATUS_LABELS[status]}
    </span>
  )
}
