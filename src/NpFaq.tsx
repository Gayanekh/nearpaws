import { Eyebrow } from './ui/Eyebrow'

const FAQS = [
  {
    q: 'Is this a real booking service?',
    a: 'No. This is an interactive prototype. Nothing you enter is sent or saved, and caregivers, prices and reviews are fictional.',
  },
  {
    q: 'Where would my pet stay?',
    a: 'Either at the caregiver’s home or at yours, depending on the option you choose and what the caregiver offers.',
  },
  {
    q: 'Will I see a caregiver’s exact address?',
    a: 'Not publicly. Profiles show an approximate neighborhood, and the exact address would be shared only after a booking is confirmed.',
  },
  {
    q: 'What do I tell the caregiver about my pet?',
    a: 'Food and allergies, medication, daily routine, behavior and emergency contacts, all in the request form before a stay begins.',
  },
  {
    q: 'Who checks the caregivers?',
    a: 'Nobody yet. A real service would need identity checks, insurance and clear policies, and would only mark a check complete once it was done.',
  },
]

/**
 * Questions, from the approved preview: a heading and photograph on the left, a numbered accordion on the right.
 * The accordion is native <details> elements sharing one name, so opening one closes the others and it works with the
 * keyboard and without JavaScript. The first answer starts open.
 */
export function NpFaq() {
  return (
    <section
      className="bg-panel py-(--section) group-data-[mo]/np:overflow-x-clip"
      aria-labelledby="faq-h"
      data-clip=""
    >
      <div className="mx-auto grid max-w-360 gap-12 px-(--inset) md:grid-cols-[5fr_7fr] md:items-start md:gap-[clamp(3rem,7vw,9rem)]">
        <div className="md:sticky md:top-8">
          <div data-rv="l">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-h" className="text-section">Frequently asked questions.</h2>
          </div>
          <figure className="relative mt-10 aspect-[4/5] max-w-[26rem] overflow-hidden bg-paper" data-rv="l" data-ph="">
            <img
              className="absolute inset-0 size-full object-cover object-[50%_40%]"
              src="/img/faq-cat.jpg"
              alt="A ginger cat lying on a wooden floor (stock photo)"
              width={1200}
              height={1680}
              loading="lazy"
            />
          </figure>
        </div>
        <div className="border-b border-hair" data-rv="r" data-accordion="">
          {FAQS.map((f, k) => (
            <details key={f.q} name="faq" open={k === 0} className="group/faq border-t border-hair">
              <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[3.25rem_1fr_auto] items-baseline gap-x-4 py-[1.6rem] font-slab text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] leading-[1.25] font-light text-ink after:size-5 after:self-center after:transition-transform after:duration-350 after:ease-out after:content-[''] after:[background:linear-gradient(var(--color-ink),var(--color-ink))_center/100%_1.5px_no-repeat,linear-gradient(var(--color-ink),var(--color-ink))_center/1.5px_100%_no-repeat] group-open/faq:after:rotate-135 [&::-webkit-details-marker]:hidden">
                <span className="font-slab text-[1.25rem] leading-none font-medium text-accent-ink tabular-nums">{String(k + 1).padStart(2, '0')}</span>
                <span>{f.q}</span>
              </summary>
              <p className="max-w-[42rem] pr-12 pb-[1.9rem] pl-17">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
