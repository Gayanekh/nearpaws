import { toIso, todayIso } from '../utils/validation'

/**
 * Sample availability of the caregivers. There is no server, so each caregiver's open and busy days come from a fixed
 * rule: a repeating cycle of a few days that are taken, different for each caregiver. The same rule feeds the calendar on
 * the caregiver's page and the check in the booking form, so they always agree. All of it is illustrative.
 */

/** How many days ahead a stay can be requested. */
export const BOOKING_WINDOW_DAYS = 120

const DAY_MS = 86_400_000

/** Whole days since 1970-01-01 for a yyyy-mm-dd date (time zone free). */
const dayNumber = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return Math.floor(Date.UTC(y!, m! - 1, d!) / DAY_MS)
}

/** The repeating pattern of one caregiver: every `cycle` days, `len` days in a row are taken. */
function pattern(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) % 9973
  const cycle = 9 + (hash % 6)
  const len = 2 + (Math.floor(hash / 7) % 2)
  return { cycle, len, offset: hash % cycle }
}

/** Is this caregiver taken on that day (ignoring the past and the booking window)? */
export function isBusyDay(caregiverId: string, iso: string) {
  const { cycle, len, offset } = pattern(caregiverId)
  return (dayNumber(iso) + offset) % cycle < len
}

/** The last day a stay can be requested for. */
export function lastBookableIso(today = todayIso()) {
  const [y, m, d] = today.split('-').map(Number)
  return toIso(new Date(y!, m! - 1, d! + BOOKING_WINDOW_DAYS))
}

/** Can a stay include this day? Not in the past, not beyond the window, and not taken. */
export function isOpenDay(caregiverId: string, iso: string, today = todayIso()) {
  return iso >= today && iso <= lastBookableIso(today) && !isBusyDay(caregiverId, iso)
}

/** The first taken day inside start..end (both included), or null when the whole range is free. */
export function firstBusyDay(caregiverId: string, start: string, end: string): string | null {
  const [y, m, d] = start.split('-').map(Number)
  for (let i = 0; i < 400; i += 1) {
    const iso = toIso(new Date(y!, m! - 1, d! + i))
    if (iso > end) return null
    if (isBusyDay(caregiverId, iso)) return iso
  }
  return null
}
