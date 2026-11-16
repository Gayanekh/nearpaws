interface Fact {
  term: string
  text: string
}

/**
 * A description list with a hairline between rows (no boxes). Each row is a small uppercase term and its value; rows sit
 * side by side from the sm breakpoint, or stacked when `stacked` is set (narrow columns).
 */
export function FactList({ items, stacked = false }: { items: Fact[]; stacked?: boolean }) {
  return (
    <dl className="border-b border-ink/15">
      {items.map((f) => (
        <div
          key={f.term}
          className={`grid gap-x-6 gap-y-1 border-t border-ink/15 py-4 ${stacked ? '' : 'sm:grid-cols-[10rem_minmax(0,1fr)]'}`}
        >
          <dt className="font-sans text-label font-semibold tracking-label text-accent-ink uppercase">{f.term}</dt>
          <dd className="text-body-dense text-ink">{f.text}</dd>
        </div>
      ))}
    </dl>
  )
}
