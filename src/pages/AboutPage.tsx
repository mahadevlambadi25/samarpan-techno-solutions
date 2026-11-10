import { Compass, Eye, GraduationCap, HandHeart, MapPin, PanelsTopLeft, Target } from 'lucide-react'
import { CTASection } from '../components/sections/CTASection'
import { PageHero } from '../components/sections/PageHero'
import { PlaceholderBadge } from '../components/ui/PlaceholderBadge'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { company, fullAddress } from '../data/company'
import { photos } from '../data/photos'
import { routeMeta } from '../data/routes'
import { services } from '../data/services'
import { useSeo } from '../hooks/useSeo'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }]

/**
 * Mission & vision: EDITABLE placeholders until approved by the company.
 * Replace `text` and set `approved: true` to remove the placeholder label.
 */
const missionVision = [
  {
    icon: Target,
    title: 'Our Mission',
    text: '[Mission statement to be provided and approved by SAMARPAN TECHNO SOLUTIONS.]',
    approved: false,
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: '[Vision statement to be provided and approved by SAMARPAN TECHNO SOLUTIONS.]',
    approved: false,
  },
]

/** Verified strengths only: each is drawn from supplied company details. */
const strengths = [
  {
    icon: GraduationCap,
    title: 'Qualified Leadership',
    text: `Led by ${company.proprietor.name}, who holds a ${company.proprietor.qualification} degree in electrical engineering.`,
  },
  {
    icon: PanelsTopLeft,
    title: 'Manufacturing Focus',
    text: 'Electrical control panel manufacturing is the core of our business.',
  },
  {
    icon: HandHeart,
    title: 'Service Ethos',
    text: `A commitment to seva and to “${company.slogan}”.`,
  },
  {
    icon: MapPin,
    title: 'Local Presence',
    text: `Based at ${company.address.locality}, ${company.address.city}.`,
  },
]

export default function AboutPage() {
  const meta = routeMeta('/about')
  useSeo({ title: meta.title, description: meta.description, path: '/about', breadcrumbs: crumbs })

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Serving with Excellence"
        intro={company.tagline + '.'}
        photo={photos.panelRoom}
        crumbs={crumbs}
      />

      {/* Introduction & business overview */}
      <section className="py-20 sm:py-28" aria-labelledby="overview-title">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading id="overview-title" eyebrow="Company Introduction" title="Who We Are" />
            <div className="mt-6 space-y-5 text-lg text-muted">
              <p>
                <strong className="font-semibold text-navy">{company.name}</strong> manufactures electrical control
                panels and provides seva (dedicated service) in the field of electrical engineering. We are based at{' '}
                {fullAddress}.
              </p>
              <h3 className="pt-4 text-3xl font-bold uppercase">Business Overview</h3>
              <p>Our work is organised into three areas:</p>
              <ul className="space-y-3">
                {services.map((s) => {
                  const Icon = s.icon
                  return (
                    <li key={s.slug} className="flex items-start gap-3">
                      <Icon className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-navy">{s.title}:</strong> {s.summary}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ResponsiveImage photo={photos.testing} aspect={4 / 5} sizes="(min-width: 1024px) 480px, 100vw" className="w-full" />
          </Reveal>
        </div>
      </section>

      {/* Proprietor */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="proprietor-title">
        <div className="container-site">
          <Reveal className="grid overflow-hidden border border-line bg-white md:grid-cols-[minmax(0,320px)_1fr]">
            <div className="bg-blueprint relative flex min-h-64 items-center justify-center bg-navy p-10">
              {/* Monogram placeholder: replace with an approved portrait photograph. */}
              <div className="flex size-40 items-center justify-center border-2 border-accent font-display text-6xl font-bold text-white">
                MNG
              </div>
              <PlaceholderBadge label="Photo placeholder" className="absolute bottom-4 left-4" />
            </div>
            <div className="p-8 sm:p-12">
              <p className="eyebrow text-brand-700">{company.proprietor.role}</p>
              <h2 id="proprietor-title" className="mt-3 text-4xl font-bold uppercase sm:text-5xl">
                {company.proprietor.name}
              </h2>
              <p className="mt-1 font-display text-xl font-semibold text-brand-700">
                {company.proprietor.qualification}
              </p>
              <div className="mt-6 space-y-4 text-lg text-muted">
                <p>
                  {company.proprietor.name}, a graduate in electrical engineering ({company.proprietor.qualification}),
                  is the proprietor of {company.name} and leads the company’s control panel manufacturing and
                  electrical engineering services.
                </p>
                <p>Customers can contact the proprietor directly to discuss their electrical requirements.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-28" aria-labelledby="philosophy-title">
        <div className="container-site max-w-4xl text-center">
          <Reveal>
            <Compass className="mx-auto size-10 text-accent" strokeWidth={1.5} aria-hidden="true" />
            <SectionHeading id="philosophy-title" align="center" eyebrow="Company Philosophy" title="Seva: Service with Dedication" className="mt-4" />
            <blockquote className="mt-8 font-display text-3xl leading-tight font-semibold text-navy sm:text-4xl">
              “{company.slogan}”
            </blockquote>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              The word <em>seva</em> in our tagline reflects how we approach our work: as a service rendered with
              sincerity and dedication. Our slogan, “{company.slogan},” is the standard we hold ourselves to in every
              control panel and every engagement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision placeholders */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="mv-title">
        <div className="container-site">
          <SectionHeading id="mv-title" eyebrow="Mission & Vision" title="What Drives Us" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {missionVision.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 0.08} className="border-t-4 border-navy bg-white p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="size-9 text-accent" strokeWidth={1.6} aria-hidden="true" />
                    {!item.approved && <PlaceholderBadge label="Awaiting approval" />}
                  </div>
                  <h3 className="mt-5 text-3xl font-bold uppercase">{item.title}</h3>
                  <p className={item.approved ? 'mt-3 text-lg text-muted' : 'mt-3 text-lg text-muted italic'}>{item.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Verified strengths */}
      <section className="py-20 sm:py-28" aria-labelledby="strengths-title">
        <div className="container-site">
          <SectionHeading id="strengths-title" eyebrow="Our Strengths" title="Built on a Strong Foundation" />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal as="li" key={s.title} delay={i * 0.06} className="border border-line p-7">
                  <Icon className="size-9 text-brand" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <CTASection title="Let’s Discuss Your Requirement" />
    </>
  )
}
