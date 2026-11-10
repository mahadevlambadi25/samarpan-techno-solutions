import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2'
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  as: Heading = 'h2',
  className,
  id,
}: SectionHeadingProps) {
  const light = tone === 'light'
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className={cn('eyebrow flex items-center gap-3', light ? 'text-accent' : 'text-brand-700', align === 'center' && 'justify-center')}>
        <span className="rule-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={cn('mt-4 text-[2.15rem] font-bold uppercase sm:text-[2.75rem]', light && 'text-white')}
      >
        {title}
      </Heading>
      {intro && <p className={cn('mt-4 text-lg', light ? 'text-white/80' : 'text-muted')}>{intro}</p>}
    </div>
  )
}
