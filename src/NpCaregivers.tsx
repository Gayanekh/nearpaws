import { Link } from 'react-router-dom'
import { ROUTES } from './routes'
import { CAREGIVER_PETS } from './data/caregiverPhotos'
import { Eyebrow } from './ui/Eyebrow'
import { PetBadge } from './ui/PetBadge'
import { TextLink } from './ui/TextLink'

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
    photo: { src: '/img/person-mara.jpg', alt: 'Portrait of a smiling woman with short blond hair (stock photo)', width: 1800, height: 1013, position: '50% 30%' },
  },
  {
    key: 'a',
    slug: 'priya',
    name: 'Priya',
    price: 55,
    place: 'Old Orchard, quiet residential street',
    style: '9 years’ experience · Gentle, experienced with medication. Patient care for older pets and special routines.',
    tags: ['At the caregiver’s home', 'At your home'],
    photo: { src: '/img/person-priya.jpg', alt: 'Portrait of a smiling woman with long curly dark hair (stock photo)', width: 1600, height: 1200, position: '50% 25%' },
  },
  {
    key: 'b',
    slug: 'elena',
    name: 'Elena',
    price: 30,
    place: 'Cedar Park, tree-lined avenue',
    style: '7 years’ experience · Cat specialist, very quiet home. Peaceful visits and stays for cats and small pets.',
    tags: ['At the caregiver’s home', 'At your home'],
    photo: { src: '/img/person-elena.jpg', alt: 'Portrait of a laughing woman with her hair up (stock photo)', width: 1200, height: 1800, position: '50% 30%' },
  },
]

/** Per-profile composition: lead is large and spans two rows on wide screens, the two others sit staggered beside it. */
const LAYOUT = {
  lead: {
    card: 'md:col-[1/8] md:row-[1/3]',
    image: 'md:aspect-[5/6]',
    price: 'px-7 py-[1.15rem]',
    amount: 'text-[2.5rem]',
    name: 'text-[clamp(2.25rem,1.2rem+3vw,4rem)]/[1.1]',
  },
  a: { card: 'md:col-[9/13] md:row-[1]', image: 'md:aspect-square', price: 'px-5 py-[0.85rem]', amount: 'text-[1.75rem]', name: 'text-display-md/[1.1]' },
  b: { card: 'md:col-[8/12] md:row-[2]', image: 'md:aspect-[4/5]', price: 'px-5 py-[0.85rem]', amount: 'text-[1.75rem]', name: 'text-display-md/[1.1]' },
} as const

const Arrow = ({ className }: { className: string }) => (
  <svg viewBox="0 0 36 16" aria-hidden="true" className={`fill-none stroke-current stroke-[1.25] ease-out ${className}`}>
    <path d="M1 8h32M26 2l7 6-7 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Meet caregivers, from the approved preview: a staggered editorial spread with one large lead profile and two smaller ones.
 * The profile names link to the existing caregiver profile pages (/caregivers/:id); the whole card is the link's target.
 */
export function NpCaregivers() {
  return (
    <section className="bg-panel py-(--section)" id="caregivers" aria-labelledby="cg-h">
      <div className="mx-auto max-w-360 px-(--inset)">
        <header className="mb-[clamp(3rem,6vw,6rem)] grid gap-6 md:grid-cols-[7fr_5fr] md:items-end">
          <div data-rv="">
            <Eyebrow>Meet caregivers</Eyebrow>
            <h2 id="cg-h" className="text-section">Real homes, real routines.</h2>
          </div>
          <p className="max-w-[30rem] text-lead" data-rv="">
            Sample profiles for this prototype. Names, prices and reviews are illustrative, and only an approximate neighborhood is ever shown.
          </p>
        </header>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-[repeat(12,1fr)] md:items-start md:gap-y-20">
          {CAREGIVERS.map((c) => {
            const layout = LAYOUT[c.key]
            return (
              <article
                key={c.name}
                className={`group/pf relative focus-within:outline-2 focus-within:outline-offset-[6px] focus-within:outline-ink ${layout.card}`}
                data-rv=""
                data-rv-delay={c.key === 'a' ? 150 : c.key === 'b' ? 300 : undefined}
              >
                <div className={`relative aspect-[4/5] overflow-hidden bg-paper ${layout.image}`} data-ph="">
                  <img
                    className="absolute inset-0 size-full object-cover transition-transform duration-1000 ease-out group-hover/pf:scale-[1.04]"
                    src={c.photo.src}
                    alt={c.photo.alt}
                    width={c.photo.width}
                    height={c.photo.height}
                    loading="lazy"
                    style={{ objectPosition: c.photo.position }}
                  />
                  {CAREGIVER_PETS[c.slug] && <PetBadge photo={CAREGIVER_PETS[c.slug]!} className="right-4 bottom-4 size-20" />}
                <p className={`absolute bottom-0 left-0 z-2 flex items-baseline gap-[0.6rem] bg-accent font-sans text-label/[1.3] font-medium text-ink ${layout.price}`}>
                    <b className={`font-slab leading-none font-medium tabular-nums ${layout.amount}`}>{`$${c.price}`}</b>
                    <span>/ night &middot; sample price</span>
                  </p>
                </div>
                <div className="pt-6">
                  <p className="mb-[0.6rem] font-sans text-label font-semibold tracking-label text-accent-ink uppercase">{c.place}</p>
                  <h3 className={`mb-3 font-slab font-light ${layout.name}`}>
                    <Link
                      className="inline-flex items-center gap-3 no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-0"
                      to={ROUTES.caregiver(c.slug)}
                    >
                      {c.name} <Arrow className="h-[0.9rem] w-7 flex-none transition-transform duration-400 group-hover/pf:translate-x-2" />
                    </Link>
                  </h3>
                  <p className="mb-5 max-w-[30rem]">{c.style}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Care options">
                    {c.tags.map((tag) => (
                      <li key={tag} className="bg-paper px-[0.8rem] py-[0.4rem] font-sans text-label font-medium text-ink">{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-12">
          <TextLink to={ROUTES.caregivers}>Browse all sample caregivers</TextLink>
        </div>
      </div>
    </section>
  )
}
