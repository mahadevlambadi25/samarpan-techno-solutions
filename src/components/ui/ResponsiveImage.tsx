import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { photoSrcSet, photoUrl } from '../../lib/images'
import { cn } from '../../lib/cn'
import type { Photo } from '../../types'

interface ResponsiveImageProps {
  photo: Photo
  /** width / height; the wrapper reserves this space to prevent layout shift. */
  aspect: number
  sizes: string
  priority?: boolean
  className?: string
  imgClassName?: string
  alt?: string
}

export function ResponsiveImage({
  photo,
  aspect,
  sizes,
  priority = false,
  className,
  imgClassName,
  alt,
}: ResponsiveImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)} style={{ aspectRatio: String(aspect) }}>
      {status === 'loading' && <div className="absolute inset-0 animate-pulse bg-line/50" aria-hidden="true" />}
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted" role="img" aria-label={alt ?? photo.alt}>
          <ImageOff className="size-7" aria-hidden="true" />
          <span className="text-sm">Image unavailable</span>
        </div>
      ) : (
        <img
          src={photoUrl(photo, 1080, Math.round(1080 / aspect))}
          srcSet={photoSrcSet(photo, aspect)}
          sizes={sizes}
          alt={alt ?? photo.alt}
          width={1080}
          height={Math.round(1080 / aspect)}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          ref={(el) => {
            // Cached images can finish loading before React attaches onLoad.
            if (el?.complete && el.naturalWidth > 0) setStatus('loaded')
          }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-500',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  )
}
