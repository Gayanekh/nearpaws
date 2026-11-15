export type CareType = 'caregiver-home' | 'owner-home'
export type PetSize = 'small' | 'medium' | 'large'
export type Handover = 'drop-off' | 'pickup' | 'both'
export type SceneVariant = 'cozy' | 'garden' | 'apartment' | 'farmhouse' | 'pets'

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
  scene: SceneVariant
  review: Review
}

export interface Service {
  id: string
  title: string
  description: string
  icon: 'home' | 'key' | 'car'
  detail: string
}

export interface Step {
  title: string
  description: string
}

export interface TrustItem {
  title: string
  description: string
}

export interface StayDetail {
  title: string
  description: string
  scene: SceneVariant
}

export interface StartAction {
  title: string
  description: string
  to: string
  icon: 'pin' | 'heart' | 'paw' | 'clock'
  tone: 'green' | 'blue' | 'orange' | 'purple'
}
