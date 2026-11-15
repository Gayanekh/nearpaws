import { START_ACTIONS } from '../data/content'
import { ActionCard } from '../components/ActionCard'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

/** Four colored shortcuts on a large rounded panel. */
export function StartHereSection() {
  return (
    <section className="section" aria-labelledby="start-title">
      <Container>
        <div className="start-panel">
          <SectionHeading id="start-title" align="center" eyebrow="Start here" title="Four ways to get going" description="Everything in this prototype is a click away." />
          <div className="grid grid--4">
            {START_ACTIONS.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <ActionCard action={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
