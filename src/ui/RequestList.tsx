import type { CareRequest } from '../data/demo'
import { formatStay } from '../utils/validation'
import { StatusBadge } from './StatusBadge'

interface RequestListProps {
  requests: CareRequest[]
  selectedId: string
  onSelect: (id: string) => void
  /** The other person in the request: the caregiver (for an owner) or the owner (for a caregiver). */
  who: (request: CareRequest) => string
}

/** The list of requests on the left of a dashboard: pet, the other person, the days and the status. One is selected. */
export function RequestList({ requests, selectedId, onSelect, who }: RequestListProps) {
  return (
    <ul className="grid gap-2">
      {requests.map((r) => (
        <li key={r.id}>
          <button
            type="button"
            aria-pressed={selectedId === r.id}
            onClick={() => onSelect(r.id)}
            className="flex w-full items-center gap-4 border border-transparent bg-paper px-4 py-3 text-left text-body-dense text-ink transition-colors duration-200 ease-out hover:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {r.pet.photo && <img src={r.pet.photo} alt="" className="size-14 shrink-0 rounded-[0.625rem] object-cover" />}
            <span className="grid min-w-0 gap-2">
              <span>
                <strong className="font-semibold">{r.pet.name}</strong> · {who(r)}
              </span>
              <span className="text-caption">{formatStay(r.start, r.end)}</span>
              <span>
                <StatusBadge status={r.status} />
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
