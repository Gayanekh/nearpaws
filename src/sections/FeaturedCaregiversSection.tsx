import { CAREGIVERS } from '../data/content'
import { Button } from '../components/Button'
import { CaregiverCard } from '../components/CaregiverCard'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function FeaturedCaregiversSection() {
  return (
    <section className="section section--sand" aria-labelledby="caregivers-title">
      <Container>
        <SectionHeading
          id="caregivers-title"
          eyebrow="Meet caregivers"
          title="Real homes, real routines"
          description="Sample profiles for this prototype. Names, prices and reviews are illustrative."
        />
        <div className="grid grid--3">
          {CAREGIVERS.slice(0, 3).map((caregiver, i) => (
            <Reveal key={caregiver.id} delay={i * 90}>
              <CaregiverCard caregiver={caregiver} />
            </Reveal>
          ))}
        </div>
        <div className="section__action">
          <Button to="/caregivers" variant="secondary">Browse all sample caregivers</Button>
        </div>
      </Container>
    </section>
  )
}
