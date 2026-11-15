import type { Review } from '../types'

interface ReviewCardProps {
  review: Review
  caregiverName: string
}

export function ReviewCard({ review, caregiverName }: ReviewCardProps) {
  return (
    <figure className="review-card">
      <blockquote>“{review.quote}”</blockquote>
      <figcaption>
        <strong>{review.author}</strong>
        <span>About {caregiverName} · sample review</span>
      </figcaption>
    </figure>
  )
}
