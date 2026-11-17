import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PhotoField } from './PhotoField'

const meta = {
  title: 'Forms/PhotoField',
  component: PhotoField,
  args: { id: 'pet-photo', label: 'Photo of your pet', hint: 'Shrunk in your browser; never uploaded.', value: '', onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return <div className="max-w-[32rem]"><PhotoField {...args} value={value} onChange={setValue} /></div>
  },
} satisfies Meta<typeof PhotoField>
export default meta
type Story = StoryObj<typeof meta>

/** No photo yet: a dashed frame and "Choose a photo". */
export const Empty: Story = {}
/** With a photo: a preview, "Choose another photo" and "Remove photo". */
export const WithPhoto: Story = { args: { value: '/img/hero-biscuit.jpg', alt: 'Biscuit, a beagle mix' } }
/** A current portrait is shown while nothing new is chosen; it cannot be removed. */
export const WithFallback: Story = { args: { label: 'Your photo', alt: 'Your profile photo', fallback: '/img/meet-leo.jpg' } }
