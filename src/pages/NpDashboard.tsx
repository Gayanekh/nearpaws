import { useState } from 'react'
import { SAMPLE_REQUESTS, SAMPLE_UPDATES } from '../data/operations'
import { PageTitle } from '../ui/PageTitle'
import { PetProfile } from '../ui/PetProfile'
import { SafetyNote } from '../ui/SafetyNote'
import { StatusBadge } from '../ui/StatusBadge'
import { useDocumentTitle } from '../useDocumentTitle'

const DAYS = Array.from({ length: 14 }, (_, i) => i + 1)
const heading = 'mb-4 font-slab text-title font-medium text-ink'

/**
 * Caregiver dashboard (/caregiver-dashboard): incoming requests, the selected request's pet details, an availability
 * grid and care updates. Layout from DESIGN.md: the request list and availability on a panel, the detail on paper, and
 * square availability cells with an ink fill (and a strike-through) for busy days. Same data and behavior as the original page.
 */
export function NpDashboard() {
  useDocumentTitle('Sample caregiver dashboard')
  const [selected, setSelected] = useState(SAMPLE_REQUESTS[0]!.id)
  const [busy, setBusy] = useState<number[]>([5, 6, 12])
  const request = SAMPLE_REQUESTS.find((r) => r.id === selected)!
  const toggle = (d: number) => setBusy((b) => (b.includes(d) ? b.filter((x) => x !== d) : [...b, d]))

  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <PageTitle eyebrow="Sample caregiver view" title="Caregiver dashboard">
        What a caregiver sees: incoming requests, pet details, availability and updates. All data is fictional.
      </PageTitle>

      <div className="mt-12 grid gap-12 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="bg-panel p-6">
          <h2 className={heading}>Requests</h2>
          <ul className="grid gap-2">
            {SAMPLE_REQUESTS.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  aria-pressed={selected === r.id}
                  onClick={() => setSelected(r.id)}
                  className="flex w-full flex-wrap items-center gap-x-2 gap-y-2 border border-transparent bg-paper px-4 py-3 text-left text-body-dense text-ink transition-colors duration-200 ease-out hover:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
                >
                  <strong className="font-semibold">{r.pet.name}</strong> · {r.dates}
                  <StatusBadge status={r.status} />
                </button>
              </li>
            ))}
          </ul>

          <h2 className={`${heading} mt-10`}>Availability</h2>
          <p className="mb-4 text-body-dense text-muted">Select days to mark them busy (next 14 days).</p>
          <div role="group" aria-label="Availability, next 14 days" className="grid grid-cols-7 gap-2">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={busy.includes(d)}
                onClick={() => toggle(d)}
                aria-label={`Day ${d}, ${busy.includes(d) ? 'busy' : 'available'}`}
                className="grid aspect-square min-h-11 place-items-center border border-field-border bg-paper font-sans text-ui font-medium text-ink tabular-nums transition-colors duration-200 ease-out hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper aria-pressed:line-through"
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-10">
          <div>
            <h2 className={heading}>Request details</h2>
            <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-dense text-copy">
              <StatusBadge status={request.status} />
              <span>{request.careType}. {request.note}</span>
            </p>
            <PetProfile pet={request.pet} />
          </div>
          <SafetyNote title="Sensitive details">
            Pet health notes and owner contacts are visible only to people involved in this booking.
          </SafetyNote>
          <div>
            <h2 className={heading}>Care updates</h2>
            <ul className="grid gap-3">
              {SAMPLE_UPDATES.map((u) => (
                <li key={u.when} className="border-t border-ink/15 py-4 text-body-dense text-ink">
                  <strong className="block font-semibold">{u.when}</strong>
                  {u.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
