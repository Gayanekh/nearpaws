import type { HTMLAttributes } from 'react'

/** Small uppercase label with the short tan rule before it, used above headings. */
export function Eyebrow({ children, className = '', ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={`mb-5 font-sans text-label font-semibold tracking-label text-accent-ink uppercase before:mr-[0.9rem] before:inline-block before:h-0.5 before:w-9 before:-translate-y-px before:bg-accent before:align-middle before:content-[''] ${className}`}
    >
      {children}
    </p>
  )
}
