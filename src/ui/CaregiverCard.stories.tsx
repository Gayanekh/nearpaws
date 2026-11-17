import type { Meta, StoryObj } from '@storybook/react-vite'
import { CAREGIVERS } from '../data/content'
import { CaregiverCard } from './CaregiverCard'

const meta = {
  title: 'Cards/CaregiverCard',
  component: CaregiverCard,
  args: { caregiver: CAREGIVERS[0]! },
  decorators: [(Story) => <div className="max-w-[22rem]"><Story /></div>],
} satisfies Meta<typeof CaregiverCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const EitherHandover: Story = { args: { caregiver: CAREGIVERS.find((c) => c.handover === 'both') ?? CAREGIVERS[1]! } }
export const CatSpecialist: Story = { args: { caregiver: CAREGIVERS.find((c) => c.id === 'leo')! } }

export const Grid: Story = {
  decorators: [(Story) => <div className="max-w-none"><Story /></div>],
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CAREGIVERS.map((c) => <CaregiverCard key={c.id} caregiver={c} />)}
    </div>
  ),
}
