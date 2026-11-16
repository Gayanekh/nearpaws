// Fictional sample data for the status, caregiver-dashboard and admin screens.
import type { RequestStatus } from './statusLabels'

export interface SamplePet {
  name: string
  species: string
  breed: string
  age: string
  size: string
  food: string
  avoid: string
  medication: string
  behavior: string
}

export interface SampleRequest {
  id: string
  owner: string
  pet: SamplePet
  dates: string
  careType: string
  status: RequestStatus
  note: string
}

export const SAMPLE_PETS: Record<string, SamplePet> = {
  biscuit: {
    name: 'Biscuit', species: 'Dog', breed: 'Beagle mix', age: '4 years', size: 'Medium',
    food: 'One cup dry food at 8:00 and 18:00',
    avoid: 'Chicken (allergy), grapes',
    medication: 'None',
    behavior: 'Friendly with children. Nervous around fireworks and loud trucks. Pulls on the leash.',
  },
  juniper: {
    name: 'Juniper', species: 'Cat', breed: 'Domestic shorthair', age: '9 years', size: 'Small',
    food: 'Half a can of wet food twice a day',
    avoid: 'Dairy',
    medication: 'Thyroid tablet with breakfast',
    behavior: 'Shy with strangers, hides for the first day. Keep the door closed.',
  },
  otto: {
    name: 'Otto', species: 'Dog', breed: 'Labrador', age: '2 years', size: 'Large',
    food: 'Two cups dry food, morning and evening',
    avoid: 'Nothing known',
    medication: 'None',
    behavior: 'Very energetic, jumps up on people. Gets along with other dogs.',
  },
}

export const SAMPLE_REQUESTS: SampleRequest[] = [
  { id: 'r1', owner: 'Owner A', pet: SAMPLE_PETS['biscuit']!, dates: '14–18 Dec (4 nights)', careType: "At the caregiver's home", status: 'requested', note: 'Waiting for your reply.' },
  { id: 'r2', owner: 'Owner B', pet: SAMPLE_PETS['juniper']!, dates: '20–22 Dec (2 nights)', careType: 'At the owner’s home', status: 'more-info', note: 'You asked about the thyroid dose timing.' },
  { id: 'r3', owner: 'Owner C', pet: SAMPLE_PETS['otto']!, dates: '27 Dec – 2 Jan (6 nights)', careType: "At the caregiver's home", status: 'confirmed', note: 'Care plan agreed.' },
]

export const SAMPLE_UPDATES = [
  { when: 'Today, 09:10', text: 'Otto finished his breakfast and had a long walk by the river. Photo attached.' },
  { when: 'Yesterday, 19:45', text: 'Settled in well. Slept in the living room bed.' },
]

export const SAMPLE_APPLICATIONS = [
  { id: 'a1', name: 'Applicant 1', area: 'Riverside', submitted: '2 days ago', checks: { identity: true, experience: true, space: true, references: false } },
  { id: 'a2', name: 'Applicant 2', area: 'Cedar Park', submitted: '4 days ago', checks: { identity: true, experience: false, space: false, references: false } },
  { id: 'a3', name: 'Applicant 3', area: 'Harbor Hill', submitted: '1 week ago', checks: { identity: true, experience: true, space: true, references: true } },
]

export const SAMPLE_COMPLAINTS = [
  { id: 'c1', summary: 'Owner reports a late photo update during a stay.', status: 'Open', age: '1 day' },
  { id: 'c2', summary: 'Caregiver asks to change a confirmed date.', status: 'Awaiting reply', age: '3 days' },
]
