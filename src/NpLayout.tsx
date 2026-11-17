import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BRAND } from './data/content'
import { ROUTES } from './routes'
import { useDemo } from './demo/useDemo'
import { AccountMenu } from './ui/AccountMenu'
import { BrandLogo } from './ui/BrandLogo'
import { Button } from './ui/Button'
import { useNpMotion } from './useNpMotion'

/**
 * Shell of the app: a header that comes back when the page is scrolled up (and goes away when it is scrolled down), main and footer, from the approved design preview. It also moves the page
 * on navigation: to the #section a link names, or back to the top.
 */
export function NpLayout() {
  const { pathname, hash, key, state } = useLocation()
  const { account, signOut } = useDemo()
  const navigate = useNavigate()
  const root = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const openRef = useRef(false)
  useEffect(() => {
    openRef.current = open
  }, [open])

  // The header is flat at the top of the page and becomes a floating pill as soon as the page is scrolled. It is only on
  // screen while the visitor scrolls up (towards the top): scrolling down moves it away, scrolling up brings it back.
  // It stays while the menu is open or while something inside it has keyboard focus.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      const delta = y - last
      if (y < 80) setHidden(false)
      else if (delta > 6 && !openRef.current) setHidden(true)
      else if (delta < -6) setHidden(false)
      if (Math.abs(delta) > 6 || y < 80) last = y
    }
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

  // Signing out goes home first and signs out there (once per visit to that page), so a dashboard does not redirect to the
  // sign-in page on the way.
  const signedOutAt = useRef('')
  useEffect(() => {
    if ((state as { signOut?: boolean } | null)?.signOut && signedOutAt.current !== key) {
      signedOutAt.current = key
      signOut()
    }
  }, [state, key, signOut])

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
    const query = window.matchMedia('(min-width:75rem)')
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
        className={`group/hdr pointer-events-none sticky flow-root top-0 z-20 h-[clamp(4.5rem,9vw,6.1875rem)] px-[max(0.5rem,calc(var(--inset)_-_1.25rem))] transition-transform duration-300 ease-out ${hidden ? '-translate-y-[calc(100%+1rem)]' : ''}`}
        onFocus={() => setHidden(false)}
        ref={header}
        data-scrolled={scrolled ? '' : undefined}
      >
        <div
          className="pointer-events-auto mx-auto grid h-full data-[scrolled]:mt-3.5 data-[scrolled]:h-16 max-w-[92.5rem] grid-cols-[1fr_auto_1fr] items-center border border-transparent bg-paper/62 px-5 backdrop-blur-[16px] transition-[height,margin,border-radius,border-color,box-shadow] duration-500 ease-out data-[scrolled]:rounded-[0.75rem] data-[scrolled]:border-hair data-[scrolled]:shadow-[0_10px_30px_color-mix(in_srgb,var(--color-ink)_8%,transparent)]"
          data-scrolled={scrolled ? '' : undefined}
        >
        <Logo label="NearPaws, home" className="justify-self-start" />
        <nav className="hidden lg:flex lg:justify-self-center lg:gap-[clamp(1rem,2.4vw,2.5rem)]" aria-label="Main">
          {SECTION_LINKS.map((s) => (
            <Link key={s.id} className={navLink} to={`${ROUTES.home}#${s.id}`}>{s.label}</Link>
          ))}
        </nav>
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <div className="hidden items-center gap-6 md:flex">
            {account ? <AccountMenu /> : <Link className={navLink} to={ROUTES.signIn}>Sign in</Link>}
            <Button className="min-h-11! gap-3! px-5! py-2.5!" to={ROUTES.caregivers}>Find a caregiver</Button>
          </div>
          <button
            className={`${iconButton} lg:hidden`}
            type="button"
            ref={menuButton}
            aria-expanded={open}
            aria-controls="mobileNav"
            aria-label="Menu"
            onClick={() => {
              setOpen((o) => !o)
              setHidden(false)
            }}
          >
            <span className="grid w-6 justify-items-end gap-[0.4rem]" aria-hidden="true">
              <span className="block h-[1.5px] w-full bg-ink" />
              <span className="block h-[1.5px] w-[62%] bg-ink" />
            </span>
          </button>
        </div>
        </div>
        <nav
          className={`pointer-events-auto absolute top-full group-data-[scrolled]/hdr:top-[4.875rem] right-0 left-0 mx-[max(0.5rem,calc(var(--inset)_-_1.25rem))] mt-4 rounded-[0.75rem] border border-hair bg-paper/90 px-6 pt-2 pb-4 backdrop-blur-[16px] ${open ? 'block' : 'hidden'}`}
          id="mobileNav"
          aria-label="Menu"
          data-menu=""
          data-open={open ? '' : undefined}
          onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}
        >
          {SECTION_LINKS.map((s) => (
            <Link key={s.id} className={mobileLink} to={`${ROUTES.home}#${s.id}`}>{s.label}</Link>
          ))}
          {/* Phones only: from md up the header has no "Become a caregiver" (it stays in the footer). */}
          <Link className={`${mobileLink} md:hidden`} to={ROUTES.become}>Become a caregiver</Link>
          <div className="grid gap-3 pt-4 md:hidden">
            <Button to={ROUTES.caregivers}>Find a caregiver</Button>
            {account ? (
              <>
                <Button variant="secondary" to={account.role === 'owner' ? ROUTES.dashboard : ROUTES.caregiverDashboard}>Dashboard</Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setOpen(false)
                    navigate(ROUTES.home, { state: { signOut: true } })
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button variant="secondary" to={ROUTES.signIn}>Sign in</Button>
            )}
          </div>
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
              <li><Link className={footerLink} to={ROUTES.signIn}>Sign in</Link></li>
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

/** Links to the sections of the home page (the ids are set on the sections themselves). */
const SECTION_LINKS = [
  { id: 'options', label: 'Care options' },
  { id: 'caregivers', label: 'Caregivers' },
  { id: 'how', label: 'How it works' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
] as const

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
        className={`${onPanel ? 'h-16' : 'h-10 md:h-12'}`}
      />
    </Link>
  )
}
