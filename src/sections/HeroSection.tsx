import { BRAND } from '../data/content'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { HeroSlider } from '../components/HeroSlider'
import { Icon } from '../components/Icon'

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero__copy">
        <p className="eyebrow hero__rise" style={{ animationDelay: '0ms' }}>Pet care, near home</p>
        <h1 id="hero-title" className="hero__rise" style={{ animationDelay: '80ms' }}>
          Someone caring, close by, while you’re away.
        </h1>
        <p className="hero__lead hero__rise" style={{ animationDelay: '160ms' }}>
          {BRAND.name} helps you find a caregiver, see exactly where your pet will stay, and share their routine before the
          first day. Care at their home or yours.
        </p>
        <div className="hero__actions hero__rise" style={{ animationDelay: '240ms' }}>
          <Button to="/caregivers" size="lg">Find a caregiver</Button>
          <Button to="/book" variant="secondary" size="lg">Request care</Button>
        </div>
        <ul className="hero__assurances hero__rise" style={{ animationDelay: '320ms' }}>
          <li><Icon name="check" size={18} /> See the home and rules first</li>
          <li><Icon name="check" size={18} /> Share routines in advance</li>
          <li><Icon name="check" size={18} /> Approximate neighborhoods only</li>
        </ul>
      </Container>
      <HeroSlider />
    </section>
  )
}
