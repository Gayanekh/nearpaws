import type { ButtonHTMLAttributes } from 'react'

const PATHS = { prev: 'm15 4-8 8 8 8', next: 'm9 4 8 8-8 8' } as const

/** A 44px thin-line arrow button (previous or next). The arrow nudges 3px in its own direction on hover. */
export function ArrowButton({ direction, className = '', ...rest }: { direction: 'prev' | 'next' } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={`group grid size-11 place-items-center text-ink ${className}`} {...rest}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-5 fill-none stroke-current stroke-[1.25] transition-transform duration-300 ease-out ${direction === 'next' ? 'group-hover:translate-x-[3px]' : 'group-hover:-translate-x-[3px]'}`}
      >
        <path d={PATHS[direction]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
