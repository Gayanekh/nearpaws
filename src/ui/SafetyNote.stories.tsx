import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyNote } from './SafetyNote'

const meta = {
  title: 'Display/SafetyNote',
  component: SafetyNote,
  args: { children: 'Nothing you enter here is sent or saved anywhere. Use made-up details.' },
} satisfies Meta<typeof SafetyNote>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomTitle: Story = { args: { title: 'About this demo' } }
