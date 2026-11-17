import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from './TextField'

const meta = {
  title: 'Forms/TextField',
  component: TextField,
  args: { id: 'email', label: 'Email', value: '', onChange: () => {} },
  /** The control keeps what is typed, as in the app (the value lives in the form). */
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <div className="max-w-[28rem]"><TextField {...args} value={value} onChange={setValue} /></div>
  },
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'We never send anything in this demo.' } }
export const Required: Story = { args: { required: true } }
export const Filled: Story = { args: { value: 'alex@example.com', type: 'email' } }
/** Error: red border, an icon and the words "Error:" (read by screen readers), linked with aria-describedby. */
export const WithError: Story = { args: { required: true, value: 'alex', error: 'Enter an email address with an @.' } }
export const Disabled: Story = { args: { value: 'alex@example.com', disabled: true } }
