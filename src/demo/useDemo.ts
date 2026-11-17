import { createContext, useContext } from 'react'
import type { BookingValues } from '../forms/booking'
import type { Account, CareRequest } from '../data/demo'
import type { CaregiverPhoto } from '../data/caregiverPhotos'
import type { ProfileEdits } from '../data/profile'
import type { Caregiver } from '../types'

/** What the rest of the app can read and do in the demo. The state itself lives in DemoProvider. */
export interface DemoApi {
  account: Account | null
  requests: CareRequest[]
  /** The changes the signed-in person made to their own profile. */
  profile: ProfileEdits
  /** Saves changes to the signed-in person's profile (only the given fields change). */
  saveProfile: (changes: ProfileEdits) => void
  /** A sample caregiver as the caregiver edited it: what cards, profile pages and the booking form show. */
  caregiver: (id: string) => Caregiver | undefined
  /** The portrait of a sample caregiver: the one they chose, or the sample portrait. */
  caregiverPhoto: (id: string) => CaregiverPhoto | undefined
  /** The name of a demo person, as they edited it. */
  nameOf: (accountId: string) => string
  signIn: (accountId: string) => void
  signOut: () => void
  reset: () => void
  /** Adds a request for an owner from the booking form's answers; returns its id. */
  createRequest: (ownerId: string, values: BookingValues) => string
  /** Owner: cancel a request. */
  cancel: (id: string) => void
  /** Owner: answer the caregiver's question; the request goes back to "Requested". */
  reply: (id: string, text: string) => void
  /** Owner: set (or, with an empty string, remove) the photo of the pet on a request. All of the owner's requests for the same pet get it. */
  setPetPhoto: (id: string, photo: string) => void
  /** Caregiver: accept, ask a question (status "More information needed") or decline. */
  accept: (id: string) => void
  ask: (id: string, text: string) => void
  decline: (id: string) => void
  /** Caregiver: post a care update on a confirmed stay. */
  sendUpdate: (id: string, text: string) => void
}

export const DemoContext = createContext<DemoApi | null>(null)

export function useDemo(): DemoApi {
  const api = useContext(DemoContext)
  if (!api) throw new Error('useDemo must be used inside <DemoProvider>')
  return api
}
