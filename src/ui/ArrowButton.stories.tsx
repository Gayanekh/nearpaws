import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowButton } from './ArrowButton'

const meta = {
  title: 'Controls/ArrowButton',
  component: ArrowButton,
  args: { direction: 'next', 'aria-label': 'Next review' },
} satisfies Meta<typeof ArrowButton>
export default meta
type Story = StoryObj<typeof meta>

export const Next: Story = {}
export const Prev: Story = { args: { direction: 'prev', 'aria-label': 'Previous review' } }
export const Disabled: Story = { args: { disabled: true } }
