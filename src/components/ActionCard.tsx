import { Link } from 'react-router-dom'
import type { StartAction } from '../types'
import { Icon } from './Icon'

/** Whole-card link in one of four brand tones. */
export function ActionCard({ action }: { action: StartAction }) {
  return (
    <Link to={action.to} className={`action-card action-card--${action.tone}`}>
      <span className="action-card__icon"><Icon name={action.icon} size={26} /></span>
      <h3>{action.title}</h3>
      <p>{action.description}</p>
      <span className="action-card__go">Open <Icon name="arrow" size={16} /></span>
    </Link>
  )
}
