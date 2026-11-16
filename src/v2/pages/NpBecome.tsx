import { useState } from 'react'
import type { FormEvent } from 'react'
import { AREAS, CARE_TYPE_LABELS, PET_SIZE_LABELS } from '../../data/content'
import { EMPTY_APPLICATION, validateApplication } from '../../forms/caregiverApplication'
import type { ApplicationValues } from '../../forms/caregiverApplication'
import type { Errors } from '../../utils/validation'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { ChoiceGroup } from '../ui/ChoiceGroup'
import { ErrorSummary } from '../ui/ErrorSummary'
import { MockConfirmation } from '../ui/MockConfirmation'
import { PageTitle } from '../ui/PageTitle'
import { SelectField } from '../ui/SelectField'
import { TextAreaField } from '../ui/TextAreaField'
import { TextField } from '../ui/TextField'
import { TextLink } from '../ui/TextLink'

const page = 'mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24'
const row = 'grid gap-x-6 sm:grid-cols-2'

/**
 * Become a caregiver (/become-a-caregiver): one illustrative application form that validates in the browser and sends
 * nothing. Values and every validation message come from the same module as the original page
 * (src/forms/caregiverApplication.ts). Same pattern as the booking page: a page title and the form on paper.
 */
export function NpBecome() {
  const [values, setValues] = useState<ApplicationValues>(EMPTY_APPLICATION)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)

  const set = <K extends keyof ApplicationValues>(key: K, value: ApplicationValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateApplication(values)
    setErrors(found)
    if (!Object.keys(found).length) setDone(true)
  }

  if (done) {
    return (
      <section className={page}>
        <MockConfirmation
          title="Application preview complete"
          actions={
            <>
              <Button to={ROUTES.home}>Back to home</Button>
              <Button to={ROUTES.caregivers} variant="secondary">See sample caregivers</Button>
            </>
          }
        >
          <p className="max-w-[34rem] text-body text-copy">
            Thanks, {values.name}. In a real service, this is where the team would review your application and follow up.
          </p>
          <p className="mt-6">
            <TextLink to={ROUTES.dashboard}>See a sample caregiver dashboard</TextLink>
          </p>
        </MockConfirmation>
      </section>
    )
  }

  return (
    <section className={page}>
      <PageTitle eyebrow="Become a caregiver" title="Share your home and your time">
        An illustrative application form. It validates in your browser but sends and saves nothing.
      </PageTitle>

      <form onSubmit={submit} noValidate className="mt-12 max-w-[44rem]">
        <ErrorSummary errors={errors} />
        <div className={row}>
          <TextField id="name" label="Your name" required autoComplete="off" value={values.name} onChange={(v) => set('name', v)} error={errors['name']} />
          <TextField id="email" type="email" label="Email" required autoComplete="off" hint="Example only. Nothing is sent." value={values.email} onChange={(v) => set('email', v)} error={errors['email']} />
        </div>
        <div className={row}>
          <SelectField id="area" label="Neighborhood" required hint="Only the area is ever shown publicly." value={values.area} onChange={(v) => set('area', v)} error={errors['area']} options={AREAS.map((a) => ({ value: a, label: a }))} />
          <SelectField id="homeType" label="Home type" required value={values.homeType} onChange={(v) => set('homeType', v)} error={errors['homeType']}
            options={['Apartment', 'House with garden', 'House without garden', 'Other'].map((o) => ({ value: o, label: o }))} />
        </div>
        <TextField id="experience" label="Years of pet-care experience" type="number" min={0} max={60} value={values.experience} onChange={(v) => set('experience', v)} />
        <ChoiceGroup id="careTypes" legend="Care you could offer" type="checkbox" required selected={values.careTypes} onChange={(v) => set('careTypes', v)} error={errors['careTypes']}
          options={Object.entries(CARE_TYPE_LABELS).map(([value, label]) => ({ value, label }))} />
        <ChoiceGroup id="sizes" legend="Pet sizes you are comfortable with" type="checkbox" required selected={values.sizes} onChange={(v) => set('sizes', v)} error={errors['sizes']}
          options={Object.entries(PET_SIZE_LABELS).map(([value, label]) => ({ value, label }))} />
        <TextAreaField id="about" label="About you and your experience" required hint="A few sentences is plenty." value={values.about} onChange={(v) => set('about', v)} error={errors['about']} />
        <TextAreaField id="rules" label="House rules" hint="For example: other pets, guests, alone time." value={values.rules} onChange={(v) => set('rules', v)} />
        <ChoiceGroup id="agree" legend="Prototype notice" type="checkbox" required selected={values.agree} onChange={(v) => set('agree', v)} error={errors['agree']}
          options={[{ value: 'ok', label: 'I understand this application is not sent or saved anywhere.' }]} />
        <div className="mt-10 flex sm:justify-end">
          <Button type="submit" className="w-full sm:w-auto">Preview my application</Button>
        </div>
      </form>
    </section>
  )
}
