import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepIndicator } from './StepIndicator'

const meta = {
  title: 'Display/StepIndicator',
  component: StepIndicator,
  args: { steps: ['Dates and care', 'Your pet', 'Send request'], current: 0 },
} satisfies Meta<typeof StepIndicator>
export default meta
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {}
/** Done steps get a check and the word "done"; the current step is underlined. */
export const MiddleStep: Story = { args: { current: 1 } }
export const LastStep: Story = { args: { current: 2 } }
