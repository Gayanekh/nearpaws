import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'

/** Dark call-to-action band between the story and the caregiver cards. */
export function RoutineBannerSection() {
  return (
    <section className="banner-wrap" aria-labelledby="banner-title">
      <Container>
        <Reveal>
          <div className="banner">
            <span className="banner__paw" aria-hidden="true"><Icon name="paw" size={220} /></span>
            <h2 id="banner-title">Share your pet’s routine before day one</h2>
            <p>
              Food, medication, walks, fears and an emergency contact all go in one request, so the caregiver knows your pet
              before they arrive.
            </p>
            <Button to="/book" variant="accent" size="lg">Request care</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
