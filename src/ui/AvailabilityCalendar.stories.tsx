import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvailabilityCalendar } from './AvailabilityCalendar'

const meta = {
  title: 'Cards/AvailabilityCalendar',
  component: AvailabilityCalendar,
  args: { caregiverId: 'mara', start: '', end: '', onChange: () => {} },
  /** Sits on the tan block of the profile page. */
  decorators: [(Story) => <div className="max-w-[22rem] bg-accent p-6"><Story /></div>],
  render: function Render(args) {
    const [range, setRange] = useState({ start: args.start, end: args.end })
    return <AvailabilityCalendar {...args} start={range.start} end={range.end} onChange={(start, end) => setRange({ start, end })} />
  },
} satisfies Meta<typeof AvailabilityCalendar>
export default meta
type Story = StoryObj<typeof meta>

/** Open days are buttons; taken and past days are disabled. */
export const NoDaysChosen: Story = {}
export const AnotherCaregiver: Story = { args: { caregiverId: 'jonas' } }
