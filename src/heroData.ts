/** The four sample stays of the hero slider. All fictional. Copy and crops are taken from the approved preview. */
export interface HeroSlide {
  name: string
  place: string
  /** Horizontal and vertical crop of the photograph (object-position). */
  px: string
  py: string
  words: [string, string, string]
  facts: string
  src: string
  alt: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    name: 'Pip',
    place: 'Sample stay with Noah · Maple Grove',
    px: '64%',
    py: '30%',
    words: ['Curious', 'Playful', 'Alert'],
    facts: '4 nights · At Noah’s home · Daily photo update',
    src: '/img/hero-pip.jpg',
    alt: 'A jack russell terrier looking at the camera against a soft peach wall',
  },
  {
    name: 'Biscuit',
    place: 'Sample stay with Jonas · Riverside',
    px: '55%',
    py: '30%',
    words: ['Gentle', 'Sociable', 'Eager'],
    facts: '6 nights · At Jonas’s home · Long riverside walks',
    src: '/img/hero-biscuit.jpg',
    alt: 'A smiling beagle with a soft, blurred background',
  },
  {
    name: 'Miso',
    place: 'Sample visits from Leo · Cedar Park',
    px: '12%',
    py: '35%',
    words: ['Quiet', 'Calm', 'Loving'],
    facts: 'One week · At your home · Two visits a day',
    src: '/img/hero-miso.jpg',
    alt: 'A tabby cat looking calmly at the camera',
  },
  {
    name: 'Cloud',
    place: 'Sample stay with Sam · Maple Grove',
    px: '72%',
    py: '30%',
    words: ['Fluffy', 'Gentle', 'Social'],
    facts: '3 nights · At Sam’s home · Big garden',
    src: '/img/hero-cloud.jpg',
    alt: 'A fluffy white samoyed standing outdoors in soft light',
  },
]
