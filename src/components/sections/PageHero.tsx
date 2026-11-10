import type { ReactNode } from 'react'
import { photoSrcSet, photoUrl } from '../../lib/images'
import type { Crumb, Photo } from '../../types'
import { Breadcrumbs } from '../Breadcrumbs'

interface PageHeroProps {
  eyebrow: string
  title: string
  intro?: ReactNode
  photo: Photo
  crumbs: Crumb[]
}

/** Compact hero for inner pages, with breadcrumbs. */
export function PageHero({ eyebrow, title, intro, photo, crumbs }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy" aria-labelledby="page-title">
      <img
        src={photoUrl(photo, 1600, 600)}
        srcSet={photoSrcSet(photo, 1600 / 600)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_51_/_0.95),rgb(16_43_80_/_0.78))]" />
      <div className="bg-blueprint absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site py-16 sm:py-20 lg:py-24">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-8 flex items-center gap-3 text-accent">
          <span className="rule-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 id="page-title" className="mt-4 max-w-3xl text-[2.5rem] font-bold text-white uppercase sm:text-6xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-white/80">{intro}</p>}
      </div>
    </section>
  )
}
