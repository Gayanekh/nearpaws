import { useMemo, useState } from 'react'
import { AREAS, CAREGIVERS, CARE_TYPE_LABELS, PET_SIZE_LABELS } from '../data/content'
import type { CareType, PetSize } from '../types'
import { Button } from '../ui/Button'
import { CaregiverCard } from '../ui/CaregiverCard'
import { ChoiceGroup } from '../ui/ChoiceGroup'
import { PageTitle } from '../ui/PageTitle'
import { SelectField } from '../ui/SelectField'
import { useDocumentTitle } from '../useDocumentTitle'

/**
 * Caregiver directory (/caregivers). Same filters and results as the original page: area (select), care type and pet
 * size (single choice each), a live result count and a clear button. Layout from DESIGN.md: the title, a panel of filters
 * on the left (a collapsible block on phones) and flat cards in a 3 / 2 / 1 column grid.
 */
export function NpDirectory() {
  useDocumentTitle('Find a caregiver')
  const [area, setArea] = useState('')
  const [careType, setCareType] = useState<string[]>([])
  const [petSize, setPetSize] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

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

  const activeCount = [area, careType[0], petSize[0]].filter(Boolean).length
  const hasFilters = activeCount > 0
  const reset = () => {
    setArea('')
    setCareType([])
    setPetSize([])
  }

  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <PageTitle eyebrow="Caregiver directory" title="Find a caregiver">
        Filter the illustrative sample profiles. Prices and availability are examples only.
      </PageTitle>

      <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-8">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="directory-filters"
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex min-h-12 w-full items-center justify-between bg-panel px-6 font-sans text-ui font-medium tracking-ui text-ink lg:hidden"
          >
            <span>Filters{hasFilters ? ` (${activeCount})` : ''}</span>
            <span aria-hidden="true" className="text-title leading-none">{filtersOpen ? '−' : '+'}</span>
          </button>
          <form
            id="directory-filters"
            aria-label="Filter caregivers"
            onSubmit={(e) => e.preventDefault()}
            className={`bg-panel p-6 pt-6 max-lg:mt-px ${filtersOpen ? 'block' : 'hidden lg:block'}`}
          >
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
            <Button variant="secondary" onClick={reset} disabled={!hasFilters} className="w-full">
              Clear filters
            </Button>
          </form>
        </div>

        <div>
          <p role="status" aria-live="polite" className="mb-6 font-sans text-ui font-medium tracking-ui text-ink">
            {results.length} sample {results.length === 1 ? 'caregiver' : 'caregivers'} shown
          </p>
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 min-[80rem]:grid-cols-3">
              {results.map((c) => (
                <CaregiverCard key={c.id} caregiver={c} />
              ))}
            </div>
          ) : (
            <div className="bg-panel p-8">
              <h2 className="font-slab text-display-md font-normal text-ink">No sample caregivers match</h2>
              <p className="mt-3 mb-6 text-body text-copy">Try removing a filter to see more profiles.</p>
              <Button variant="secondary" onClick={reset}>Clear filters</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
