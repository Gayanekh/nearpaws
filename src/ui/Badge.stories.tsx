import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = { title: 'Display/Badge', component: Badge, args: { children: 'Cat specialist' } } satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Paper: Story = { decorators: [(Story) => <div className="bg-panel p-6"><Story /></div>] }
export const Accent: Story = { args: { tone: 'accent' } }
