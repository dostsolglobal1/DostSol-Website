import { AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import { Button, Spinner } from '@/components/ui';

/* --------------------------------------------------------------- page head -- */

export function PageHead({ title, sub, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

/* -------------------------------------------------------------- data states -- */

export function Loading({ label = 'Loading…' }) {
  return (
    <div className="grid place-items-center rounded-xl border border-line bg-surface py-20">
      <div className="flex flex-col items-center gap-3 text-muted">
        <Spinner className="h-6 w-6" />
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/30 bg-red-500/8 p-8 text-center"
    >
      <AlertCircle className="mx-auto h-7 w-7 text-red-500" />
      <p className="mt-3 font-semibold text-ink">Could not load this data</p>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ title, body, children }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-14 text-center">
      <Inbox className="mx-auto h-8 w-8 text-faint" />
      <p className="mt-4 font-display font-semibold text-ink">{title}</p>
      {body && <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">{body}</p>}
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------- table -- */

export function Table({ head, children }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-2xs font-semibold uppercase tracking-[0.12em] text-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------- pagination -- */

export function Pagination({ meta, page, onPage }) {
  if (!meta || meta.pages <= 1) return null;

  const from = (page - 1) * meta.limit + 1;
  const to = Math.min(page * meta.limit, meta.total);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-faint">
        Showing <span className="tabular-nums">{from}</span>–<span className="tabular-nums">{to}</span> of{' '}
        <span className="tabular-nums">{meta.total}</span>
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= meta.pages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- status chip -- */

const TONES = {
  neutral: 'border-line bg-raised text-muted',
  brand: 'border-brand/25 bg-brand/10 text-brand',
  good: 'border-viz-good/30 bg-viz-good/10 text-viz-good',
  warning: 'border-viz-warning/35 bg-viz-warning/12 text-viz-warning',
  critical: 'border-viz-critical/30 bg-viz-critical/10 text-viz-critical',
};

/** Status is always icon + text, never colour alone. */
export function StatusChip({ icon: Icon, label, tone = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-2xs font-semibold ${
        TONES[tone] || TONES.neutral
      }`}
    >
      {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
      {label}
    </span>
  );
}
