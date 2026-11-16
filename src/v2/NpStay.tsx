import { Link } from 'react-router-dom'
import { ROUTES } from './routes'

const FACTS = [
  { term: 'The care space', text: 'See where your pet will sleep, play and rest, plus garden or outdoor access.' },
  { term: 'The caregiver', text: 'Read about their experience, care style and how often they send updates.' },
  { term: 'The house rules', text: 'Know about guests, other pets, alone time and how medication is handled.' },
  { term: 'The neighborhood', text: 'Only an approximate area is shown. Exact addresses stay private until a stay is agreed.' },
]

/**
 * "Know before you go", from the approved preview: a full-bleed room with a dark glass panel at the bottom left that
 * holds the heading, the four facts and the button, and a tan note under it. The photograph settles from 1.2x and the
 * panel only fades in (see useNpMotion and the Get Started pattern in np.css). The id "become" is the preview's anchor.
 */
export function NpStay() {
  return (
    <section className="np-stay2" id="become" aria-labelledby="stay-h">
      <img
        className="np-stay2__bg"
        src="/img/stay-big.jpg"
        alt="A calm living room with a grey sofa and a knitted throw (stock photo)"
        width={2000}
        height={3000}
        loading="lazy"
      />
      <figure className="np-stay2__inset" aria-hidden="true">
        <img src="/img/home-chair.jpg" alt="" width={900} height={1125} loading="lazy" />
      </figure>
      <div className="np-stay2__col">
        <div className="np-stay2__sheet np-rv">
          <p className="np-eyebrow">Know before you go</p>
          <h2 id="stay-h">Know where your pet will stay, and with whom.</h2>
          <p className="np-lead">Every profile answers the questions owners usually ask first.</p>
          <dl className="np-facts">
            {FACTS.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
          <Link className="np-btn" to={ROUTES.caregiver('mara')}>
            {'See a sample profile '}
            <svg
              width="36"
              height="14"
              style={{ stroke: 'currentColor', fill: 'none', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round' }}
              viewBox="0 0 36 16"
              aria-hidden="true"
            >
              <path d="M1 8h32M26 2l7 6-7 6" />
            </svg>
          </Link>
        </div>
        <p className="np-stay2__note">
          Only an approximate neighborhood is ever shown. Exact addresses stay private until a stay is agreed.
        </p>
      </div>
    </section>
  )
}
