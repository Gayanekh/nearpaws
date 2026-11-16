const FAQS = [
  {
    q: 'Is this a real booking service?',
    a: 'No. This is a design preview of an interactive prototype. Nothing you enter is sent or saved, and caregivers, prices and reviews are fictional.',
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
    <section className="np-faq2" aria-labelledby="faq-h">
      <div className="np-wrap np-faq2__grid">
        <div className="np-faq2__side">
          <div className="np-rv">
            <p className="np-eyebrow">Questions</p>
            <h2 id="faq-h" className="np-h-lg">Frequently asked questions.</h2>
          </div>
          <figure className="np-faq2__photo np-rv">
            <img
              src="/img/faq-cat.jpg"
              alt="A ginger cat lying on a wooden floor (stock photo)"
              width={1200}
              height={1680}
              loading="lazy"
            />
          </figure>
        </div>
        <div className="np-faq2__list np-rv">
          {FAQS.map((f, k) => (
            <details key={f.q} name="faq" open={k === 0}>
              <summary>
                <span className="np-num">{String(k + 1).padStart(2, '0')}</span>
                <span>{f.q}</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
