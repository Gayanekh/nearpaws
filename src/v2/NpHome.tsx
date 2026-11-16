import { NpCareOptions } from './NpCareOptions'
import { NpCaregivers } from './NpCaregivers'
import { NpEnd } from './NpEnd'
import { NpFaq } from './NpFaq'
import { NpHero } from './NpHero'
import { NpHowItWorks } from './NpHowItWorks'
import { NpReviews } from './NpReviews'
import { NpStay } from './NpStay'

/** The redesign home page, assembled section by section as each one is approved. */
export function NpHome() {
  return (
    <>
      <NpHero />
      <NpCareOptions />
      <NpCaregivers />
      <NpHowItWorks />
      <NpStay />
      <NpReviews />
      <NpFaq />
      <NpEnd />
    </>
  )
}
