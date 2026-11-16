import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { HERO_SLIDES } from './heroData'

const AUTOPLAY_MS = 6000
const pad = (n: number) => (n < 10 ? '0' : '') + n

/**
 * Hero of the approved preview: one dominant photograph, a peek card for the next stay, a vertical pager and thin arrows.
 * Behaviour is the preview's: autoplay is off until Play is pressed (6s), it pauses while the pointer is over the hero,
 * Left/Right keys, a 50px swipe on the photograph, the peek card and the arrows all move it, and a live region announces changes.
 * The entrance animation is plain CSS (np.css); the keyword and pet-detail swap uses the Web Animations API.
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
      className="np-hero"
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
      <div className="np-hero__panel-bg" aria-hidden="true" />

      <div
        className="np-hero__photo"
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
            className={k === index ? 'np-is-on' : undefined}
            src={s.src}
            alt={k === index ? `${s.alt} (stock photo)` : ''}
            width={1400}
            height={1000}
            style={{ ['--px' as string]: s.px, ['--py' as string]: s.py } as CSSProperties}
          />
        ))}
      </div>

      <ul className="np-hero__keywords" id="heroKeywords" ref={keywords} aria-label="About this pet">
        {slide.words.map((w) => <li key={w}>{w}</li>)}
      </ul>

      <Link className="np-cta" to="/caregivers">
        <span>Find a caregiver</span>
        <svg viewBox="0 0 60 24" aria-hidden="true"><path d="M2 12h54M46 3l10 9-10 9" /></svg>
      </Link>

      <div className="np-hero__main">
        <h1>Care, <br />close to <br />home.</h1>
        <span className="np-rule" aria-hidden="true" />
        <p className="np-hero__text">
          NearPaws helps you find a caregiver, see where your pet will stay, and share their routine before the first day. Care at
          their home or yours.
        </p>
        <div className="np-hero__meta" ref={meta}>
          <strong id="metaName">{slide.name}</strong>
          <span className="np-caption" id="metaPlace">{slide.place}</span>
          <p className="np-hero__facts" id="metaFacts">{slide.facts}</p>
        </div>
      </div>

      <div className="np-hero__peek" id="peek" aria-hidden="true" onClick={() => go(index + 1)}>
        <img id="peekImg" src={next.src} alt="" width={260} height={320} />
        <span><b id="peekNum">{pad(((index + 1) % count) + 1)}</b><i id="peekName" style={{ fontStyle: 'normal' }}>{next.name}</i></span>
      </div>

      <div className="np-hero__controls">
        <div className="np-arrows">
          <button className="np-arrow np-arrow--next" type="button" id="next" aria-label="Next sample stay" onClick={() => go(index + 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" /></svg>
          </button>
          <button className="np-arrow np-arrow--prev" type="button" id="prev" aria-label="Previous sample stay" onClick={() => go(index - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4-8 8 8 8" /></svg>
          </button>
        </div>
        <div className="np-hero__side">
          <div className="np-pager" id="pager" role="group" aria-label="Choose a sample stay">
            {HERO_SLIDES.map((s, k) => (
              <button
                key={s.name}
                type="button"
                aria-label={`Show sample stay ${k + 1}: ${s.name}`}
                aria-current={k === index ? 'true' : 'false'}
                onClick={() => go(k)}
              >
                {k + 1}
              </button>
            ))}
          </div>
          <button className="np-play" type="button" id="play" aria-pressed={playing} onClick={() => setPlaying((p) => !p)}>
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <p className="np-vh" id="live" aria-live="polite">{announcement}</p>
    </section>
  )
}
