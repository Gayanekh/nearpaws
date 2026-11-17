import { useState } from 'react'
import type { FormEvent } from 'react'
import { AREAS, CARE_TYPE_LABELS, PET_SIZE_LABELS } from '../data/content'
import { EMPTY_APPLICATION, validateApplication } from '../forms/caregiverApplication'
import type { ApplicationValues } from '../forms/caregiverApplication'
import type { Errors } from '../utils/validation'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { ChoiceGroup } from '../ui/ChoiceGroup'
import { ErrorSummary } from '../ui/ErrorSummary'
import { MockConfirmation } from '../ui/MockConfirmation'
import { Eyebrow } from '../ui/Eyebrow'
import { SelectField } from '../ui/SelectField'
import { TextAreaField } from '../ui/TextAreaField'
import { TextField } from '../ui/TextField'
import { TextLink } from '../ui/TextLink'
import { useDocumentTitle } from '../useDocumentTitle'

const page = 'mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24'
const row = 'grid gap-x-6 sm:grid-cols-2'

/** The three steps shown beside the form: a small line icon, a title and one sentence. */
const STEPS = [
  { title: 'Apply', text: 'Fill in the short form below. It takes about five minutes.', icon: 'M7 3h8l4 4v14H7V3Z M15 3v4h4 M10 12h6 M10 16h6' },
  { title: 'Get reviewed', text: 'In a real service the team would check identity, experience and references.', icon: 'M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z M9 12l2.2 2.2L15.5 10' },
  { title: 'Welcome pets', text: 'Then you would receive requests, agree the details and share updates.', icon: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z' },
] as const

/**
 * Become a caregiver (/become-a-caregiver): one illustrative application form that validates in the browser and sends
 * nothing. Values and every validation message come from the same module as the original page
 * (src/forms/caregiverApplication.ts). Same pattern as the booking page: a page title and the form on paper.
 */
export function NpBecome() {
  useDocumentTitle('Become a caregiver')
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
            <TextLink to={`${ROUTES.signIn}?role=caregiver`}>Sign in as a sample caregiver</TextLink>
          </p>
        </MockConfirmation>
      </section>
    )
  }

  return (
    <section className={page}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14">
        <div className="flex flex-col">
          <header>
            <Eyebrow>Become a caregiver</Eyebrow>
            <h1 className="font-slab text-section font-light tracking-tight text-ink">Share your home and your time</h1>
            <p className="mt-5 max-w-[30rem] text-lead text-copy">
              An illustrative application form. It validates in your browser but sends and saves nothing.
            </p>
          </header>
          <ol className="mt-10 grid list-none gap-7 p-0">
            {STEPS.map((s) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-[0.75rem] bg-accent text-ink">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.icon} />
                  </svg>
                </span>
                <div>
                  <p className="font-sans text-body font-medium text-ink">{s.title}</p>
                  <p className="text-body-dense text-copy">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative mt-10 hidden min-h-64 flex-1 overflow-hidden bg-panel lg:block">
            <img
              className="absolute inset-0 size-full object-cover object-[60%_30%]"
              src="/img/hero-pip.jpg"
              alt="A jack russell terrier looking at the camera against a soft peach wall (stock photo)"
              width={1400}
              height={1000}
              loading="lazy"
            />
          </div>
        </div>

        <form onSubmit={submit} noValidate className="border border-hair bg-paper p-5 sm:p-8">
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
          <ChoiceGroup variant="chips" id="careTypes" legend="Care you could offer" type="checkbox" required selected={values.careTypes} onChange={(v) => set('careTypes', v)} error={errors['careTypes']}
            options={Object.entries(CARE_TYPE_LABELS).map(([value, label]) => ({ value, label }))} />
          <ChoiceGroup variant="chips" id="sizes" legend="Pet sizes you are comfortable with" type="checkbox" required selected={values.sizes} onChange={(v) => set('sizes', v)} error={errors['sizes']}
            options={Object.entries(PET_SIZE_LABELS).map(([value, label]) => ({ value, label }))} />
          <TextAreaField id="about" label="About you and your experience" required hint="A few sentences is plenty." value={values.about} onChange={(v) => set('about', v)} error={errors['about']} />
          <TextAreaField id="rules" label="House rules" hint="For example: other pets, guests, alone time." value={values.rules} onChange={(v) => set('rules', v)} />
          <ChoiceGroup id="agree" legend="Prototype notice" type="checkbox" required selected={values.agree} onChange={(v) => set('agree', v)} error={errors['agree']}
            options={[{ value: 'ok', label: 'I understand this application is not sent or saved anywhere.' }]} />
          <Button type="submit" soft className="mt-8 w-full">Preview my application</Button>
        </form>
      </div>
    </section>
  )
}
