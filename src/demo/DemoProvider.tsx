import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CAREGIVER_PHOTOS } from '../data/caregiverPhotos'
import { CAREGIVERS } from '../data/content'
import { accountById, requestFromBooking, seedRequests } from '../data/demo'
import { uploadedPhoto, withEdits } from '../data/profile'
import type { Profiles } from '../data/profile'
import type { CareRequest } from '../data/demo'
import type { RequestStatus } from '../data/statusLabels'
import { DemoContext } from './useDemo'
import type { DemoApi } from './useDemo'

/**
 * The state of the demo: who is signed in and the list of care requests. There is no server. The state lives in memory and
 * is kept in this browser tab (sessionStorage), so a reload keeps the demo where it was and closing the tab clears it.
 * "Reset demo" returns to the starting data.
 */
interface DemoState {
  accountId: string | null
  requests: CareRequest[]
  profiles: Profiles
}

const KEY = 'nearpaws-demo-v1'

/** Elena and Mara of earlier versions of the demo are Leo and Noah now (id and all): carry a stored tab over. */
const renamed = (s: DemoState): DemoState => {
  const NEW_ID: Record<string, string> = { 'caregiver-elena': 'caregiver-leo', 'caregiver-mara': 'caregiver-noah' }
  const NEW_CAREGIVER: Record<string, string> = { elena: 'leo', mara: 'noah' }
  const id = (v: string | null) => (v && NEW_ID[v]) || v
  return {
    accountId: id(s.accountId),
    requests: s.requests.map((r) => (NEW_CAREGIVER[r.caregiverId] ? { ...r, caregiverId: NEW_CAREGIVER[r.caregiverId]! } : r)),
    profiles: Object.fromEntries(Object.entries(s.profiles).map(([k, v]) => [id(k) as string, v])),
  }
}

const initialState = (): DemoState => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState
      if (Array.isArray(parsed.requests)) return renamed({ ...parsed, profiles: parsed.profiles ?? {} })
    }
  } catch {
    // Storage is unavailable or unreadable: start from the sample data.
  }
  return { accountId: null, requests: seedRequests(), profiles: {} }
}


export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState)

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // Storage is unavailable: the demo keeps working until the page is reloaded.
    }
  }, [state])

  const api = useMemo<DemoApi>(() => {
    const change = (id: string, fn: (r: CareRequest) => CareRequest) =>
      setState((s) => ({ ...s, requests: s.requests.map((r) => (r.id === id ? fn(r) : r)) }))
    const withStatus = (status: RequestStatus, from: 'owner' | 'caregiver', text?: string) => (r: CareRequest): CareRequest => ({
      ...r,
      status,
      messages: text ? [...r.messages, { from, text }] : r.messages,
    })
    const base = accountById(state.accountId)
    const edits = base ? state.profiles[base.id] : undefined
    const account = base && edits
      ? { ...base, name: edits.name || base.name, photo: edits.photo ? uploadedPhoto(edits.photo, edits.name || base.name) : base.photo }
      : base
    return {
      account,
      profile: edits ?? {},
      nameOf: (id) => state.profiles[id]?.name || accountById(id)?.name || 'Pet owner',
      saveProfile: (changes) =>
        setState((s) => (s.accountId ? { ...s, profiles: { ...s.profiles, [s.accountId]: { ...s.profiles[s.accountId], ...changes } } } : s)),
      caregiver: (id) => {
        const c = CAREGIVERS.find((item) => item.id === id)
        return c && withEdits(c, state.profiles[`caregiver-${id}`])
      },
      caregiverPhoto: (id) => {
        const edit = state.profiles[`caregiver-${id}`]
        const name = edit?.name || CAREGIVERS.find((c) => c.id === id)?.name || ''
        return edit?.photo ? uploadedPhoto(edit.photo, name) : CAREGIVER_PHOTOS[id]
      },
      requests: state.requests,
      signIn: (accountId) => setState((s) => ({ ...s, accountId })),
      signOut: () => setState((s) => ({ ...s, accountId: null })),
      reset: () => setState({ accountId: null, requests: seedRequests(), profiles: {} }),
      createRequest: (ownerId, values) => {
        const id = `r-${Date.now()}`
        setState((s) => ({ ...s, requests: [requestFromBooking(id, ownerId, values), ...s.requests] }))
        return id
      },
      cancel: (id) => change(id, withStatus('cancelled', 'owner', 'I cancelled this request.')),
      reply: (id, text) => change(id, withStatus('requested', 'owner', text)),
      setPetPhoto: (id, photo) =>
        setState((s) => {
          const target = s.requests.find((r) => r.id === id)
          if (!target) return s
          return {
            ...s,
            requests: s.requests.map((r) =>
              r.ownerId === target.ownerId && r.pet.name === target.pet.name ? { ...r, pet: { ...r.pet, photo: photo || undefined } } : r,
            ),
          }
        }),
      accept: (id) => change(id, withStatus('confirmed', 'caregiver', 'I accepted this request. I will send updates during the stay.')),
      ask: (id, text) => change(id, withStatus('more-info', 'caregiver', text)),
      decline: (id) => change(id, withStatus('declined', 'caregiver', 'I am not able to take this booking.')),
      sendUpdate: (id, text) => change(id, (r) => ({ ...r, updates: [{ when: 'Just now', text }, ...r.updates] })),
    }
  }, [state])

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>
}
