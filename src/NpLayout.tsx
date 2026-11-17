import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BRAND } from './data/content'
import { ROUTES } from './routes'
import { BrandLogo } from './ui/BrandLogo'
import { useNpMotion } from './useNpMotion'

/**
 * Shell of the app: a header that stays at the top while the page scrolls, main and footer, from the approved design preview. It also moves the page
 * on navigation: to the #section a link names, or back to the top.
 */
export function NpLayout() {
  const { pathname, hash, key } = useLocation()
  const root = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // The header is flat at the top of the page and becomes a floating pill as soon as the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A link with a #section scrolls to it; any other navigation (including the logo on the home page) goes back to the top.
  useEffect(() => {
    if (hash) {
      // Wait a moment so the target has rendered after a page change.
      const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

  // Tell the CSS how tall the header is, so the first screen can fill the viewport, and keep in-page anchors from landing
  // underneath the fixed header.
  useEffect(() => {
    const element = root.current
    if (!element || !header.current) return
    const setChrome = () => {
      const height = header.current?.offsetHeight ?? 0
      element.style.setProperty('--chrome-h', `${height}px`)
      document.documentElement.style.scrollPaddingTop = `${height + 8}px`
    }
    setChrome()
    window.addEventListener('resize', setChrome)
    window.addEventListener('load', setChrome)
    document.fonts?.ready.then(setChrome)
    const observer = 'ResizeObserver' in window ? new ResizeObserver(setChrome) : undefined
    observer?.observe(header.current)
    return () => {
      window.removeEventListener('resize', setChrome)
      window.removeEventListener('load', setChrome)
      observer?.disconnect()
      document.documentElement.style.scrollPaddingTop = ''
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
    <div className="np group/np" ref={root}>
      <a
        className="absolute top-[-5rem] left-(--inset) z-100 bg-ink px-5 py-3 font-sans text-ui font-medium text-paper focus:top-3"
        href="#main"
      >
        Skip to main content
      </a>

      <header
        className="pointer-events-none sticky top-0 z-20 h-[4.875rem] px-[max(0.5rem,calc(var(--inset)_-_1.25rem))] pt-3.5"
        ref={header}
      >
        <div
          className="pointer-events-auto mx-auto grid h-full max-w-[92.5rem] grid-cols-[1fr_auto_1fr] items-center border border-transparent bg-paper/62 px-5 backdrop-blur-[16px] transition-[border-radius,border-color,box-shadow] duration-500 ease-out data-[scrolled]:rounded-[1.625rem] data-[scrolled]:border-hair data-[scrolled]:shadow-[0_10px_30px_color-mix(in_srgb,var(--color-ink)_8%,transparent)]"
          data-scrolled={scrolled ? '' : undefined}
        >
        <Logo label="NearPaws, home" className="justify-self-start" />
        <nav className="hidden md:flex md:justify-self-center md:gap-[clamp(1.75rem,4.6vw,5.5rem)]" aria-label="Main">
          <NavLink className={navLink} to={ROUTES.caregivers} end>Find a caregiver</NavLink>
          <Link className={navLink} to={`${ROUTES.home}#how`}>How it works</Link>
          <NavLink className={navLink} to={ROUTES.become} end>Become a caregiver</NavLink>
        </nav>
        <div className="col-start-3 flex items-center gap-1 justify-self-end">
          <button
            className={`${iconButton} md:hidden`}
            type="button"
            ref={menuButton}
            aria-expanded={open}
            aria-controls="mobileNav"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="grid w-6 justify-items-end gap-[0.4rem]" aria-hidden="true">
              <span className="block h-[1.5px] w-full bg-ink" />
              <span className="block h-[1.5px] w-[62%] bg-ink" />
            </span>
          </button>
        </div>
        </div>
        <nav
          className={`pointer-events-auto absolute top-full right-0 left-0 mx-[max(0.5rem,calc(var(--inset)_-_1.25rem))] mt-4 rounded-[1.625rem] border border-hair bg-paper/90 px-6 pt-2 pb-4 backdrop-blur-[16px] ${open ? 'block' : 'hidden'}`}
          id="mobileNav"
          aria-label="Menu"
          data-menu=""
          data-open={open ? '' : undefined}
          onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
        >
          <NavLink className={mobileLink} to={ROUTES.caregivers} end>Find a caregiver</NavLink>
          <Link className={mobileLink} to={`${ROUTES.home}#how`}>How it works</Link>
          <NavLink className={mobileLink} to={ROUTES.become} end>Become a caregiver</NavLink>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="overflow-hidden bg-panel px-(--inset) pt-[clamp(4rem,8vw,7rem)] pb-8">
        <div className="mx-auto grid max-w-360 gap-10 min-[800px]:grid-cols-[5fr_3fr_4fr]">
          <div>
            <Logo onPanel />
            <p className="mt-5 max-w-[26rem]">
              {BRAND.tagline}. &ldquo;{BRAND.name}&rdquo; is a temporary brand name for this prototype.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2 className={footerHeading}>Explore</h2>
            <ul>
              <li><Link className={footerLink} to={ROUTES.caregivers}>Find a caregiver</Link></li>
              <li><Link className={footerLink} to={`${ROUTES.home}#how`}>How it works</Link></li>
              <li><Link className={footerLink} to={ROUTES.become}>Become a caregiver</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className={footerHeading}>About this prototype</h2>
            <p>
              A front-end demonstration only. There is no backend, payment, real booking or messaging, and all caregivers,
              prices and reviews are fictional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const navLink =
  'inline-block py-[0.875rem] font-sans text-ui font-medium tracking-ui text-ink no-underline transition-[background-size] duration-280 ease-out [background:linear-gradient(var(--color-accent),var(--color-accent))_0_calc(100%-0.5rem)/0_2px_no-repeat] hover:[background-size:100%_2px] focus-visible:[background-size:100%_2px] aria-[current=page]:[background-size:100%_2px]'
const mobileLink = 'block border-b border-hair py-4 font-sans text-[1rem]/[1.4] font-medium text-ink no-underline'
const iconButton = 'grid size-11 place-items-center text-ink'
const footerHeading = 'mb-4 font-sans text-label font-semibold tracking-label text-accent-ink uppercase'
const footerLink =
  'inline-block py-2 font-medium text-ink no-underline hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-[0.3em]'

/** The NearPaws logo as a link to the home page. In the footer it sits on the panel color, so its cut-outs take that color. */
function Logo({ label, className = '', onPanel = false }: { label?: string; className?: string; onPanel?: boolean }) {
  return (
    <Link
      className={`inline-flex items-center no-underline ${className}`}
      to={ROUTES.home}
      aria-label={label ?? 'NearPaws, home'}
    >
      <BrandLogo
        className={`${onPanel ? 'h-16 [--logo-counter:var(--color-panel)]' : 'h-10 md:h-12'}`}
      />
    </Link>
  )
}
