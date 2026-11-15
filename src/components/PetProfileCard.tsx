import type { SamplePet } from '../data/operations'

export function PetProfileCard({ pet }: { pet: SamplePet }) {
  return (
    <article className="pet-card card">
      <div className="pet-card__body">
        <h3>{pet.name}</h3>
        <p className="pet-card__meta">{pet.species} · {pet.breed} · {pet.age} · {pet.size}</p>
        <dl className="facts facts--stack">
          <div><dt>Food</dt><dd>{pet.food}</dd></div>
          <div><dt>Must not eat</dt><dd>{pet.avoid}</dd></div>
          <div><dt>Medication</dt><dd>{pet.medication}</dd></div>
          <div><dt>Behavior</dt><dd>{pet.behavior}</dd></div>
        </dl>
      </div>
    </article>
  )
}
