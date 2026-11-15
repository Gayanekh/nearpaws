import { FAQ_PROTOTYPE_NOTE, TRUST_ITEMS } from '../data/content'
import type { IconName } from '../components/Icon'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { TrustPoint } from '../components/TrustPoint'

const TRUST_ICONS: IconName[] = ['home', 'pin', 'clock', 'car']

export function TrustSection() {
  return (
    <section className="section" id="trust" aria-labelledby="trust-title">
      <Container className="trust">
        <div>
          <SectionHeading
            id="trust-title"
            eyebrow="Trust & safety"
            title="Built around openness"
            description="Clear information helps you decide with confidence."
          />
          <p className="trust__note">{FAQ_PROTOTYPE_NOTE}</p>
        </div>
        <ul className="trust__list">
          {TRUST_ITEMS.map((item, i) => (
            <TrustPoint key={item.title} title={item.title} description={item.description} icon={TRUST_ICONS[i]} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
