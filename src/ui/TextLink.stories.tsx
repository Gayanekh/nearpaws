import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from './TextLink'

const meta = {
  title: 'Controls/TextLink',
  component: TextLink,
  args: { to: '/become-a-caregiver', children: 'Become a caregiver' },
} satisfies Meta<typeof TextLink>
export default meta
type Story = StoryObj<typeof meta>

export const Forward: Story = {}
/** A link back: the arrow comes first and points left. */
export const Back: Story = { args: { back: true, to: '/caregivers', children: 'Back to all caregivers' } }
