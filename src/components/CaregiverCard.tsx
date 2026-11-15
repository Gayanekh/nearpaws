import { Link } from 'react-router-dom'
import type { Caregiver } from '../types'
import { CARE_TYPE_LABELS, HANDOVER_LABELS } from '../data/content'
import { Icon } from './Icon'
import { Photo } from './Photo'

interface CaregiverCardProps {
  caregiver: Caregiver
}

export function CaregiverCard({ caregiver }: CaregiverCardProps) {
  const { id, name, neighborhood, experienceYears, careStyle, pricePerNight, careTypes, handover, scene } = caregiver
  return (
    <article className="card caregiver-card">
      <Photo scene={scene} label={`${name}'s care space`} />
      <div className="caregiver-card__body">
        <h3>
          <Link to={`/caregivers/${id}`} className="caregiver-card__link">
            {name}
          </Link>
        </h3>
        <p className="caregiver-card__place">
          <Icon name="pin" size={16} /> {neighborhood}
        </p>
        <p className="caregiver-card__style">
          {experienceYears} years’ experience · {careStyle}
        </p>
        <ul className="chips" aria-label="Care options">
          {careTypes.map((type) => (
            <li key={type} className="chip">{CARE_TYPE_LABELS[type]}</li>
          ))}
          <li className="chip chip--soft">{HANDOVER_LABELS[handover]}</li>
        </ul>
        <p className="caregiver-card__price">
          <strong>${pricePerNight}</strong> / night <span className="muted">(sample price)</span>
        </p>
      </div>
    </article>
  )
}
