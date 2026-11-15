import type { IconName } from './Icon'
import { Icon } from './Icon'

interface TrustPointProps {
  title: string
  description: string
  icon?: IconName
}

export function TrustPoint({ title, description, icon = 'shield' }: TrustPointProps) {
  return (
    <li className="trust-point">
      <span className="trust-point__icon">
        <Icon name={icon} />
      </span>
      <div>
        <h3 className="trust-point__title">{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  )
}
