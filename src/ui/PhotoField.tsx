import { useState } from 'react'
import { resizeImage } from '../utils/image'
import { Field } from './Field'

interface PhotoFieldProps {
  id: string
  label: string
  hint?: string
  /** Alt text of the preview. */
  alt?: string
  /** Shown while there is no chosen photo (for example the current portrait). It is not removable. */
  fallback?: string
  /** The chosen photo as a data URL, or an empty string. */
  value: string
  onChange: (value: string) => void
}

/**
 * A photo chooser in the same shell as the other fields: a preview (or an empty frame), a "Choose a photo" button and, once
 * there is a photo, "Remove photo". The file is shrunk in the browser and never uploaded. The native file input stays in the
 * page (hidden, still focusable and keyboard operable); the visible button is its label.
 */
export function PhotoField({ id, label, hint, alt = 'Your pet', fallback, value, onChange }: PhotoFieldProps) {
  const [error, setError] = useState('')

  const pick = async (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file (JPG, PNG or similar).')
      return
    }
    try {
      onChange(await resizeImage(file))
      setError('')
    } catch {
      setError('That image could not be read. Try another one.')
    }
  }

  return (
    <Field id={id} label={label} hint={hint} error={error || undefined}>
      {(aria) => (
        <div className="flex items-center gap-4">
          {value || fallback ? (
            <img src={value || fallback} alt={alt} className="size-20 shrink-0 rounded-[0.875rem] object-cover" />
          ) : (
            <span aria-hidden="true" className="grid size-20 shrink-0 place-items-center rounded-[0.875rem] border border-dashed border-field-border text-muted">
              <svg viewBox="0 0 24 24" className="size-7 fill-none stroke-current stroke-[1.5]">
                <circle cx="8" cy="9" r="1.8" /><circle cx="16" cy="9" r="1.8" /><circle cx="5.5" cy="13.5" r="1.6" /><circle cx="18.5" cy="13.5" r="1.6" />
                <path d="M12 12.5c-2.6 0-4.5 2.2-4.5 4 0 1.5 1.4 2 2.6 1.6.8-.3 1.3-.4 1.9-.4s1.1.1 1.9.4c1.2.4 2.6-.1 2.6-1.6 0-1.8-1.9-4-4.5-4Z" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <div className="grid justify-items-start gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center rounded-[0.875rem] border border-ink bg-paper px-5 font-sans text-ui font-medium tracking-ui text-ink transition-colors duration-200 ease-out focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink hover:bg-ink hover:text-paper">
              {value || fallback ? 'Choose another photo' : 'Choose a photo'}
              <input
                id={id}
                name={id}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  void pick(e.target.files?.[0])
                  e.target.value = ''
                }}
                {...aria}
              />
            </label>
            {value && (
              <button type="button" className="inline-flex min-h-11 items-center text-caption font-medium text-ink underline decoration-accent decoration-2 underline-offset-[0.25em]" onClick={() => onChange('')}>
                Remove photo
              </button>
            )}
          </div>
        </div>
      )}
    </Field>
  )
}
