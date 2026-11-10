import { z } from 'zod'
import { company } from '../data/company'
import { serviceOptions } from '../data/services'

const phonePattern = /^\+?[0-9\s-]+$/

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'Name must be 80 characters or fewer.'),
  companyName: z.string().trim().max(120, 'Company name must be 120 characters or fewer.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone number.')
    .regex(phonePattern, 'Use digits only (spaces, dashes and a leading + are allowed).')
    .refine((v) => {
      const digits = v.replace(/\D/g, '').length
      return digits >= 10 && digits <= 13
    }, 'Please enter a valid 10-digit mobile number (with country code if outside India).'),
  email: z.string().trim().min(1, 'Please enter your email address.').pipe(z.email('Please enter a valid email address.')),
  service: z
    .string()
    .refine((v) => (serviceOptions as readonly string[]).includes(v), 'Please select the service you require.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please describe your requirement (at least 10 characters).')
    .max(2000, 'Message must be 2000 characters or fewer.'),
  /** Honeypot: must stay empty. Bots tend to fill every field. */
  botcheck: z.string().max(0).optional(),
})

export type EnquiryValues = z.infer<typeof enquirySchema>

export class EnquiryError extends Error {
  readonly kind: 'not-configured' | 'network' | 'rejected'
  constructor(kind: EnquiryError['kind'], message: string) {
    super(message)
    this.kind = kind
  }
}

const ENDPOINT = 'https://api.web3forms.com/submit'
const TIMEOUT_MS = 15000

/**
 * Sends the enquiry via Web3Forms. Resolves ONLY when the service confirms success;
 * otherwise throws EnquiryError so the UI never shows a false success message.
 */
export async function submitEnquiry(values: EnquiryValues): Promise<void> {
  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim()
  if (!accessKey) {
    throw new EnquiryError(
      'not-configured',
      'Online form delivery is not set up yet. Please send your enquiry by WhatsApp or email using the buttons below.',
    )
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Website enquiry: ${values.service} (${values.fullName})`,
        from_name: `${company.name} Website`,
        replyto: values.email,
        botcheck: values.botcheck ?? '',
        'Full Name': values.fullName,
        'Company Name': values.companyName || 'Not provided',
        Phone: values.phone,
        Email: values.email,
        'Service Required': values.service,
        Message: values.message,
      }),
      signal: controller.signal,
    })
  } catch {
    throw new EnquiryError(
      'network',
      'We could not reach the server. Please check your internet connection and try again, or contact us directly.',
    )
  } finally {
    window.clearTimeout(timer)
  }

  let data: { success?: boolean; message?: string } = {}
  try {
    data = await response.json()
  } catch {
    /* non-JSON response handled below */
  }
  if (!response.ok || data.success !== true) {
    throw new EnquiryError(
      'rejected',
      data.message
        ? `Your enquiry could not be sent (${data.message}). Please try again or contact us directly.`
        : 'Your enquiry could not be sent. Please try again or contact us directly.',
    )
  }
}

export function enquiryAsText(v: Partial<EnquiryValues>): string {
  return [
    `Enquiry for ${company.name}`,
    v.fullName && `Name: ${v.fullName}`,
    v.companyName && `Company: ${v.companyName}`,
    v.phone && `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    v.service && `Service required: ${v.service}`,
    v.message && `\n${v.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}
