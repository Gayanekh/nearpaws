import { Fragment, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Eyebrow } from './ui/Eyebrow'

interface CareOption {
  title: string
  description: string
  glance: string
  photo: { src: string; alt: string; width: number; height: number; position: string }
}

/** The three care options. Choosing one changes the photograph and the note on it. Copy and crops are the preview's. */
const OPTIONS: CareOption[] = [
  {
    title: 'Stay at a caregiver’s home',
    description: 'Your pet joins a real household, with a routine, a comfy spot and one-to-one attention.',
    glance: 'Best for pets who enjoy company.',
    photo: { src: '/img/opt-home.jpg', alt: 'A man hugging a golden retriever outdoors (stock photo)', width: 1600, height: 1069, position: '62% 50%' },
  },
  {
    title: 'Care at your home',
    description: 'A caregiver visits or stays over, so your pet keeps their own bed, smells and schedule.',
    glance: 'Best for pets who dislike change.',
    photo: { src: '/img/opt-own.jpg', alt: 'A tabby cat sitting on white stairs inside a home (stock photo)', width: 1600, height: 2133, position: '50% 38%' },
  },
  {
    title: 'Optional pickup and drop-off',
    description: 'Some caregivers can collect and return your pet. Others ask you to hand over in person.',
    glance: 'Each profile says which applies.',
    photo: { src: '/img/opt-handover.jpg', alt: 'A fluffy white dog running across grass toward the camera (stock photo)', width: 1600, height: 1067, position: '48% 50%' },
  },
]

/**
 * Care options section of the approved preview: a heading strip, a tall photograph that follows the choice, and a
 * vertical tab list. Tabs follow the ARIA tabs pattern (roving tabindex; Arrow keys, Home and End move and select).
 */
export function NpCareOptions() {
  const [selected, setSelected] = useState(0)
  // As in the preview, the images carry no aria-hidden until a tab has been chosen; after that the shown one says "false".
  const [chosen, setChosen] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const select = (n: number, focus = false) => {
    setSelected(n)
    setChosen(true)
    if (focus) tabRefs.current[n]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, k: number) => {
    const last = OPTIONS.length - 1
    let n = k
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (k + 1) % OPTIONS.length
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (k + last) % OPTIONS.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = last
    else return
    e.preventDefault()
    select(n, true)
  }

  return (
    <section
      className="grid bg-paper group-data-[mo]/np:overflow-x-clip md:grid-cols-2"
      id="options"
      aria-labelledby="options-h"
      data-clip=""
    >
      <div className="grid gap-6 px-(--inset) pt-[clamp(4.5rem,9vw,7.5rem)] pb-[clamp(2.5rem,4vw,4rem)] md:col-span-full md:grid-cols-2 md:items-end md:gap-x-[clamp(3rem,6vw,8rem)]">
        <div>
          <Eyebrow data-rv="">Care options</Eyebrow>
          <h2 id="options-h" className="max-w-[14ch] text-section" data-rv="">Care that fits your pet, not the other way round.</h2>
        </div>
        <p className="max-w-[30rem] text-lead md:pb-[0.4rem]" data-rv="">
          Choose where your pet is most comfortable, and how handover works. Every profile says exactly what is offered.
        </p>
      </div>

      <div className="relative aspect-[4/5] max-h-184 w-full overflow-hidden bg-panel md:aspect-auto md:max-h-none md:min-h-[clamp(38rem,46vw,50rem)]" data-rv="l" data-ph="">
        {OPTIONS.map((o, k) => (
          <img
            key={o.photo.src}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out ${k === selected ? 'opacity-100' : 'opacity-0'}`}
            src={o.photo.src}
            alt={o.photo.alt}
            width={o.photo.width}
            height={o.photo.height}
            loading="lazy"
            aria-hidden={k === selected ? (chosen ? 'false' : undefined) : 'true'}
            style={{ objectPosition: o.photo.position }}
          />
        ))}
        <p className="absolute bottom-0 left-0 z-2 max-w-[min(24rem,88%)] bg-accent px-(--inset) pt-5 pb-[1.4rem] font-sans text-[0.9375rem]/[1.5] font-medium text-ink">
          <small className="mb-[0.3rem] block text-label font-semibold tracking-label uppercase">At a glance</small>
          <span id="optNote">{OPTIONS[selected]!.glance}</span>
        </p>
      </div>

      <div className="px-(--inset) pt-[clamp(3.5rem,8vw,5rem)] pb-[clamp(4rem,9vw,6rem)] md:flex md:flex-col md:justify-center md:pt-12 md:pl-[clamp(3rem,6vw,8rem)]">
        <div className="border-b border-hair" role="tablist" aria-label="Care options" aria-orientation="vertical" data-rv="r">
          {OPTIONS.map((o, k) => (
            <Fragment key={o.title}>
              <button
                className="group relative grid min-h-14 w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-4 border-t border-hair py-5 text-left before:absolute before:top-[-1px] before:left-0 before:h-0.5 before:w-0 before:bg-accent before:transition-[width] before:duration-500 before:ease-out before:content-[''] aria-selected:before:w-full"
                type="button"
                role="tab"
                id={`tab-${k}`}
                ref={(el) => { tabRefs.current[k] = el }}
                aria-selected={k === selected}
                aria-controls={`tp-${k}`}
                tabIndex={k === selected ? 0 : -1}
                onClick={() => select(k)}
                onKeyDown={(e) => onKeyDown(e, k)}
              >
                <span className="font-slab text-numeral font-medium text-muted tabular-nums transition-colors duration-300 group-aria-selected:text-accent-ink">{String(k + 1).padStart(2, '0')}</span>
                <span className="font-slab text-[clamp(1.375rem,1rem+1.4vw,2.25rem)]/[1.15] font-light text-muted transition-colors duration-300 group-hover:text-ink group-aria-selected:text-ink">{o.title}</span>
              </button>
              <div className="max-w-[36rem] pb-7 pl-18" role="tabpanel" id={`tp-${k}`} aria-labelledby={`tab-${k}`} hidden={k !== selected}>
                <p>{o.description}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
