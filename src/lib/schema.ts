import { company } from '../data/company.ts'

/**
 * LocalBusiness structured data, built ONLY from verified company details.
 * No ratings, opening hours or founding date are included because
 * they have not been supplied by the company.
 */
export function buildLocalBusinessSchema(siteUrl: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ElectricalContractor',
    name: company.name,
    description: company.tagline,
    slogan: company.slogan,
    telephone: company.phone.e164,
    email: company.email,
    founder: {
      '@type': 'Person',
      name: company.proprietor.name,
      jobTitle: company.proprietor.role,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.street}, ${company.address.locality}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: company.address.city,
  }
  if (siteUrl) {
    schema['@id'] = `${siteUrl}/#business`
    schema.url = `${siteUrl}/`
  }
  return schema
}
