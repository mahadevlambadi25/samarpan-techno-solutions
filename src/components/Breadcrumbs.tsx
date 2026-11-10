import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Crumb } from '../types'

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs tracking-wider text-white/70 uppercase">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {c.to && !last ? (
                <Link to={c.to} className="hover:text-accent">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-white' : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight className="size-3.5" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
