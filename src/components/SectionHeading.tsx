interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
  level?: 1 | 2
}

/** Eyebrow + title + optional intro. Use level 1 only once per page. */
export function SectionHeading({ eyebrow, title, description, align = 'left', id, level = 2 }: SectionHeadingProps) {
  const Tag = level === 1 ? 'h1' : 'h2'
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id}>{title}</Tag>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}
