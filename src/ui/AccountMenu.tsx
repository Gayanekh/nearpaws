import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
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
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Opening the menu moves focus to its first item.
  useEffect(() => {
    if (open) menu.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }, [open])

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = [...(menu.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])]
    const at = items.indexOf(document.activeElement as HTMLElement)
    const move = (to: number) => {
      e.preventDefault()
      items[(to + items.length) % items.length]?.focus()
    }
    if (e.key === 'ArrowDown') move(at + 1)
    else if (e.key === 'ArrowUp') move(at - 1)
    else if (e.key === 'Home') move(0)
    else if (e.key === 'End') move(items.length - 1)
    else if (e.key === 'Escape') {
      setOpen(false)
      trigger.current?.focus()
    } else if (e.key === 'Tab') setOpen(false)
  }

  if (!account) return null
  const dashboard = account.role === 'owner' ? ROUTES.dashboard : ROUTES.caregiverDashboard
  const first = account.name.split(' ')[0]!

  return (
    <div ref={box} className="relative">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
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
          <div ref={menu} role="menu" aria-label="Account" onKeyDown={onMenuKey}>
            <Link role="menuitem" className={item} to={dashboard} onClick={() => setOpen(false)}>Dashboard</Link>
            <Link role="menuitem" className={item} to={ROUTES.profile} onClick={() => setOpen(false)}>My profile</Link>
            <button
              type="button"
              role="menuitem"
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
              role="menuitem"
              className={item}
              onClick={() => {
                setOpen(false)
                navigate(ROUTES.home, { state: { signOut: true } })
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
