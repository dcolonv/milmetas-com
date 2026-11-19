/** The finish flag: four squares of a checkered strip on a pole. */
export function Bandera({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="2" width="2.5" height="20" rx="1.25" fill="currentColor" />
      <rect x="7" y="3" width="14" height="11" rx="1.5" fill="#fff" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7.75" y="3.75" width="6.25" height="4.75" fill="currentColor" />
      <rect x="14" y="8.5" width="6.25" height="4.75" fill="currentColor" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-[1.45rem] font-extrabold leading-none tracking-tight">
      <Bandera className="h-6 w-6 text-ink" />
      <span>
        <span className="text-ink">mil</span>
        <span className="text-meta">metas</span>
      </span>
    </span>
  );
}
