import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eyebrow } from './Eyebrow'

const meta = { title: 'Display/Eyebrow', component: Eyebrow, args: { children: 'Meet caregivers' } } satisfies Meta<typeof Eyebrow>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
