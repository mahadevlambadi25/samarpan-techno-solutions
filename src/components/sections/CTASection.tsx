import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { photos } from '../../data/photos'
import { telHref, whatsappHref } from '../../lib/contact'
import { photoSrcSet, photoUrl } from '../../lib/images'
import { ButtonAnchor, ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

interface CTASectionProps {
  title?: string
  text?: string
}

export function CTASection({
  title = 'Have a Control Panel Requirement?',
  text = 'Share your specifications or application details with us. We will discuss your requirement and get back to you with a suitable proposal.',
}: CTASectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy" aria-labelledby="cta-title">
      <img
        src={photoUrl(photos.meters, 1600, 700)}
        srcSet={photoSrcSet(photos.meters, 1600 / 700)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy/90" />
      <div className="container-site grid items-center gap-10 py-20 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="rule-accent" aria-hidden="true" />
            Send an Enquiry
          </p>
          <h2 id="cta-title" className="mt-4 text-4xl font-bold text-white uppercase sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3">
          <ButtonLink to="/contact#enquiry" size="lg">
            Send Enquiry <ArrowRight />
          </ButtonLink>
          <div className="grid gap-3 sm:grid-cols-2">
            <ButtonAnchor href={telHref} variant="outline-light" size="lg">
              <Phone /> {company.phone.local}
            </ButtonAnchor>
            <ButtonAnchor href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="outline-light" size="lg">
              <WhatsAppIcon /> WhatsApp
            </ButtonAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
