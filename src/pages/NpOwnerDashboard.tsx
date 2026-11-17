import { useState } from 'react'
import { CARE_TYPE_LABELS } from '../data/content'
import type { CareRequest } from '../data/demo'
import { STATUS_LABELS } from '../data/statusLabels'
import { useDemo } from '../demo/useDemo'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { CarePlan } from '../ui/CarePlan'
import { FactList } from '../ui/FactList'
import { MessageThread } from '../ui/MessageThread'
import { PageTitle } from '../ui/PageTitle'
import { PetProfile } from '../ui/PetProfile'
import { PhotoField } from '../ui/PhotoField'
import { RequestList } from '../ui/RequestList'
import { SafetyNote } from '../ui/SafetyNote'
import { StatusBadge } from '../ui/StatusBadge'
import { TextAreaField } from '../ui/TextAreaField'
import { useDocumentTitle } from '../useDocumentTitle'
import { formatDate, formatStay, nightsBetween } from '../utils/validation'

const heading = 'mb-4 font-slab text-title font-medium text-ink'

/** What the owner is told about the state of the request. */
const message = (status: CareRequest['status'], name: string) =>
  ({
    requested: `Your request was sent to ${name}. Caregivers usually reply within a day. You are not charged for a request.`,
    'more-info': `${name} has a question. Please reply below so they can decide.`,
    confirmed: `${name} accepted your request. The exact address and contact details are now visible below.`,
    declined: `${name} is not able to take this booking. This is not a reflection on you or your pet.`,
    cancelled: 'You cancelled this request. Nothing was charged.',
  })[status]

/**
 * Pet owner dashboard (/dashboard): the requests the owner has sent and where each one stands. The list is on a panel on
 * the left, the selected request on the right with its status, the conversation, and what the owner can do next (reply to a
 * question, cancel). Once a request is confirmed the address, the care plan and the caregiver's updates appear.
 */
export function NpOwnerDashboard() {
  useDocumentTitle('Your requests')
  const { account, requests, cancel, reply, setPetPhoto, caregiver } = useDemo()
  const mine = requests.filter((r) => r.ownerId === account?.id)
  const [selectedId, setSelectedId] = useState('')
  const [answer, setAnswer] = useState('')
  const request = mine.find((r) => r.id === selectedId) ?? mine[0]

  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <PageTitle eyebrow={`Pet owner · ${account?.name ?? ''}`} title="Your requests">
        Every request you have sent, and where it stands. This is a demonstration: the caregivers and their answers are fictional.
      </PageTitle>

      {!request ? (
        <div className="mt-12 max-w-[40rem] bg-panel p-8">
          <h2 className={heading}>No requests yet</h2>
          <p className="mb-6 text-body-dense text-copy">Find a caregiver, choose your days and send a request. It will appear here.</p>
          <Button soft to={ROUTES.caregivers}>Find a caregiver</Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="bg-panel p-6">
            <h2 className={heading}>Requests</h2>
            <RequestList
              requests={mine}
              selectedId={request.id}
              onSelect={(id) => {
                setSelectedId(id)
                setAnswer('')
              }}
              who={(r) => caregiver(r.caregiverId)?.name ?? ""}
            />
            <Button soft variant="secondary" to={ROUTES.caregivers} className="mt-6 w-full">New request</Button>
          </div>

          <RequestDetail
            key={request.id}
            request={request}
            answer={answer}
            setAnswer={setAnswer}
            onReply={() => {
              reply(request.id, answer.trim())
              setAnswer('')
            }}
            onCancel={() => cancel(request.id)}
            onPhoto={(photo) => setPetPhoto(request.id, photo)}
          />
        </div>
      )}
    </section>
  )
}

interface RequestDetailProps {
  request: CareRequest
  answer: string
  setAnswer: (v: string) => void
  onReply: () => void
  onCancel: () => void
  onPhoto: (photo: string) => void
}

function RequestDetail({ request: r, answer, setAnswer, onReply, onCancel, onPhoto }: RequestDetailProps) {
  const caregiver = useDemo().caregiver(r.caregiverId)!
  const nights = nightsBetween(r.start, r.end)
  const confirmed = r.status === 'confirmed'
  const open = r.status === 'requested' || r.status === 'more-info' || confirmed

  return (
    <div className="grid gap-8">
      <div aria-live="polite" className="grid gap-6 bg-panel p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-slab text-display-md font-normal text-ink">
            {r.pet.name} with {caregiver.name}
          </h2>
          <StatusBadge status={r.status} />
        </div>
        <p className="max-w-[40rem] text-body-dense text-copy">{message(r.status, caregiver.name)}</p>
        <FactList
          items={[
            { term: 'Dates', text: formatStay(r.start, r.end) },
            { term: 'Care', text: CARE_TYPE_LABELS[r.careType] },
            { term: 'Area', text: caregiver.area },
            ...(nights > 0 ? [{ term: 'Sample estimate', text: `$${caregiver.pricePerNight * nights} (illustrative)` }] : []),
          ]}
        />

        {confirmed ? (
          <>
            <FactList
              items={[
                { term: 'Address', text: `12 Example Lane, ${caregiver.area} (fictional)` },
                { term: 'Caregiver phone', text: '555-0100 (fictional)' },
                { term: 'Drop-off', text: `${formatDate(r.start)}, 10:00` },
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
          r.status !== 'cancelled' &&
          r.status !== 'declined' && (
            <SafetyNote title="Why you cannot see the address yet">
              The exact home address and phone number are shared only after the caregiver confirms. Until then you see the
              neighborhood only.
            </SafetyNote>
          )
        )}

        <MessageThread messages={r.messages} viewer="owner" otherName={caregiver.name} />

        {r.status === 'more-info' && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              if (answer.trim()) onReply()
            }}
          >
            <TextAreaField id="reply" label={`Your reply to ${caregiver.name}`} rows={3} required value={answer} onChange={setAnswer} />
            <Button soft type="submit" disabled={!answer.trim()}>Send reply</Button>
          </form>
        )}

        <div className="flex flex-wrap gap-4">
          {(r.status === 'declined' || r.status === 'cancelled') && <Button soft to={ROUTES.caregivers}>Find another caregiver</Button>}
          {open && <Button soft variant="secondary" onClick={onCancel}>Cancel request</Button>}
        </div>
      </div>

      {confirmed && (
        <div>
          <h2 className={heading}>Care updates</h2>
          {r.updates.length === 0 ? (
            <p className="text-body-dense text-muted">{caregiver.name} has not posted an update yet.</p>
          ) : (
            <ul className="grid gap-3">
              {r.updates.map((u) => (
                <li key={`${u.when}-${u.text}`} className="border-t border-ink/15 py-4 text-body-dense text-ink">
                  <strong className="block font-semibold">{u.when}</strong>
                  {u.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <h2 className={heading}>Your pet</h2>
        <div className="mb-6 max-w-[32rem]">
          <PhotoField id="pet-photo" label={`Photo of ${r.pet.name}`} hint="Shown to the caregiver. It stays in this browser tab." value={r.pet.photo ?? ''} onChange={onPhoto} />
        </div>
        <PetProfile pet={r.pet} />
        <p className="mt-3 text-caption text-muted">Status: {STATUS_LABELS[r.status]}. Prototype: nothing is sent or stored outside this browser tab.</p>
      </div>
    </div>
  )
}
