import { AnimatePresence, m } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { whatsappHref } from '../lib/contact'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden bg-navy px-3 py-1.5 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 md:block">
        WhatsApp enquiry
      </span>
    </a>
  )
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed right-5 bottom-22 z-40 flex size-12 items-center justify-center border-2 border-navy bg-white text-navy shadow-md hover:bg-navy hover:text-white sm:right-7 sm:bottom-24"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  )
}
