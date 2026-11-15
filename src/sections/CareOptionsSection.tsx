import { SERVICES } from '../data/content'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'

const TONES = ['green', 'blue', 'orange'] as const

export function CareOptionsSection() {
  return (
    <section className="section" aria-labelledby="care-options-title">
      <Container>
        <SectionHeading
          id="care-options-title"
          eyebrow="Care options"
          title="Care that fits your pet, not the other way round"
          description="Choose where your pet is most comfortable, and how handover works."
        />
        <div className="grid grid--3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 90}>
              <ServiceCard service={service} tone={TONES[i % TONES.length]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
