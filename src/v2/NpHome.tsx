import { NpCareOptions } from './NpCareOptions'
import { NpCaregivers } from './NpCaregivers'
import { NpHero } from './NpHero'
import { NpHowItWorks } from './NpHowItWorks'

/** The redesign home page, assembled section by section as each one is approved. */
export function NpHome() {
  return (
    <>
      <NpHero />
      <NpCareOptions />
      <NpCaregivers />
      <NpHowItWorks />
    </>
  )
}
