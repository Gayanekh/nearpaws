import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BRAND, PROTOTYPE_NOTICE } from './data/content'
import { ROUTES } from './routes'
import { useNpMotion } from './useNpMotion'

/**
 * Shell of the app: prototype notice, header, main and footer, from the approved design preview. It also moves the page
 * on navigation: to the #section a link names, or back to the top.
 */
export function NpLayout() {
  const { pathname, hash, key } = useLocation()
  const root = useRef<HTMLDivElement>(null)
  const notice = useRef<HTMLParagraphElement>(null)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  // A link with a #section scrolls to it; any other navigation (including the logo on the home page) goes back to the top.
  useEffect(() => {
    if (hash) {
      // Wait a moment so the target has rendered after a page change.
      const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])

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
    <div className="np group/np" ref={root}>
      <a
        className="absolute top-[-5rem] left-(--inset) z-100 bg-ink px-5 py-3 font-sans text-ui font-medium text-paper focus:top-3"
        href="#main"
      >
        Skip to main content
      </a>
      <p
        ref={notice}
        className="bg-ink px-(--inset) py-[0.625rem] text-center font-sans text-[0.8125rem] leading-[1.5] font-normal text-paper [@media(max-width:480px)]:py-2 [@media(max-width:480px)]:text-[0.75rem] [@media(max-width:480px)]:leading-[1.4]"
      >
        {PROTOTYPE_NOTICE} Photos are Unsplash stock images.
      </p>

      <header className="relative z-20 grid h-(--header-h) grid-cols-[1fr_auto_1fr] items-center bg-paper px-(--inset)" ref={header}>
        <Logo label="NearPaws, home" className="justify-self-start" />
        <nav className="hidden md:flex md:justify-self-center md:gap-[clamp(1.75rem,4.6vw,5.5rem)]" aria-label="Main">
          <NavLink className={navLink} to={ROUTES.caregivers} end>Find a caregiver</NavLink>
          <Link className={navLink} to={`${ROUTES.home}#how`}>How it works</Link>
          <NavLink className={navLink} to={ROUTES.become} end>Become a caregiver</NavLink>
        </nav>
        <div className="flex items-center gap-1 justify-self-end">
          <button className={iconButton} type="button" aria-label="Search (not available in this prototype)">
            <svg viewBox="0 0 24 24" aria-hidden="true" className={iconStroke}>
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
          </button>
          <button
            className={iconButton}
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
        <nav
          className={`absolute top-full right-0 left-0 border-t border-hair bg-paper px-(--inset) pt-2 pb-6 ${open ? 'block' : 'hidden'}`}
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
            <Logo />
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
        <div
          className="mx-auto mt-[clamp(3rem,7vw,6rem)] mb-5 max-w-360 pb-[0.2em] font-slab text-[clamp(4rem,19.5vw,21rem)]/[0.8] font-light tracking-[-0.045em] whitespace-nowrap text-accent select-none"
          aria-hidden="true"
        >
          nearpaws
        </div>
        <div className="mx-auto flex max-w-360 flex-wrap justify-between gap-4 border-t border-hair pt-6 font-sans text-caption text-muted">
          <span>Prototype &middot; not a live service</span>
          <span>Photos: Unsplash stock images</span>
        </div>
      </footer>
    </div>
  )
}

const navLink =
  'inline-block py-[0.875rem] font-sans text-ui font-medium tracking-ui text-ink no-underline transition-[background-size] duration-280 ease-out [background:linear-gradient(var(--color-accent),var(--color-accent))_0_calc(100%-0.5rem)/0_2px_no-repeat] hover:[background-size:100%_2px] focus-visible:[background-size:100%_2px] aria-[current=page]:[background-size:100%_2px]'
const mobileLink = 'block border-b border-hair py-4 font-sans text-[1rem]/[1.4] font-medium text-ink no-underline'
const iconButton = 'grid size-11 place-items-center text-ink'
const iconStroke = 'size-[1.375rem] fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]'
const footerHeading = 'mb-4 font-sans text-label font-semibold tracking-label text-accent-ink uppercase'
const footerLink =
  'inline-block py-2 font-medium text-ink no-underline hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-[0.3em]'

/** The wordmark: "nearpaws" with the small "preview" tag. */
function Logo({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <Link
      className={`-my-2.5 inline-flex items-baseline gap-2 py-2.5 font-sans text-[clamp(1.5rem,1.2rem+0.9vw,1.875rem)]/none font-bold tracking-tight text-ink no-underline ${className}`}
      to={ROUTES.home}
      aria-label={label}
    >
      nearpaws <small className="font-sans text-label/none font-semibold tracking-label text-accent-ink uppercase">prototype</small>
    </Link>
  )
}
