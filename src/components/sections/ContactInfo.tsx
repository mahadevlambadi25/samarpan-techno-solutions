import { Mail, MapPin, Phone, User } from 'lucide-react'
import type { ReactNode } from 'react'
import { company, fullAddress } from '../../data/company'
import { mailtoHref, mapsLink, telHref, whatsappHref } from '../../lib/contact'
import { ButtonAnchor } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line py-5 last:border-b-0">
      <div className="flex size-12 shrink-0 items-center justify-center bg-brand-50 text-brand-700">{icon}</div>
      <div className="min-w-0">
        <dt className="eyebrow text-muted">{label}</dt>
        <dd className="mt-1 text-[1.05rem] font-medium text-navy">{children}</dd>
      </div>
    </div>
  )
}

/** Contact details list + click-to-call / WhatsApp / email buttons. */
export function ContactInfo({ showActions = true }: { showActions?: boolean }) {
  return (
    <div>
      <dl>
        <InfoRow icon={<User className="size-5" aria-hidden="true" />} label="Contact Person">
          {company.proprietor.name} {company.proprietor.qualification}
          <span className="block text-sm font-normal text-muted">{company.proprietor.role}</span>
        </InfoRow>
        <InfoRow icon={<Phone className="size-5" aria-hidden="true" />} label="Mobile">
          <a href={telHref} className="hover:text-brand-700">
            {company.phone.display}
          </a>
        </InfoRow>
        <InfoRow icon={<Mail className="size-5" aria-hidden="true" />} label="Email">
          <a href={`mailto:${company.email}`} className="break-all hover:text-brand-700">
            {company.email}
          </a>
        </InfoRow>
        <InfoRow icon={<MapPin className="size-5" aria-hidden="true" />} label="Office Address">
          <address className="not-italic">{fullAddress}</address>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            Get directions on Google Maps
          </a>
        </InfoRow>
      </dl>
      {showActions && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <ButtonAnchor href={telHref} variant="secondary">
            <Phone /> Call Now
          </ButtonAnchor>
          <ButtonAnchor href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="primary">
            <WhatsAppIcon /> WhatsApp
          </ButtonAnchor>
          <ButtonAnchor href={mailtoHref()} variant="outline">
            <Mail /> Email Us
          </ButtonAnchor>
        </div>
      )}
    </div>
  )
}
