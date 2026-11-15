import { useCallback, useEffect, useRef, useState } from 'react'
import { SLIDER_PETS, unsplashUrl } from '../data/photos'

const AUTOPLAY_MS = 5000

/** Shortest signed distance from the active slide, so the loop wraps in both directions. */
function offsetFrom(index: number, active: number, count: number): number {
  return ((index - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2)
}

/**
 * Fanned card carousel: the active pet sits in the middle, neighbors tilt away on each side.
 * Arrow buttons, dots, side-card clicks, swipe and the left/right keys all move it.
 * Autoplay has a visible pause button, stops on hover/focus, and never starts with "reduce motion".
 */
export function HeroSlider() {
  const count = SLIDER_PETS.length
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [held, setHeld] = useState(false)
  const dragStart = useRef<number | null>(null)

  const go = useCallback((next: number) => setActive(((next % count) + count) % count), [count])


  useEffect(() => {
    if (!playing || held) return
    const timer = window.setInterval(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [playing, held, count])

  const current = SLIDER_PETS[active]!

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sample pets and the care they might get"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(active + 1)
        if (e.key === 'ArrowLeft') go(active - 1)
      }}
    >
      <div
        className="slider__stage"
        onPointerDown={(e) => { dragStart.current = e.clientX }}
        onPointerUp={(e) => {
          if (dragStart.current === null) return
          const delta = e.clientX - dragStart.current
          dragStart.current = null
          if (Math.abs(delta) > 50) go(active + (delta < 0 ? 1 : -1))
        }}
        aria-live={playing && !held ? 'off' : 'polite'}
      >
        {SLIDER_PETS.map((pet, i) => {
          const d = offsetFrom(i, active, count)
          const visible = Math.abs(d) <= 2
          return (
            <figure
              key={pet.name}
              className={`slide slide--${pet.tone} ${d === 0 ? 'is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={d === 0 ? undefined : true}
              style={{
                ['--d' as string]: d,
                ['--abs' as string]: Math.abs(d),
                zIndex: 10 - Math.abs(d),
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
              }}
              onClick={() => d !== 0 && go(i)}
            >
              <img
                src={unsplashUrl(pet.photo.id, 640)}
                alt={d === 0 ? `${pet.photo.alt} (stock photo)` : ''}
                width={320}
                height={400}
                loading="eager"
                decoding="async"
                draggable={false}
              />
              <figcaption className="slide__tag">{pet.name} · sample pet</figcaption>
            </figure>
          )
        })}
      </div>

      <div className="slider__caption" aria-live="polite">
        <strong>{current.name}</strong>
        <span>{current.note}</span>
      </div>

      <div className="slider__controls">
        <button type="button" className="icon-btn" onClick={() => go(active - 1)} aria-label="Previous pet">←</button>
        <ul className="slider__dots">
          {SLIDER_PETS.map((pet, i) => (
            <li key={pet.name}>
              <button
                type="button"
                className={i === active ? 'is-on' : ''}
                aria-label={`Show ${pet.name}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ul>
        <button type="button" className="icon-btn" onClick={() => go(active + 1)} aria-label="Next pet">→</button>
        <button type="button" className="slider__play" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}
