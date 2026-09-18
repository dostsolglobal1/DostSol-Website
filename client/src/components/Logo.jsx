export default function Logo({ compact = false, className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-brand-soft to-brand-deep shadow-soft">
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <path
            d="M19 45V19h11.5C38.4 19 44 24.4 44 32s-5.6 13-13.5 13H19Zm7.8-6.4h3.4c4 0 6.6-2.6 6.6-6.6s-2.6-6.6-6.6-6.6h-3.4v13.2Z"
            fill="#fff"
          />
        </svg>
        <span className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-white/20 blur-md" />
      </span>

      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[1.0625rem] font-bold tracking-tight text-ink">
            DostSol
          </span>
          <span className="mt-0.5 block text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-faint">
            Global
          </span>
        </span>
      )}
    </span>
  );
}
