import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CAREGIVERS, CARE_TYPE_LABELS, HANDOVER_LABELS, PET_SIZE_LABELS } from '../data/content'
import { Button } from '../components/Button'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { Container } from '../components/Container'
import { ErrorSummary } from '../components/ErrorSummary'
import { MockConfirmation } from '../components/MockConfirmation'
import { SectionHeading } from '../components/SectionHeading'
import { SelectField } from '../components/SelectField'
import { StepIndicator } from '../components/StepIndicator'
import { TextAreaField } from '../components/TextAreaField'
import { TextField } from '../components/TextField'
import { formatDate, isBlank, isEmail, isPhone, nightsBetween, todayIso } from '../utils/validation'
import type { Errors } from '../utils/validation'

const STEP_LABELS = ['Care & dates', 'Your pet', 'Routine & emergency']

const EMPTY = {
  caregiver: '', careType: [] as string[], handover: [] as string[], start: '', end: '', ownerName: '', email: '',
  petName: '', species: '', size: '', age: '', vaccinated: '', food: '', medication: '',
  routine: '', behavior: '', contactName: '', contactPhone: '',
}
type Values = typeof EMPTY

/** Returns the errors for one step. An empty object means the step is valid. */
function validateStep(step: number, v: Values): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (!v.careType[0]) e['careType'] = 'Choose where the care should happen.'
    if (!v.start) e['start'] = 'Choose a start date.'
    else if (v.start < todayIso()) e['start'] = 'The start date cannot be in the past.'
    if (!v.end) e['end'] = 'Choose an end date.'
    else if (v.start && v.end < v.start) e['end'] = 'The end date must be on or after the start date.'
    if (!v.handover[0]) e['handover'] = 'Choose how handover should work.'
    if (isBlank(v.ownerName)) e['ownerName'] = 'Enter your name.'
    if (isBlank(v.email)) e['email'] = 'Enter your email address.'
    else if (!isEmail(v.email)) e['email'] = 'Enter an email address like name@example.com.'
  }
  if (step === 1) {
    if (isBlank(v.petName)) e['petName'] = 'Enter your pet’s name.'
    if (!v.species) e['species'] = 'Choose a species.'
    if (!v.size) e['size'] = 'Choose a size.'
    if (!v.vaccinated) e['vaccinated'] = 'Tell us about vaccinations.'
    if (isBlank(v.food)) e['food'] = 'Describe food needs, or write “None”.'
    if (isBlank(v.medication)) e['medication'] = 'Describe medication, or write “None”.'
  }
  if (step === 2) {
    if (isBlank(v.routine)) e['routine'] = 'Describe the daily routine.'
    if (isBlank(v.behavior)) e['behavior'] = 'Describe behavior and anything that worries your pet.'
    if (isBlank(v.contactName)) e['contactName'] = 'Enter an emergency contact name.'
    if (isBlank(v.contactPhone)) e['contactPhone'] = 'Enter an emergency phone number.'
    else if (!isPhone(v.contactPhone)) e['contactPhone'] = 'Enter a phone number with at least 7 digits.'
  }
  return e
}

