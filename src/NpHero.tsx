import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from './routes'
import { HERO_SLIDES } from './heroData'
import { ArrowButton } from './ui/ArrowButton'

const AUTOPLAY_MS = 6000
const pad = (n: number) => (n < 10 ? '0' : '') + n

/**
 * Hero of the approved preview: one dominant photograph, a peek card for the next stay, a vertical pager and thin arrows.
 * Behaviour is the preview's: autoplay is off until Play is pressed (6s), it pauses while the pointer is over the hero,
 * Left/Right keys, a 50px swipe on the photograph, the peek card and the arrows all move it, and a live region announces changes.
 * The entrance animation is plain CSS (data-enter in motion.css); the keyword and pet-detail swap uses the Web Animations API.
 */
export function NpHero() {
  const count = HERO_SLIDES.length
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [held, setHeld] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const indexRef = useRef(0)
  const dragStart = useRef<number | null>(null)
  const keywords = useRef<HTMLUListElement>(null)
  const meta = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const go = useCallback(
    (n: number) => {
      const next = (n + count) % count
      indexRef.current = next
      setIndex(next)
      setAnnouncement(`Showing ${HERO_SLIDES[next]!.name}. ${HERO_SLIDES[next]!.place}`)
    },
    [count],
  )

  // Autoplay: off by default, paused while the pointer is over the hero.
  useEffect(() => {
    if (!playing || held) return
    const timer = window.setInterval(() => go(indexRef.current + 1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [playing, held, go])

  // The keywords and the pet details rise in again whenever the stay changes (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    ;[keywords.current, meta.current].forEach((el) =>
      el?.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], {
        duration: 420,
        easing: 'cubic-bezier(0.23,1,0.32,1)',
      }),
    )
  }, [index])

  const slide = HERO_SLIDES[index]!
  const next = HERO_SLIDES[(index + 1) % count]!

  return (
    <section
      className="relative isolate flex min-h-[calc(100*var(--svh)_-_var(--chrome-h))] flex-col bg-paper pb-[calc(1rem+env(safe-area-inset-bottom,0px))] composed:block composed:h-[max(var(--hero-min),calc(100*var(--svh)_-_var(--chrome-h)))] composed:min-h-0 composed:pb-0 composed:[container-name:hero] composed:[container-type:size]"
      id="top"
      aria-roledescription="carousel"
      aria-label="Sample stays"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        else if (e.key === 'ArrowLeft') go(index - 1)
      }}
    >
      <div
        className={`hidden composed:absolute composed:inset-y-0 composed:left-0 composed:z-0 composed:block composed:w-[49%] composed:bg-panel ${ENTER.panel}`}
        data-enter=""
        aria-hidden="true"
      />

      <div
        className={`relative order-1 min-h-[clamp(9rem,calc(24*var(--svh)),28rem)] flex-auto overflow-hidden bg-panel composed:absolute composed:top-[4%] composed:bottom-0 composed:left-[12%] composed:z-2 composed:h-auto composed:min-h-0 composed:w-[35%] composed:overflow-visible composed:bg-transparent composed:[-webkit-mask-composite:source-in,source-in] composed:[-webkit-mask-image:linear-gradient(to_bottom,transparent_0,#000_24%),linear-gradient(to_right,transparent_0,#000_30%),linear-gradient(to_left,transparent_0,#000_9%)] composed:[mask-composite:intersect,intersect] composed:[mask-image:linear-gradient(to_bottom,transparent_0,#000_24%),linear-gradient(to_right,transparent_0,#000_30%),linear-gradient(to_left,transparent_0,#000_9%)] ${ENTER.photo}`}
        data-enter=""
        id="heroPhoto"
        onPointerDown={(e) => { dragStart.current = e.clientX }}
        onPointerUp={(e) => {
          if (dragStart.current === null) return
          const delta = e.clientX - dragStart.current
          dragStart.current = null
          if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1))
        }}
      >
        {HERO_SLIDES.map((s, k) => (
          <img
            key={s.src}
            className={`absolute inset-0 size-full [object-position:50%_var(--py,30%)] object-cover transition-opacity duration-550 ease-out motion-reduce:transition-none composed:[object-position:var(--px,64%)_var(--py,30%)] ${k === index ? 'opacity-100' : 'opacity-0'}`}
            src={s.src}
            alt={k === index ? `${s.alt} (stock photo)` : ''}
            width={1400}
            height={1000}
            style={{ ['--px' as string]: s.px, ['--py' as string]: s.py } as CSSProperties}
          />
        ))}
      </div>

      <ul
        className={`order-3 flex flex-wrap gap-x-[0.9rem] px-(--inset) pt-[0.875rem] font-sans text-[clamp(1.125rem,calc(3.3*var(--svh)),1.5rem)]/[1.3] font-medium tracking-[-0.005em] text-ink composed:absolute composed:bottom-[calc(26%_-_0.65em)] composed:left-(--inset) composed:z-4 composed:block composed:p-0 composed:text-[clamp(1.5rem,min(3.5cqw,7.3cqh),3.25rem)] ${ENTER.rise}`}
        data-enter=""
        id="heroKeywords"
        ref={keywords}
        aria-label="About this pet"
      >
        {slide.words.map((w) => <li key={w} className="block">{w}</li>)}
      </ul>

      <Link
        className={`group order-4 mx-(--inset) mt-[0.875rem] flex min-h-14 items-center justify-between gap-6 bg-accent px-5 py-3 font-sans text-body/[1.4] font-medium text-ink no-underline composed:absolute composed:bottom-0 composed:left-0 composed:z-1 composed:m-0 composed:h-[26%] composed:min-h-0 composed:w-[max(18.4%,13.5rem)] composed:flex-col composed:items-start composed:justify-between composed:pt-[clamp(1.25rem,7.5cqh,3.25rem)] composed:pr-(--inset) composed:pb-[clamp(1rem,4cqh,1.75rem)] composed:pl-(--inset) ${ENTER.cta}`}
        data-enter=""
        to={ROUTES.caregivers}
      >
        <span>Find a caregiver</span>
        <svg
          viewBox="0 0 60 24"
          aria-hidden="true"
          className="h-5 w-[3.25rem] flex-none fill-none stroke-ink stroke-[1.5] transition-transform duration-350 ease-out group-hover:translate-x-2 composed:h-8 composed:w-20"
        >
          <path d="M2 12h54M46 3l10 9-10 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div className="order-2 px-(--inset) pt-5 pb-0 composed:absolute composed:top-[6%] composed:right-[calc(var(--inset)+3.5rem)] composed:left-[47.5%] composed:z-3 composed:p-0">
        <h1
          className={`mb-3 text-[clamp(2.25rem,min(11.5vw,calc(5.8*var(--svh))),5.5rem)] leading-[0.98] composed:mb-[clamp(0.75rem,2.2cqh,1.5rem)] composed:text-[clamp(2.75rem,min(8.33cqw,17.4cqh),8.5rem)] ${ENTER.title}`}
          data-enter=""
        >
          Care, <br className="stacked:hidden" />close to <br className="stacked:hidden" />home.
        </h1>
        <span
          className={`mb-[0.875rem] block h-0.5 w-22 origin-left border-0 bg-accent composed:mb-[clamp(0.75rem,2.2cqh,1.5rem)] ${ENTER.rule}`}
          data-enter=""
          aria-hidden="true"
        />
        <p
          className={`max-w-[32rem] text-[0.875rem] leading-[1.7] composed:ml-[9vw] composed:max-w-[min(23vw,24rem)] composed:text-[clamp(0.8125rem,2.15cqh,0.9375rem)] composed:leading-[1.85] ${ENTER.text}`}
          data-enter=""
        >
          NearPaws helps you find a caregiver, see where your pet will stay, and share their routine before the first day. Care at
          their home or yours.
        </p>
        <div
          className={`mt-[0.875rem] composed:mt-[clamp(0.75rem,2.2cqh,1.5rem)] composed:ml-[9vw] composed:max-w-[min(23vw,24rem)] hero-tiny:hidden ${ENTER.rise}`}
          data-enter=""
          ref={meta}
        >
          <strong className="mb-[0.15rem] block font-slab text-[1.25rem]/[1.2] font-medium text-accent-ink composed:text-[clamp(1.125rem,2.6cqh,1.5rem)]" id="metaName">{slide.name}</strong>
          <span className="block font-sans text-caption text-muted" id="metaPlace">{slide.place}</span>
          <p className="mt-[0.35rem] font-sans text-[0.8125rem]/[1.6] font-medium text-ink [@media(max-height:760px)]:hidden composed:block hero-short:hidden" id="metaFacts">{slide.facts}</p>
        </div>
      </div>

      <div
        className={`group hidden composed:absolute composed:right-0 composed:bottom-0 composed:z-3 composed:grid composed:h-[40%] composed:w-[19%] composed:cursor-pointer composed:grid-cols-[42%_58%] composed:overflow-hidden composed:bg-panel composed:text-left ${ENTER.peek}`}
        data-enter=""
        id="peek"
        aria-hidden="true"
        onClick={() => go(index + 1)}
      >
        <img
          className="absolute top-0 right-0 h-full w-[60%] object-cover object-[60%_30%] transition-transform duration-800 ease-out group-hover:scale-[1.04]"
          id="peekImg"
          src={next.src}
          alt=""
          width={260}
          height={320}
        />
        <span className="relative self-end pb-5 pl-5 font-slab text-[clamp(0.8125rem,1.18cqw,1.0625rem)]/[1.2] font-medium text-accent-ink">
          <b className="mb-[0.35rem] block font-slab text-[clamp(1.25rem,2.43cqw,1.75rem)]/none font-medium" id="peekNum">{pad(((index + 1) % count) + 1)}</b>
          <i className="not-italic" id="peekName">{next.name}</i>
        </span>
      </div>

      <div
        className={`order-5 flex flex-wrap items-center gap-x-4 gap-y-3 px-(--inset) pt-[0.875rem] composed:contents ${ENTER.fade}`}
        data-enter=""
      >
        <div className="flex composed:absolute composed:top-[calc(60%_+_0.75rem)] composed:right-[calc(19%_-_3.9rem)] composed:z-4 composed:flex-col">
          <ArrowButton direction="next" id="next" aria-label="Next sample stay" onClick={() => go(index + 1)} />
          <ArrowButton direction="prev" id="prev" aria-label="Previous sample stay" onClick={() => go(index - 1)} />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 composed:absolute composed:top-[6%] composed:right-[calc(var(--inset)_-_0.75rem)] composed:z-3 composed:h-[54%] composed:flex-col composed:items-center composed:justify-center composed:gap-0">
          <div className="flex items-center composed:flex-col" id="pager" role="group" aria-label="Choose a sample stay">
            {HERO_SLIDES.map((s, k) => (
              <button
                key={s.name}
                className={PAGER_BUTTON}
                type="button"
                aria-label={`Show sample stay ${k + 1}: ${s.name}`}
                aria-current={k === index ? 'true' : 'false'}
                onClick={() => go(k)}
              >
                {k + 1}
              </button>
            ))}
          </div>
          <button
            className="min-h-11 px-1 py-3 font-sans text-[0.8125rem]/[1.4] font-medium text-ink underline decoration-accent decoration-2 underline-offset-[0.3em] group-data-[reduced]/np:hidden"
            type="button"
            id="play"
            aria-pressed={playing}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <p className="sr-only" id="live" aria-live="polite">{announcement}</p>
    </section>
  )
}

