import { Button } from '../components/Button'
import { Container } from '../components/Container'

export function NotFoundPage() {
  return (
    <section className="section page-top">
      <Container narrow>
        <h1>Page not found</h1>
        <p>That page is not part of this prototype.</p>
        <Button to="/">Back to home</Button>
      </Container>
    </section>
  )
}
