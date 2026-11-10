import { Link } from 'react-router-dom'
import { ServiceCard } from '../components/ServiceCard'
import { CTASection } from '../components/sections/CTASection'
import { PageHero } from '../components/sections/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { enquirySteps } from '../data/content'
import { photos } from '../data/photos'
import { routeMeta } from '../data/routes'
import { services } from '../data/services'
import { useSeo } from '../hooks/useSeo'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }]

export default function ServicesPage() {
  const meta = routeMeta('/services')
  useSeo({ title: meta.title, description: meta.description, path: '/services', breadcrumbs: crumbs })

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Electrical Control Panels & Engineering Services"
        intro="Control panel manufacturing and electrical engineering services for customers in and around Bangalore."
        photo={photos.breakerBox}
        crumbs={crumbs}
      />

      <section className="bg-surface py-20 sm:py-28" aria-labelledby="services-list-title">
        <div className="container-site">
          <SectionHeading
            id="services-list-title"
            eyebrow="What We Offer"
            title="Service Categories"
            intro="Every requirement is different. Tell us about your application and we will discuss the right approach and scope with you."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <ServiceCard service={s} index={i} detailed />
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-muted">
            The detailed scope of each service (panel types, specifications and site work) is confirmed with each
            customer during discussion. Please{' '}
            <Link to="/contact#enquiry" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              send us your requirement
            </Link>{' '}
            for more information.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="process-title">
        <div className="container-site">
          <SectionHeading
            id="process-title"
            eyebrow="How to Work with Us"
            title="From Enquiry to Execution"
            align="center"
            className="mx-auto"
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {enquirySteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="relative border border-line bg-white p-7">
                <span className="font-display text-5xl font-bold text-line" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute top-0 left-0 h-1 w-full bg-navy" aria-hidden="true" />
                <h3 className="mt-3 text-2xl font-bold uppercase">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  )
}
