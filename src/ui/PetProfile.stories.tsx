import type { Meta, StoryObj } from '@storybook/react-vite'
import { SAMPLE_PETS } from '../data/operations'
import { PetProfile } from './PetProfile'

const meta = { title: 'Display/PetProfile', component: PetProfile, args: { pet: SAMPLE_PETS['biscuit']! } } satisfies Meta<typeof PetProfile>
export default meta
type Story = StoryObj<typeof meta>

export const DogWithPhoto: Story = {}
export const CatWithMedication: Story = { args: { pet: SAMPLE_PETS['juniper']! } }
/** Optional parts (photo, breed, foods to avoid, routine) simply do not appear. */
export const Minimal: Story = {
  args: { pet: { name: 'Pebble', species: 'Rabbit', age: '2 years', size: 'Small', food: 'Hay and a handful of pellets', medication: 'None', behavior: 'Shy at first.' } },
}
export const WithRoutine: Story = { args: { pet: { ...SAMPLE_PETS['biscuit']!, routine: 'Walk at 7:30, dinner at 18:00, bed at 21:00.' } } }
