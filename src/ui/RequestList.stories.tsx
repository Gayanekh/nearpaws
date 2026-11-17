import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { seedRequests } from '../data/demo'
import { RequestList } from './RequestList'

const requests = seedRequests()

const meta = {
  title: 'Dashboard/RequestList',
  component: RequestList,
  args: { requests, selectedId: requests[0]!.id, onSelect: () => {}, who: (r) => (r.caregiverId === 'leo' ? 'Leo' : 'Noah') },
  render: function Render(args) {
    const [id, setId] = useState(args.selectedId)
    return <div className="max-w-sm bg-panel p-6"><RequestList {...args} selectedId={id} onSelect={setId} /></div>
  },
} satisfies Meta<typeof RequestList>
export default meta
type Story = StoryObj<typeof meta>

/** One request per status; the chosen one is filled with ink (and marked with aria-pressed). */
export const AllStatuses: Story = {}
export const SecondSelected: Story = { args: { selectedId: requests[1]!.id } }
export const SingleRequest: Story = { args: { requests: requests.slice(0, 1) } }
