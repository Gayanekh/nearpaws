import { Link } from 'react-router-dom'
import { Eyebrow } from './ui/Eyebrow'
import { ROUTES } from './routes'

/**
 * Closing section of the approved preview: a call to action on the left, a photograph on the right and the tan
 * "Find a caregiver" block anchored between them. Copy slides in from the left, the photograph from the right.
 */
export function NpEnd() {
  return (
    <section
      className="relative grid bg-paper group-data-[mo]/np:overflow-x-clip md:min-h-[clamp(36rem,46vw,48rem)] md:grid-cols-[55%_45%]"
      aria-labelledby="close-h"
      data-clip=""
    >
      <div className="px-(--inset) pt-[clamp(4rem,9vw,7rem)] pb-12 md:flex md:flex-col md:justify-center md:py-(--section)" data-rv="l">
        <Eyebrow>Ready when you are</Eyebrow>
        <h2 id="close-h" className="mb-7 max-w-[11ch] text-section leading-[0.98]">See who could care for your pet.</h2>
        <p className="max-w-[28rem]">Browse sample caregivers, then try the request form. It is a prototype, so nothing is sent.</p>
      </div>
      <figure className="relative m-0 aspect-[4/3] overflow-hidden bg-panel md:aspect-auto md:h-full" data-rv="r" data-ph="">
        <img
          className="absolute inset-0 size-full object-cover"
          src="/img/end-pair.jpg"
          alt="A cat and a dog resting together on grass (stock photo)"
          width={1800}
          height={1059}
          loading="lazy"
          style={{ objectPosition: '50% 45%' }}
        />
      </figure>
      <Link
        className="group flex min-h-18 items-center justify-between gap-6 bg-accent px-(--inset) py-5 font-sans text-body leading-[1.4] font-medium text-ink no-underline md:absolute md:bottom-0 md:left-[45.5%] md:z-3 md:h-[26%] md:min-h-0 md:w-[max(19%,14rem)] md:flex-col md:items-start md:justify-between md:px-6 md:pt-[clamp(1.25rem,3vw,2.5rem)] md:pb-6"
        to={ROUTES.caregivers}
      >
        <span>Find a caregiver</span>
        <svg
          viewBox="0 0 60 24"
          aria-hidden="true"
          className="h-6 w-15 flex-none fill-none stroke-ink stroke-[1.5] transition-transform duration-350 ease-out group-hover:translate-x-2 md:h-8 md:w-20"
        >
          <path d="M2 12h54M46 3l10 9-10 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  )
}
