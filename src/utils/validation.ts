export type Errors = Record<string, string>

export const isBlank = (v: string) => v.trim().length === 0

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

/** Phone numbers: at least 7 digits, allowing spaces, dashes, brackets and a leading +. */
export const isPhone = (v: string) => /^\+?[\d\s\-()]{7,}$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7

/** A date as yyyy-mm-dd in the visitor's own time zone (toISOString would give the UTC day). */
export const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const todayIso = () => toIso(new Date())

export const formatDate = (iso: string) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

export const nightsBetween = (start: string, end: string) =>
  Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86_400_000))
