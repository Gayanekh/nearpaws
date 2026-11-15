interface ChecklistProps {
  title: string
  items: { label: string; done: boolean }[]
}

/** Read-only checklist. Done state is announced in text, not only by the icon. */
export function Checklist({ title, items }: ChecklistProps) {
  return (
    <div className="checklist">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <span aria-hidden="true">{item.done ? '✓' : '○'}</span>
            {item.label}
            <span className="visually-hidden">{item.done ? ' (done)' : ' (not done yet)'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
