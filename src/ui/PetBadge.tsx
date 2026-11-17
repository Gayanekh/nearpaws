import type { CaregiverPhoto } from '../data/caregiverPhotos'

/** A small round photo of an animal that overlaps the corner of a caregiver's portrait. Place it inside a relative frame. */
export function PetBadge({ photo, className = '' }: { photo: CaregiverPhoto; className?: string }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      style={{ objectPosition: photo.position }}
      className={`absolute right-3 bottom-3 z-2 size-16 rounded-full border-[3px] border-paper object-cover shadow-[0_4px_14px_color-mix(in_srgb,var(--color-ink)_18%,transparent)] ${className}`}
    />
  )
}
