import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandLogo } from './BrandLogo'

const meta = { title: 'Display/BrandLogo', component: BrandLogo, args: { className: 'h-24' } } satisfies Meta<typeof BrandLogo>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnPanel: Story = { decorators: [(Story) => <div className="bg-panel p-8"><Story /></div>] }
