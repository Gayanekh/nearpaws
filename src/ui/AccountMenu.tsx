import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDemo } from '../demo/useDemo'
import { ROUTES } from '../routes'

const item =
  'block w-full rounded-[0.5rem] px-3 py-2.5 text-left font-sans text-ui font-medium text-ink no-underline transition-colors duration-200 ease-out hover:bg-panel'

/**
 * The signed-in person in the header: their first name opens a small menu with the dashboard, "Reset demo" and "Sign out".
 * It closes on Escape, on a click outside, and when an item is chosen.
 */
export function AccountMenu() {
  const { account, reset } = useDemo()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!account) return null
  const dashboard = account.role === 'owner' ? ROUTES.dashboard : ROUTES.caregiverDashboard
  const first = account.name.split(' ')[0]!

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-3 rounded-[0.875rem] border border-ink bg-paper px-4 font-sans text-ui font-medium tracking-ui text-ink transition-colors duration-200 ease-out hover:bg-ink hover:text-paper"
      >
        {account.photo ? (
          <img src={account.photo.src} alt="" className="size-6 rounded-full object-cover" style={{ objectPosition: account.photo.position }} />
        ) : (
          <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-accent text-label font-semibold text-ink">
            {first[0]}
          </span>
        )}
        {first}
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 rounded-[0.75rem] border border-hair bg-paper p-2 shadow-[0_10px_30px_color-mix(in_srgb,var(--color-ink)_8%,transparent)]">
          <p className="px-3 py-2 text-caption text-muted">
            Signed in as {account.name} ({account.role === 'owner' ? 'pet owner' : 'caregiver'}). Demo only.
          </p>
          <Link className={item} to={dashboard} onClick={() => setOpen(false)}>Dashboard</Link>
          <Link className={item} to={ROUTES.profile} onClick={() => setOpen(false)}>My profile</Link>
          <button
            type="button"
            className={item}
            onClick={() => {
              setOpen(false)
              reset()
              navigate(ROUTES.home)
            }}
          >
            Reset demo
          </button>
          <button
            type="button"
            className={item}
            onClick={() => {
              setOpen(false)
              navigate(ROUTES.home, { state: { signOut: true } })
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
