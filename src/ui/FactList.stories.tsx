import type { Meta, StoryObj } from '@storybook/react-vite'
import { FactList } from './FactList'

const items = [
  { term: 'Home type', text: 'Small house with a cat room' },
  { term: 'Outdoor space', text: 'Enclosed catio' },
  { term: 'Other pets', text: 'None' },
  { term: 'Time at home', text: 'Home most days' },
]

const meta = { title: 'Display/FactList', component: FactList, args: { items } } satisfies Meta<typeof FactList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Narrow columns: the term sits above its value. */
export const Stacked: Story = { args: { stacked: true }, decorators: [(Story) => <div className="max-w-80"><Story /></div>] }
/** On a tan block the terms turn ink to keep 4.5:1 contrast. */
export const OnAccent: Story = { args: { onAccent: true }, decorators: [(Story) => <div className="bg-accent p-8"><Story /></div>] }
