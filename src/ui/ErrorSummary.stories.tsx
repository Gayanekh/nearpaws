import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorSummary } from './ErrorSummary'

const meta = { title: 'Forms/ErrorSummary', component: ErrorSummary, args: { errors: { email: 'Enter an email address with an @.' } } } satisfies Meta<typeof ErrorSummary>
export default meta
type Story = StoryObj<typeof meta>

export const OneProblem: Story = {}
/** Several problems: each message links to its field, and focus moves to the list. */
export const SeveralProblems: Story = {
  args: { errors: { name: 'Enter your name.', email: 'Enter an email address with an @.', petName: 'Enter your pet’s name.' } },
}
/** No problems: nothing is drawn. */
export const NoProblems: Story = { args: { errors: {} } }
