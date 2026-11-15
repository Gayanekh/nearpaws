import type { Service } from '../types'
import { Icon } from './Icon'

interface ServiceCardProps {
  service: Service
  tone?: 'green' | 'blue' | 'orange'
}

/** Colored card for one care option. White text on each tone meets contrast guidance. */
export function ServiceCard({ service, tone = 'green' }: ServiceCardProps) {
  return (
    <article className={`card service-card service-card--${tone}`}>
      <span className="service-card__icon">
        <Icon name={service.icon} size={26} />
      </span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <p className="service-card__detail">{service.detail}</p>
    </article>
  )
}
