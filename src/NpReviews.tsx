import { useEffect, useState } from 'react'
import { ArrowButton } from './ui/ArrowButton'
import { Eyebrow } from './ui/Eyebrow'

interface SampleReview {
  quote: string
  by: string
  about: string
  /** A stock portrait of the (invented) reviewer, shown small beside the name. */
  person: { src: string; position: string }
  photo: { src: string; alt: string; width: number; height: number; position: string }
}

/** Three invented reviews, copy and crops from the approved preview. They are not from real people. */
const REVIEWS: SampleReview[] = [
  {
    quote: 'He followed our dog’s feeding routine to the letter.',
    by: 'Illustrative owner',
    about: 'About Noah',
    person: { src: '/img/person-reviewer.jpg', position: '50% 50%' },
    photo: { src: '/img/rev-1.jpg', alt: 'A brown and white dog on a beach (stock photo)', width: 1200, height: 800, position: '62% 50%' },
  },
  {
    quote: 'A real home, not a kennel. We were so relieved.',
    by: 'Illustrative owner',
    about: 'About Sam',
    person: { src: '/img/person-jordan.jpg', position: '50% 40%' },
    photo: { src: '/img/rev-2.jpg', alt: 'A golden puppy wearing a red collar (stock photo)', width: 1200, height: 800, position: '8% 50%' },
  },
  {
    quote: 'Our shy cat was relaxed on day one.',
    by: 'Illustrative owner',
    about: 'About Leo',
    person: { src: '/img/person-alex.jpg', position: '80% 40%' },
    photo: { src: '/img/rev-3.jpg', alt: 'A tabby cat peeking out from under a blanket (stock photo)', width: 1200, height: 750, position: '50% 50%' },
  },
]

const pad = (n: number) => (n < 10 ? '0' : '') + n

/**
 * Reviews, from the approved preview: a large quotation with arrows beside a tall photograph that changes with it.
 * The quote rises in again whenever the review changes (and once on load, as in the preview); the arrows wrap around.
 */
export function NpReviews() {
  const count = REVIEWS.length
  const [index, setIndex] = useState(0)
  const review = REVIEWS[index]!

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.getElementById('quote')?.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], {
      duration: 420,
      easing: 'cubic-bezier(0.23,1,0.32,1)',
    })
  }, [index])

  const show = (n: number) => setIndex((n + count) % count)

  return (
    <section className="overflow-hidden bg-paper py-(--section)" id="reviews" aria-labelledby="rev-h">
      <div className="mx-auto grid max-w-360 gap-12 px-(--inset) md:grid-cols-[7fr_5fr] md:items-center md:gap-[clamp(3rem,7vw,8rem)]">
        <div>
          <Eyebrow data-rv="l">Illustrative reviews</Eyebrow>
          <h2 id="rev-h" className="text-section" data-rv="l">What owners might say.</h2>
          <div data-rv="l" id="reviewBox">
            <span className="mt-5 mb-2 block h-[0.5em] overflow-visible font-slab text-[clamp(8rem,17vw,16rem)] leading-none font-light text-accent" aria-hidden="true">&ldquo;</span>
            <blockquote className="min-h-[4.8em] font-slab text-[clamp(1.75rem,1rem+2.8vw,3.5rem)] leading-[1.2] font-light tracking-tight text-ink" id="quote">{review.quote}</blockquote>
            <div className="mt-6 flex items-center gap-4">
              <img
                className="size-14 shrink-0 rounded-full object-cover"
                src={review.person.src}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                style={{ objectPosition: review.person.position }}
              />
              <p className="font-sans text-ui/[1.5] font-medium text-ink" id="quoteBy">
                {review.by}
                <span className="block text-caption font-normal text-muted">{`${review.about} · sample review`}</span>
              </p>
            </div>
            <div className="mt-7 mb-8 -ml-3 flex items-center gap-1">
              <ArrowButton direction="prev" id="revPrev" aria-label="Previous review" onClick={() => show(index - 1)} />
              <ArrowButton direction="next" id="revNext" aria-label="Next review" onClick={() => show(index + 1)} />
            </div>
            <p className="max-w-[24rem] font-sans text-caption text-muted">
              Invented quotes that show how reviews would look. They are not from real people.
            </p>
          </div>
        </div>
        <figure className="relative m-0 aspect-[4/5] overflow-hidden bg-panel md:mr-[calc(var(--inset)*-1)]" id="revPhoto" data-rv="r" data-ph="">
          {REVIEWS.map((r, k) => (
            <img
              key={r.photo.src}
              className={`absolute inset-0 size-full object-cover transition-opacity duration-600 ease-out ${k === index ? 'opacity-100' : 'opacity-0'}`}
              src={r.photo.src}
              alt={r.photo.alt}
              width={r.photo.width}
              height={r.photo.height}
              loading="lazy"
              aria-hidden={k === index ? 'false' : 'true'}
              style={{ objectPosition: r.photo.position }}
            />
          ))}
          <figcaption className="absolute bottom-0 left-0 z-2 bg-accent px-6 py-4 text-ink">
            <span className="font-slab text-[1.75rem] leading-none font-medium text-ink tabular-nums" id="revCount" aria-hidden="true">
              {`${pad(index + 1)} `}
              <small className="font-sans text-[0.875rem] leading-none font-normal text-ink normal-nums">{`/ ${pad(count)}`}</small>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
