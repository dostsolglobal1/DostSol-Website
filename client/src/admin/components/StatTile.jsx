import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

/**
 * A headline number with its own context. No plot, so no chart — per the form
 * heuristic a single figure is a stat tile, not a one-bar chart.
 *
 * `delta` is null when there is no prior period to compare against; we say so
 * rather than rendering a misleading 0%.
 */
export default function StatTile({ label, value, sub, delta, deltaGoodWhen = 'up', icon: Icon }) {
  const hasDelta = typeof delta === 'number' && Number.isFinite(delta);
  const rising = hasDelta && delta > 0;
  const flat = hasDelta && delta === 0;
  const good = deltaGoodWhen === 'up' ? rising : !rising;

  const DeltaIcon = flat ? Minus : rising ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-faint">{label}</p>
        {Icon && <Icon className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />}
      </div>

      <p className="mt-3 font-display text-3xl font-bold leading-none text-ink">{value}</p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        {hasDelta ? (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold tabular-nums ${
              flat ? 'text-muted' : good ? 'text-viz-good' : 'text-viz-critical'
            }`}
          >
            <DeltaIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {Math.abs(delta)}%
          </span>
        ) : (
          <span className="text-faint">No prior period</span>
        )}
        {sub && <span className="text-faint">{sub}</span>}
      </div>
    </div>
  );
}
