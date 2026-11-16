import { STATUS_LABELS } from '../data/statusLabels'
import type { RequestStatus } from '../data/statusLabels'

/** Booking request status. The text always carries the meaning; color is secondary. */
export function StatusBadge({ status }: { status: RequestStatus }) {
  return <span className={`status status--${status}`}>{STATUS_LABELS[status]}</span>
}
