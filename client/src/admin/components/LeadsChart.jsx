import { useState } from 'react';

/**
 * Daily lead volume — a single series of discrete daily counts, so bars rather
 * than a line. One series means no legend: the title names it.
 *
 * Colour is a single validated hue (light #1D4ED8 / dark #3987e5), declared as
 * a CSS variable on the root so the theme toggle and the OS preference both
 * resolve in one place. Both steps pass the palette validator against this
 * project's card surfaces.
 */

const PAD = { top: 16, right: 8, bottom: 26, left: 34 };
const H = 210;

function niceCeiling(max) {
  if (max <= 4) return 4;
  const step = max <= 20 ? 2 : max <= 50 ? 5 : 10;
  return Math.ceil(max / step) * step;
}

export default function LeadsChart({ series = [], days = 30 }) {
  const [hover, setHover] = useState(null);

  if (!series.length) return null;

  const width = 720; // viewBox units; the SVG scales to its container
  const innerW = width - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const peak = Math.max(...series.map((d) => d.count), 0);
  const yMax = niceCeiling(peak);
  const slot = innerW / series.length;
  // 2px surface gap between adjacent bars, per the mark spec.
  const barW = Math.max(2, slot - 2);

  const x = (i) => PAD.left + i * slot + (slot - barW) / 2;
  const y = (v) => PAD.top + innerH - (v / yMax) * innerH;

  const ticks = [0, yMax / 2, yMax];
  const total = series.reduce((sum, d) => sum + d.count, 0);

  const label = (iso, long = false) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString('en-US',
      long ? { month: 'short', day: 'numeric', weekday: 'short' } : { month: 'short', day: 'numeric' });

  // Roughly six x labels regardless of range length.
  const labelEvery = Math.max(1, Math.round(series.length / 6));

  return (
    <figure className="m-0">
      <figcaption className="mb-1 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-ink">Leads received</h3>
          <p className="mt-0.5 text-xs text-faint">
            Daily volume over the last {days} days
          </p>
        </div>
        <p className="text-right text-xs text-faint">
          <span className="block font-display text-xl font-bold text-ink">{total}</span>
          in range
        </p>
      </figcaption>

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${H}`}
          className="w-full"
          role="img"
          aria-label={`Bar chart of daily leads over the last ${days} days. ${total} leads in total, peak of ${peak} in one day.`}
          onMouseLeave={() => setHover(null)}
        >
          {/* Recessive gridlines */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={y(t)}
                y2={y(t)}
                className="stroke-line"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 8}
                y={y(t) + 3.5}
                textAnchor="end"
                className="fill-[rgb(var(--c-faint))] text-[10px] tabular-nums"
              >
                {t}
              </text>
            </g>
          ))}

          {series.map((d, i) => {
            const h = d.count === 0 ? 0 : Math.max(2, PAD.top + innerH - y(d.count));
            const active = hover?.i === i;
            return (
              <g key={d.date}>
                {/* Hit target spans the full column height, not just the bar. */}
                <rect
                  x={PAD.left + i * slot}
                  y={PAD.top}
                  width={slot}
                  height={innerH}
                  fill="transparent"
                  onMouseEnter={() => setHover({ i, ...d })}
                />
                {d.count > 0 && (
                  <rect
                    x={x(i)}
                    y={y(d.count)}
                    width={barW}
                    height={h}
                    rx={Math.min(4, barW / 2)}
                    fill="rgb(var(--c-viz-series))"
                    opacity={hover && !active ? 0.45 : 1}
                    style={{ transition: 'opacity 140ms ease' }}
                    pointerEvents="none"
                  />
                )}
              </g>
            );
          })}

          {/* Baseline sits above the bars so rounded ends read as anchored. */}
          <line
            x1={PAD.left}
            x2={width - PAD.right}
            y1={PAD.top + innerH}
            y2={PAD.top + innerH}
            className="stroke-line"
            strokeWidth="1"
          />

          {series.map((d, i) =>
            i % labelEvery === 0 ? (
              <text
                key={`l-${d.date}`}
                x={x(i) + barW / 2}
                y={H - 8}
                textAnchor="middle"
                className="fill-[rgb(var(--c-faint))] text-[10px]"
              >
                {label(d.date)}
              </text>
            ) : null
          )}
        </svg>

        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-surface px-3 py-2 shadow-lift"
            style={{
              left: `${((PAD.left + hover.i * slot + slot / 2) / width) * 100}%`,
              top: `${(y(hover.count) / H) * 100}%`,
            }}
          >
            <p className="whitespace-nowrap text-2xs font-medium text-faint">
              {label(hover.date, true)}
            </p>
            <p className="whitespace-nowrap text-sm font-semibold tabular-nums text-ink">
              {hover.count} {hover.count === 1 ? 'lead' : 'leads'}
            </p>
          </div>
        )}
      </div>

      {peak === 0 && (
        <p className="mt-3 rounded-lg border border-line bg-raised px-3 py-2 text-xs text-muted">
          No leads in this range yet. The chart fills in as enquiries arrive.
        </p>
      )}
    </figure>
  );
}
