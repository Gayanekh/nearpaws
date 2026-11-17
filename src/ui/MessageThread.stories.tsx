import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageThread } from './MessageThread'

const messages = [
  { from: 'caregiver' as const, text: 'What time does Juniper usually get her thyroid tablet?' },
  { from: 'owner' as const, text: 'With breakfast, around 7:30.' },
]

const meta = {
  title: 'Display/MessageThread',
  component: MessageThread,
  args: { messages, viewer: 'owner', otherName: 'Leo' },
} satisfies Meta<typeof MessageThread>
export default meta
type Story = StoryObj<typeof meta>

/** The owner's own messages say "You"; the caregiver is named. */
export const OwnerView: Story = {}
export const CaregiverView: Story = { args: { viewer: 'caregiver', otherName: 'Alex Morgan' } }
export const SingleMessage: Story = { args: { messages: messages.slice(0, 1) } }
/** With no messages nothing is drawn. */
export const Empty: Story = { args: { messages: [] } }
