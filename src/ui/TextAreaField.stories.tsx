import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextAreaField } from './TextAreaField'

const meta = {
  title: 'Forms/TextAreaField',
  component: TextAreaField,
  args: { id: 'routine', label: 'Daily routine', value: '', onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <div className="max-w-[32rem]"><TextAreaField {...args} value={value} onChange={setValue} /></div>
  },
} satisfies Meta<typeof TextAreaField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Walks, meals, naps, anything that helps.' } }
export const Required: Story = { args: { required: true } }
export const Filled: Story = { args: { value: 'Breakfast at 8:00, a walk at 9:00, nap after lunch.' } }
export const WithError: Story = { args: { required: true, error: 'Tell the caregiver a little about the routine.' } }
export const Tall: Story = { args: { rows: 8 } }
