import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LegacyLink } from './LegacyLink'
import { ROUTES } from './routes'
import { useNpMotion } from './useNpMotion'

/**
 * Shell of the redesign: notice, header, main and footer, ported from the approved design preview.
 * Lives on /v2 while the redesign is built; every class is prefixed np- (see styles/np.css).
 */
export function NpLayout() {
  const { pathname } = useLocation()
  const root = useRef<HTMLDivElement>(null)
  const notice = useRef<HTMLParagraphElement>(null)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  // While the redesign is a work in progress: its own title, and kept out of search engines.
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'NearPaws – design preview'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => {
      document.title = previousTitle
      meta.remove()
    }
  }, [])

  // Tell the CSS how tall the notice and header are, so the first screen can fill the viewport.
  useEffect(() => {
    const element = root.current
    if (!element || !notice.current || !header.current) return
    const setChrome = () =>
      element.style.setProperty('--chrome-h', `${(notice.current?.offsetHeight ?? 0) + (header.current?.offsetHeight ?? 0)}px`)
    setChrome()
    window.addEventListener('resize', setChrome)
    window.addEventListener('load', setChrome)
    document.fonts?.ready.then(setChrome)
    const observer = 'ResizeObserver' in window ? new ResizeObserver(setChrome) : undefined
    observer?.observe(notice.current)
    observer?.observe(header.current)
    return () => {
      window.removeEventListener('resize', setChrome)
      window.removeEventListener('load', setChrome)
      observer?.disconnect()
    }
  }, [])

  // Menu: Escape closes it (and returns focus to its button); so does growing past the desktop breakpoint.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  useEffect(() => {
    const query = window.matchMedia('(min-width:900px)')
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useNpMotion(root, pathname)

  return (
    <div className="np" ref={root}>
      <a className="np-skip" href="#main">Skip to main content</a>
      <p
        ref={notice}
        className="bg-ink px-(--inset) py-[0.625rem] text-center font-sans text-[0.8125rem] leading-[1.5] font-normal text-paper [@media(max-width:480px)]:py-2 [@media(max-width:480px)]:text-[0.75rem] [@media(max-width:480px)]:leading-[1.4]"
      >
        Design preview of the proposed NearPaws look. This is not the live site. Caregivers, prices and reviews are fictional,
        and photos are Unsplash stock images.
      </p>

      <header className="np-header" ref={header}>
        <a className="np-logo" href="#top" aria-label="NearPaws, preview home">nearpaws <small>preview</small></a>
        <nav className="np-nav" aria-label="Main">
          <NavLink to={ROUTES.caregivers} end>Find a caregiver</NavLink>
          <a href="#how">How it works</a>
          <LegacyLink to="/become-a-caregiver">Become a caregiver</LegacyLink>
        </nav>
        <div className="np-tools">
          <button className="np-icon-btn" type="button" aria-label="Search (not available in the preview)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
          </button>
          <button
            className="np-icon-btn"
            type="button"
            ref={menuButton}
            aria-expanded={open}
            aria-controls="mobileNav"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="np-menu-lines" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <nav
          className={`np-mobile-nav${open ? ' np-is-open' : ''}`}
          id="mobileNav"
          aria-label="Menu"
          onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
        >
          <NavLink to={ROUTES.caregivers} end>Find a caregiver</NavLink>
          <a href="#how">How it works</a>
          <LegacyLink to="/become-a-caregiver">Become a caregiver</LegacyLink>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="np-footer">
        <div className="np-footer__grid">
          <div>
            <a className="np-logo" href="#top">nearpaws <small>preview</small></a>
            <p style={{ marginTop: '1.25rem', maxWidth: '26rem' }}>
              Trusted care for your pet, while you are away. &ldquo;NearPaws&rdquo; is a temporary brand name.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              <li><Link to={ROUTES.caregivers}>Find a caregiver</Link></li>
              <li><a href="#how">How it works</a></li>
              <li><LegacyLink to="/become-a-caregiver">Become a caregiver</LegacyLink></li>
            </ul>
          </nav>
          <div>
            <h2>About this preview</h2>
            <p>
              A visual design preview only. There is no backend, payment, real booking or messaging, and all caregivers,
              prices and reviews are fictional.
            </p>
          </div>
        </div>
        <div className="np-footer__mark" aria-hidden="true">nearpaws</div>
        <div className="np-footer__base np-caption">
          <span>Design preview &middot; not the live site</span>
          <span>Photos: Unsplash stock images</span>
        </div>
      </footer>
    </div>
  )
}
