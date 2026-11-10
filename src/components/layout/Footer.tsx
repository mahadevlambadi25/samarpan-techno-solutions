import { Mail, MapPin, Phone, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, fullAddress } from '../../data/company'
import { navItems } from '../../data/content'
import { services } from '../../data/services'
import { mapsLink, telHref, whatsappHref } from '../../lib/contact'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { Logo } from './Logo'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-blueprint relative bg-navy text-white/80" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="h-1.5 bg-[repeating-linear-gradient(-45deg,var(--color-accent)_0_14px,var(--color-navy-950)_14px_22px)]" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">{company.tagline}.</p>
          <p className="mt-5 font-display text-xl font-semibold tracking-wide text-accent uppercase">
            {company.slogan}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-display text-lg font-semibold tracking-wider text-white uppercase">Quick Links</h3>
          <ul className="mt-5 space-y-2.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-lg font-semibold tracking-wider text-white uppercase">Services</h3>
          <ul className="mt-5 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services#${s.slug}`} className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <h3 className="font-display text-lg font-semibold tracking-wider text-white uppercase">Contact</h3>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <User className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                {company.proprietor.name} {company.proprietor.qualification}
                <span className="block text-sm text-white/60">{company.proprietor.role}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={telHref} className="hover:text-accent">
                {company.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-1 size-4 shrink-0 text-accent" />
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                WhatsApp enquiry
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="break-all hover:text-accent">
                {company.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {fullAddress}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>
            Illustrative photography from{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              Unsplash
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
