import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { accountById, requestFromBooking, seedRequests } from '../data/demo'
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
}

const KEY = 'nearpaws-demo-v1'

const initialState = (): DemoState => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState
      if (Array.isArray(parsed.requests)) return parsed
    }
  } catch {
    // Storage is unavailable or unreadable: start from the sample data.
  }
  return { accountId: null, requests: seedRequests() }
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
    return {
      account: accountById(state.accountId),
      requests: state.requests,
      signIn: (accountId) => setState((s) => ({ ...s, accountId })),
      signOut: () => setState((s) => ({ ...s, accountId: null })),
      reset: () => setState({ accountId: null, requests: seedRequests() }),
      createRequest: (ownerId, values) => {
        const id = `r-${Date.now()}`
        setState((s) => ({ ...s, requests: [requestFromBooking(id, ownerId, values), ...s.requests] }))
        return id
      },
      cancel: (id) => change(id, withStatus('cancelled', 'owner', 'I cancelled this request.')),
      reply: (id, text) => change(id, withStatus('requested', 'owner', text)),
      accept: (id) => change(id, withStatus('confirmed', 'caregiver', 'I accepted this request. I will send updates during the stay.')),
      ask: (id, text) => change(id, withStatus('more-info', 'caregiver', text)),
      decline: (id) => change(id, withStatus('declined', 'caregiver', 'I am not able to take this booking.')),
      sendUpdate: (id, text) => change(id, (r) => ({ ...r, updates: [{ when: 'Just now', text }, ...r.updates] })),
    }
  }, [state])

  return <DemoContext.Provider value={api}>{children}</DemoContext.Provider>
}
