import { useState } from 'react'
import type { FormEvent } from 'react'
import { AREAS, CARE_TYPE_LABELS, PET_SIZE_LABELS } from '../data/content'
import { Button } from '../components/Button'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { Container } from '../components/Container'
import { ErrorSummary } from '../components/ErrorSummary'
import { MockConfirmation } from '../components/MockConfirmation'
import { SectionHeading } from '../components/SectionHeading'
import { SelectField } from '../components/SelectField'
import { TextAreaField } from '../components/TextAreaField'
import { TextField } from '../components/TextField'
import { EMPTY_APPLICATION as EMPTY, validateApplication as validate } from '../forms/caregiverApplication'
import type { ApplicationValues as Values } from '../forms/caregiverApplication'
import type { Errors } from '../utils/validation'

export function BecomeCaregiverPage() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (!Object.keys(found).length) setDone(true)
  }

  if (done) {
    return (
      <section className="section page-top">
        <Container narrow>
          <MockConfirmation
            title="Application preview complete"
            actions={
              <>
                <Button to="/">Back to home</Button>
                <Button to="/caregivers" variant="secondary">See sample caregivers</Button>
              </>
            }
          >
            <p>Thanks, {values.name}. In a real service, this is where the team would review your application and follow up.</p>
          </MockConfirmation>
        </Container>
      </section>
    )
  }

  return (
    <section className="section page-top">
      <Container narrow>
        <SectionHeading
          level={1}
          eyebrow="Become a caregiver"
          title="Share your home and your time"
          description="An illustrative application form. It validates in your browser but sends and saves nothing."
        />
        <form className="form card" onSubmit={submit} noValidate>
          <ErrorSummary errors={errors} />
          <div className="form__row">
            <TextField id="name" label="Your name" required autoComplete="off" value={values.name} onChange={(v) => set('name', v)} error={errors['name']} />
            <TextField id="email" type="email" label="Email" required autoComplete="off" hint="Example only. Nothing is sent." value={values.email} onChange={(v) => set('email', v)} error={errors['email']} />
          </div>
          <div className="form__row">
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
          <div className="form__actions">
            <button type="submit" className="btn btn--primary btn--lg">Preview my application</button>
          </div>
        </form>
      </Container>
    </section>
  )
}
