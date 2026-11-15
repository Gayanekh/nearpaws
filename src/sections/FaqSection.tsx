import { FAQS } from '../data/content'
import { Container } from '../components/Container'
import { FaqItem } from '../components/FaqItem'
import { SectionHeading } from '../components/SectionHeading'

export function FaqSection() {
  return (
    <section id="faq" className="section section--mint" aria-labelledby="faq-title">
      <Container narrow>
        <SectionHeading id="faq-title" align="center" eyebrow="Questions" title="Frequently asked questions" />
        <div className="faq">
          {FAQS.map((f) => <FaqItem key={f.question} question={f.question}>{f.answer}</FaqItem>)}
        </div>
      </Container>
    </section>
  )
}
