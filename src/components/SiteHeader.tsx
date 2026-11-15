import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BRAND, PROTOTYPE_NOTICE } from '../data/content'
import { Button } from './Button'
import { Icon } from './Icon'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  // Close with the Escape key.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <p className="prototype-banner" role="note">{PROTOTYPE_NOTICE}</p>
      <div className="container site-header__bar">
        <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
          <span className="brand__mark"><Icon name="paw" size={20} /></span>
          {BRAND.name}
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
          <span>{open ? 'Close' : 'Menu'}</span>
        </button>

        <nav id="main-nav" className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Main" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          <NavLink to="/caregivers">Find a caregiver</NavLink>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#trust">Trust &amp; safety</Link>
          <NavLink to="/become-a-caregiver">Become a caregiver</NavLink>
          <Button to="/book" variant="accent">Request care</Button>
        </nav>
      </div>
    </header>
  )
}
