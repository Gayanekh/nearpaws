import { useState } from 'react'
import { STATUS_LABELS } from '../../data/statusLabels'
import type { RequestStatus } from '../../data/statusLabels'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { CarePlan } from '../ui/CarePlan'
import { FactList } from '../ui/FactList'
import { PageTitle } from '../ui/PageTitle'
import { SafetyNote } from '../ui/SafetyNote'
import { StatusBadge } from '../ui/StatusBadge'

const STATES: RequestStatus[] = ['requested', 'more-info', 'confirmed', 'declined']

const MESSAGES: Record<RequestStatus, string> = {
  requested: 'Your request was sent to Mara. Caregivers usually reply within a day. You are not charged for a request.',
  'more-info': 'Mara has a question: “What time does Biscuit usually have his evening walk?” Please reply so she can decide.',
  confirmed: 'Mara accepted your request. The exact address and contact details are now visible below.',
  declined: 'Mara is not able to take this booking. This is not a reflection on you or your pet.',
}

/**
 * Request status (/booking-status): previews each state a request can be in. The state is carried by the word and a
 * shape, never by color. The address and phone appear only once the request is confirmed, with the privacy note
 * shown until then. Same content and behavior as the original page; buttons are inert, as there.
 */
export function NpBookingStatus() {
  const [status, setStatus] = useState<RequestStatus>('requested')
  const confirmed = status === 'confirmed'

  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <PageTitle eyebrow="Sample booking" title="Request status">
        Preview each state a request can be in. All names, addresses and times are fictional.
      </PageTitle>

      <div className="mt-12 max-w-[48rem]">
        <div role="group" aria-label="Preview a request state" className="mb-8 flex flex-wrap gap-2">
          {STATES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className="min-h-11 border border-ink bg-paper px-5 font-sans text-ui font-medium tracking-ui text-ink transition-colors duration-200 ease-out hover:bg-ink hover:text-paper aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="grid gap-6 bg-panel p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-slab text-display-md font-normal text-ink">Biscuit with Mara</h2>
            <StatusBadge status={status} />
          </div>
          <p className="max-w-[40rem] text-body-dense text-copy">{MESSAGES[status]}</p>
          <FactList
            items={[
              { term: 'Dates', text: '14–18 Dec (4 nights)' },
              { term: 'Care', text: 'At the caregiver’s home' },
              { term: 'Area', text: 'Maple Grove' },
              { term: 'Sample estimate', text: '$168 (illustrative)' },
            ]}
          />

          {confirmed ? (
            <>
              <FactList
                items={[
                  { term: 'Address', text: '12 Example Lane, Maple Grove (fictional)' },
                  { term: 'Caregiver phone', text: '555-0100 (fictional)' },
                  { term: 'Drop-off', text: '14 Dec, 10:00' },
                  { term: 'Emergency vet', text: 'Example Vet Clinic, 555-0123' },
                ]}
              />
              <CarePlan
                title="Care plan"
                items={[
                  { label: 'Food and portions shared', done: true },
                  { label: 'Medication instructions shared', done: true },
                  { label: 'Walk routine agreed', done: true },
                  { label: 'Emergency contact confirmed', done: true },
                  { label: 'Update preference: one photo each evening', done: true },
                ]}
              />
            </>
          ) : (
            <SafetyNote title="Why you cannot see the address yet">
              The exact home address and phone number are shared only after the caregiver confirms. Until then you see the
              neighborhood only.
            </SafetyNote>
          )}

          <div className="flex flex-wrap gap-4">
            {status === 'declined' && <Button to={ROUTES.caregivers}>Find another caregiver</Button>}
            {status === 'more-info' && <Button>Reply to Mara</Button>}
            {(status === 'requested' || status === 'more-info') && <Button variant="secondary">Cancel request</Button>}
            {confirmed && <Button variant="secondary">View care updates</Button>}
          </div>
          <p className="text-body-dense text-muted">Prototype: buttons here do nothing.</p>
        </div>
      </div>
    </section>
  )
}
