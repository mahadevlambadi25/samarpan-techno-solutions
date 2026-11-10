import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { creditUrl, photoSrcSet, photoUrl } from '../lib/images'
import type { GalleryItem } from '../types'
import { ResponsiveImage } from './ui/ResponsiveImage'

interface GalleryGridProps {
  items: GalleryItem[]
  categories?: string[]
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<number | null>(null)
  const [lightboxError, setLightboxError] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const visible = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  )

  const open = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setLightboxError(false)
    setActive(index)
    dialogRef.current?.showModal()
  }
  const close = useCallback(() => dialogRef.current?.close(), [])
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightboxError(false)
      setActive((i) => (i === null ? i : (i + dir + visible.length) % visible.length))
    },
    [visible.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => {
      setActive(null)
      triggerRef.current?.focus()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    dialog.addEventListener('close', onClose)
    dialog.addEventListener('keydown', onKey)
    return () => {
      dialog.removeEventListener('close', onClose)
      dialog.removeEventListener('keydown', onKey)
    }
  }, [step])

  const current = active !== null ? visible[active] : null

  return (
    <div>
      {categories && (
        <div role="group" aria-label="Filter gallery by category" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                'min-h-11 border px-4 font-display text-[0.95rem] font-semibold tracking-wider uppercase transition-colors',
                filter === c
                  ? 'border-navy bg-navy text-white'
                  : 'border-line bg-white text-ink/75 hover:border-navy hover:text-navy',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} image{visible.length === 1 ? '' : 's'}
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-line py-20 text-center text-muted">
          <ImageOff className="size-8" aria-hidden="true" />
          <p>No images in this category yet.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <li key={`${item.photo.id}-${item.category}`}>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block w-full text-left"
                aria-label={`View larger: ${item.caption}`}
              >
                <ResponsiveImage
                  photo={item.photo}
                  aspect={4 / 3}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent p-4 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <span className="flex w-full items-end justify-between gap-3">
                    <span>
                      <span className="block font-mono text-[0.68rem] tracking-wider text-accent uppercase">
                        {item.category}
                      </span>
                      <span className="block font-display text-lg font-semibold text-white">{item.caption}</span>
                    </span>
                    <Maximize2 className="size-5 shrink-0 text-white" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={current ? current.caption : 'Image viewer'}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-navy-950/90"
      >
        {current && (
          <div className="flex w-[min(92vw,1200px)] flex-col">
            <div className="flex items-center justify-between gap-4 pb-3 text-white">
              <p className="font-mono text-xs tracking-wider text-white/70 uppercase">
                {active! + 1} / {visible.length} · {current.category}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close image viewer"
                className="flex size-11 items-center justify-center border border-white/30 hover:bg-white hover:text-navy"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex max-h-[75vh] items-center justify-center bg-navy-950">
              {lightboxError ? (
                <div className="flex h-[50vh] flex-col items-center justify-center gap-2 text-white/70">
                  <ImageOff className="size-8" aria-hidden="true" />
                  <p>This image could not be loaded.</p>
                </div>
              ) : (
                <img
                  key={current.photo.id}
                  src={photoUrl(current.photo, 1600)}
                  srcSet={photoSrcSet(current.photo)}
                  sizes="92vw"
                  alt={current.photo.alt}
                  onError={() => setLightboxError(true)}
                  className="max-h-[75vh] w-auto object-contain"
                />
              )}
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className="absolute left-2 flex size-11 items-center justify-center bg-white/90 text-navy hover:bg-accent"
                  >
                    <ChevronLeft className="size-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className="absolute right-2 flex size-11 items-center justify-center bg-white/90 text-navy hover:bg-accent"
                  >
                    <ChevronRight className="size-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1 pt-3 text-white sm:flex-row sm:items-baseline sm:justify-between">
              <p className="font-display text-xl font-semibold">{current.caption}</p>
              <p className="text-sm text-white/60">
                Illustrative photo by{' '}
                <a href={creditUrl(current.photo)} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                  {current.photo.credit} on Unsplash
                </a>
              </p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
