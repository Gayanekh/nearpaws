interface CarePlanProps {
  title: string
  items: { label: string; done: boolean }[]
}

/** Read-only checklist. The done state is also announced in text, not only by the mark. */
export function CarePlan({ title, items }: CarePlanProps) {
  return (
    <div>
      <h3 className="mb-4 font-slab text-title font-medium text-ink">{title}</h3>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3 text-body-dense text-ink">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-5 shrink-0 fill-none stroke-ink stroke-[1.5]">
              {item.done ? (
                <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <circle cx="12" cy="12" r="7" />
              )}
            </svg>
            <span>
              {item.label}
              <span className="sr-only">{item.done ? ' (done)' : ' (not done yet)'}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
