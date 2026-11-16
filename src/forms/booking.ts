import { isBlank, isEmail, isPhone, todayIso } from '../utils/validation'
import type { Errors } from '../utils/validation'

/** The three steps of the booking request. Shared by the original page and the redesigned page. */
export const STEP_LABELS = ['Care & dates', 'Your pet', 'Routine & emergency']

export const EMPTY_BOOKING = {
  caregiver: '', careType: [] as string[], handover: [] as string[], start: '', end: '', ownerName: '', email: '',
  petName: '', species: '', size: '', age: '', vaccinated: '', food: '', medication: '',
  routine: '', behavior: '', contactName: '', contactPhone: '',
}
export type BookingValues = typeof EMPTY_BOOKING

/** Returns the errors for one step. An empty object means the step is valid. */
export function validateBookingStep(step: number, v: BookingValues): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!v.careType[0]) e['careType'] = 'Choose where the care should happen.'
    if (!v.start) e['start'] = 'Choose a start date.'
    else if (v.start < todayIso()) e['start'] = 'The start date cannot be in the past.'
    if (!v.end) e['end'] = 'Choose an end date.'
    else if (v.start && v.end < v.start) e['end'] = 'The end date must be on or after the start date.'
    if (!v.handover[0]) e['handover'] = 'Choose how handover should work.'
    if (isBlank(v.ownerName)) e['ownerName'] = 'Enter your name.'
    if (isBlank(v.email)) e['email'] = 'Enter your email address.'
    else if (!isEmail(v.email)) e['email'] = 'Enter an email address like name@example.com.'
  }
  if (step === 1) {
    if (isBlank(v.petName)) e['petName'] = 'Enter your pet’s name.'
    if (!v.species) e['species'] = 'Choose a species.'
    if (!v.size) e['size'] = 'Choose a size.'
    if (!v.vaccinated) e['vaccinated'] = 'Tell us about vaccinations.'
    if (isBlank(v.food)) e['food'] = 'Describe food needs, or write “None”.'
    if (isBlank(v.medication)) e['medication'] = 'Describe medication, or write “None”.'
  }
  if (step === 2) {
    if (isBlank(v.routine)) e['routine'] = 'Describe the daily routine.'
    if (isBlank(v.behavior)) e['behavior'] = 'Describe behavior and anything that worries your pet.'
    if (isBlank(v.contactName)) e['contactName'] = 'Enter an emergency contact name.'
    if (isBlank(v.contactPhone)) e['contactPhone'] = 'Enter an emergency phone number.'
    else if (!isPhone(v.contactPhone)) e['contactPhone'] = 'Enter a phone number with at least 7 digits.'
  }
  return e
}
