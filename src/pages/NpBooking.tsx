import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CAREGIVERS, CARE_TYPE_LABELS, HANDOVER_LABELS, PET_SIZE_LABELS } from '../data/content'
import { OWNERS } from '../data/demo'
import { useDemo } from '../demo/useDemo'
import { EMPTY_BOOKING, STEP_LABELS, validateBookingStep } from '../forms/booking'
import type { BookingValues } from '../forms/booking'
import { firstBusyDay } from '../data/availability'
import { formatDate, nightsBetween, todayIso } from '../utils/validation'
import type { Errors } from '../utils/validation'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { ChoiceGroup } from '../ui/ChoiceGroup'
import { ErrorSummary } from '../ui/ErrorSummary'
import { FactList } from '../ui/FactList'
import { MockConfirmation } from '../ui/MockConfirmation'
import { PageTitle } from '../ui/PageTitle'
import { PhotoField } from '../ui/PhotoField'
import { SelectField } from '../ui/SelectField'
import { StepIndicator } from '../ui/StepIndicator'
import { TextAreaField } from '../ui/TextAreaField'
import { TextField } from '../ui/TextField'
import { useDocumentTitle } from '../useDocumentTitle'

const page = 'mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24'
const row = 'grid gap-x-6 sm:grid-cols-2'
const stepHeading = 'mb-6 font-slab text-display-md font-normal text-ink'

/**
 * Booking and pet-intake request (/book): three steps with validation per step, a caregiver preselected from
 * ?caregiver=, an estimate, and a mock confirmation. The values, steps and every validation message come from the same
 * module as the original page (src/forms/booking.ts). Layout: the form on paper with a panel summary column on large screens.
 */
