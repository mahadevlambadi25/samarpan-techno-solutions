export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin border-4 border-line border-t-accent" aria-hidden="true" />
        <span className="font-mono text-xs tracking-widest text-muted uppercase">Loading…</span>
      </div>
    </div>
  )
}
