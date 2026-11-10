import { Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { company } from '../../data/company'
import { cn } from '../../lib/cn'
import { telHref } from '../../lib/contact'
import { ButtonLink } from '../ui/Button'
import { DesktopNav } from './DesktopNav'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close the mobile menu on navigation (including browser back/forward).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Expose header height so the mobile panel sits directly beneath it.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => document.documentElement.style.setProperty('--header-h', `${el.getBoundingClientRect().bottom}px`)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-navy-950 text-[0.85rem] text-white/80 md:block">
        <div className="container-site flex h-10 items-center justify-between gap-6">
          <p className="flex items-center gap-2 truncate">
            <MapPin className="size-3.5 text-accent" aria-hidden="true" />
            Sunkadakatte, {company.address.city} - {company.address.postalCode}
          </p>
          <div className="flex items-center gap-6">
            <a href={telHref} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-3.5 text-accent" aria-hidden="true" />
              {company.phone.display}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-3.5 text-accent" aria-hidden="true" />
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={cn(
          'sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow',
          scrolled ? 'border-line shadow-[0_6px_24px_-12px_rgb(16_43_80_/_0.35)]' : 'border-transparent',
        )}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <Logo />
          <DesktopNav />
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink to="/contact#enquiry">Get a Quote</ButtonLink>
            </span>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex size-11 items-center justify-center border border-line text-navy hover:bg-surface lg:hidden"
            >
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      <MobileNav id="mobile-navigation" open={open} onClose={close} />
    </>
  )
}
