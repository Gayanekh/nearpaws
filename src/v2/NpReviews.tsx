import { useEffect, useState } from 'react'

interface SampleReview {
  quote: string
  by: string
  about: string
  photo: { src: string; alt: string; width: number; height: number; position: string }
}

/** Three invented reviews, copy and crops from the approved preview. They are not from real people. */
const REVIEWS: SampleReview[] = [
  {
    quote: 'She followed our dog’s feeding routine to the letter.',
    by: 'Illustrative owner',
    about: 'About Mara',
    photo: { src: '/img/rev-1.jpg', alt: 'A brown and white dog on a beach (stock photo)', width: 1200, height: 800, position: '62% 50%' },
  },
  {
    quote: 'A real home, not a kennel. We were so relieved.',
    by: 'Illustrative owner',
    about: 'About Sam',
    photo: { src: '/img/rev-2.jpg', alt: 'A golden puppy wearing a red collar (stock photo)', width: 1200, height: 800, position: '8% 50%' },
  },
  {
    quote: 'Our shy cat was relaxed on day one.',
    by: 'Illustrative owner',
    about: 'About Elena',
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
    <section className="np-rev" aria-labelledby="rev-h">
      <div className="np-rev__grid">
        <div className="np-rev__text">
          <p className="np-eyebrow" data-rv="l">Illustrative reviews</p>
          <h2 id="rev-h" className="np-h-lg" data-rv="l">What owners might say.</h2>
          <div data-rv="l" id="reviewBox">
            <span className="np-rev__mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="np-quote" id="quote">{review.quote}</blockquote>
            <p className="np-quote-by" id="quoteBy">
              {review.by}
              <span>{`${review.about} · sample review`}</span>
            </p>
            <div className="np-reviews__ctrl">
              <button className="np-arrow np-arrow--prev" type="button" id="revPrev" aria-label="Previous review" onClick={() => show(index - 1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4-8 8 8 8" /></svg>
              </button>
              <button className="np-arrow np-arrow--next" type="button" id="revNext" aria-label="Next review" onClick={() => show(index + 1)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" /></svg>
              </button>
            </div>
            <p className="np-caption" style={{ maxWidth: '24rem' }}>
              Invented quotes that show how reviews would look. They are not from real people.
            </p>
          </div>
        </div>
        <figure className="np-rev__photo" id="revPhoto" data-rv="r" data-ph="">
          {REVIEWS.map((r, k) => (
            <img
              key={r.photo.src}
              className={k === index ? 'np-is-on' : undefined}
              src={r.photo.src}
              alt={r.photo.alt}
              width={r.photo.width}
              height={r.photo.height}
              loading="lazy"
              aria-hidden={k === index ? 'false' : 'true'}
              style={{ objectPosition: r.photo.position }}
            />
          ))}
          <figcaption className="np-rev__tag">
            <span className="np-reviews__count" id="revCount" aria-hidden="true">
              {`${pad(index + 1)} `}
              <small>{`/ ${pad(count)}`}</small>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
