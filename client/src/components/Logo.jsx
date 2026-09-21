import { useId } from 'react';

/**
 * Brand mark, drawn entirely as vector — no raster asset at any size.
 *
 * Palette sampled from the master artwork:
 *   wordmark ramp  #1E5FEF → #2276E8 → #23BDC7
 *   swoosh ramp    #23BDC7 → #1E6EE7
 *   navy           #000F60   (flipped to white in the dark theme via currentColor)
 *
 * The wordmark is set in live text rather than outlined paths, so `textLength`
 * pins each run to the artwork's exact width — the swoosh keeps its alignment
 * even if the display font has not loaded yet.
 */

const RAMP = [
  { offset: '0%', color: '#1E5FEF' },
  { offset: '55%', color: '#2276E8' },
  { offset: '100%', color: '#23BDC7' },
];

const DISPLAY = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";

/** The layered-arc D, used on its own where there is no room for the wordmark. */
function Mark({ gradient }) {
  return (
    <g fill="none" stroke={`url(#${gradient})`} strokeLinecap="round">
      <path d="M24 12A20 20 0 0 1 24 52" strokeWidth="5.5" />
      <path d="M24 19A13 13 0 0 1 24 45" strokeWidth="5" />
      <path d="M24 26A6 6 0 0 1 24 38" strokeWidth="4.5" />
    </g>
  );
}

export default function Logo({ compact = false, tagline = false, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const textGrad = `dsl-text-${uid}`;
  const swooshGrad = `dsl-swoosh-${uid}`;

  if (compact) {
    return (
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label="DostSol Global"
        className={className || 'h-9 w-9'}
      >
        <defs>
          <linearGradient id={swooshGrad} x1="0" y1="1" x2="1" y2="0">
            {RAMP.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        <Mark gradient={swooshGrad} />
      </svg>
    );
  }

  return (
    <svg
      viewBox={tagline ? '0 0 1364 400' : '0 0 1364 372'}
      role="img"
      aria-label="DostSol Global — Dynamic Outsourcing & Solutions Team"
      className={`w-auto text-[#000F60] dark:text-white ${className || 'h-9'}`}
    >
      <defs>
        {/* Horizontal ramp pinned to the wordmark's own box, so both runs share it. */}
        <linearGradient id={textGrad} x1="85" y1="0" x2="790" y2="0" gradientUnits="userSpaceOnUse">
          {RAMP.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
        <linearGradient id={swooshGrad} x1="58" y1="352" x2="792" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#23BDC7" />
          <stop offset="100%" stopColor="#1E6EE7" />
        </linearGradient>
      </defs>

      {/* Swoosh: two tapered strokes, as in the artwork: a heavier one curling
          under the D and a finer one arcing over SOL. The wordmark sits in the
          gap between them, so the swoosh never crosses the letters. */}
      <g fill={`url(#${swooshGrad})`}>
        <path d="M60 344C130 350 220 326 298 294C210 300 124 316 60 344Z" />
        <path d="M520 142C600 110 690 84 792 62C700 104 610 128 520 142Z" />
      </g>

      <text
        x="85"
        y="265"
        textLength="705"
        lengthAdjust="spacingAndGlyphs"
        fontFamily={DISPLAY}
        fontSize="158"
        fontWeight="800"
        letterSpacing="-2"
        fill={`url(#${textGrad})`}
      >
        DOSTSOL
      </text>

      <text
        x="830"
        y="265"
        textLength="455"
        lengthAdjust="spacingAndGlyphs"
        fontFamily={DISPLAY}
        fontSize="158"
        fontWeight="500"
        fill="currentColor"
      >
        Global
      </text>

      {tagline && (
        <text
          x="305"
          y="365"
          textLength="980"
          lengthAdjust="spacingAndGlyphs"
          fontFamily={DISPLAY}
          fontSize="52"
          fontWeight="700"
          fill="currentColor"
        >
          Dynamic Outsourcing &amp; Solutions Team
        </text>
      )}
    </svg>
  );
}
