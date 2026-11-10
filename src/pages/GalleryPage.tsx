import { GalleryGrid } from '../components/GalleryGrid'
import { CTASection } from '../components/sections/CTASection'
import { PageHero } from '../components/sections/PageHero'
import { PlaceholderNote } from '../components/ui/PlaceholderBadge'
import { galleryCategories, galleryItems } from '../data/gallery'
import { photos } from '../data/photos'
import { routeMeta } from '../data/routes'
import { useSeo } from '../hooks/useSeo'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Gallery', to: '/gallery' }]

export default function GalleryPage() {
  const meta = routeMeta('/gallery')
  useSeo({ title: meta.title, description: meta.description, path: '/gallery', breadcrumbs: crumbs })

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Panels, Engineering & Industry"
        intro="Electrical control panels, manufacturing environments, engineering work and industrial equipment."
        photo={photos.indicators}
        crumbs={crumbs}
      />
      <section className="py-20 sm:py-24" aria-label="Image gallery">
        <div className="container-site">
          <PlaceholderNote className="mb-10">
            These are illustrative images from Unsplash, used for design purposes. They will be replaced with
            photographs of the company’s own work when available.
          </PlaceholderNote>
          <GalleryGrid items={galleryItems} categories={galleryCategories} />
        </div>
      </section>
      <CTASection />
    </>
  )
}
