import { company } from '../data/company'

export const telHref = `tel:${company.phone.e164}`

export function mailtoHref(subject = 'Enquiry from website', body = ''): string {
  const params = new URLSearchParams()
  params.set('subject', subject)
  if (body) params.set('body', body)
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${company.email}?${params.toString().replace(/\+/g, '%20')}`
}

export function whatsappHref(
  text = `Hello ${company.name}, I would like to enquire about your services.`,
): string {
  return `https://wa.me/${company.phone.e164.replace('+', '')}?text=${encodeURIComponent(text)}`
}

const coords = `${company.geo.latitude},${company.geo.longitude}`

/** Keyless Google Maps embed with the pin on the exact office coordinates. */
export const mapsEmbedSrc = `https://maps.google.com/maps?q=${coords}&z=17&output=embed`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${coords}`