export function BookingPage() {
  const [params] = useSearchParams()
  const preselected = CAREGIVERS.some((c) => c.id === params.get('caregiver')) ? params.get('caregiver')! : ''
  const [values, setValues] = useState<Values>({ ...EMPTY, caregiver: preselected })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest)
  }

  const caregiver = CAREGIVERS.find((c) => c.id === values.caregiver)
  const nights = values.start && values.end ? nightsBetween(values.start, values.end) : 0

  const next = (e: FormEvent) => {
    e.preventDefault()
    const found = validateStep(step, values)
    setErrors(found)
    if (Object.keys(found).length) return
    if (step < STEP_LABELS.length - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0 })
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <section className="section page-top">
        <Container narrow>
          <MockConfirmation
            title="Request preview complete"
            actions={
              <>
                <Button to="/">Back to home</Button>
                <Button to="/caregivers" variant="secondary">Browse caregivers</Button>
              </>
            }
          >
            <dl className="facts facts--stack">
              <div><dt>Care</dt><dd>{CARE_TYPE_LABELS[values.careType[0] as keyof typeof CARE_TYPE_LABELS]}</dd></div>
              <div><dt>Caregiver</dt><dd>{caregiver ? `${caregiver.name} (${caregiver.area})` : 'Help me choose'}</dd></div>
              <div><dt>Dates</dt><dd>{formatDate(values.start)} to {formatDate(values.end)} ({nights} {nights === 1 ? 'night' : 'nights'})</dd></div>
              <div><dt>Pet</dt><dd>{values.petName}, {values.species}, {PET_SIZE_LABELS[values.size as keyof typeof PET_SIZE_LABELS]}</dd></div>
              <div><dt>Handover</dt><dd>{HANDOVER_LABELS[values.handover[0] as keyof typeof HANDOVER_LABELS]}</dd></div>
              {caregiver && <div><dt>Sample estimate</dt><dd>${caregiver.pricePerNight * nights} (illustrative, not a quote)</dd></div>}
            </dl>
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
          eyebrow="Request care"
          title="Tell us about your pet"
          description="Three short steps. This is a prototype: nothing is sent or saved, and your answers disappear when you leave."
        />
        <StepIndicator steps={STEP_LABELS} current={step} />
        <form className="form card" onSubmit={next} noValidate aria-label={`Step ${step + 1} of 3: ${STEP_LABELS[step]}`}>
          <ErrorSummary errors={errors} />

          {step === 0 && (
            <>
              <h2>Care & dates</h2>
              <SelectField
                id="caregiver"
                label="Caregiver"
                hint="Optional. Leave blank if you would like to choose later."
                value={values.caregiver}
                placeholder="Help me choose"
                onChange={(v) => set('caregiver', v)}
                options={CAREGIVERS.map((c) => ({ value: c.id, label: `${c.name}, ${c.area}` }))}
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
              <div className="form__row">
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
              <div className="form__row">
                <TextField id="ownerName" label="Your name" required autoComplete="off" value={values.ownerName} onChange={(v) => set('ownerName', v)} error={errors['ownerName']} />
                <TextField id="email" type="email" label="Email" required autoComplete="off" hint="Example only. Nothing is sent." value={values.email} onChange={(v) => set('email', v)} error={errors['email']} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2>Your pet</h2>
              <div className="form__row">
                <TextField id="petName" label="Pet’s name" required value={values.petName} onChange={(v) => set('petName', v)} error={errors['petName']} />
                <SelectField id="species" label="Species" required value={values.species} onChange={(v) => set('species', v)} error={errors['species']}
                  options={['Dog', 'Cat', 'Rabbit', 'Other small pet'].map((s) => ({ value: s, label: s }))} />
              </div>
              <div className="form__row">
                <SelectField id="size" label="Size" required value={values.size} onChange={(v) => set('size', v)} error={errors['size']}
                  options={Object.entries(PET_SIZE_LABELS).map(([value, label]) => ({ value, label }))} />
                <TextField id="age" label="Age" hint="For example “4 years”" value={values.age} onChange={(v) => set('age', v)} />
              </div>
              <SelectField id="vaccinated" label="Vaccinations up to date?" required value={values.vaccinated} onChange={(v) => set('vaccinated', v)} error={errors['vaccinated']}
                options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Not sure', label: 'Not sure' }]} />
              <TextAreaField id="food" label="Food and allergies" required hint="Brand, amounts, times, and anything your pet cannot eat. Write “None” if nothing applies." value={values.food} onChange={(v) => set('food', v)} error={errors['food']} />
              <TextAreaField id="medication" label="Medication" required hint="Name, dose and timing. Write “None” if nothing applies." value={values.medication} onChange={(v) => set('medication', v)} error={errors['medication']} />
            </>
          )}

          {step === 2 && (
            <>
              <h2>Routine & emergency</h2>
              <TextAreaField id="routine" label="Daily routine" required hint="Walks, meals, sleep, favorite games." value={values.routine} onChange={(v) => set('routine', v)} error={errors['routine']} />
              <TextAreaField id="behavior" label="Behavior and needs" required hint="Fears, how they react to strangers or other animals, anything the caregiver should know." value={values.behavior} onChange={(v) => set('behavior', v)} error={errors['behavior']} />
              <h3>Emergency contact</h3>
              <div className="form__row">
                <TextField id="contactName" label="Contact name" required value={values.contactName} onChange={(v) => set('contactName', v)} error={errors['contactName']} />
                <TextField id="contactPhone" type="tel" label="Contact phone" required hint="Use a made-up number for this demo." value={values.contactPhone} onChange={(v) => set('contactPhone', v)} error={errors['contactPhone']} />
              </div>
              <p className="form__note">Please do not enter real personal details. Nothing is stored or sent.</p>
            </>
          )}

          <div className="form__actions">
            {step > 0 && <Button variant="secondary" onClick={() => { setErrors({}); setStep(step - 1) }}>Back</Button>}
            <button type="submit" className="btn btn--primary btn--lg">
              {step < STEP_LABELS.length - 1 ? 'Continue' : 'Preview my request'}
            </button>
          </div>
        </form>
      </Container>
    </section>
  )
}
