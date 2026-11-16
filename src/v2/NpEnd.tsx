import { Link } from 'react-router-dom'
import { ROUTES } from './routes'

/**
 * Closing section of the approved preview: a call to action on the left, a photograph on the right and the tan
 * "Find a caregiver" block anchored between them. useNpMotion adds the reveal to the photograph, so only the copy carries it here.
 */
export function NpEnd() {
  return (
    <section className="np-end" aria-labelledby="close-h">
      <div className="np-end__copy np-rv">
        <p className="np-eyebrow">Ready when you are</p>
        <h2 id="close-h">See who could care for your pet.</h2>
        <p>Browse sample caregivers, then try the request form. It is a prototype, so nothing is sent.</p>
      </div>
      <figure className="np-end__photo">
        <img
          src="/img/end-pair.jpg"
          alt="A cat and a dog resting together on grass (stock photo)"
          width={1800}
          height={1059}
          loading="lazy"
          style={{ objectPosition: '50% 45%' }}
        />
      </figure>
      <Link className="np-end__cta" to={ROUTES.caregivers}>
        <span>Find a caregiver</span>
        <svg viewBox="0 0 60 24" aria-hidden="true"><path d="M2 12h54M46 3l10 9-10 9" /></svg>
      </Link>
    </section>
  )
}
