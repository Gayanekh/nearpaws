export type CareType = 'caregiver-home' | 'owner-home'
export type PetSize = 'small' | 'medium' | 'large'
export type Handover = 'drop-off' | 'pickup' | 'both'

export interface Review {
  quote: string
  author: string
}

export interface Caregiver {
  id: string
  name: string
  neighborhood: string
  area: string
  experienceYears: number
  careStyle: string
  tagline: string
  bio: string
  careTypes: CareType[]
  petSizes: PetSize[]
  animals: string[]
  handover: Handover
  pricePerNight: number
  home: { type: string; outdoor: string; otherPets: string; hours: string }
  houseRules: string[]
  includes: string[]
  review: Review
}
