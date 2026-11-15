import { STATUS_LABELS } from './statusLabels'
import type { RequestStatus } from './statusLabels'

/** Booking request status. The text always carries the meaning; color is secondary. */
export function StatusBadge({ status }: { status: RequestStatus }) {
  return <span className={`status status--${status}`}>{STATUS_LABELS[status]}</span>
}
