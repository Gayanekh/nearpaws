import { Link, useParams } from 'react-router-dom'
import { CAREGIVERS, CARE_TYPE_LABELS, HANDOVER_LABELS, PET_SIZE_LABELS } from '../../data/content'
import { CAREGIVER_PHOTOS } from '../data/caregiverPhotos'
import { ROUTES } from '../routes'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { CheckList } from '../ui/CheckList'
import { Eyebrow } from '../ui/Eyebrow'
import { FactList } from '../ui/FactList'

const sectionHeading = 'mb-5 font-slab text-display-md font-normal text-ink'

/**
 * Caregiver profile (/caregivers/:id). Same content as the original page: the care space photographs, name, tagline,
 * neighborhood, bio, the home, house rules, what is included, a sample review and the request block with the price.
 * Layout from DESIGN.md: a split hero (photograph on a panel, the name in display-xl beside it), hairline fact lists,
 * thin check marks, and the request block as a tan block with the price in a numeral.
 */
export function NpProfile() {
  const { id } = useParams()
  const c = CAREGIVERS.find((item) => item.id === id)

  if (!c) {
    return (
      <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
        <Eyebrow>Sample profile</Eyebrow>
        <h1 className="font-slab text-display-lg font-light tracking-tight text-ink">Caregiver not found</h1>
        <p className="mt-6 mb-8 max-w-[34rem] text-lead text-copy">This sample profile does not exist.</p>
        <Button to={ROUTES.caregivers}>Back to caregivers</Button>
      </section>
    )
  }

  const photo = CAREGIVER_PHOTOS[c.id]

  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-10 pb-(--section) md:pt-14">
      <Link
        to={ROUTES.caregivers}
        className="mb-10 inline-flex min-h-11 items-center font-sans text-ui font-medium tracking-ui text-ink underline decoration-accent decoration-2 underline-offset-[0.3em]"
      >
        ← Back to all caregivers
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div className="aspect-[4/3] overflow-hidden bg-panel lg:aspect-[4/5]">
          {photo && (
            <img
              src={photo.src}
              alt={`${c.name}’s care space. ${photo.alt}`}
              width={1400}
              height={1050}
              style={{ objectPosition: photo.position }}
              className="size-full object-cover"
            />
          )}
        </div>
        <header>
          <Eyebrow>Sample caregiver</Eyebrow>
          <h1 className="font-slab text-display-xl font-light tracking-tight text-ink">{c.name}</h1>
          <p className="mt-6 font-slab text-display-md font-normal text-ink">{c.tagline}</p>
          <p className="mt-6 flex items-center gap-2 text-caption text-muted">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0 fill-none stroke-current stroke-[1.5]">
              <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" strokeLinejoin="round" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {c.neighborhood}
          </p>
          <p className="mt-4 max-w-[34rem] text-body text-copy">{c.bio}</p>
        </header>
      </div>

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
        <div className="grid gap-14">
          <div>
            <h2 className={sectionHeading}>The home</h2>
            <FactList
              items={[
                { term: 'Home type', text: c.home.type },
                { term: 'Outdoor space', text: c.home.outdoor },
                { term: 'Other pets', text: c.home.otherPets },
                { term: 'Time at home', text: c.home.hours },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="aspect-[4/3] overflow-hidden bg-panel">
              <img
                src="/img/scene-garden.jpg"
                alt="Outdoor space. A green lawn in daylight (stock photo)"
                width={1400}
                height={788}
                loading="lazy"
                className="size-full object-cover"
              />
            </figure>
            <figure className="aspect-[4/3] overflow-hidden bg-panel">
              <img
                src="/img/home-chair.jpg"
                alt="Resting area. A calm apartment corner with a yellow armchair (stock photo)"
                width={900}
                height={794}
                loading="lazy"
                className="size-full object-cover"
              />
            </figure>
          </div>

          <div>
            <h2 className={sectionHeading}>House rules</h2>
            <CheckList items={c.houseRules} />
          </div>

          <div>
            <h2 className={sectionHeading}>What is included</h2>
            <CheckList items={c.includes} />
          </div>

          <div>
            <h2 className={sectionHeading}>A sample review</h2>
            <blockquote className="bg-panel p-8">
              <p className="font-slab text-display-md font-light text-ink">{c.review.quote}</p>
              <footer className="mt-4 text-caption text-muted">{c.review.author}</footer>
            </blockquote>
          </div>
        </div>

        <aside aria-label="Care options and price" className="bg-accent p-8 lg:sticky lg:top-8">
          <Badge>Illustrative sample</Badge>
          <p className="mt-6 mb-6 text-body-dense text-ink">
            <strong className="font-slab text-numeral font-medium">${c.pricePerNight}</strong> / night{' '}
            <span className="text-caption">(sample price)</span>
          </p>
          <FactList
            stacked
            items={[
              { term: 'Care types', text: c.careTypes.map((t) => CARE_TYPE_LABELS[t]).join(' · ') },
              { term: 'Pet sizes', text: c.petSizes.map((s) => PET_SIZE_LABELS[s]).join(' · ') },
              { term: 'Animals', text: c.animals.join(', ') },
              { term: 'Handover', text: HANDOVER_LABELS[c.handover] },
              { term: 'Experience', text: `${c.experienceYears} years · ${c.careStyle}` },
              { term: 'Availability', text: 'Sample only: most weekends open' },
            ]}
          />
          <Button variant="ink" to={`${ROUTES.book}?caregiver=${c.id}`} className="mt-8 w-full">
            Request care with {c.name}
          </Button>
          <p className="mt-4 text-caption text-ink">Only an approximate neighborhood is shown. No request is actually sent.</p>
        </aside>
      </div>
    </section>
  )
}
