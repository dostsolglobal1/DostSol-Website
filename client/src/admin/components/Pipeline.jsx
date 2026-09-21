import { Check, Circle, CircleDot, Handshake, X } from 'lucide-react';

/**
 * Lead pipeline by status.
 *
 * Bar length carries magnitude; the row label carries identity. Won and Lost use
 * reserved status colours, which fail red/green CVD separation as a pair — so each
 * ships with a distinct icon and a visible text label, never colour alone.
 */

export const LEAD_STATUSES = [
  { key: 'new', label: 'New', icon: Circle, tone: 'series' },
  { key: 'contacted', label: 'Contacted', icon: CircleDot, tone: 'series' },
  { key: 'qualified', label: 'Qualified', icon: Handshake, tone: 'series' },
  { key: 'won', label: 'Won', icon: Check, tone: 'good' },
  { key: 'lost', label: 'Lost', icon: X, tone: 'critical' },
];

const TONE = {
  series: { bar: 'rgb(var(--c-viz-series))', text: 'text-brand' },
  good: { bar: 'rgb(var(--c-viz-good))', text: 'text-viz-good' },
  critical: { bar: 'rgb(var(--c-viz-critical))', text: 'text-viz-critical' },
};

export default function Pipeline({ byStatus = {}, onSelect, active }) {
  const counts = LEAD_STATUSES.map((s) => ({ ...s, count: byStatus[s.key] || 0 }));
  const total = counts.reduce((sum, s) => sum + s.count, 0);
  const max = Math.max(...counts.map((s) => s.count), 1);

  return (
    <figure className="m-0">
      <figcaption className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Pipeline by status</h3>
        <p className="mt-0.5 text-xs text-faint">
          {total} {total === 1 ? 'lead' : 'leads'} in total · select a row to filter
        </p>
      </figcaption>

      <ul className="space-y-2.5">
        {counts.map((s) => {
          const tone = TONE[s.tone];
          const StatusIcon = s.icon;
          const isActive = active === s.key;
          const share = total ? Math.round((s.count / total) * 100) : 0;

          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => onSelect?.(isActive ? null : s.key)}
                aria-pressed={isActive}
                className={`w-full rounded-lg px-2.5 py-2 text-left transition duration-200 ${
                  isActive ? 'bg-raised ring-1 ring-brand/40' : 'hover:bg-raised'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-ink">
                    <StatusIcon className={`h-3.5 w-3.5 ${tone.text}`} aria-hidden="true" />
                    {s.label}
                  </span>
                  <span className="flex items-baseline gap-2 text-xs text-faint">
                    <span className="font-semibold tabular-nums text-ink">{s.count}</span>
                    <span className="tabular-nums">{share}%</span>
                  </span>
                </div>

                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-raised">
                  <div
                    className="h-full rounded-full transition-[width] duration-500 ease-premium"
                    style={{
                      width: `${(s.count / max) * 100}%`,
                      background: tone.bar,
                    }}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
