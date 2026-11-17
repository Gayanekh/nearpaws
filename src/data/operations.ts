// Fictional sample data: the pets used by the demo requests, and the admin screen.

export interface SamplePet {
  name: string
  species: string
  breed?: string
  age: string
  size: string
  food: string
  avoid?: string
  medication: string
  behavior: string
  routine?: string
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

export const SAMPLE_APPLICATIONS = [
  { id: 'a1', name: 'Applicant 1', area: 'Riverside', submitted: '2 days ago', checks: { identity: true, experience: true, space: true, references: false } },
  { id: 'a2', name: 'Applicant 2', area: 'Cedar Park', submitted: '4 days ago', checks: { identity: true, experience: false, space: false, references: false } },
  { id: 'a3', name: 'Applicant 3', area: 'Harbor Hill', submitted: '1 week ago', checks: { identity: true, experience: true, space: true, references: true } },
]

export const SAMPLE_COMPLAINTS = [
  { id: 'c1', summary: 'Owner reports a late photo update during a stay.', status: 'Open', age: '1 day' },
  { id: 'c2', summary: 'Caregiver asks to change a confirmed date.', status: 'Awaiting reply', age: '3 days' },
]
