import { NavLink } from 'react-router-dom'
import { navItems } from '../../data/content'
import { cn } from '../../lib/cn'

export function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative block px-3.5 py-2 font-display text-[1.05rem] font-semibold tracking-wide uppercase transition-colors',
                  'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-[3px] after:origin-left after:bg-accent after:transition-transform after:duration-300',
                  isActive
                    ? 'text-navy after:scale-x-100'
                    : 'text-ink/75 after:scale-x-0 hover:text-navy hover:after:scale-x-100',
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
