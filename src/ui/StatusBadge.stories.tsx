import type { Meta, StoryObj } from '@storybook/react-vite'
import { STATUS_LABELS } from '../data/statusLabels'
import type { RequestStatus } from '../data/statusLabels'
import { StatusBadge } from './StatusBadge'

const meta = {
  title: 'Display/StatusBadge',
  component: StatusBadge,
  args: { status: 'requested' },
  argTypes: { status: { control: 'select', options: Object.keys(STATUS_LABELS) } },
} satisfies Meta<typeof StatusBadge>
export default meta
type Story = StoryObj<typeof meta>

export const Requested: Story = {}
export const MoreInformation: Story = { args: { status: 'more-info' } }
export const Confirmed: Story = { args: { status: 'confirmed' } }
export const Declined: Story = { args: { status: 'declined' } }
export const Cancelled: Story = { args: { status: 'cancelled' } }

/** The word carries the meaning and each state has its own mark, so color is never the only cue. */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 bg-panel p-6">
      {(Object.keys(STATUS_LABELS) as RequestStatus[]).map((s) => <StatusBadge key={s} status={s} />)}
    </div>
  ),
}
