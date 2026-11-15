import { useState } from 'react'
import { Button } from '../components/Button'
import { Checklist } from '../components/Checklist'
import { Container } from '../components/Container'
import { SafetyNote } from '../components/SafetyNote'
import { SectionHeading } from '../components/SectionHeading'
import { StatusBadge } from '../components/StatusBadge'
import { STATUS_LABELS } from '../components/statusLabels'
import type { RequestStatus } from '../components/statusLabels'

const STATES: RequestStatus[] = ['requested', 'more-info', 'confirmed', 'declined']

const MESSAGES: Record<RequestStatus, string> = {
  requested: 'Your request was sent to Mara. Caregivers usually reply within a day. You are not charged for a request.',
  'more-info': 'Mara has a question: “What time does Biscuit usually have his evening walk?” Please reply so she can decide.',
  confirmed: 'Mara accepted your request. The exact address and contact details are now visible below.',
  declined: 'Mara is not able to take this booking. This is not a reflection on you or your pet.',
}

export function BookingStatusPage() {
  const [status, setStatus] = useState<RequestStatus>('requested')
  const confirmed = status === 'confirmed'

  return (
    <section className="section page-top">
      <Container narrow>
        <SectionHeading level={1} eyebrow="Sample booking" title="Request status"
          description="Preview each state a request can be in. All names, addresses and times are fictional." />

        <div className="state-switch" role="group" aria-label="Preview a request state">
          {STATES.map((s) => (
            <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(s)}>{STATUS_LABELS[s]}</button>
          ))}
        </div>

        <div className="card panel" aria-live="polite">
          <div className="panel__head"><h2>Biscuit with Mara</h2><StatusBadge status={status} /></div>
          <p>{MESSAGES[status]}</p>
          <dl className="facts">
            <div><dt>Dates</dt><dd>14–18 Dec (4 nights)</dd></div>
            <div><dt>Care</dt><dd>At the caregiver’s home</dd></div>
            <div><dt>Area</dt><dd>Maple Grove</dd></div>
            <div><dt>Sample estimate</dt><dd>$168 (illustrative)</dd></div>
          </dl>

          {confirmed ? (
            <>
              <dl className="facts">
                <div><dt>Address</dt><dd>12 Example Lane, Maple Grove (fictional)</dd></div>
                <div><dt>Caregiver phone</dt><dd>555-0100 (fictional)</dd></div>
                <div><dt>Drop-off</dt><dd>14 Dec, 10:00</dd></div>
                <div><dt>Emergency vet</dt><dd>Example Vet Clinic, 555-0123</dd></div>
              </dl>
              <Checklist title="Care plan" items={[
                { label: 'Food and portions shared', done: true },
                { label: 'Medication instructions shared', done: true },
                { label: 'Walk routine agreed', done: true },
                { label: 'Emergency contact confirmed', done: true },
                { label: 'Update preference: one photo each evening', done: true },
              ]} />
            </>
          ) : (
            <SafetyNote title="Why you cannot see the address yet">
              The exact home address and phone number are shared only after the caregiver confirms. Until then you see the
              neighborhood only.
            </SafetyNote>
          )}

          <div className="form__actions">
            {status === 'declined' && <Button to="/caregivers">Find another caregiver</Button>}
            {status === 'more-info' && <Button>Reply to Mara</Button>}
            {(status === 'requested' || status === 'more-info') && <Button variant="secondary">Cancel request</Button>}
            {confirmed && <Button variant="secondary">View care updates</Button>}
          </div>
          <p className="form__note">Prototype: buttons here do nothing.</p>
        </div>
      </Container>
    </section>
  )
}