export function NpBooking() {
  useDocumentTitle('Request care')
  const [params] = useSearchParams()
  const preselected = CAREGIVERS.some((c) => c.id === params.get('caregiver')) ? params.get('caregiver')! : ''
  // Days chosen on the caregiver's page arrive as ?start= and ?end=; they are used only if they are still valid.
  const startParam = params.get('start') ?? ''
  const endParam = params.get('end') ?? ''
  const daysFromProfile =
    preselected !== '' &&
    /^\d{4}-\d{2}-\d{2}$/.test(startParam) &&
    /^\d{4}-\d{2}-\d{2}$/.test(endParam) &&
    startParam >= todayIso() &&
    endParam >= startParam &&
    !firstBusyDay(preselected, startParam, endParam)
  const [values, setValues] = useState<BookingValues>({
    ...EMPTY_BOOKING,
    caregiver: preselected,
    start: daysFromProfile ? startParam : '',
    end: daysFromProfile ? endParam : '',
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  const [needSignIn, setNeedSignIn] = useState(false)
  const { account, signIn, createRequest, caregiver: editedCaregiver } = useDemo()

  const set = <K extends keyof BookingValues>(key: K, value: BookingValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest)
  }

  const caregiver = editedCaregiver(values.caregiver)
  const nights = values.start && values.end ? nightsBetween(values.start, values.end) : 0

  const next = (e: FormEvent) => {
    e.preventDefault()
    const found = validateBookingStep(step, values)
    setErrors(found)
    if (Object.keys(found).length) return
    if (step < STEP_LABELS.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0 })
    } else if (account?.role === 'owner') {
      createRequest(account.id, values)
      setDone(true)
    } else {
      setNeedSignIn(true)
      window.scrollTo({ top: 0 })
    }
  }

  // The last step is sent as a pet owner: a signed-out visitor (or a caregiver) picks a sample owner first.
  if (needSignIn && !done) {
    return (
      <section className={page}>
        <div className="border border-hair bg-[linear-gradient(135deg,var(--color-panel),var(--color-paper))] p-5 sm:p-8 lg:p-10">
          <header className="max-w-[40rem]">
            <Eyebrow>Request care</Eyebrow>
            <h1 className="font-slab text-section font-light tracking-tight text-ink">Sign in to send your request</h1>
            <p className="mt-5 text-lead text-copy">
              {account ? `You are signed in as ${account.name}, a caregiver. ` : ''}Requests are sent as a pet owner. This is a
              demonstration: choose a sample owner. There are no real accounts or passwords.
            </p>
          </header>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Sample pet owners">
            {OWNERS.map((o) => (
              <li key={o.id} className="flex flex-col border border-hair bg-paper p-5">
                <h2 className="font-slab text-title font-medium text-ink">{o.name}</h2>
                <p className="mt-1 mb-5 flex-1 text-body-dense text-copy">{o.blurb}</p>
                <Button
                  soft
                  className="w-full"
                  onClick={() => {
                    signIn(o.id)
                    createRequest(o.id, values)
                    setDone(true)
                  }}
                >
                  Send as {o.name.split(' ')[0]}
                </Button>
              </li>
            ))}
          </ul>
          <Button soft variant="secondary" className="mt-8" onClick={() => setNeedSignIn(false)}>Back to the form</Button>
        </div>
      </section>
    )
  }

  if (done) {
    return (
      <section className={page}>
        <MockConfirmation
          title="Request preview complete"
          actions={
            <>
              <Button to={ROUTES.dashboard}>Go to my dashboard</Button>
              <Button to={ROUTES.caregivers} variant="secondary">Browse caregivers</Button>
            </>
          }
        >
          <div className="max-w-[40rem]">
            <FactList
              items={[
                { term: 'Care', text: CARE_TYPE_LABELS[values.careType[0] as keyof typeof CARE_TYPE_LABELS] },
                { term: 'Caregiver', text: caregiver ? `${caregiver.name} (${caregiver.area})` : 'Help me choose' },
                { term: 'Dates', text: `${formatDate(values.start)} to ${formatDate(values.end)} (${nights} ${nights === 1 ? 'night' : 'nights'})` },
                { term: 'Pet', text: `${values.petName}, ${values.species}, ${PET_SIZE_LABELS[values.size as keyof typeof PET_SIZE_LABELS]}` },
                { term: 'Handover', text: HANDOVER_LABELS[values.handover[0] as keyof typeof HANDOVER_LABELS] },
                ...(caregiver ? [{ term: 'Sample estimate', text: `$${caregiver.pricePerNight * nights} (illustrative, not a quote)` }] : []),
              ]}
            />
          </div>
          <p className="mt-8 max-w-[34rem] text-body-dense text-copy">
            Your request is now in your dashboard as “Requested”. This is a demonstration: it is kept only in this browser tab, and the
            caregiver’s answer is part of the demo.
          </p>
        </MockConfirmation>
      </section>
    )
  }

  const careType = values.careType[0] as keyof typeof CARE_TYPE_LABELS | undefined
  const summary = [
    { term: 'Caregiver', text: caregiver ? `${caregiver.name}, ${caregiver.area}` : 'Help me choose' },
    ...(careType ? [{ term: 'Care', text: CARE_TYPE_LABELS[careType] }] : []),
    ...(nights > 0 ? [{ term: 'Dates', text: `${formatDate(values.start)} to ${formatDate(values.end)} (${nights} ${nights === 1 ? 'night' : 'nights'})` }] : []),
    ...(values.petName ? [{ term: 'Pet', text: values.petName }] : []),
    ...(caregiver && nights > 0 ? [{ term: 'Sample estimate', text: `$${caregiver.pricePerNight * nights} (illustrative, not a quote)` }] : []),
  ]

  return (
    <section className={page}>
      <PageTitle eyebrow="Request care" title="Tell us about your pet">
        Three short steps. This is a prototype: nothing is sent. Your request is kept only in this browser tab, so you can follow it in your dashboard.
      </PageTitle>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-16">
        <div>
          <StepIndicator steps={STEP_LABELS} current={step} />
          <form onSubmit={next} noValidate aria-label={`Step ${step + 1} of 3: ${STEP_LABELS[step]}`}>
            <ErrorSummary errors={errors} />

            {step === 0 && (
              <>
                <h2 className={stepHeading}>Care & dates</h2>
                <SelectField
                  id="caregiver"
                  label="Caregiver"
                  hint="Optional. Leave blank if you would like to choose later."
                  value={values.caregiver}
                  placeholder="Help me choose"
                  onChange={(v) => set('caregiver', v)}
                  options={CAREGIVERS.map((c) => ({ value: c.id, label: `${editedCaregiver(c.id)?.name ?? c.name}, ${c.area}` }))}
                />
                <ChoiceGroup
                  id="careType"
                  legend="Where should the care happen?"
                  type="radio"
                  required
                  selected={values.careType}
                  onChange={(v) => set('careType', v)}
                  error={errors['careType']}
                  options={[
                    { value: 'caregiver-home', label: CARE_TYPE_LABELS['caregiver-home'], description: 'Your pet stays with the caregiver.' },
                    { value: 'owner-home', label: CARE_TYPE_LABELS['owner-home'], description: 'The caregiver comes to you.' },
                  ]}
                />
                <div className={row}>
                  <TextField id="start" type="date" label="Start date" required min={todayIso()} value={values.start} onChange={(v) => set('start', v)} error={errors['start']} />
                  <TextField id="end" type="date" label="End date" required min={values.start || todayIso()} value={values.end} onChange={(v) => set('end', v)} error={errors['end']} />
                </div>
                <ChoiceGroup
                  id="handover"
                  legend="Pickup and drop-off"
                  type="radio"
                  required
                  selected={values.handover}
                  onChange={(v) => set('handover', v)}
                  error={errors['handover']}
                  options={[
                    { value: 'drop-off', label: HANDOVER_LABELS['drop-off'] },
                    { value: 'pickup', label: HANDOVER_LABELS.pickup, description: 'Where the caregiver offers it.' },
                    { value: 'both', label: HANDOVER_LABELS.both },
                  ]}
                />
                <div className={row}>
                  <TextField id="ownerName" label="Your name" required autoComplete="off" value={values.ownerName} onChange={(v) => set('ownerName', v)} error={errors['ownerName']} />
                  <TextField id="email" type="email" label="Email" required autoComplete="off" hint="Example only. Nothing is sent." value={values.email} onChange={(v) => set('email', v)} error={errors['email']} />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className={stepHeading}>Your pet</h2>
                <div className={row}>
                  <TextField id="petName" label="Pet’s name" required value={values.petName} onChange={(v) => set('petName', v)} error={errors['petName']} />
                  <SelectField id="species" label="Species" required value={values.species} onChange={(v) => set('species', v)} error={errors['species']}
                    options={['Dog', 'Cat', 'Rabbit', 'Other small pet'].map((s) => ({ value: s, label: s }))} />
                </div>
                <div className={row}>
                  <SelectField id="size" label="Size" required value={values.size} onChange={(v) => set('size', v)} error={errors['size']}
                    options={Object.entries(PET_SIZE_LABELS).map(([value, label]) => ({ value, label }))} />
                  <TextField id="age" label="Age" hint="For example “4 years”" value={values.age} onChange={(v) => set('age', v)} />
                </div>
                <PhotoField id="petPhoto" label="Photo of your pet" hint="Optional. It is shown to the caregiver and stays in this browser tab." value={values.petPhoto} onChange={(v) => set('petPhoto', v)} />
                <SelectField id="vaccinated" label="Vaccinations up to date?" required value={values.vaccinated} onChange={(v) => set('vaccinated', v)} error={errors['vaccinated']}
                  options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Not sure', label: 'Not sure' }]} />
                <TextAreaField id="food" label="Food and allergies" required hint="Brand, amounts, times, and anything your pet cannot eat. Write “None” if nothing applies." value={values.food} onChange={(v) => set('food', v)} error={errors['food']} />
                <TextAreaField id="medication" label="Medication" required hint="Name, dose and timing. Write “None” if nothing applies." value={values.medication} onChange={(v) => set('medication', v)} error={errors['medication']} />
              </>
            )}

            {step === 2 && (
              <>
                <h2 className={stepHeading}>Routine & emergency</h2>
                <TextAreaField id="routine" label="Daily routine" required hint="Walks, meals, sleep, favorite games." value={values.routine} onChange={(v) => set('routine', v)} error={errors['routine']} />
                <TextAreaField id="behavior" label="Behavior and needs" required hint="Fears, how they react to strangers or other animals, anything the caregiver should know." value={values.behavior} onChange={(v) => set('behavior', v)} error={errors['behavior']} />
                <h3 className="mt-10 mb-4 font-slab text-title font-medium text-ink">Emergency contact</h3>
                <div className={row}>
                  <TextField id="contactName" label="Contact name" required value={values.contactName} onChange={(v) => set('contactName', v)} error={errors['contactName']} />
                  <TextField id="contactPhone" type="tel" label="Contact phone" required hint="Use a made-up number for this demo." value={values.contactPhone} onChange={(v) => set('contactPhone', v)} error={errors['contactPhone']} />
                </div>
                <p className="text-body-dense text-muted">Please do not enter real personal details. Nothing is sent; the demo keeps it only in this browser tab.</p>
              </>
            )}

            <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              {step > 0 && (
                <Button variant="secondary" onClick={() => { setErrors({}); setStep(step - 1) }}>Back</Button>
              )}
              <Button type="submit">{step < STEP_LABELS.length - 1 ? 'Continue' : 'Preview my request'}</Button>
            </div>
          </form>
        </div>

        <aside aria-label="Your request so far" className="bg-panel p-8 lg:sticky lg:top-8">
          <h2 className="mb-4 font-slab text-title font-medium text-ink">Your request so far</h2>
          <FactList stacked items={summary} />
          <p className="mt-4 text-caption text-muted">Nothing is sent. This summary only reflects what you have typed here.</p>
        </aside>
      </div>
    </section>
  )
}
