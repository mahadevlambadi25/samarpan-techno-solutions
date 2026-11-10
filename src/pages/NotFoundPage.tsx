import { ArrowLeft, Phone } from 'lucide-react'
import { ButtonAnchor, ButtonLink } from '../components/ui/Button'
import { useSeo } from '../hooks/useSeo'
import { telHref } from '../lib/contact'
import { company } from '../data/company'

export default function NotFoundPage() {
  useSeo({
    title: `Page Not Found | ${company.displayName}`,
    description: 'The page you are looking for could not be found.',
    path: '/404',
    noindex: true,
  })
  return (
    <section className="bg-blueprint-light py-28 sm:py-36">
      <div className="container-site max-w-2xl text-center">
        <p className="font-display text-[7rem] leading-none font-bold text-line sm:text-[10rem]" aria-hidden="true">
          404
        </p>
        <h1 className="mt-2 text-4xl font-bold uppercase sm:text-5xl">Page Not Found</h1>
        <p className="mt-4 text-lg text-muted">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/" size="lg">
            <ArrowLeft /> Back to Home
          </ButtonLink>
          <ButtonAnchor href={telHref} variant="outline" size="lg">
            <Phone /> Call Us
          </ButtonAnchor>
        </div>
      </div>
    </section>
  )
}
