import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Scroll motion of the approved design preview, ported as one hook.
 * Spring: stiffness 150, damping 40, mass 1, sampled as a CSS easing (also in np.css as --spring).
 * - Reveal: [data-rv] elements fade and rise once ("l" and "r" slide in from the side on desktop, "fade" only fades). Elements entering in the same moment follow each other 0.15s apart (max 0.3s).
 * - Cards and steps get fixed steps (data-rv-delay).
 * - Photographs ([data-ph]) settle from a slight zoom; in the Stay room the image is [data-ph-img].
 * - The hero entrance plays from CSS, and [data-hero-done] stops it from replaying.
 * Under "reduce motion" (or without IntersectionObserver) everything is shown immediately and none of this runs.
 * It works on the DOM inside the .np root, so the elements it touches must not have a React-controlled className
 * that changes later.
 */
const SPRING = 'linear(0,0.0397,0.1176,0.2032,0.2856,0.3613,0.4298,0.4911,0.546,0.595,0.6387,0.6777,0.7125,0.7435,0.7712,0.7959,0.8179,0.8376,0.8551,0.8708,0.8847,0.8972,0.9083,0.9182,0.927,0.9349,0.9419,0.9482,0.9538,0.9588,0.9632,0.9672,0.9707,0.9739,0.9767,0.9792,0.9815,0.9835,0.9853,0.9868,0.9883,0.9895,0.9907,0.9917,1)'

export function useNpMotion(rootRef: RefObject<HTMLElement | null>, resetKey: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const q = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const motion = !reduced && 'IntersectionObserver' in window
    if (reduced) root.setAttribute('data-reduced', '') // hides the hero Play button, as in the preview
    if (!motion) {
      q('[data-rv]').forEach((e) => e.setAttribute('data-in', ''))
      return () => root.removeAttribute('data-reduced')
    }

    // Spring-matched fixed delays: cards and steps follow each other (data-rv-delay is in milliseconds).
    q('[data-rv-delay]').forEach((e) => { e.style.transitionDelay = `${e.dataset.rvDelay}ms` })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        const batch = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        batch.forEach((entry, i) => {
          const target = entry.target as HTMLElement
          if (i > 0 && !target.style.transitionDelay && target.dataset.rv !== 'fade') {
            target.style.transitionDelay = `${Math.min(i * 150, 300)}ms`
            const clear = (ev: TransitionEvent) => {
              if (ev.propertyName === 'transform') {
                target.style.transitionDelay = ''
                target.removeEventListener('transitionend', clear)
              }
            }
            target.addEventListener('transitionend', clear)
          }
          target.setAttribute('data-in', '')
          revealObserver.unobserve(target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    q('[data-rv]').forEach((e) => revealObserver.observe(e))

    // Photographs settle once.
    let photoObserver: IntersectionObserver | undefined
    if ('animate' in Element.prototype) {
      const ease = window.CSS?.supports?.('animation-timing-function', SPRING) ? SPRING : 'cubic-bezier(0.23,1,0.32,1)'
      const frames = q('[data-ph]')
      root.setAttribute('data-mo', '')
      photoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const frame = entry.target as HTMLElement
            const stay = frame.dataset.ph === 'stay'
            Array.from(frame.querySelectorAll<HTMLElement>(stay ? '[data-ph-img]' : 'img')).forEach((img) => {
              img.animate(
                stay ? [{ transform: 'translateY(-8%) scale(1.2)' }, { transform: 'none' }] : [{ scale: 1.15 }, { scale: 1 }],
                { duration: 800, easing: ease },
              )
            })
            photoObserver?.unobserve(frame)
          })
        },
        { threshold: 0.15 },
      )
      frames.forEach((f) => photoObserver?.observe(f))
    }

    const heroDone = window.setTimeout(() => root.setAttribute('data-hero-done', ''), 1800)

    return () => {
      revealObserver.disconnect()
      photoObserver?.disconnect()
      window.clearTimeout(heroDone)
      root.removeAttribute('data-mo')
      root.removeAttribute('data-hero-done')
      root.removeAttribute('data-reduced')
    }
  }, [rootRef, resetKey])
}
