import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'
import type { Service } from '../types'
import { ResponsiveImage } from './ui/ResponsiveImage'

interface ServiceCardProps {
  service: Service
  index: number
  detailed?: boolean
  headingLevel?: 'h2' | 'h3'
}

export function ServiceCard({ service, index, detailed = false, headingLevel: H = 'h3' }: ServiceCardProps) {
  const Icon = service.icon
  return (
    <article
      id={detailed ? service.slug : undefined}
      className="group flex h-full scroll-mt-28 flex-col border border-line bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgb(16_43_80_/_0.45)]"
    >
      <div className="relative">
        <ResponsiveImage
          photo={service.photo}
          aspect={16 / 10}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute -bottom-7 left-6 flex size-14 items-center justify-center bg-navy text-accent shadow-lg">
          <Icon className="size-7" aria-hidden="true" />
        </div>
        <span className="absolute top-0 right-0 bg-white/95 px-3 py-1.5 font-mono text-xs font-medium text-navy">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pt-12 pb-7">
        <H className="text-[1.65rem] font-bold uppercase">{service.title}</H>
        <p className={cn('mt-3 flex-1 text-muted')}>{detailed ? service.description : service.summary}</p>
        <Link
          to={`/contact?service=${encodeURIComponent(service.slug)}#enquiry`}
          className="mt-6 inline-flex items-center gap-2 self-start border-b-2 border-accent pb-1 font-display font-semibold tracking-wider text-navy uppercase transition-colors hover:text-brand-700"
          aria-label={`Enquire about ${service.title}`}
        >
          Enquire Now
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
