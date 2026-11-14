import { MapPin } from 'lucide-react'
import { company, fullAddress } from '../data/company'
import { mapsEmbedSrc, mapsLink } from '../lib/contact'

export function MapEmbed() {
  return (
    <div className="relative h-full border border-line bg-surface">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[420px]">
        <iframe
          title={`Map showing ${company.name}, ${fullAddress}`}
          src={mapsEmbedSrc}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-navy px-3 py-2 text-sm font-semibold text-white shadow hover:bg-navy-800"
      >
        <MapPin className="size-4 text-accent" aria-hidden="true" /> Open in Google Maps
      </a>
    </div>
  )
}
