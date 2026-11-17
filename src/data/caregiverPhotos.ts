/**
 * Self-hosted portraits for the six sample caregivers and the two sample pet owners (local copies in public/img, not Unsplash
 * links). All are stock photographs of people who are not the fictional caregivers; the pages say so. Crops (object-position)
 * are set per photo.
 */
export interface CaregiverPhoto {
  src: string
  alt: string
  position: string
  /** Natural size of the file, for the width and height attributes. */
  width: number
  height: number
}

export const CAREGIVER_PHOTOS: Record<string, CaregiverPhoto> = {
  mara: { src: '/img/person-mara.jpg', alt: 'Portrait of a smiling woman with short blond hair (stock photo)', position: '50% 30%', width: 1800, height: 1013 },
  jonas: { src: '/img/person-jonas.jpg', alt: 'Portrait of a smiling man with a short beard (stock photo)', position: '50% 35%', width: 1600, height: 900 },
  priya: { src: '/img/person-priya.jpg', alt: 'Portrait of a smiling woman with long curly dark hair (stock photo)', position: '50% 25%', width: 1600, height: 1200 },
  theo: { src: '/img/person-theo.jpg', alt: 'Portrait of a smiling man with a full beard (stock photo)', position: '50% 35%', width: 1600, height: 900 },
  elena: { src: '/img/person-elena.jpg', alt: 'Portrait of a laughing woman with her hair up (stock photo)', position: '50% 30%', width: 1200, height: 1800 },
  sam: { src: '/img/person-sam.jpg', alt: 'Portrait of a smiling young man with round glasses (stock photo)', position: '50% 30%', width: 1600, height: 900 },
}

/** One pet each caregiver looks after (stock photographs of animals), shown as a small round photo on the caregiver's card. */
export const CAREGIVER_PETS: Record<string, CaregiverPhoto> = {
  mara: { src: '/img/prof-mara.jpg', alt: 'A siamese cat sitting by a window (stock photo)', position: '50% 35%', width: 1400, height: 1750 },
  jonas: { src: '/img/hero-biscuit.jpg', alt: 'A smiling beagle with a soft, blurred background (stock photo)', position: '55% 30%', width: 1400, height: 1050 },
  priya: { src: '/img/prof-priya.jpg', alt: 'A brown and white dog standing on a woodland path (stock photo)', position: '62% 50%', width: 1100, height: 825 },
  theo: { src: '/img/rev-2.jpg', alt: 'A golden puppy wearing a red collar (stock photo)', position: '8% 50%', width: 1200, height: 800 },
  elena: { src: '/img/prof-elena.jpg', alt: 'A ginger tabby cat lying calmly on a wooden floor (stock photo)', position: '40% 50%', width: 1200, height: 800 },
  sam: { src: '/img/hero-cloud.jpg', alt: 'A fluffy white samoyed standing outdoors in soft light (stock photo)', position: '72% 30%', width: 1400, height: 1867 },
}

/** The two sample pet owners. */
export const OWNER_PHOTOS: Record<string, CaregiverPhoto> = {
  'owner-alex': { src: '/img/person-alex.jpg', alt: 'Portrait of a smiling man with short dark hair (stock photo)', position: '80% 40%', width: 900, height: 506 },
  'owner-jordan': { src: '/img/person-jordan.jpg', alt: 'Portrait of a smiling young woman with long hair (stock photo)', position: '50% 40%', width: 900, height: 506 },
}
