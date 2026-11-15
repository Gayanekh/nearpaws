import { AboutSection } from '../sections/AboutSection'
import { CareOptionsSection } from '../sections/CareOptionsSection'
import { FaqSection } from '../sections/FaqSection'
import { FeaturedCaregiversSection } from '../sections/FeaturedCaregiversSection'
import { FinalCtaSection } from '../sections/FinalCtaSection'
import { HeroSection } from '../sections/HeroSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { PetStaySection } from '../sections/PetStaySection'
import { ReviewsSection } from '../sections/ReviewsSection'
import { RoutineBannerSection } from '../sections/RoutineBannerSection'
import { StartHereSection } from '../sections/StartHereSection'
import { TrustSection } from '../sections/TrustSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CareOptionsSection />
      <AboutSection />
      <RoutineBannerSection />
      <FeaturedCaregiversSection />
      <HowItWorksSection />
      <PetStaySection />
      <TrustSection />
      <StartHereSection />
      <ReviewsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
