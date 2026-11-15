import { AREAS, CAREGIVERS, SERVICES } from '../data/content'
import { Container } from '../components/Container'
import { CountUp } from '../components/CountUp'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

/** Story section: photo on one side, the idea and sample-content counts on the other. */
export function AboutSection() {
  const stats = [
    { value: CAREGIVERS.length, label: 'sample caregiver profiles' },
    { value: AREAS.length, label: 'sample neighborhoods' },
    { value: SERVICES.length, label: 'care and handover options' },
  ]
  return (
    <section className="section" aria-labelledby="about-title">
      <Container className="about">
        <Reveal>
          <Photo scene="pets" label="Pets resting together" className="about__photo" />
        </Reveal>
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="The idea"
            title="Care that starts with a conversation, not a checkbox"
            description="NearPaws is a concept for owners who want to know who will look after their pet, where, and how, before they say yes. You read the profile, share the routine, and agree the details together."
          />
          <ul className="about__stats">
            {stats.map((s) => (
              <li key={s.label}>
                <strong className="about__value"><CountUp to={s.value} /></strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <p className="about__note">Counts of the sample content in this prototype, not real usage.</p>
        </div>
      </Container>
    </section>
  )
}
