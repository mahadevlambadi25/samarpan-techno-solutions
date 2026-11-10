import { AnimatePresence, m } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { company } from '../../data/company'
import { navItems } from '../../data/content'
import { cn } from '../../lib/cn'
import { telHref, whatsappHref } from '../../lib/contact'
import { ButtonAnchor } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  id: string
}

export function MobileNav({ open, onClose, id }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Keep keyboard focus inside the open menu.
      if (e.key === 'Tab' && panelRef.current) {
        // The menu toggle (in the header) stays reachable so keyboard users can close the menu.
        const toggle = document.querySelector<HTMLElement>(`[aria-controls="${id}"]`)
        const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>('a[href], button')].filter(
          (el): el is HTMLElement => el !== null,
        )
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, id])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="mobile-nav"
          id={id}
          ref={panelRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="container-site py-4">
            <ul className="divide-y divide-line">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between py-4 font-display text-2xl font-semibold uppercase',
                        isActive ? 'text-navy' : 'text-ink/70',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && <span className="h-[3px] w-8 bg-accent" aria-hidden="true" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ButtonAnchor href={telHref} variant="secondary" size="lg">
                <Phone /> Call {company.phone.local}
              </ButtonAnchor>
              <ButtonAnchor href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                <WhatsAppIcon /> WhatsApp Us
              </ButtonAnchor>
            </div>
            <a
              href={`mailto:${company.email}`}
              className="mt-5 flex items-center gap-2 text-brand-700 underline-offset-4 hover:underline"
            >
              <Mail className="size-4" aria-hidden="true" /> {company.email}
            </a>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  )
}
