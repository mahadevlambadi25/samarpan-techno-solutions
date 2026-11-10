import { company } from '../../data/company'
import { cn } from '../../lib/cn'

/**
 * Equipment rating-plate styled card: presents only verified company facts.
 * A distinctive brand device in place of invented statistics.
 */
export function Nameplate({ className }: { className?: string }) {
  const rows: Array<[string, string]> = [
    ['MFR.', company.name],
    ['Type', 'Electrical Control Panels'],
    ['Seva', 'Electrical Engineering'],
    ['Engineer', `${company.proprietor.name}, ${company.proprietor.qualification}`],
    ['Location', `${company.address.city} - ${company.address.postalCode}`],
  ]
  return (
    <div
      className={cn(
        'relative border border-white/25 bg-[linear-gradient(145deg,#e9eef4,#c9d3df)] p-1.5 text-navy shadow-2xl shadow-black/40',
        className,
      )}
    >
      {/* Rivets */}
      {['top-2.5 left-2.5', 'top-2.5 right-2.5', 'bottom-2.5 left-2.5', 'bottom-2.5 right-2.5'].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={cn('absolute size-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff,#7d8a9b)]', pos)}
        />
      ))}
      <div className="border border-navy/30 px-6 pt-5 pb-6">
        <div className="flex items-center justify-between border-b-2 border-navy pb-2">
          <span className="font-display text-sm font-bold tracking-[0.2em] uppercase">Company Plate</span>
          <span className="font-mono text-[0.7rem] text-navy/70">BLR · IN</span>
        </div>
        <dl className="mt-3 divide-y divide-navy/15 font-mono text-[0.78rem]">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 py-2">
              <dt className="tracking-wider text-navy/60 uppercase">{k}</dt>
              <dd className="font-medium text-navy">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 bg-navy px-3 py-2 text-center font-display text-sm font-semibold tracking-[0.25em] text-accent uppercase">
          {company.slogan}
        </p>
      </div>
    </div>
  )
}
