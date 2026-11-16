const STEPS = [
  { n: '01', title: 'Share your pet’s details', text: 'Describe their routine, food, medication and quirks once, in your own words.' },
  { n: '02', title: 'Choose a caregiver', text: 'Compare profiles, homes and neighborhoods, then pick the person who fits your pet.' },
  { n: '03', title: 'Arrange the care', text: 'Request dates, agree on handover, and send everything before the stay begins.' },
]

/**
 * How it works, from the approved preview: a wide photograph, a heading plate that overlaps it, and three numbered steps.
 * The step delays (0, 0.15s, 0.3s) are set by useNpMotion.
 */
export function NpHowItWorks() {
  return (
    <section className="np-how" id="how" aria-labelledby="how-h">
      <div className="np-how__photo np-rv">
        <img
          src="/img/how-wide.jpg"
          alt="A corgi and a small terrier running along a sunlit path (stock photo)"
          width={2000}
          height={1335}
          loading="lazy"
        />
      </div>
      <div className="np-how__plate np-rv">
        <p className="np-eyebrow">How it works</p>
        <h2 id="how-h">Three calm steps, before the first day.</h2>
      </div>
      <div className="np-wrap">
        <ol className="np-steps2">
          {STEPS.map((s) => (
            <li key={s.n} className="np-st np-rv">
              <div className="np-st__n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
