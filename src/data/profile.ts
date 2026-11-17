import type { Caregiver } from '../types'
import type { CaregiverPhoto } from './caregiverPhotos'

/**
 * What a signed-in demo person has changed on their own profile. Only the fields that were changed are stored; everything
 * else comes from the sample data. Kept in this browser tab with the rest of the demo state.
 */
export interface ProfileEdits {
  name?: string
  /** A photo chosen by the person (a small data URL). */
  photo?: string
  phone?: string
  city?: string
  /** Caregiver fields. */
  neighborhood?: string
  tagline?: string
  bio?: string
  price?: number
}

export type Profiles = Record<string, ProfileEdits>

/** A photo the person chose, in the same shape as the sample portraits. */
export const uploadedPhoto = (src: string, name: string): CaregiverPhoto => ({
  src,
  alt: `Photo of ${name}`,
  position: '50% 50%',
  width: 480,
  height: 480,
})

/** A sample caregiver with the changes the caregiver made to their profile applied. */
export function withEdits(c: Caregiver, e: ProfileEdits | undefined): Caregiver {
  if (!e) return c
  return {
    ...c,
    name: e.name || c.name,
    neighborhood: e.neighborhood || c.neighborhood,
    tagline: e.tagline || c.tagline,
    bio: e.bio || c.bio,
    pricePerNight: e.price && e.price > 0 ? e.price : c.pricePerNight,
  }
}
