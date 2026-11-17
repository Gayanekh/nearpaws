import type { RequestMessage, Role } from '../data/demo'

interface MessageThreadProps {
  messages: RequestMessage[]
  /** Who is reading: their own messages say "You". */
  viewer: Role
  /** The name of the other person. */
  otherName: string
}

/** The short exchange on a request (a caregiver's question and the owner's reply, an acceptance, a decline). */
export function MessageThread({ messages, viewer, otherName }: MessageThreadProps) {
  if (!messages.length) return null
  return (
    <ul className="grid">
      {messages.map((m, i) => (
        <li key={`${i}-${m.text}`} className="border-t border-ink/15 py-4 text-body-dense text-ink">
          <strong className="block font-semibold">{m.from === viewer ? 'You' : otherName}</strong>
          {m.text}
        </li>
      ))}
    </ul>
  )
}
