import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { cn } from '../../lib/cn'

interface LogoProps {
  tone?: 'dark' | 'light'
  className?: string
}

/** Wordmark: STS logo mark + condensed company name. */
export function Logo({ tone = 'dark', className }: LogoProps) {
  const light = tone === 'light'
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-3', className)} aria-label={`${company.name}, home`}>
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        width={44}
        height={44}
        decoding="async"
        className="size-11 shrink-0 rounded-full bg-white object-contain"
      />
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
