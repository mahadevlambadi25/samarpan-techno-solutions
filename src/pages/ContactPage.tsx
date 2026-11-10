import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { MapEmbed } from '../components/MapEmbed'
import { ContactInfo } from '../components/sections/ContactInfo'
import { PageHero } from '../components/sections/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { company } from '../data/company'
import { photos } from '../data/photos'
import { routeMeta } from '../data/routes'
import { useSeo } from '../hooks/useSeo'

const crumbs = [{ label: 'Home', to: '/' }, { label: 'Contact', to: '/contact' }]

export default function ContactPage() {
  const meta = routeMeta('/contact')
  useSeo({ title: meta.title, description: meta.description, path: '/contact', breadcrumbs: crumbs })
  const [params] = useSearchParams()

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s Discuss Your Requirement"
        intro={`Call, WhatsApp or email ${company.proprietor.name} directly, or send us an enquiry using the form below.`}
        photo={photos.testBench}
        crumbs={crumbs}
      />

      <section className="py-20 sm:py-24" aria-labelledby="details-title">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading id="details-title" eyebrow="Contact Details" title={company.name} className="[&_h2]:text-3xl sm:[&_h2]:text-4xl" />
            <div className="mt-6">
              <ContactInfo />
            </div>
          </div>

          <div id="enquiry" className="scroll-mt-28 border border-line bg-surface p-6 sm:p-10">
            <SectionHeading
              eyebrow="Enquiry Form"
              title="Send an Enquiry"
              intro="Fill in your details and requirement. We will respond by phone or email."
              className="[&_h2]:text-3xl sm:[&_h2]:text-4xl"
            />
            <div className="mt-8">
              <ContactForm initialServiceSlug={params.get('service')} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24" aria-labelledby="map-title">
        <div className="container-site">
          <h2 id="map-title" className="mb-6 text-3xl font-bold uppercase">
            Our Location
          </h2>
          <MapEmbed />
        </div>
      </section>
    </>
  )
}
