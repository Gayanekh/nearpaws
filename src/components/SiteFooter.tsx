import { Link } from 'react-router-dom'
import { BRAND } from '../data/content'
import { Container } from './Container'
import { Icon } from './Icon'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div>
            <p className="brand brand--footer">
              <span className="brand__mark"><Icon name="paw" size={20} /></span>
              {BRAND.name}
            </p>
            <p className="site-footer__note">{BRAND.tagline}.</p>
            <p className="site-footer__note">“{BRAND.name}” is a temporary brand name for this prototype.</p>
          </div>
          <nav aria-label="Footer">
            <h2 className="site-footer__title">Explore</h2>
            <ul>
              <li><Link to="/caregivers">Find a caregiver</Link></li>
              <li><Link to="/book">Request care</Link></li>
              <li><Link to="/become-a-caregiver">Become a caregiver</Link></li>
              <li><Link to="/booking-status">Sample booking status</Link></li>
              <li><Link to="/caregiver-dashboard">Sample caregiver dashboard</Link></li>
              <li><Link to="/#trust">Trust &amp; safety</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className="site-footer__title">About this prototype</h2>
            <p className="site-footer__note">
              A front-end demonstration only. There is no backend, payment, real booking or messaging, and all caregivers,
              prices and reviews are fictional.
            </p>
            <p className="site-footer__note">
              Photos are stock images from <a href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a> and do not
              show the fictional caregivers or pets.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
