/**
 * Self-hosted portraits for the six sample caregivers and the two sample pet owners (local copies in public/img, not Unsplash
 * links). All are stock photographs of people who are not the fictional caregivers; the pages say so. Crops (object-position)
 * are set per photo.
 */
export interface CaregiverPhoto {
  src: string
  alt: string
  position: string
  /** Natural size of the file, for the width and height attributes (a photo chosen by the person has none). */
  width?: number
  height?: number
}

export const CAREGIVER_PHOTOS: Record<string, CaregiverPhoto> = {
  mara: { src: '/img/meet-mara.jpg', alt: 'Portrait of a smiling woman with long dark hair in warm evening light (stock photo)', position: '50% 36%', width: 1100, height: 1568 },
  jonas: { src: '/img/person-jonas.jpg', alt: 'Portrait of a smiling man with a short beard (stock photo)', position: '50% 35%', width: 1600, height: 900 },
  priya: { src: '/img/meet-priya.jpg', alt: 'Portrait of a woman with long wavy brown hair outdoors (stock photo)', position: '50% 48%', width: 1100, height: 1650 },
  theo: { src: '/img/person-theo.jpg', alt: 'Portrait of a smiling man with a full beard (stock photo)', position: '50% 35%', width: 1600, height: 900 },
  leo: { src: '/img/meet-leo.jpg', alt: 'Portrait of a young man with curly hair and a dark hat (stock photo)', position: '50% 28%', width: 1100, height: 1650 },
  sam: { src: '/img/person-sam.jpg', alt: 'Portrait of a smiling young man with round glasses (stock photo)', position: '50% 30%', width: 1600, height: 900 },
}

/** The two sample pet owners. */
export const OWNER_PHOTOS: Record<string, CaregiverPhoto> = {
  'owner-alex': { src: '/img/person-alex.jpg', alt: 'Portrait of a smiling man with short dark hair (stock photo)', position: '80% 40%', width: 900, height: 506 },
  'owner-jordan': { src: '/img/person-jordan.jpg', alt: 'Portrait of a smiling young woman with long hair (stock photo)', position: '50% 40%', width: 900, height: 506 },
}
