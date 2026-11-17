import type { Meta, StoryObj } from '@storybook/react-vite'
import { CAREGIVERS } from '../data/content'
import { CaregiverCard } from './CaregiverCard'

const meta = {
  title: 'Cards/CaregiverCard',
  component: CaregiverCard,
  args: { caregiver: CAREGIVERS[0]! },
} satisfies Meta<typeof CaregiverCard>
export default meta
type Story = StoryObj<typeof meta>

/** One card is shown at the width it has in the directory grid. */
const oneCard = [(Story: () => React.JSX.Element) => <div className="max-w-[22rem]"><Story /></div>]

export const Default: Story = { decorators: oneCard }
export const EitherHandover: Story = { decorators: oneCard, args: { caregiver: CAREGIVERS.find((c) => c.handover === 'both') ?? CAREGIVERS[1]! } }
export const CatSpecialist: Story = { decorators: oneCard, args: { caregiver: CAREGIVERS.find((c) => c.id === 'leo')! } }

/** All six sample caregivers in the directory grid. */
export const Grid: Story = {
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CAREGIVERS.map((c) => <CaregiverCard key={c.id} caregiver={c} />)}
    </div>
  ),
}
