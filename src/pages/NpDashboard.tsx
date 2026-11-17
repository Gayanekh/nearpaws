import { useState } from 'react'
import { CARE_TYPE_LABELS } from '../data/content'
import type { CareRequest } from '../data/demo'
import { useDemo } from '../demo/useDemo'
import { Button } from '../ui/Button'
import { FactList } from '../ui/FactList'
import { MessageThread } from '../ui/MessageThread'
import { PageTitle } from '../ui/PageTitle'
import { PetProfile } from '../ui/PetProfile'
import { RequestList } from '../ui/RequestList'
import { SafetyNote } from '../ui/SafetyNote'
import { StatusBadge } from '../ui/StatusBadge'
import { TextAreaField } from '../ui/TextAreaField'
import { useDocumentTitle } from '../useDocumentTitle'
import { formatStay } from '../utils/validation'

const DAYS = Array.from({ length: 14 }, (_, i) => i + 1)
const heading = 'mb-4 font-slab text-title font-medium text-ink'


/** What the caregiver is told about the state of the request. */
const note = (r: CareRequest) =>
  ({
    requested: 'Waiting for your reply.',
    'more-info': 'You asked a question. Waiting for the owner to answer.',
    confirmed: 'Care plan agreed. You can post updates during the stay.',
    declined: 'You declined this request.',
    cancelled: 'The owner cancelled this request.',
  })[r.status]

/**
 * Caregiver dashboard (/caregiver-dashboard): the requests sent to the signed-in caregiver, the selected request with the
 * pet's details, what the caregiver can do (accept, ask a question, decline, or post updates once confirmed), and an
 * availability grid. Layout from DESIGN.md: the list and availability on a panel, the detail on paper.
 */
export function NpDashboard() {
  useDocumentTitle('Caregiver dashboard')
  const { account, requests, accept, ask, decline, sendUpdate, nameOf } = useDemo()
  const ownerOf = (r: CareRequest) => nameOf(r.ownerId)
  const mine = requests.filter((r) => r.caregiverId === account?.caregiverId)
  const [selectedId, setSelectedId] = useState('')
  const [text, setText] = useState('')
  const [asking, setAsking] = useState(false)
  const [busy, setBusy] = useState<number[]>([5, 6, 12])
  const request = mine.find((r) => r.id === selectedId) ?? mine[0]
  const toggle = (d: number) => setBusy((b) => (b.includes(d) ? b.filter((x) => x !== d) : [...b, d]))

  const select = (id: string) => {
    setSelectedId(id)
    setText('')
    setAsking(false)
  }

  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <PageTitle eyebrow={`Caregiver · ${account?.name ?? ''}`} title="Caregiver dashboard">
        The requests sent to you, the pet details, your availability and updates. This is a demonstration: the owners and pets are fictional.
      </PageTitle>

      <div className="mt-12 grid gap-12 lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="bg-panel p-6 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto">
          <h2 className={heading}>Requests</h2>
          {mine.length === 0 ? (
            <p className="text-body-dense text-copy">No requests yet. When an owner sends one, it appears here.</p>
          ) : (
            <RequestList requests={mine} selectedId={request?.id ?? ''} onSelect={select} who={ownerOf} />
          )}

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
                className="grid aspect-square min-h-11 place-items-center rounded-[0.625rem] border border-field-border bg-paper font-sans text-ui font-medium text-ink tabular-nums transition-colors duration-200 ease-out hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper aria-pressed:line-through"
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {request && (
          <div className="grid gap-10">
            <div aria-live="polite">
              <h2 className={heading}>Request details</h2>
              <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-dense text-copy">
                <StatusBadge status={request.status} />
                <span>{CARE_TYPE_LABELS[request.careType]}. {note(request)}</span>
              </p>
              <FactList
                items={[
                  { term: 'Owner', text: ownerOf(request) },
                  { term: 'Dates', text: formatStay(request.start, request.end) },
                  ...(request.status === 'confirmed' && request.contact
                    ? [{ term: 'Owner phone', text: `${request.contact.name}, ${request.contact.phone}` }]
                    : []),
                ]}
              />
              <div className="mt-6">
                <PetProfile pet={request.pet} />
              </div>
            </div>

            <div>
              <h2 className={heading}>Conversation</h2>
              <MessageThread messages={request.messages} viewer="caregiver" otherName={ownerOf(request)} />
              {request.messages.length === 0 && <p className="text-body-dense text-muted">No messages yet.</p>}

              {(request.status === 'requested' || request.status === 'more-info') && (
                <div className="mt-6 grid gap-4">
                  {asking && (
                    <form
                      noValidate
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (!text.trim()) return
                        ask(request.id, text.trim())
                        setText('')
                        setAsking(false)
                      }}
                    >
                      <TextAreaField id="question" label={`Your question to ${ownerOf(request)}`} rows={3} required value={text} onChange={setText} />
                      <div className="flex flex-wrap gap-4">
                        <Button soft type="submit" disabled={!text.trim()}>Send question</Button>
                        <Button soft variant="secondary" onClick={() => setAsking(false)}>Not now</Button>
                      </div>
                    </form>
                  )}
                  {!asking && (
                    <div className="flex flex-wrap gap-4">
                      <Button soft onClick={() => accept(request.id)}>Accept request</Button>
                      <Button soft variant="secondary" onClick={() => setAsking(true)}>Ask a question</Button>
                      <Button soft variant="secondary" onClick={() => decline(request.id)}>Decline</Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <SafetyNote title="Sensitive details">
              Pet health notes and owner contacts are visible only to people involved in this booking.
            </SafetyNote>

            <div>
              <h2 className={heading}>Care updates</h2>
              {request.status === 'confirmed' ? (
                <>
                  <form
                    noValidate
                    className="mb-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (!text.trim()) return
                      sendUpdate(request.id, text.trim())
                      setText('')
                    }}
                  >
                    <TextAreaField id="update" label="Post an update for the owner" rows={3} hint="For example: how the pet ate, a walk, a photo." value={text} onChange={setText} />
                    <Button soft type="submit" disabled={!text.trim()}>Post update</Button>
                  </form>
                  {request.updates.length === 0 ? (
                    <p className="text-body-dense text-muted">No updates yet.</p>
                  ) : (
                    <ul className="grid gap-3">
                      {request.updates.map((u) => (
                        <li key={`${u.when}-${u.text}`} className="border-t border-ink/15 py-4 text-body-dense text-ink">
                          <strong className="block font-semibold">{u.when}</strong>
                          {u.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <p className="text-body-dense text-muted">You can post updates once you have accepted a request.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
