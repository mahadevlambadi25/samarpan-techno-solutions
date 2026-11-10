import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { photos } from '../../data/photos'
import { photoSrcSet, photoUrl } from '../../lib/images'
import { ButtonLink } from '../ui/Button'
import { Nameplate } from './Nameplate'

export function HeroSection() {
  const reduce = useReducedMotion()
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="hero-title">
      <img
        src={photoUrl(photos.panelOpen, 1600)}
        srcSet={photoSrcSet(photos.panelOpen)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
      />
      {/* Readability overlay: strong on the text side, lighter over the panel */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_51_/_0.96)_0%,rgb(8_26_51_/_0.88)_45%,rgb(16_43_80_/_0.55)_100%)]" />
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

      <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.45fr_1fr] lg:py-32">
        <div>
          <m.p {...fade(0)} className="eyebrow flex items-center gap-3 text-accent">
            <span className="rule-accent" aria-hidden="true" />
            {company.name} · Bangalore
          </m.p>
          <m.h1
            {...fade(0.08)}
            id="hero-title"
            className="mt-6 text-[2.6rem] font-bold text-white uppercase sm:text-6xl lg:text-[4.4rem]"
          >
            Reliable Electrical Control Panel Manufacturing{' '}
            <span className="text-accent">&amp; Engineering Solutions</span>
          </m.h1>
          <m.p {...fade(0.16)} className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
            {company.tagline}.
          </m.p>
          <m.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/services" size="lg">
              Explore Services <ArrowRight />
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline-light" size="lg">
              <Phone /> Contact Us
            </ButtonLink>
          </m.div>
        </div>
        <m.div {...fade(0.3)} className="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
          <Nameplate />
        </m.div>
      </div>
    </section>
  )
}
