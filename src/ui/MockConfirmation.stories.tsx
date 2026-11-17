import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { MockConfirmation } from './MockConfirmation'

const meta = {
  title: 'Display/MockConfirmation',
  component: MockConfirmation,
  args: {
    title: 'Your request is ready',
    children: 'Nothing was sent. This is a prototype, so no caregiver received it.',
    actions: <Button to="/dashboard">Go to my dashboard</Button>,
  },
} satisfies Meta<typeof MockConfirmation>
export default meta
type Story = StoryObj<typeof meta>

/** The headline takes focus when the screen appears. */
export const Default: Story = {}
