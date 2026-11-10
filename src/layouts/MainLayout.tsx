import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BackToTop, WhatsAppButton } from '../components/FloatingActions'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { PageLoader } from '../components/PageLoader'

/** Scroll to top on route change, or to the #hash target if present. */
function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a frame so lazily loaded page content exists.
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      const tick = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ block: 'start' })
        else if (tries++ < 20) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

export function MainLayout() {
  useScrollRestoration()
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-[60] bg-accent px-4 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  )
}
