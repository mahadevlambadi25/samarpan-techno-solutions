import type { LucideIcon } from 'lucide-react'

export interface Photo {
  /** Unsplash photo id (images.unsplash.com/photo-<id>) — replace with local company photos later. */
  id: string
  alt: string
  credit: string
  /** Short Unsplash page id, used for attribution links. */
  pageId: string
}

export type GalleryCategory = 'Control Panels' | 'Manufacturing' | 'Engineering Work' | 'Industrial Equipment'

export interface GalleryItem {
  photo: Photo
  caption: string
  category: GalleryCategory
}

export interface Service {
  slug: string
  title: string
  icon: LucideIcon
  summary: string
  description: string
  photo: Photo
}

export interface Project {
  slug: string
  title: string
  category: string
  description: string
  photo: Photo
  /** true = illustrative demo content, NOT real company work. */
  isDemo: boolean
}

export interface Feature {
  icon: LucideIcon
  title: string
  text: string
}

export interface NavItem {
  label: string
  to: string
}

export interface Crumb {
  label: string
  to?: string
}
