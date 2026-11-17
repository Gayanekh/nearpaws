import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SelectField } from './SelectField'

const meta = {
  title: 'Forms/SelectField',
  component: SelectField,
  args: {
    id: 'area',
    label: 'Area',
    value: '',
    onChange: () => {},
    options: [
      { value: 'maple-grove', label: 'Maple Grove' },
      { value: 'old-orchard', label: 'Old Orchard' },
      { value: 'cedar-park', label: 'Cedar Park' },
    ],
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <div className="max-w-[28rem]"><SelectField {...args} value={value} onChange={setValue} /></div>
  },
} satisfies Meta<typeof SelectField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomPlaceholder: Story = { args: { placeholder: 'Any area' } }
export const Selected: Story = { args: { value: 'old-orchard' } }
export const Required: Story = { args: { required: true } }
export const WithHint: Story = { args: { hint: 'Only an approximate neighborhood is ever shown.' } }
export const WithError: Story = { args: { required: true, error: 'Choose an area.' } }
