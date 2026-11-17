import { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useDemo } from '../demo/useDemo'
import { AccountMenu } from './AccountMenu'

/** Signs a sample person in, as the demo sign-in page does. */
function SignedInAs({ id }: { id: string }) {
  const { signIn } = useDemo()
  useEffect(() => signIn(id), [id, signIn])
  return <div className="flex justify-end"><AccountMenu /></div>
}

const meta = { title: 'Navigation/AccountMenu', component: AccountMenu } satisfies Meta<typeof AccountMenu>
export default meta
type Story = StoryObj<typeof meta>

export const PetOwner: Story = { render: () => <SignedInAs id="owner-alex" /> }
export const Caregiver: Story = { render: () => <SignedInAs id="caregiver-mara" /> }
/** Signed out: the menu draws nothing (the header shows "Sign in" instead). */
export const SignedOut: Story = {}
