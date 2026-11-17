import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckList } from './CheckList'

const meta = {
  title: 'Display/CheckList',
  component: CheckList,
  args: { items: ['Three short walks a day', 'Play sessions', 'Photo update each day'] },
} satisfies Meta<typeof CheckList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const SingleItem: Story = { args: { items: ['Photo update each day'] } }
