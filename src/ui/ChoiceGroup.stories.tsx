import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChoiceGroup } from './ChoiceGroup'

const options = [
  { value: 'home', label: 'At the caregiver’s home' },
  { value: 'owner', label: 'At your home' },
  { value: 'both', label: 'Either works' },
]

const meta = {
  title: 'Forms/ChoiceGroup',
  component: ChoiceGroup,
  args: { id: 'care', legend: 'Care type', type: 'radio', options, selected: [], onChange: () => {} },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selected)
    return <ChoiceGroup {...args} selected={selected} onChange={setSelected} />
  },
} satisfies Meta<typeof ChoiceGroup>
export default meta
type Story = StoryObj<typeof meta>

export const RadioList: Story = {}
export const RadioChosen: Story = { args: { selected: ['owner'] } }
export const CheckboxList: Story = { args: { type: 'checkbox', legend: 'Pet sizes', selected: ['home', 'both'] } }
export const WithDescriptions: Story = {
  args: { options: options.map((o) => ({ ...o, description: 'Each profile says which applies.' })) },
}
export const Required: Story = { args: { required: true } }
export const WithHint: Story = { args: { hint: 'Choose one option.' } }
export const WithError: Story = { args: { required: true, error: 'Choose a care type.' } }

/** Soft pills; the chosen ones fill with ink. */
export const Chips: Story = { args: { variant: 'chips', type: 'checkbox', selected: ['home'] } }
export const ChipsWithError: Story = { args: { variant: 'chips', type: 'checkbox', required: true, error: 'Choose at least one.' } }

/** A choice of one on a soft track, the chosen option a filled ink pill, with an icon before each label. */
export const Segmented: Story = {
  args: {
    variant: 'segmented',
    legend: 'I am a',
    required: true,
    selected: ['owner'],
    options: [
      { value: 'owner', label: 'Pet owner' },
      { value: 'caregiver', label: 'Caregiver' },
    ],
  },
}
