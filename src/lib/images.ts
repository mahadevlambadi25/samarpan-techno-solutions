import type { Photo } from '../types'

const WIDTHS = [480, 768, 1080, 1600, 2000]

/**
 * Builds Unsplash CDN URLs. `auto=format` serves AVIF/WebP to supporting browsers.
 * When replacing with local images, swap this helper for imported assets.
 */
export function photoUrl(photo: Photo, width: number, height?: number, quality = 70): string {
  const params = new URLSearchParams({ w: String(width), q: String(quality), auto: 'format', fit: 'crop' })
  if (height) params.set('h', String(height))
  return `https://images.unsplash.com/photo-${photo.id}?${params.toString()}`
}

export function photoSrcSet(photo: Photo, aspect?: number, maxWidth = 2000): string {
  return WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${photoUrl(photo, w, aspect ? Math.round(w / aspect) : undefined)} ${w}w`)
    .join(', ')
}

export function creditUrl(photo: Photo): string {
  return `https://unsplash.com/photos/${photo.pageId}`
}
