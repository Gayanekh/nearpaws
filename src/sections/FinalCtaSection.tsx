import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Icon } from '../components/Icon'

export function FinalCtaSection() {
  return (
    <section className="final-cta-wrap" aria-labelledby="cta-title">
      <Container>
        <div className="final-cta">
          <span className="final-cta__paw" aria-hidden="true"><Icon name="paw" size={260} /></span>
          <h2 id="cta-title">Ready to see who could care for your pet?</h2>
          <p>Browse sample caregivers, then try the request form. It is a prototype, so nothing is sent.</p>
          <div className="hero__actions final-cta__actions">
            <Button to="/caregivers" variant="accent" size="lg">Find a caregiver</Button>
            <Button to="/become-a-caregiver" variant="ghost" size="lg">Become a caregiver</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
