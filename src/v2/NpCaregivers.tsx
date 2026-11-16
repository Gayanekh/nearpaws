import { LegacyLink } from './LegacyLink'

interface SampleCaregiver {
  key: 'lead' | 'a' | 'b'
  /** The id of this caregiver on the existing /caregivers/:id profile page. */
  slug: 'mara' | 'priya' | 'elena'
  name: string
  price: number
  place: string
  style: string
  tags: string[]
  photo: { src: string; alt: string; width: number; height: number; position: string }
}

/** Three sample profiles, copy and crops from the approved preview. All fictional. */
const CAREGIVERS: SampleCaregiver[] = [
  {
    key: 'lead',
    slug: 'mara',
    name: 'Mara',
    price: 42,
    place: 'Maple Grove, near the community garden',
    style: '6 years’ experience · Calm and routine-led. Quiet days, steady walks and lots of couch time.',
    tags: ['At the caregiver’s home', 'At your home', 'Either handover'],
    photo: { src: '/img/prof-mara.jpg', alt: 'A siamese cat sitting by a window (stock photo)', width: 1400, height: 1750, position: '50% 35%' },
  },
  {
    key: 'a',
    slug: 'priya',
    name: 'Priya',
    price: 55,
    place: 'Old Orchard, quiet residential street',
    style: '9 years’ experience · Gentle, experienced with medication. Patient care for older pets and special routines.',
    tags: ['At the caregiver’s home', 'At your home'],
    photo: { src: '/img/prof-priya.jpg', alt: 'A brown and white dog standing on a woodland path (stock photo)', width: 1100, height: 825, position: '62% 50%' },
  },
  {
    key: 'b',
    slug: 'elena',
    name: 'Elena',
    price: 30,
    place: 'Cedar Park, tree-lined avenue',
    style: '7 years’ experience · Cat specialist, very quiet home. Peaceful visits and stays for cats and small pets.',
    tags: ['At the caregiver’s home', 'At your home'],
    photo: { src: '/img/prof-elena.jpg', alt: 'A ginger tabby cat lying calmly on a wooden floor (stock photo)', width: 1200, height: 800, position: '40% 50%' },
  },
]

const Arrow = () => (
  <svg viewBox="0 0 36 16" aria-hidden="true"><path d="M1 8h32M26 2l7 6-7 6" /></svg>
)

/**
 * Meet caregivers, from the approved preview: a staggered editorial spread with one large lead profile and two smaller ones.
 * The profile names link to the existing caregiver profile pages (/caregivers/:id).
 */
export function NpCaregivers() {
  return (
    <section className="np-profiles" id="caregivers" aria-labelledby="cg-h">
      <div className="np-wrap">
        <header className="np-profiles__head">
          <div className="np-rv">
            <p className="np-eyebrow">Meet caregivers</p>
            <h2 id="cg-h" className="np-h-lg">Real homes, real routines.</h2>
          </div>
          <p className="np-lead np-rv">
            Sample profiles for this preview. Names, prices and reviews are illustrative, and only an approximate neighborhood is ever shown.
          </p>
        </header>
        <div className="np-profiles__grid">
          {CAREGIVERS.map((c) => (
            <article key={c.name} className={`np-pf np-pf--${c.key} np-rv`}>
              <div className="np-pf__img">
                <img
                  src={c.photo.src}
                  alt={c.photo.alt}
                  width={c.photo.width}
                  height={c.photo.height}
                  loading="lazy"
                  style={{ objectPosition: c.photo.position }}
                />
                <p className="np-pf__price"><b>{`$${c.price}`}</b><span>/ night &middot; sample price</span></p>
              </div>
              <div className="np-pf__body">
                <p className="np-pf__place">{c.place}</p>
                <h3><LegacyLink to={`/caregivers/${c.slug}`}>{c.name} <Arrow /></LegacyLink></h3>
                <p className="np-pf__style">{c.style}</p>
                <ul className="np-tags" aria-label="Care options">
                  {c.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="np-profiles__foot">
          <LegacyLink className="np-text-link" to="/caregivers"><span>Browse all sample caregivers</span><Arrow /></LegacyLink>
        </div>
      </div>
    </section>
  )
}
