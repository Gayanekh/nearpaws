import { ROUTES } from '../routes'
import { Button } from '../ui/Button'

/** 404: display-xl numeral in Roboto Slab Light, one short sentence and the primary button. */
export function NpNotFound() {
  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <h1 className="font-slab text-display-xl font-light tracking-tight text-ink">404</h1>
      <p className="mt-6 mb-10 max-w-[34rem] text-lead text-copy">That page is not part of this prototype.</p>
      <Button to={ROUTES.home}>Back to home</Button>
    </section>
  )
}
