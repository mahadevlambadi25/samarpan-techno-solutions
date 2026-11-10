import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { cn } from '../../lib/cn'

interface LogoProps {
  tone?: 'dark' | 'light'
  className?: string
}

/** Wordmark: lightning mark in a panel-style square + condensed company name. */
export function Logo({ tone = 'dark', className }: LogoProps) {
  const light = tone === 'light'
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-3', className)} aria-label={`${company.name}, home`}>
      <svg viewBox="0 0 48 48" className="size-11 shrink-0" aria-hidden="true">
        <rect x="1" y="1" width="46" height="46" fill={light ? '#FFFFFF' : '#102B50'} />
        <rect x="5" y="5" width="38" height="38" fill="none" stroke={light ? '#102B50' : '#2878CF'} strokeWidth="1.5" />
        <path d="M27 9 14 27h9l-3 12 14-19h-9l2-11z" fill="#F28C28" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-[1.35rem] font-bold tracking-wide', light ? 'text-white' : 'text-navy')}>
          SAMARPAN
        </span>
        <span
          className={cn(
            'mt-0.5 font-display text-[0.78rem] font-semibold tracking-[0.28em]',
            light ? 'text-white/75' : 'text-brand-700',
          )}
        >
          TECHNO SOLUTIONS
        </span>
      </span>
    </Link>
  )
}
