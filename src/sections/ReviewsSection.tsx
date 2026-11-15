import { useRef } from 'react'
import { CAREGIVERS } from '../data/content'
import { Container } from '../components/Container'
import { ReviewCard } from '../components/ReviewCard'
import { SectionHeading } from '../components/SectionHeading'

export function ReviewsSection() {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (direction: 1 | -1) =>
    track.current?.scrollBy({ left: direction * Math.min(track.current.clientWidth * 0.8, 440), behavior: 'smooth' })

  return (
    <section className="section" aria-labelledby="reviews-title">
      <Container>
        <div className="reviews__head">
          <SectionHeading
            id="reviews-title"
            eyebrow="Sample reviews"
            title="What owners might say"
            description="Invented quotes that show how reviews would look. They are not from real people."
          />
          <div className="reviews__nav">
            <button type="button" className="icon-btn" onClick={() => scroll(-1)} aria-label="Previous reviews">←</button>
            <button type="button" className="icon-btn" onClick={() => scroll(1)} aria-label="Next reviews">→</button>
          </div>
        </div>
      </Container>
      <div className="reviews__track" ref={track} tabIndex={0} role="region" aria-label="Sample reviews, scrollable">
        {CAREGIVERS.map((c) => <ReviewCard key={c.id} review={c.review} caregiverName={c.name} />)}
      </div>
    </section>
  )
}
