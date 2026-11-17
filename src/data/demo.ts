import type { BookingValues } from '../forms/booking'
import type { CareType, Handover } from '../types'
import { firstBusyDay } from './availability'
import { CAREGIVERS, PET_SIZE_LABELS } from './content'
import { SAMPLE_PETS } from './operations'
import type { SamplePet } from './operations'
import type { RequestStatus } from './statusLabels'
import { toIso } from '../utils/validation'

/**
 * The people and requests of the demo. There are no real accounts: the pet owners are two invented people, and the
 * caregivers are the six sample caregivers. The requests are what the dashboards show; new ones come from the booking
 * form. Everything is fictional.
 */

export type Role = 'owner' | 'caregiver'

export interface Account {
  id: string
  role: Role
  name: string
  blurb: string
  /** For a caregiver account: the id of the sample caregiver it belongs to. */
  caregiverId?: string
}

export interface RequestMessage {
  from: Role
  text: string
}

export interface CareUpdate {
  when: string
  text: string
}

export interface CareRequest {
  id: string
  ownerId: string
  caregiverId: string
  pet: SamplePet
  /** First and last day, yyyy-mm-dd. */
  start: string
  end: string
  careType: CareType
  handover: Handover
  status: RequestStatus
  messages: RequestMessage[]
  updates: CareUpdate[]
  contact?: { name: string; phone: string }
}

export const OWNERS: Account[] = [
  { id: 'owner-alex', role: 'owner', name: 'Alex Morgan', blurb: 'Owner of Biscuit, Juniper and Otto. Three requests in different states.' },
  { id: 'owner-jordan', role: 'owner', name: 'Jordan Lee', blurb: 'Owner of Waffles. One request that was declined.' },
]

export const CAREGIVER_ACCOUNTS: Account[] = CAREGIVERS.map((c) => ({
  id: `caregiver-${c.id}`,
  role: 'caregiver',
  name: c.name,
  blurb: `${c.area}. ${c.experienceYears} years of experience.`,
  caregiverId: c.id,
}))

export const ACCOUNTS: Account[] = [...OWNERS, ...CAREGIVER_ACCOUNTS]

export const accountById = (id: string | null) => ACCOUNTS.find((a) => a.id === id) ?? null

const inDays = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toIso(d)
}

/** The requests the demo starts with (and returns to after "Reset demo"). Dates are relative to today. */
export function seedRequests(): CareRequest[] {
  return [
    {
      id: 'r-biscuit',
      ownerId: 'owner-alex',
      caregiverId: 'mara',
      pet: SAMPLE_PETS['biscuit']!,
      start: inDays(14),
      end: inDays(18),
      careType: 'caregiver-home',
      handover: 'both',
      status: 'requested',
      messages: [],
      updates: [],
      contact: { name: 'Sam Morgan', phone: '555-0148 (fictional)' },
    },
    {
      id: 'r-juniper',
      ownerId: 'owner-alex',
      caregiverId: 'elena',
      pet: SAMPLE_PETS['juniper']!,
      start: inDays(20),
      end: inDays(22),
      careType: 'owner-home',
      handover: 'drop-off',
      status: 'more-info',
      messages: [{ from: 'caregiver', text: 'What time does Juniper usually get her thyroid tablet? I would like to match your routine.' }],
      updates: [],
      contact: { name: 'Sam Morgan', phone: '555-0148 (fictional)' },
    },
    {
      id: 'r-otto',
      ownerId: 'owner-alex',
      caregiverId: 'priya',
      pet: SAMPLE_PETS['otto']!,
      start: inDays(27),
      end: inDays(33),
      careType: 'caregiver-home',
      handover: 'pickup',
      status: 'confirmed',
      messages: [{ from: 'caregiver', text: 'Happy to take Otto. I will send a photo each evening.' }],
      updates: [
        { when: 'Today, 09:10', text: 'Otto finished his breakfast and had a long walk by the river. Photo attached.' },
        { when: 'Yesterday, 19:45', text: 'Settled in well. Slept in the living room bed.' },
      ],
      contact: { name: 'Sam Morgan', phone: '555-0148 (fictional)' },
    },
    {
      id: 'r-waffles',
      ownerId: 'owner-jordan',
      caregiverId: 'theo',
      pet: {
        name: 'Waffles', species: 'Dog', breed: 'Corgi', age: '3 years', size: 'Small',
        food: 'Half a cup of dry food twice a day',
        avoid: 'Cheese',
        medication: 'None',
        behavior: 'Loves people and barks at the doorbell.',
      },
      start: inDays(9),
      end: inDays(11),
      careType: 'caregiver-home',
      handover: 'both',
      status: 'declined',
      messages: [{ from: 'caregiver', text: 'Sorry, I am fully booked on those days. I hope you find someone soon.' }],
      updates: [],
      contact: { name: 'Riley Lee', phone: '555-0199 (fictional)' },
    },
  ]
}

/** The caregiver a new request goes to: the chosen one, or (for "Help me choose") the first one free on those days. */
export function chooseCaregiver(values: BookingValues): string {
  if (values.caregiver) return values.caregiver
  const free = CAREGIVERS.find((c) => !firstBusyDay(c.id, values.start, values.end))
  return (free ?? CAREGIVERS[0]!).id
}

/** A booking form's answers as a new request in the "Requested" state. */
export function requestFromBooking(id: string, ownerId: string, values: BookingValues): CareRequest {
  return {
    id,
    ownerId,
    caregiverId: chooseCaregiver(values),
    pet: {
      name: values.petName,
      species: values.species,
      age: values.age || 'Age not given',
      size: PET_SIZE_LABELS[values.size as keyof typeof PET_SIZE_LABELS] ?? values.size,
      food: values.food,
      medication: values.medication,
      behavior: values.behavior,
      routine: values.routine,
    },
    start: values.start,
    end: values.end,
    careType: values.careType[0] as CareType,
    handover: values.handover[0] as Handover,
    status: 'requested',
    messages: [],
    updates: [],
    contact: { name: values.contactName, phone: values.contactPhone },
  }
}
