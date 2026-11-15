// Stock photography from Unsplash (https://unsplash.com/license). All photos are illustrative:
// they are NOT the fictional caregivers, homes or pets named in this prototype.
import type { SceneVariant } from '../types'

export interface PhotoSource {
  id: string
  alt: string
}

/** Builds a sized, compressed Unsplash image URL. */
export function unsplashUrl(id: string, width: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=75&auto=format&fit=crop`
}

export const SCENE_PHOTOS: Record<SceneVariant, PhotoSource> = {
  cozy: { id: '1505691938895-1758d7feb511', alt: 'A bright living room with a sofa and cushions' },
  apartment: { id: '1586023492125-27b2c045efd7', alt: 'A calm apartment corner with a yellow armchair' },
  garden: { id: '1558904541-efa843a96f01', alt: 'A green lawn in daylight' },
  farmhouse: { id: '1600585154340-be6161a56a0c', alt: 'A house with a lawn and a large tree' },
  pets: { id: '1450778869180-41d0601e046e', alt: 'A cat and a dog resting together on grass' },
}

export interface SliderPet {
  name: string
  tone: 'green' | 'orange' | 'blue' | 'purple'
  /** One line describing the kind of stay this sample pet might have. Fictional. */
  note: string
  photo: PhotoSource
}

/** Sample pets for the hero slider. Names and stays are fictional. */
export const SLIDER_PETS: SliderPet[] = [
  { name: 'Biscuit', tone: 'orange', note: 'Beagle · 4 nights at a caregiver’s home', photo: { id: '1543466835-00a7907e9de1', alt: 'A smiling beagle' } },
  { name: 'Miso', tone: 'green', note: 'Cat · daily visits at home while you travel', photo: { id: '1514888286974-6c03e2ca1dba', alt: 'A black and white cat resting its paws on a ledge' } },
  { name: 'Juno', tone: 'blue', note: 'Small dogs · a weekend with walks and play', photo: { id: '1548199973-03cce0bbc87b', alt: 'Two small dogs running on a path' } },
  { name: 'Ember', tone: 'purple', note: 'Cat · a quiet week in their own home', photo: { id: '1573865526739-10659fec78a5', alt: 'A ginger cat lying on a wooden floor' } },
  { name: 'Maple', tone: 'orange', note: 'Golden dog · 6 nights, medication on schedule', photo: { id: '1552053831-71594a27632d', alt: 'A golden dog holding a flower in its mouth' } },
  { name: 'Cloud', tone: 'green', note: 'Samoyed · 3 nights, daily photo updates', photo: { id: '1596492784531-6e6eb5ea9993', alt: 'A fluffy white dog against a pink wall' } },
  { name: 'Scout', tone: 'blue', note: 'Collie · a week by the water, long walks', photo: { id: '1587300003388-59208cc962cb', alt: 'A brown and white dog on a beach' } },
  { name: 'Fig', tone: 'purple', note: 'Kitten · short stays with gentle routines', photo: { id: '1592194996308-7b43878e84a6', alt: 'A kitten reaching up with one paw' } },
]
