import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ACCOUNTS } from '../data/demo'
import type { Account, Role } from '../data/demo'
import { useDemo } from '../demo/useDemo'
import { ROUTES } from '../routes'
import { Button } from '../ui/Button'
import { ChoiceGroup } from '../ui/ChoiceGroup'
import { Eyebrow } from '../ui/Eyebrow'
import { TextLink } from '../ui/TextLink'
import { useDocumentTitle } from '../useDocumentTitle'

const icon = 'size-5 shrink-0 fill-none stroke-current stroke-[1.5]'
const PawIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
    <circle cx="8" cy="9" r="1.8" /><circle cx="16" cy="9" r="1.8" /><circle cx="5.5" cy="13.5" r="1.6" /><circle cx="18.5" cy="13.5" r="1.6" />
    <path d="M12 12.5c-2.6 0-4.5 2.2-4.5 4 0 1.5 1.4 2 2.6 1.6.8-.3 1.3-.4 1.9-.4s1.1.1 1.9.4c1.2.4 2.6-.1 2.6-1.6 0-1.8-1.9-4-4.5-4Z" strokeLinejoin="round" />
  </svg>
)
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
    <path d="M4 11 12 4l8 7v8.5H4V11Z" strokeLinejoin="round" /><path d="M10 19.5v-5h4v5" strokeLinejoin="round" />
  </svg>
)

const page = 'mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24'

/** Only paths inside the app are followed after signing in. */
const safeNext = (next: string | null) => (next && next.startsWith('/') && !next.startsWith('//') ? next : null)

/**
 * Demo sign-in (/sign-in). There are no real accounts and no passwords: the visitor picks a sample pet owner or caregiver
 * and sees that person's dashboard. The page says so plainly and never asks for real credentials.
 */
export function NpSignIn() {
  useDocumentTitle('Sign in')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { account, signIn, signOut, reset } = useDemo()
  const [role, setRole] = useState<Role>(params.get('role') === 'caregiver' ? 'caregiver' : 'owner')
  const next = safeNext(params.get('next'))

  const choose = (a: Account) => {
    signIn(a.id)
    navigate(next && a.role === role ? next : a.role === 'owner' ? ROUTES.dashboard : ROUTES.caregiverDashboard)
  }

  return (
    <section className={page}>
      <div>
        <header className="max-w-[40rem]">
          <Eyebrow>Demo sign-in</Eyebrow>
          <h1 className="font-slab text-section font-light tracking-tight text-ink">Sign in</h1>
          <p className="mt-5 text-lead text-copy">
            This is a demonstration. There are no real accounts and no passwords, and nothing is sent anywhere. Choose a sample
            person to see their dashboard. What you do is kept only in this browser tab.
          </p>
        </header>

        {account && (
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-body-dense text-ink" role="status">
            You are signed in as {account.name}.
            <TextLink to={account.role === 'owner' ? ROUTES.dashboard : ROUTES.caregiverDashboard}>Go to the dashboard</TextLink>
            <button type="button" className="font-medium underline decoration-accent decoration-2 underline-offset-[0.3em]" onClick={signOut}>
              Sign out
            </button>
          </p>
        )}

        <div className="mt-10">
          <ChoiceGroup
            id="role"
            legend="I am a"
            type="radio"
            variant="segmented"
            required
            selected={[role]}
            onChange={(v) => setRole(v[0] as Role)}
            options={[
              { value: 'owner', label: 'Pet owner', icon: <PawIcon /> },
              { value: 'caregiver', label: 'Caregiver', icon: <HomeIcon /> },
            ]}
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={role === 'owner' ? 'Sample pet owners' : 'Sample caregivers'}>
          {ACCOUNTS.filter((a) => a.role === role).map((a) => (
            <li key={a.id} className="flex flex-col border border-hair bg-paper p-5">
              {a.photo && (
                <img
                  src={a.photo.src}
                  alt={a.photo.alt}
                  width={a.photo.width}
                  height={a.photo.height}
                  loading="lazy"
                  className="mb-4 size-20 rounded-full object-cover"
                  style={{ objectPosition: a.photo.position }}
                />
              )}
              <h2 className="font-slab text-title font-medium text-ink">{a.name}</h2>
              <p className="mt-1 mb-5 flex-1 text-body-dense text-copy">{a.blurb}</p>
              <Button soft variant="secondary" onClick={() => choose(a)} className="w-full">
                Sign in as {a.name.split(' ')[0]}
              </Button>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-dense text-copy">
          Want to host pets?
          <TextLink to={ROUTES.become}>Become a caregiver</TextLink>
          <button type="button" className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-[0.3em]" onClick={reset}>
            Reset demo data
          </button>
        </p>
      </div>
    </section>
  )
}
