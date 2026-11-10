/**
 * Single source of truth for verified company details.
 * Only information supplied and verified by SAMARPAN TECHNO SOLUTIONS belongs here.
 */
export const company = {
  name: 'SAMARPAN TECHNO SOLUTIONS',
  displayName: 'Samarpan Techno Solutions',
  /** Original tagline as printed on company material. */
  taglineOriginal: 'Mfrs. of Electrical Control Panels & Providing Seva in The Field of Electrical Engineering',
  /** Website rendering of the tagline (same meaning, standard English). */
  tagline: 'Manufacturers of Electrical Control Panels & Providing Seva in the Field of Electrical Engineering',
  slogan: 'Serving with Excellence',
  proprietor: {
    name: 'M N Gurunath',
    qualification: 'B.E. (Elec.)',
    role: 'Proprietor',
  },
  phone: {
    display: '+91 99727 66644',
    local: '9972766644',
    e164: '+919972766644',
  },
  email: 'samarpantekk@gmail.com',
  address: {
    street: '63/3-2, P&T Colony Road',
    locality: 'Srigandakaval, Sunkadakatte',
    city: 'Bangalore',
    region: 'Karnataka',
    postalCode: '560091',
    country: 'IN',
  },
} as const

export const fullAddress = `${company.address.street}, ${company.address.locality}, ${company.address.city} - ${company.address.postalCode}`

/**
 * Placeholder labels: while true, any content awaiting company approval is visibly
 * labelled on the site. Set to false only after all placeholder content is replaced.
 */
export const SHOW_PLACEHOLDER_LABELS = true
