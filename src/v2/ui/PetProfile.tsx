import type { SamplePet } from '../../data/operations'
import { FactList } from './FactList'

/** A pet's care details on a panel: name, a one-line summary and a hairline list of food, avoidances, medication and behavior. */
export function PetProfile({ pet }: { pet: SamplePet }) {
  return (
    <article className="bg-panel p-6">
      <h3 className="font-slab text-display-md font-normal text-ink">{pet.name}</h3>
      <p className="mt-1 mb-4 text-body-dense text-muted">
        {pet.species} · {pet.breed} · {pet.age} · {pet.size}
      </p>
      <FactList
        stacked
        items={[
          { term: 'Food', text: pet.food },
          { term: 'Must not eat', text: pet.avoid },
          { term: 'Medication', text: pet.medication },
          { term: 'Behavior', text: pet.behavior },
        ]}
      />
    </article>
  )
}
