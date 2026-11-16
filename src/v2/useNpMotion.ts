import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Scroll motion of the approved design preview, ported as one hook.
 * Spring: stiffness 150, damping 40, mass 1, sampled as a CSS easing (also in np.css as --spring).
 * - Reveal: .np-rv elements fade and rise once. Elements entering in the same moment follow each other 0.15s apart (max 0.3s).
 * - Direction pairs (.np-rv-l / .np-rv-r) slide in from the side on desktop. Cards and steps get fixed steps.
 * - Photographs (.np-ph) settle from a slight zoom.
 * - The hero entrance plays from CSS, and .np-hero-done stops it from replaying.
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
    if (reduced) root.classList.add('np-has-reduced') // hides the hero Play button, as in the preview
    if (!motion) {
      q('.np-rv').forEach((e) => e.classList.add('np-in'))
      return () => root.classList.remove('np-has-reduced')
    }

    // Direction pairs and spring-matched step delays.
    q('.np-opts__media, .np-rev__text .np-rv, .np-faq2__side .np-rv, .np-end__copy').forEach((e) => e.classList.add('np-rv-l'))
    q('.np-tabs, .np-rev__photo, .np-faq2__list, .np-end__photo').forEach((e) => e.classList.add('np-rv-r'))
    const endPhoto = root.querySelector('.np-end__photo')
    if (endPhoto) endPhoto.classList.add('np-rv')
    ;[['.np-pf--a', 150], ['.np-pf--b', 300]].forEach(([selector, ms]) => {
      const e = root.querySelector<HTMLElement>(selector as string)
      if (e) e.style.transitionDelay = `${ms}ms`
    })
    q('.np-st').forEach((e, i) => { e.style.transitionDelay = `${i * 150}ms` })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        const batch = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        batch.forEach((entry, i) => {
          const target = entry.target as HTMLElement
          if (i > 0 && !target.style.transitionDelay && !target.classList.contains('np-stay2__sheet')) {
            target.style.transitionDelay = `${Math.min(i * 150, 300)}ms`
            const clear = (ev: TransitionEvent) => {
              if (ev.propertyName === 'transform') {
                target.style.transitionDelay = ''
                target.removeEventListener('transitionend', clear)
              }
            }
            target.addEventListener('transitionend', clear)
          }
          target.classList.add('np-in')
          revealObserver.unobserve(target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    q('.np-rv').forEach((e) => revealObserver.observe(e))

    // Photographs settle once.
    let photoObserver: IntersectionObserver | undefined
    if ('animate' in Element.prototype) {
      const ease = window.CSS?.supports?.('animation-timing-function', SPRING) ? SPRING : 'cubic-bezier(0.23,1,0.32,1)'
      const frames = q('.np-opts__media, .np-how__photo, .np-rev__photo, .np-faq2__photo, .np-end__photo, .np-stay2, .np-pf__img')
      frames.forEach((f) => f.classList.add('np-ph'))
      root.classList.add('np-mo')
      photoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const frame = entry.target as HTMLElement
            const stay = frame.classList.contains('np-stay2')
            Array.from(frame.querySelectorAll<HTMLElement>(stay ? '.np-stay2__bg' : 'img')).forEach((img) => {
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

    const heroDone = window.setTimeout(() => root.classList.add('np-hero-done'), 1800)

    return () => {
      revealObserver.disconnect()
      photoObserver?.disconnect()
      window.clearTimeout(heroDone)
      root.classList.remove('np-mo', 'np-hero-done', 'np-has-reduced')
    }
  }, [rootRef, resetKey])
}
