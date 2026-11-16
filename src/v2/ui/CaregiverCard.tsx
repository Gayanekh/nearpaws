import { CARE_TYPE_LABELS, HANDOVER_LABELS } from '../../data/content'
import type { Caregiver } from '../../types'
import { CAREGIVER_PHOTOS } from '../data/caregiverPhotos'
import { LegacyLink } from '../LegacyLink'

/**
 * Flat card for one sample caregiver: photograph, area, name, care style, tags and price on a panel, with no border or
 * shadow. The whole card is one link (the name carries it), so there is a single real link for screen readers.
 * On hover-capable devices the photograph scales by 1.03 over 400ms.
 */
export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  const { id, name, neighborhood, experienceYears, careStyle, pricePerNight, careTypes, handover } = caregiver
  const photo = CAREGIVER_PHOTOS[id]
  return (
    <article className="group relative flex flex-col bg-panel focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
      <div className="aspect-[4/3] overflow-hidden bg-panel">
        {photo && (
          <img
            src={photo.src}
            alt={photo.alt}
            width={1400}
            height={1050}
            loading="lazy"
            style={{ objectPosition: photo.position }}
            className="size-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-1 text-caption text-muted">{neighborhood}</p>
        <h3 className="font-slab text-title font-medium text-ink">
          {/* To be a router link when the profile page is redesigned. */}
          <LegacyLink to={`/caregivers/${id}`} className="no-underline outline-none after:absolute after:inset-0 after:content-['']">
            {name}
          </LegacyLink>
        </h3>
        <p className="mt-2 text-body-dense text-body">
          {experienceYears} years’ experience · {careStyle}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Care options">
          {careTypes.map((type) => (
            <li key={type} className="bg-paper px-3 py-1.5 text-label font-medium text-ink">{CARE_TYPE_LABELS[type]}</li>
          ))}
          <li className="bg-paper px-3 py-1.5 text-label font-medium text-ink">{HANDOVER_LABELS[handover]}</li>
        </ul>
        <p className="mt-auto pt-5 text-body-dense text-body">
          <strong className="font-slab text-title font-medium text-ink">${pricePerNight}</strong> / night{' '}
          <span className="text-caption text-muted">(sample price)</span>
        </p>
      </div>
    </article>
  )
}
