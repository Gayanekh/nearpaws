import { Link, useParams } from 'react-router-dom'
import { CAREGIVERS, CARE_TYPE_LABELS, HANDOVER_LABELS, PET_SIZE_LABELS } from '../data/content'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Icon } from '../components/Icon'
import { Photo } from '../components/Photo'

export function ProfilePage() {
  const { id } = useParams()
  const c = CAREGIVERS.find((item) => item.id === id)

  if (!c) {
    return (
      <section className="section page-top">
        <Container narrow>
          <h1>Caregiver not found</h1>
          <p>This sample profile does not exist.</p>
          <Button to="/caregivers">Back to caregivers</Button>
        </Container>
      </section>
    )
  }

  return (
    <section className="section page-top">
      <Container>
        <Link to="/caregivers" className="back-link">← Back to all caregivers</Link>
        <div className="profile">
          <div>
            <div className="profile__gallery">
              <Photo scene={c.scene} label={`${c.name}'s care space`} className="profile__main-image" />
              <Photo scene="garden" label="Outdoor space" />
              <Photo scene="apartment" label="Resting area" />
            </div>

            <h1>{c.name}</h1>
            <p className="profile__tagline">{c.tagline}</p>
            <p className="caregiver-card__place"><Icon name="pin" size={16} /> {c.neighborhood}</p>
            <p>{c.bio}</p>

            <h2>The home</h2>
            <dl className="facts">
              <div><dt>Home type</dt><dd>{c.home.type}</dd></div>
              <div><dt>Outdoor space</dt><dd>{c.home.outdoor}</dd></div>
              <div><dt>Other pets</dt><dd>{c.home.otherPets}</dd></div>
              <div><dt>Time at home</dt><dd>{c.home.hours}</dd></div>
            </dl>

            <h2>House rules</h2>
            <ul className="check-list">
              {c.houseRules.map((rule) => (
                <li key={rule}><Icon name="check" size={18} /> {rule}</li>
              ))}
            </ul>

            <h2>What is included</h2>
            <ul className="check-list">
              {c.includes.map((item) => (
                <li key={item}><Icon name="check" size={18} /> {item}</li>
              ))}
            </ul>

            <h2>A sample review</h2>
            <blockquote className="quote">
              <p>{c.review.quote}</p>
              <footer>{c.review.author}</footer>
            </blockquote>
          </div>

          <aside className="card booking-aside" aria-label="Care options and price">
            <p className="badge">Illustrative sample</p>
            <p className="booking-aside__price"><strong>${c.pricePerNight}</strong> / night <span className="muted">(sample price)</span></p>
            <dl className="facts facts--stack">
              <div><dt>Care types</dt><dd>{c.careTypes.map((t) => CARE_TYPE_LABELS[t]).join(' · ')}</dd></div>
              <div><dt>Pet sizes</dt><dd>{c.petSizes.map((s) => PET_SIZE_LABELS[s]).join(' · ')}</dd></div>
              <div><dt>Animals</dt><dd>{c.animals.join(', ')}</dd></div>
              <div><dt>Handover</dt><dd>{HANDOVER_LABELS[c.handover]}</dd></div>
              <div><dt>Experience</dt><dd>{c.experienceYears} years · {c.careStyle}</dd></div>
              <div><dt>Availability</dt><dd>Sample only: most weekends open</dd></div>
            </dl>
            <Button to={`/book?caregiver=${c.id}`} size="lg" className="btn--block">Request care with {c.name}</Button>
            <p className="booking-aside__note">Only an approximate neighborhood is shown. No request is actually sent.</p>
          </aside>
        </div>
      </Container>
    </section>
  )
}
