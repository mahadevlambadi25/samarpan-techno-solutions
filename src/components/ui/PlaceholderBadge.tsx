import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { SHOW_PLACEHOLDER_LABELS } from '../../data/company'
import { cn } from '../../lib/cn'

interface PlaceholderBadgeProps {
  label?: string
  className?: string
}

/** Visible label for content awaiting company approval. Toggle via SHOW_PLACEHOLDER_LABELS. */
export function PlaceholderBadge({ label = 'Placeholder', className }: PlaceholderBadgeProps) {
  if (!SHOW_PLACEHOLDER_LABELS) return null
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border border-dashed border-accent-600 bg-[#fff6ec] px-2 py-0.5 font-mono text-[0.7rem] font-medium tracking-wider text-[#8a4a0b] uppercase',
        className,
      )}
    >
      <Info className="size-3" aria-hidden="true" />
      {label}
    </span>
  )
}

export function PlaceholderNote({ children, className }: { children: ReactNode; className?: string }) {
  if (!SHOW_PLACEHOLDER_LABELS) return null
  return (
    <p
      className={cn(
        'flex items-start gap-2 border-l-4 border-accent bg-[#fff6ec] px-4 py-3 text-sm text-[#7a420a]',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
