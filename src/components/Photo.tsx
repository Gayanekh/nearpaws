import type { SceneVariant } from '../types'
import { SCENE_PHOTOS, unsplashUrl } from '../data/photos'

interface PhotoProps {
  scene: SceneVariant
  label: string
  className?: string
}

/** A stock photo of a home or garden. The small tag makes clear it is illustrative. */
export function Photo({ scene, label, className = '' }: PhotoProps) {
  const { id, alt } = SCENE_PHOTOS[scene]
  return (
    <figure className={`photo ${className}`}>
      <img
        src={unsplashUrl(id, 800)}
        srcSet={`${unsplashUrl(id, 500)} 500w, ${unsplashUrl(id, 900)} 900w, ${unsplashUrl(id, 1400)} 1400w`}
        sizes="(max-width: 700px) 100vw, 420px"
        alt={`${label}. ${alt} (stock photo)`}
        width={800}
        height={600}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="photo__tag">Stock photo</figcaption>
    </figure>
  )
}
