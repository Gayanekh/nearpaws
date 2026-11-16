import { isBlank, isEmail } from '../utils/validation'
import type { Errors } from '../utils/validation'

/** The caregiver application form. Shared by the original page and the redesigned page. */
export const EMPTY_APPLICATION = {
  name: '', email: '', area: '', homeType: '', experience: '', careTypes: [] as string[], sizes: [] as string[],
  about: '', rules: '', agree: [] as string[],
}
export type ApplicationValues = typeof EMPTY_APPLICATION

export function validateApplication(v: ApplicationValues): Errors {
  const e: Errors = {}
  if (isBlank(v.name)) e['name'] = 'Enter your name.'
  if (isBlank(v.email)) e['email'] = 'Enter your email address.'
  else if (!isEmail(v.email)) e['email'] = 'Enter an email address like name@example.com.'
  if (!v.area) e['area'] = 'Choose your neighborhood.'
  if (!v.homeType) e['homeType'] = 'Choose a home type.'
  if (!v.careTypes.length) e['careTypes'] = 'Choose at least one type of care.'
  if (!v.sizes.length) e['sizes'] = 'Choose at least one pet size.'
  if (isBlank(v.about) || v.about.trim().length < 20) e['about'] = 'Tell us a little about your experience (at least 20 characters).'
  if (!v.agree.length) e['agree'] = 'Please confirm you understand this is a prototype.'
  return e
}
