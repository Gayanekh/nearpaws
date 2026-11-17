import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTitle } from './PageTitle'

const meta = { title: 'Display/PageTitle', component: PageTitle, args: { eyebrow: 'Caregiver directory', title: 'Find a caregiver' } } satisfies Meta<typeof PageTitle>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithLead: Story = { args: { children: 'Filter the illustrative sample profiles. Prices and availability are examples only.' } }
