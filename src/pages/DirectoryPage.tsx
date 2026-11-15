import { useMemo, useState } from 'react'
import { AREAS, CAREGIVERS, CARE_TYPE_LABELS, PET_SIZE_LABELS } from '../data/content'
import { Button } from '../components/Button'
import { CaregiverCard } from '../components/CaregiverCard'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { SelectField } from '../components/SelectField'
import type { CareType, PetSize } from '../types'

export function DirectoryPage() {
  const [area, setArea] = useState('')
  const [careType, setCareType] = useState<string[]>([])
  const [petSize, setPetSize] = useState<string[]>([])

  const results = useMemo(
    () =>
      CAREGIVERS.filter(
        (c) =>
          (!area || c.area === area) &&
          (!careType[0] || c.careTypes.includes(careType[0] as CareType)) &&
          (!petSize[0] || c.petSizes.includes(petSize[0] as PetSize)),
      ),
    [area, careType, petSize],
  )

  const hasFilters = Boolean(area || careType[0] || petSize[0])
  const reset = () => {
    setArea('')
    setCareType([])
    setPetSize([])
  }

  return (
    <section className="section page-top">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Caregiver directory"
          title="Find a caregiver"
          description="Filter the illustrative sample profiles. Prices and availability are examples only."
        />
        <div className="directory">
          <form className="filters card" aria-label="Filter caregivers" onSubmit={(e) => e.preventDefault()}>
            <SelectField
              id="filter-area"
              label="Area"
              value={area}
              onChange={setArea}
              placeholder="Any area"
              options={AREAS.map((a) => ({ value: a, label: a }))}
            />
            <ChoiceGroup
              id="filter-care"
              legend="Care type"
              type="radio"
              selected={careType}
              onChange={setCareType}
              options={Object.entries(CARE_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
            />
            <ChoiceGroup
              id="filter-size"
              legend="Pet size"
              type="radio"
              selected={petSize}
              onChange={setPetSize}
              options={Object.entries(PET_SIZE_LABELS).map(([value, label]) => ({ value, label }))}
            />
            <Button variant="ghost" onClick={reset} disabled={!hasFilters}>Clear filters</Button>
          </form>

          <div>
            <p className="results-count" role="status" aria-live="polite">
              {results.length} sample {results.length === 1 ? 'caregiver' : 'caregivers'} shown
            </p>
            {results.length ? (
              <div className="grid grid--2">
                {results.map((c) => (
                  <CaregiverCard key={c.id} caregiver={c} />
                ))}
              </div>
            ) : (
              <div className="card empty-state">
                <h2>No sample caregivers match</h2>
                <p>Try removing a filter to see more profiles.</p>
                <Button variant="secondary" onClick={reset}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
