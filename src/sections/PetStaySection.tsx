import { STAY_DETAILS } from '../data/content'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { Photo } from '../components/Photo'
import { SectionHeading } from '../components/SectionHeading'

export function PetStaySection() {
  return (
    <section className="section section--sand" aria-labelledby="stay-title">
      <Container>
        <SectionHeading
          id="stay-title"
          eyebrow="Know before you go"
          title="Know where your pet will stay, and with whom"
          description="Every profile answers the questions owners usually ask first."
        />
        <div className="grid grid--4">
          {STAY_DETAILS.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="card stay-card">
                <Photo scene={item.scene} label={item.title} />
                <div className="stay-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
