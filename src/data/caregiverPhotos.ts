/**
 * Self-hosted photographs for the six sample caregivers (the redesign uses the local copies in public/img, not Unsplash
 * links). All are stock images that do not show the fictional caregivers or pets. Crops (object-position) are set per photo.
 */
export interface CaregiverPhoto {
  src: string
  alt: string
  position: string
}

export const CAREGIVER_PHOTOS: Record<string, CaregiverPhoto> = {
  mara: { src: '/img/prof-mara.jpg', alt: 'A siamese cat sitting by a window (stock photo)', position: '50% 35%' },
  jonas: { src: '/img/hero-biscuit.jpg', alt: 'A smiling beagle with a soft, blurred background (stock photo)', position: '55% 30%' },
  priya: { src: '/img/prof-priya.jpg', alt: 'A brown and white dog standing on a woodland path (stock photo)', position: '62% 50%' },
  theo: { src: '/img/rev-2.jpg', alt: 'A golden puppy wearing a red collar (stock photo)', position: '8% 50%' },
  elena: { src: '/img/prof-elena.jpg', alt: 'A ginger tabby cat lying calmly on a wooden floor (stock photo)', position: '40% 50%' },
  sam: { src: '/img/hero-cloud.jpg', alt: 'A fluffy white samoyed standing outdoors in soft light (stock photo)', position: '72% 30%' },
}