/** Entrance animation of each hero part (see data-enter in motion.css): which keyframes, how long, how late, how far it rises. */
const ENTER = {
  panel: '[--enter-name:m-fade] [--enter-dur:0.6s]',
  photo: '[--enter-name:m-fade] [--enter-dur:0.9s]',
  title: '[--enter-name:m-rise] [--enter-dur:0.8s] [--enter-delay:0.12s] [--m-y:22px]',
  text: '[--enter-name:m-rise] [--enter-dur:0.7s] [--enter-delay:0.3s] [--m-y:12px]',
  rule: '[--enter-name:m-rule] [--enter-dur:0.7s] [--enter-delay:0.38s]',
  rise: '[--enter-name:m-rise] [--enter-dur:0.6s] [--enter-delay:0.46s] [--m-y:8px]',
  cta: '[--enter-name:m-rise] [--enter-dur:0.6s] [--enter-delay:0.56s] [--m-y:8px]',
  peek: '[--enter-name:m-rise] [--enter-dur:0.7s] [--enter-delay:0.64s] [--m-y:10px]',
  fade: '[--enter-name:m-fade] [--enter-dur:0.6s] [--enter-delay:0.72s]',
} as const

/** Pager number: the current one is replaced by a thin ring with a dot in its middle. */
const PAGER_BUTTON =
  "relative grid size-11 place-items-center font-sans text-[0.8125rem]/none font-medium text-copy aria-[current=true]:text-transparent " +
  "aria-[current=true]:before:absolute aria-[current=true]:before:top-1/2 aria-[current=true]:before:left-1/2 aria-[current=true]:before:-mt-3.5 aria-[current=true]:before:-ml-3.5 aria-[current=true]:before:size-7 aria-[current=true]:before:rounded-full aria-[current=true]:before:border aria-[current=true]:before:border-ink aria-[current=true]:before:content-[''] " +
  "aria-[current=true]:after:absolute aria-[current=true]:after:top-1/2 aria-[current=true]:after:left-1/2 aria-[current=true]:after:-mt-[2.5px] aria-[current=true]:after:-ml-[2.5px] aria-[current=true]:after:size-[5px] aria-[current=true]:after:rounded-full aria-[current=true]:after:bg-ink aria-[current=true]:after:content-['']"
