import { ROUTES } from './routes'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'

const FACTS = [
  { term: 'The care space', text: 'See where your pet will sleep, play and rest, plus garden or outdoor access.' },
  { term: 'The caregiver', text: 'Read about their experience, care style and how often they send updates.' },
  { term: 'The house rules', text: 'Know about guests, other pets, alone time and how medication is handled.' },
  { term: 'The neighborhood', text: 'Only an approximate area is shown. Exact addresses stay private until a stay is agreed.' },
]

/**
 * "Know before you go", from the approved preview: a full-bleed room with a dark glass panel at the bottom left that
 * holds the heading, the four facts and the button, and a tan note under it. The photograph settles from 1.2x and the
 * panel only fades in (see useNpMotion and the Get Started pattern in np.css). The id "become" is the preview's anchor.
 */
export function NpStay() {
  return (
    <section
      className="relative bg-panel md:flex md:min-h-[clamp(46rem,62vw,64rem)] md:items-end md:justify-start md:px-(--inset) md:py-[clamp(4rem,7vw,7rem)]"
      id="become"
      data-ph="stay"
      aria-labelledby="stay-h"
    >
      <img
        className="block aspect-[4/3] h-auto w-full object-cover object-[50%_62%] md:absolute md:inset-0 md:aspect-auto md:size-full md:object-[50%_58%]"
        data-ph-img=""
        src="/img/stay-big.jpg"
        alt="A calm living room with a grey sofa and a knitted throw (stock photo)"
        width={2000}
        height={3000}
        loading="lazy"
      />
      <figure className="hidden md:absolute md:right-(--inset) md:bottom-[clamp(2.5rem,5vw,4.5rem)] md:z-2 md:m-0 md:block md:aspect-[4/5] md:w-[min(21vw,18rem)] md:bg-paper md:p-2.5" aria-hidden="true">
        <img className="size-full object-cover" src="/img/home-chair.jpg" alt="" width={900} height={1125} loading="lazy" />
      </figure>
      <div className="relative z-2 md:w-[min(48%,45rem)]">
        <div
          className="bg-ink px-(--inset) py-[clamp(2.5rem,6vw,4rem)] text-paper md:bg-ink/62 md:p-[clamp(2.5rem,4vw,3.5rem)] md:backdrop-blur-[22px] md:not-supports-[backdrop-filter:blur(1px)]:bg-ink/90"
          data-rv="fade"
        >
          <Eyebrow className="inline-block bg-paper px-[0.85rem] py-[0.45rem] text-ink! mb-6! before:hidden!">Know before you go</Eyebrow>
          <h2 id="stay-h" className="mb-6 text-section text-paper">Know where your pet will stay, and with whom.</h2>
          <p className="text-lead text-paper/88">Every profile answers the questions owners usually ask first.</p>
          <dl className="mt-9 mb-10 md:mt-8 md:mb-9 md:grid md:grid-cols-2 md:gap-x-8">
            {FACTS.map((f, k) => (
              <div
                key={f.term}
                className={`grid gap-x-6 gap-y-1 border-t border-paper/24 py-[1.15rem] sm:grid-cols-[10rem_1fr] md:grid-cols-1 ${k === FACTS.length - 1 ? 'border-b' : ''} ${k === FACTS.length - 2 ? 'md:border-b' : ''}`}
              >
                <dt className="font-sans text-label font-semibold tracking-label text-accent uppercase">{f.term}</dt>
                <dd className="text-[0.9375rem]/[1.55] text-paper/86">{f.text}</dd>
              </div>
            ))}
          </dl>
          <Button className="group" to={ROUTES.caregiver('mara')}>
            {'See a sample profile '}
            <svg
              width="36"
              height="14"
              className="fill-none stroke-current stroke-[1.25] transition-transform duration-300 ease-out group-hover:translate-x-[0.35rem]"
              viewBox="0 0 36 16"
              aria-hidden="true"
            >
              <path d="M1 8h32M26 2l7 6-7 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
        <p
          className="bg-accent px-(--inset) py-6 font-sans text-[0.9375rem]/[1.6] font-medium text-ink md:px-[clamp(2.5rem,4vw,3.5rem)]"
          data-after-reveal=""
        >
          Only an approximate neighborhood is ever shown. Exact addresses stay private until a stay is agreed.
        </p>
      </div>
    </section>
  )
}
