import { useEffect } from 'react'
import type { Crumb } from '../types'

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

interface SeoOptions {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  breadcrumbs?: Crumb[]
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeEl(selector: string) {
  document.head.querySelector(selector)?.remove()
}

/** Per-page title, description, Open Graph, canonical URL and breadcrumb structured data. */
export function useSeo({ title, description, path, image, noindex, breadcrumbs }: SeoOptions) {
  // Serialise so a new array literal on each render does not re-run the effect.
  const crumbsKey = JSON.stringify(breadcrumbs ?? [])
  useEffect(() => {
    const crumbs: Crumb[] = JSON.parse(crumbsKey)
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    if (image) upsertMeta('property', 'og:image', image)

    if (noindex) upsertMeta('name', 'robots', 'noindex, follow')
    else removeEl('meta[name="robots"]')

    // Canonical + og:url are emitted only when the verified domain is configured.
    if (SITE_URL) {
      const url = `${SITE_URL}${path === '/' ? '/' : path}`
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = url
      upsertMeta('property', 'og:url', url)
    }

    removeEl('script[data-seo="breadcrumbs"]')
    if (crumbs.length > 1) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = 'breadcrumbs'
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.label,
          ...(SITE_URL ? { item: `${SITE_URL}${c.to ?? path}` } : {}),
        })),
      })
      document.head.appendChild(script)
    }
  }, [title, description, path, image, noindex, crumbsKey])
}
