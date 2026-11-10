import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { serviceOptions, services } from '../data/services'
import { cn } from '../lib/cn'
import { mailtoHref, whatsappHref } from '../lib/contact'
import { EnquiryError, enquiryAsText, enquirySchema, submitEnquiry, type EnquiryValues } from '../lib/enquiry'
import { Button, ButtonAnchor } from './ui/Button'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

type Status = { state: 'idle' } | { state: 'success' } | { state: 'error'; message: string }

interface FieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

function Field({ id, label, required, error, hint, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-display text-[0.95rem] font-semibold tracking-wider text-navy uppercase">
        {label}
        {required ? (
          <span className="text-[#b45309]" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="ml-1 font-sans text-xs font-normal tracking-normal text-muted normal-case">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#b42318]" role="alert">
          <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError: boolean) =>
  cn(
    'block min-h-12 w-full border bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition-colors',
    'focus:border-brand focus:ring-2 focus:ring-brand/25 focus:outline-none',
    hasError ? 'border-[#b42318]' : 'border-line hover:border-muted/60',
  )

interface ContactFormProps {
  /** Service slug from ?service= to preselect. */
  initialServiceSlug?: string | null
}

export function ContactForm({ initialServiceSlug }: ContactFormProps) {
  const uid = useId()
  const fid = (name: string) => `${uid}-${name}`
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [failedValues, setFailedValues] = useState<EnquiryValues | null>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const preselected = services.find((s) => s.slug === initialServiceSlug)?.title ?? ''

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      service: preselected,
      message: '',
      botcheck: '',
    },
  })

  useEffect(() => {
    if (preselected) setValue('service', preselected)
  }, [preselected, setValue])

  useEffect(() => {
    if (status.state !== 'idle') statusRef.current?.focus()
  }, [status])

  const onSubmit = async (values: EnquiryValues) => {
    setStatus({ state: 'idle' })
    try {
      await submitEnquiry(values)
      setFailedValues(null)
      setStatus({ state: 'success' })
      reset()
    } catch (err) {
      setFailedValues(values)
      setStatus({
        state: 'error',
        message: err instanceof EnquiryError ? err.message : 'Something went wrong. Please try again or contact us directly.',
      })
    }
  }

  const aria = (name: keyof EnquiryValues, hint = false) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${fid(name)}-error` : hint ? `${fid(name)}-hint` : undefined,
  })

  if (status.state === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-4 border border-[#9ad3ae] bg-[#effaf3] p-8 outline-none"
      >
        <CheckCircle2 className="size-10 text-[#16803c]" aria-hidden="true" />
        <h3 className="text-3xl font-bold uppercase">Enquiry Sent Successfully</h3>
        <p className="text-ink">
          Thank you for contacting us. Your enquiry has been delivered, and we will get back to you soon.
        </p>
        <Button type="button" variant="outline" onClick={() => setStatus({ state: 'idle' })}>
          Send Another Enquiry
        </Button>
      </div>
    )
  }

  const fallbackText = failedValues ? enquiryAsText(failedValues) : ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting} className="space-y-5">
      {status.state === 'error' && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="border border-[#f1a9a0] bg-[#fef3f2] p-5 outline-none">
          <p className="flex items-start gap-2 font-semibold text-[#912018]">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
          {failedValues && (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <ButtonAnchor
                href={whatsappHref(fallbackText)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <WhatsAppIcon /> Send via WhatsApp
              </ButtonAnchor>
              <ButtonAnchor href={mailtoHref(`Enquiry: ${failedValues.service}`, fallbackText)} variant="outline">
                <Mail /> Send via Email
              </ButtonAnchor>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fid('fullName')} label="Full Name" required error={errors.fullName?.message}>
          <input
            id={fid('fullName')}
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.fullName)}
            {...aria('fullName')}
            {...register('fullName')}
          />
        </Field>
        <Field id={fid('companyName')} label="Company Name" error={errors.companyName?.message}>
          <input
            id={fid('companyName')}
            type="text"
            autoComplete="organization"
            className={inputClass(!!errors.companyName)}
            {...aria('companyName')}
            {...register('companyName')}
          />
        </Field>
        <Field
          id={fid('phone')}
          label="Phone Number"
          required
          error={errors.phone?.message}
          hint="10-digit mobile number"
        >
          <input
            id={fid('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            className={inputClass(!!errors.phone)}
            {...aria('phone', true)}
            {...register('phone')}
          />
        </Field>
        <Field id={fid('email')} label="Email Address" required error={errors.email?.message}>
          <input
            id={fid('email')}
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            className={inputClass(!!errors.email)}
            {...aria('email')}
            {...register('email')}
          />
        </Field>
      </div>

      <Field id={fid('service')} label="Service Required" required error={errors.service?.message}>
        <select
          id={fid('service')}
          className={cn(inputClass(!!errors.service), 'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%23102B50%27%20stroke-width%3D%272%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12')}
          {...aria('service')}
          {...register('service')}
        >
          <option value="">Select a service…</option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field id={fid('message')} label="Message" required error={errors.message?.message}>
        <textarea
          id={fid('message')}
          rows={5}
          placeholder="Describe your requirement: application, specifications, quantity, location, etc."
          className={cn(inputClass(!!errors.message), 'resize-y')}
          {...aria('message')}
          {...register('message')}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={fid('botcheck')}>Leave this field empty</label>
        <input id={fid('botcheck')} type="text" tabIndex={-1} autoComplete="off" {...register('botcheck')} />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Fields marked <span className="text-[#b45309]">*</span> are required.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:min-w-56">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" /> Send Enquiry
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
