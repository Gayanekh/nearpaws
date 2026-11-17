import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Controls/Button',
  component: Button,
  args: { children: 'Find a caregiver' },
  argTypes: { variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ink'] } },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
/** The "ink" button is for tan blocks, where the tan primary button would disappear. */
export const InkOnTan: Story = {
  args: { variant: 'ink' },
  decorators: [(Story) => <div className="bg-accent p-8"><Story /></div>],
}
export const Soft: Story = { args: { soft: true } }
export const SoftSecondary: Story = { args: { soft: true, variant: 'secondary' } }

/** Disabled: not clickable, muted text, the fill fades. */
export const Disabled: Story = { args: { disabled: true } }
export const DisabledSecondary: Story = { args: { disabled: true, variant: 'secondary' } }

/** With `to` the button is a real link (same look), for navigation. */
export const AsLink: Story = { args: { to: '/caregivers', children: 'Browse caregivers' } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button soft>Soft</Button>
      <Button soft variant="secondary">Soft secondary</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
