import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, FileText, Mail, Users } from 'lucide-react';

import { useSeo } from '@/hooks/useSeo';
import { useAdminData } from '../useAdminData';
import { ErrorState, Loading, PageHead } from '../components/shell';
import StatTile from '../components/StatTile';
import LeadsChart from '../components/LeadsChart';
import Pipeline from '../components/Pipeline';

const RANGES = [7, 30, 90];

export default function Overview() {
  const [days, setDays] = useState(30);
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useAdminData('/admin/overview', {
    params: { days },
  });

  useSeo({ title: 'Overview — DostSol Console', description: 'Admin overview.' });

  if (loading && !data) return <Loading label="Loading overview…" />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data) return null;

  const { totals, range, delta, series, byStatus, byService } = data;

  return (
    <>
      <PageHead title="Overview" sub={`Activity across the last ${days} days`}>
        <div className="flex gap-1 rounded-full border border-line bg-surface p-1" role="group" aria-label="Date range">
          {RANGES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDays(d)}
              aria-pressed={days === d}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition duration-200 ${
                days === d ? 'bg-brand text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </PageHead>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Leads"
          value={range.leads}
          sub={`${totals.leads} all time`}
          delta={delta.leads}
          icon={Users}
        />
        <StatTile
          label="Applications"
          value={range.applications}
          sub={`${totals.applications} all time`}
          icon={BriefcaseBusiness}
        />
        <StatTile
          label="Subscribers"
          value={range.subscribers}
          sub={`${totals.subscribers} active`}
          icon={Mail}
        />
        <StatTile
          label="Published articles"
          value={totals.posts}
          sub="live on the site"
          icon={FileText}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-5">
          <LeadsChart series={series} days={days} />
        </div>

        <div className="rounded-xl border border-line bg-surface p-5">
          <Pipeline
            byStatus={byStatus}
            onSelect={(status) => navigate(status ? `/admin/leads?status=${status}` : '/admin/leads')}
          />
        </div>
      </div>

      {byService.length > 0 && (
        <div className="mt-4 rounded-xl border border-line bg-surface p-5">
          <h3 className="text-sm font-semibold text-ink">Enquiries by practice</h3>
          <p className="mt-0.5 text-xs text-faint">All time, top {byService.length}</p>

          <ul className="mt-5 space-y-3">
            {byService.map((s) => {
              const max = byService[0].count || 1;
              return (
                <li key={s.service} className="flex items-center gap-4">
                  <span className="w-44 shrink-0 truncate text-sm text-muted" title={s.service}>
                    {s.service}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${(s.count / max) * 100}%`, background: 'rgb(var(--c-viz-series))' }}
                    />
                  </span>
                  <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums text-ink">
                    {s.count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
