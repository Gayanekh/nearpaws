import { useState } from 'react'
import { Container } from '../components/Container'
import { PetProfileCard } from '../components/PetProfileCard'
import { SafetyNote } from '../components/SafetyNote'
import { SectionHeading } from '../components/SectionHeading'
import { StatusBadge } from '../components/StatusBadge'
import { SAMPLE_REQUESTS, SAMPLE_UPDATES } from '../data/operations'

const DAYS = Array.from({ length: 14 }, (_, i) => i + 1)

export function CaregiverDashboardPage() {
  const [selected, setSelected] = useState(SAMPLE_REQUESTS[0]!.id)
  const [busy, setBusy] = useState<number[]>([5, 6, 12])
  const request = SAMPLE_REQUESTS.find((r) => r.id === selected)!
  const toggle = (d: number) => setBusy((b) => (b.includes(d) ? b.filter((x) => x !== d) : [...b, d]))

  return (
    <section className="section page-top">
      <Container>
        <SectionHeading level={1} eyebrow="Sample caregiver view" title="Caregiver dashboard"
          description="What a caregiver sees: incoming requests, pet details, availability and updates. All data is fictional." />

        <div className="dash">
          <div>
            <h2 className="dash__title">Requests</h2>
            <ul className="request-list">
              {SAMPLE_REQUESTS.map((r) => (
                <li key={r.id}>
                  <button type="button" aria-pressed={selected === r.id} onClick={() => setSelected(r.id)}>
                    <strong>{r.pet.name}</strong> · {r.dates}
                    <StatusBadge status={r.status} />
                  </button>
                </li>
              ))}
            </ul>

            <h2 className="dash__title">Availability</h2>
            <p className="form__note">Select days to mark them busy (next 14 days).</p>
            <div className="calendar" role="group" aria-label="Availability, next 14 days">
              {DAYS.map((d) => (
                <button key={d} type="button" aria-pressed={busy.includes(d)} onClick={() => toggle(d)}
                  aria-label={`Day ${d}, ${busy.includes(d) ? 'busy' : 'available'}`}>{d}</button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="dash__title">Request details</h2>
            <p><StatusBadge status={request.status} /> {request.careType}. {request.note}</p>
            <PetProfileCard pet={request.pet} />
            <SafetyNote title="Sensitive details">
              Pet health notes and owner contacts are visible only to people involved in this booking.
            </SafetyNote>
            <h2 className="dash__title">Care updates</h2>
            <ul className="updates">
              {SAMPLE_UPDATES.map((u) => <li key={u.when}><strong>{u.when}</strong><br />{u.text}</li>)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
