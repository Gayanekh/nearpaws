import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarePlan } from './CarePlan'

const meta = {
  title: 'Display/CarePlan',
  component: CarePlan,
  args: {
    title: 'Care plan',
    items: [
      { label: 'Morning walk', done: true },
      { label: 'Medication with breakfast', done: true },
      { label: 'Evening photo update', done: false },
    ],
  },
} satisfies Meta<typeof CarePlan>
export default meta
type Story = StoryObj<typeof meta>

/** Done items are announced as done in text, not only by the check mark. */
export const Mixed: Story = {}
export const AllDone: Story = { args: { items: [{ label: 'Morning walk', done: true }, { label: 'Evening photo update', done: true }] } }
export const NoneDone: Story = { args: { items: [{ label: 'Morning walk', done: false }, { label: 'Evening photo update', done: false }] } }
