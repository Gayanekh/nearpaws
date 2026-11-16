import { Eyebrow } from './ui/Eyebrow'

const STEPS = [
  { n: '01', title: 'Share your pet’s details', text: 'Describe their routine, food, medication and quirks once, in your own words.', offset: '' },
  { n: '02', title: 'Choose a caregiver', text: 'Compare profiles, homes and neighborhoods, then pick the person who fits your pet.', offset: 'min-[800px]:mt-[clamp(3rem,6vw,6rem)]' },
  { n: '03', title: 'Arrange the care', text: 'Request dates, agree on handover, and send everything before the stay begins.', offset: 'min-[800px]:mt-[clamp(6rem,12vw,12rem)]' },
]

/**
 * How it works, from the approved preview: a wide photograph, a heading plate that overlaps it, and three numbered steps.
 * The steps follow each other 0.15s apart (data-rv-delay) and descend like a staircase on wider screens.
 */
export function NpHowItWorks() {
  return (
    <section className="bg-paper pb-[clamp(2rem,4vw,4rem)]" id="how" aria-labelledby="how-h">
      <div className="relative aspect-[21/9] max-h-152 min-h-72 w-full overflow-hidden bg-panel" data-rv="" data-ph="">
        <img
          className="absolute inset-0 size-full object-cover object-[50%_60%]"
          src="/img/how-wide.jpg"
          alt="A corgi and a small terrier running along a sunlit path (stock photo)"
          width={2000}
          height={1335}
          loading="lazy"
        />
      </div>
      <div className="relative z-2 -mt-18 max-w-[54rem] bg-paper px-(--inset) pt-10 md:-mt-28 md:pt-14 md:pr-16" data-rv="">
        <Eyebrow>How it works</Eyebrow>
        <h2 id="how-h" className="text-section">Three calm steps, before the first day.</h2>
      </div>
      <div className="mx-auto max-w-360 px-(--inset)">
        <ol className="mt-14 grid list-none gap-11 p-0 min-[800px]:mt-18 min-[800px]:grid-cols-3 min-[800px]:gap-[clamp(1.5rem,3vw,4rem)] min-[800px]:pb-[clamp(3rem,8vw,8rem)]">
          {STEPS.map((s, i) => (
            <li key={s.n} className={`border-t-2 border-accent pt-6 ${s.offset}`} data-rv="" data-rv-delay={i * 150}>
              <div className="mb-5 font-slab text-[clamp(4.5rem,2rem+8vw,9rem)] leading-[0.85] font-light tracking-[-0.03em] text-accent-ink tabular-nums">{s.n}</div>
              <h3 className="mb-3 text-display-md font-normal">{s.title}</h3>
              <p className="max-w-[22rem]">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
