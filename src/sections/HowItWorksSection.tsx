import { STEPS } from '../data/content'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

export function HowItWorksSection() {
  return (
    <section className="section" id="how-it-works" aria-labelledby="how-title">
      <Container>
        <SectionHeading id="how-title" eyebrow="How it works" title="Three calm steps" align="center" />
        <ol className="how-steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 100}>
                <div className="how-step">
                  <span className="how-step__num" aria-hidden="true">{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
