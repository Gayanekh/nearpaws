import type { ReactNode } from 'react'

interface FaqItemProps {
  question: string
  children: ReactNode
}

/** One accordion row built on <details>, so it works with the keyboard and without JavaScript. */
export function FaqItem({ question, children }: FaqItemProps) {
  return (
    <details className="faq-item" name="faq">
      <summary>{question}</summary>
      <p>{children}</p>
    </details>
  )
}
