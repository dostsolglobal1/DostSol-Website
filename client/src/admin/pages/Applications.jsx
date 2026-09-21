import { useEffect, useState } from 'react';
import { CircleDot, ExternalLink, FileCheck2, Handshake, Mail, Star, X } from 'lucide-react';

import { api, toFormError } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { useSeo } from '@/hooks/useSeo';
import { useAdminData } from '../useAdminData';
import { EmptyState, ErrorState, Loading, PageHead, Pagination, StatusChip, Table } from '../components/shell';

/** Icon + label on every state — the reserved status colours never stand alone. */
const STATUSES = [
  { key: 'received', label: 'Received', icon: CircleDot, tone: 'neutral' },
  { key: 'screening', label: 'Screening', icon: FileCheck2, tone: 'brand' },
  { key: 'interview', label: 'Interview', icon: Handshake, tone: 'brand' },
  { key: 'offer', label: 'Offer', icon: Star, tone: 'good' },
  { key: 'rejected', label: 'Rejected', icon: X, tone: 'critical' },
];

const metaFor = (key) => STATUSES.find((s) => s.key === key) || STATUSES[0];

export default function Applications() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [notice, setNotice] = useState('');

  useSeo({ title: 'Applications — DostSol Console', description: 'Candidate applications.' });

  useEffect(() => setPage(1), [status]);

  const { data: apps, meta, loading, error, refetch } = useAdminData('/admin/applications', {
    params: { page, limit: 25, status: status || undefined },
  });

  const update = async (id, next) => {
    setNotice('');
    try {
      await api.patch(`/admin/applications/${id}`, { status: next });
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  return (
    <>
      <PageHead
        title="Applications"
        sub={meta ? `${meta.total} candidates` : 'Applications from the careers page'}
      />

      <div className="no-scrollbar mb-4 flex gap-1.5 overflow-x-auto">
        <button
          type="button"
          onClick={() => setStatus('')}
          aria-pressed={!status}
          className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
            !status ? 'border-brand bg-brand text-white' : 'border-line text-muted hover:text-ink'
          }`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStatus(s.key)}
            aria-pressed={status === s.key}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              status === s.key ? 'border-brand bg-brand text-white' : 'border-line text-muted hover:text-ink'
            }`}
          >
            <s.icon className="h-3 w-3" aria-hidden="true" />
            {s.label}
          </button>
        ))}
      </div>

      {notice && (
        <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-2.5 text-sm text-red-500">
          {notice}
        </p>
      )}

      {loading && !apps ? (
        <Loading label="Loading applications…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !apps?.length ? (
        <EmptyState
          title={status ? 'No applications at that stage' : 'No applications yet'}
          body="Candidates who apply through the careers page appear here."
        />
      ) : (
        <>
          <Table head={['Candidate', 'Role', 'Links', 'Applied', 'Stage']}>
            {apps.map((a) => {
              const m = metaFor(a.status);
              return (
                <tr key={a._id} className="align-top transition hover:bg-raised/60">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{a.name}</p>
                    <a
                      href={`mailto:${a.email}`}
                      className="flex items-center gap-1.5 text-xs text-brand hover:underline"
                    >
                      <Mail className="h-3 w-3" />
                      {a.email}
                    </a>
                    {a.note && (
                      <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted">{a.note}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{a.jobTitle}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {a.portfolio && (
                        <a
                          href={a.portfolio}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
                        >
                          Portfolio <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {a.resumeUrl && (
                        <a
                          href={a.resumeUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
                        >
                          CV <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {!a.portfolio && !a.resumeUrl && <span className="text-xs text-faint">—</span>}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-faint">
                    {formatDate(a.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-start gap-2">
                      <StatusChip icon={m.icon} label={m.label} tone={m.tone} />
                      <select
                        value={a.status}
                        onChange={(e) => update(a._id, e.target.value)}
                        aria-label={`Stage for ${a.name}`}
                        className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink
                                   focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      >
                        {STATUSES.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>

          <Pagination meta={meta} page={page} onPage={setPage} />
        </>
      )}
    </>
  );
}
