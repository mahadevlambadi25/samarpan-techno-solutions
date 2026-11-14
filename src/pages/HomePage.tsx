import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MapEmbed } from '../components/MapEmbed'
import { ProjectCard } from '../components/ProjectCard'
import { ServiceCard } from '../components/ServiceCard'
import { CTASection } from '../components/sections/CTASection'
import { ContactInfo } from '../components/sections/ContactInfo'
import { HeroSection } from '../components/sections/HeroSection'
import { ButtonLink } from '../components/ui/Button'
import { PlaceholderBadge, PlaceholderNote } from '../components/ui/PlaceholderBadge'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { company } from '../data/company'
import { capabilities, whyChooseUs } from '../data/content'
import { photos } from '../data/photos'
import { projects } from '../data/projects'
import { routeMeta } from '../data/routes'
import { services } from '../data/services'
import { useSeo } from '../hooks/useSeo'

export default function HomePage() {
  const meta = routeMeta('/')
  useSeo({ title: meta.title, description: meta.description, path: '/' })

  return (
    <>
      <HeroSection />

      {/* 3. Company introduction */}
      <section className="py-20 sm:py-28" aria-labelledby="intro-title">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <ResponsiveImage
              photo={photos.panelRoom}
              aspect={4 / 3.6}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="w-full"
            />
            <div className="absolute -right-3 -bottom-3 -z-10 hidden size-40 bg-blueprint-light bg-surface sm:block" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 bg-accent px-5 py-3 font-display text-lg font-bold tracking-wider text-navy uppercase">
              {company.slogan}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              id="intro-title"
              eyebrow="Who We Are"
              title={<>Electrical Control Panels, Built with Care in Bangalore</>}
            />
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                <strong className="font-semibold text-navy">{company.name}</strong> is a Bangalore-based business
                engaged in the manufacture of electrical control panels and in providing seva (dedicated service) in the
                field of electrical engineering.
              </p>
              <p>
                The business is led by its proprietor, <strong className="font-semibold text-navy">{company.proprietor.name}</strong>,{' '}
                {company.proprietor.qualification}, and operates from Sunkadakatte, Bangalore.
              </p>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {['Electrical control panel manufacturing', 'Electrical engineering services', 'Industrial electrical solutions', 'Engineer-led business'].map((t) => (
                <li key={t} className="flex items-start gap-2.5 font-medium text-navy">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <ButtonLink to="/about" variant="outline" className="mt-9">
              More About Us <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* 4. Core services */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="services-title">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="services-title"
              eyebrow="Our Core Services"
              title="What We Do"
              intro="Our services are built around one focus: dependable electrical control panels and engineering support for our customers."
            />
            <ButtonLink to="/services" variant="ghost" className="self-start md:self-auto">
              All Services <ArrowRight />
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why choose us */}
      <section className="py-20 sm:py-28" aria-labelledby="why-title">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionHeading
              id="why-title"
              eyebrow="Why Choose Us"
              title="Engineering Expertise. Personal Commitment."
              intro={`Working with ${company.displayName} means working directly with a qualified electrical engineer who is committed to serving with excellence.`}
            />
            <ButtonLink to="/contact" className="mt-8">
              Talk to Us <ArrowRight />
            </ButtonLink>
          </Reveal>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {whyChooseUs.map((f, i) => {
              const Icon = f.icon
              return (
                <Reveal as="li" key={f.title} delay={(i % 2) * 0.08} className="group bg-white p-7 transition-colors hover:bg-surface">
                  <Icon className="size-9 text-brand transition-colors group-hover:text-accent" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold uppercase">{f.title}</h3>
                  <p className="mt-2 text-muted">{f.text}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 6. Engineering capabilities: placeholder list pending company confirmation */}
      <section className="bg-blueprint relative bg-navy py-20 text-white sm:py-28" aria-labelledby="cap-title">
        <div className="container-site">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="cap-title"
              tone="light"
              eyebrow="Engineering Capabilities"
              title="Control Panel Expertise"
              intro="An overview of the types of electrical control panels and related work we take up."
            />
            <PlaceholderBadge label="Illustrative list: to be confirmed" className="self-start md:self-auto" />
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal
                  as="li"
                  key={c.title}
                  delay={(i % 3) * 0.06}
                  className="flex items-center gap-5 border border-white/15 bg-white/[0.04] p-6 transition-colors hover:border-accent/70"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center border border-accent/60 text-accent">
                    <Icon className="size-7" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-xs text-white/50">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[1.45rem] font-bold text-white uppercase">{c.title}</h3>
                  </span>
                </Reveal>
              )
            })}
          </ul>
          <p className="mt-10 text-white/70">
            Have a specific panel requirement?{' '}
            <Link to="/contact#enquiry" className="font-semibold text-accent underline-offset-4 hover:underline">
              Share your specifications with us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 7. Project highlights (demo placeholders) */}
      <section className="py-20 sm:py-28" aria-labelledby="projects-title">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="projects-title" eyebrow="Project Highlights" title="Our Work" />
            <ButtonLink to="/projects" variant="ghost" className="self-start md:self-auto">
              View All Projects <ArrowRight />
            </ButtonLink>
          </div>
          <PlaceholderNote className="mt-8">
            The projects below are demo placeholders with illustrative images. They will be replaced with actual
            company projects once approved.
          </PlaceholderNote>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <CTASection />

      {/* 9. Contact information */}
      <section className="bg-surface py-20 sm:py-28" aria-labelledby="contact-title">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading id="contact-title" eyebrow="Get in Touch" title="Contact Information" />
            <div className="mt-8 border border-line bg-white px-6 py-2">
              <ContactInfo showActions={false} />
            </div>
            <ButtonLink to="/contact" variant="secondary" className="mt-6">
              Go to Contact Page <ArrowRight />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  )
}
