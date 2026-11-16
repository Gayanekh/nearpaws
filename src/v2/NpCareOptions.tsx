import { Fragment, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

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
    <section className="np-opts" data-clip="" aria-labelledby="options-h">
      <div className="np-opts__head">
        <div>
          <p className="np-eyebrow" data-rv="">Care options</p>
          <h2 id="options-h" data-rv="">Care that fits your pet, not the other way round.</h2>
        </div>
        <p className="np-lead" data-rv="">
          Choose where your pet is most comfortable, and how handover works. Every profile says exactly what is offered.
        </p>
      </div>

      <div className="np-opts__media" data-rv="l" data-ph="">
        {OPTIONS.map((o, k) => (
          <img
            key={o.photo.src}
            className={k === selected ? 'np-is-on' : undefined}
            src={o.photo.src}
            alt={o.photo.alt}
            width={o.photo.width}
            height={o.photo.height}
            loading="lazy"
            aria-hidden={k === selected ? (chosen ? 'false' : undefined) : 'true'}
            style={{ objectPosition: o.photo.position }}
          />
        ))}
        <p className="np-opts__note"><small>At a glance</small><span id="optNote">{OPTIONS[selected]!.glance}</span></p>
      </div>

      <div className="np-opts__copy">
        <div className="np-tabs" data-rv="r" role="tablist" aria-label="Care options" aria-orientation="vertical">
          {OPTIONS.map((o, k) => (
            <Fragment key={o.title}>
              <button
                className="np-tab"
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
                <span className="np-num">{String(k + 1).padStart(2, '0')}</span>
                <span className="np-t">{o.title}</span>
              </button>
              <div className="np-tabpanel" role="tabpanel" id={`tp-${k}`} aria-labelledby={`tab-${k}`} hidden={k !== selected}>
                <p>{o.description}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
