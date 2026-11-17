import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { CAREGIVERS } from '../data/content'
import { useDemo } from '../demo/useDemo'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { ErrorSummary } from '../ui/ErrorSummary'
import { PageTitle } from '../ui/PageTitle'
import { PhotoField } from '../ui/PhotoField'
import { TextAreaField } from '../ui/TextAreaField'
import { TextField } from '../ui/TextField'
import { TextLink } from '../ui/TextLink'
import { useDocumentTitle } from '../useDocumentTitle'

const page = 'mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24'

/**
 * My profile (/profile): the signed-in demo person changes their own details and photo. A pet owner edits name
 * and photo (the pet's photo stays on the dashboard). A caregiver also edits what their card and profile page show: area,
 * tagline, about text and price per night. Saved in this browser tab only; nothing is sent anywhere.
 */
export function NpMyProfile() {
  useDocumentTitle('My profile')
  const { account, profile, saveProfile, caregiver: editedCaregiver } = useDemo()
  const sample = account?.caregiverId ? CAREGIVERS.find((c) => c.id === account.caregiverId) : undefined
  const current = sample ? editedCaregiver(sample.id) : undefined

  const [name, setName] = useState(profile.name ?? account?.name ?? '')
  const [photo, setPhoto] = useState(profile.photo ?? '')
  const [neighborhood, setNeighborhood] = useState(current?.neighborhood ?? '')
  const [tagline, setTagline] = useState(current?.tagline ?? '')
  const [bio, setBio] = useState(current?.bio ?? '')
  const [price, setPrice] = useState(String(current?.pricePerNight ?? ''))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  if (!account) return <Navigate to={`${ROUTES.signIn}?next=${encodeURIComponent(ROUTES.profile)}`} replace />

  const isCaregiver = account.role === 'caregiver'
  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v)
    setSaved(false)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next['profile-name'] = 'Enter your name.'
    if (isCaregiver) {
      const n = Number(price)
      if (!Number.isFinite(n) || n < 1 || n > 500) next['profile-price'] = 'Enter a price per night between 1 and 500.'
      if (!neighborhood.trim()) next['profile-area'] = 'Enter the area where you live.'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return
    saveProfile({
      name: name.trim(),
      photo,
      ...(isCaregiver ? { neighborhood: neighborhood.trim(), tagline: tagline.trim(), bio: bio.trim(), price: Number(price) } : {}),
    })
    setSaved(true)
  }

  return (
    <section className={page}>
      <PageTitle eyebrow="Demo profile" title="My profile">
        Change your details and photo. This is a demonstration: it is kept only in this browser tab and nothing is sent anywhere.
        {isCaregiver && ' Your photo, name, area, tagline, about text and price also appear on your card and profile page.'}
      </PageTitle>

      <form onSubmit={submit} noValidate className="mt-10 max-w-[40rem]">
        <ErrorSummary errors={errors} />
        <PhotoField
          id="profile-photo"
          label="Your photo"
          alt="Your profile photo"
          fallback={account.photo?.src}
          hint="A clear photo of your face works best. It is shrunk in your browser and not uploaded."
          value={photo}
          onChange={touch(setPhoto)}
        />
        <TextField id="profile-name" label="Name" required autoComplete="name" value={name} onChange={touch(setName)} error={errors['profile-name']} />

        {isCaregiver && (
          <>
            <TextField id="profile-area" label="Area" required hint="Only an approximate neighborhood is ever shown." value={neighborhood} onChange={touch(setNeighborhood)} error={errors['profile-area']} />
            <TextField id="profile-tagline" label="Tagline" hint="Leave empty to show the sample tagline." value={tagline} onChange={touch(setTagline)} />
            <TextAreaField id="profile-bio" label="About you" hint="Leave empty to show the sample text." rows={5} value={bio} onChange={touch(setBio)} />
            <TextField id="profile-price" label="Price per night (sample, in dollars)" required type="number" inputMode="numeric" min={1} max={500} value={price} onChange={touch(setPrice)} error={errors['profile-price']} />
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button soft type="submit">Save changes</Button>
          {isCaregiver && sample && <TextLink to={ROUTES.caregiver(sample.id)}>See my public profile</TextLink>}
        </div>
        <p role="status" className="mt-4 min-h-6 text-body-dense font-medium text-ink">{saved ? 'Saved. Your changes are shown across the site.' : ''}</p>
      </form>
    </section>
  )
}
