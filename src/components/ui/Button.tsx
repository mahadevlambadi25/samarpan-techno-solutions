import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 text-center font-display font-semibold uppercase tracking-wider transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0'

const variants: Record<Variant, string> = {
  // Navy text on orange keeps AA contrast (white on #F28C28 would fail).
  primary: 'bg-accent text-navy hover:bg-accent-600 shadow-[inset_0_-3px_0_rgb(0_0_0_/_0.12)]',
  secondary: 'bg-navy text-white hover:bg-navy-800',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  'outline-light': 'border-2 border-white/70 text-white hover:bg-white hover:text-navy',
  ghost: 'text-brand-700 hover:text-navy px-0!',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-[0.95rem]',
  lg: 'min-h-13 px-7 text-base',
}

interface StyleProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

export function ButtonLink({ variant, size, className, ...rest }: StyleProps & LinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />
}

export function ButtonAnchor({
  variant,
  size,
  className,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass(variant, size, className)} {...rest} />
}

export function Button({ variant, size, className, ...rest }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClass(variant, size, className)} {...rest} />
}
