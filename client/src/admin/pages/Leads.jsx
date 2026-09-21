import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, Mail, Phone, Search, Trash2, X } from 'lucide-react';

import { api, toFormError } from '@/lib/api';
import { Button, Spinner } from '@/components/ui';
import { formatDate } from '@/lib/format';
import { useSeo } from '@/hooks/useSeo';
import { useAdminData } from '../useAdminData';
import { useAuth } from '../AuthContext';
import { EmptyState, ErrorState, Loading, PageHead, Pagination, StatusChip, Table } from '../components/shell';
import { LEAD_STATUSES } from '../components/Pipeline';

const TONE_FOR = { won: 'good', lost: 'critical', qualified: 'brand' };

function statusMeta(key) {
  const s = LEAD_STATUSES.find((x) => x.key === key) || LEAD_STATUSES[0];
  return { ...s, tone: TONE_FOR[key] || 'neutral' };
}

/** Status control — icon + label in every option, so colour is never the only cue. */
function StatusSelect({ value, onChange, busy }) {
  return (
    <select
      value={value}
      disabled={busy}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Lead status"
      className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink
                 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s.key} value={s.key}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

function LeadDrawer({ lead, onClose, onStatus, onDelete, canDelete }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!lead) return null;
  const meta = statusMeta(lead.status);

  const rows = [
    ['Company', lead.company],
    ['Phone', lead.phone],
    ['Practice', lead.service],
    ['Company size', lead.teamSize],
    ['Budget', lead.budget],
    ['Timeline', lead.timeline],
    ['Source', lead.source],
    ['Received', formatDate(lead.createdAt, { hour: 'numeric', minute: '2-digit' })],
  ].filter(([, v]) => v);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/45" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Lead from ${lead.name}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface shadow-lift"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-semibold text-ink">{lead.name}</h2>
            <a
              href={`mailto:${lead.email}`}
              className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-brand hover:underline"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {lead.email}
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-muted transition hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center gap-3">
            <StatusChip icon={meta.icon} label={meta.label} tone={meta.tone} />
            <StatusSelect value={lead.status} onChange={(s) => onStatus(lead._id, s)} />
          </div>

          <dl className="mt-6 space-y-3">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <dt className="shrink-0 text-xs text-faint">{k}</dt>
                <dd className="text-right text-sm font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-faint">Message</p>
            <p className="mt-2.5 whitespace-pre-wrap rounded-xl border border-line bg-raised p-4 text-sm leading-relaxed text-muted">
              {lead.message}
            </p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center gap-2 border-t border-line p-5">
          <Button href={`mailto:${lead.email}`} size="sm">
            <Mail className="h-3.5 w-3.5" />
            Reply
          </Button>
          {lead.phone && (
            <Button href={`tel:${lead.phone}`} variant="secondary" size="sm">
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
          )}
          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(lead)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-viz-critical transition hover:bg-viz-critical/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}

export default function Leads() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [selected, setSelected] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [notice, setNotice] = useState('');

  useSeo({ title: 'Leads — DostSol Console', description: 'Lead inbox.' });

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 350);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => setPage(1), [status, debounced]);

  const { data: leads, meta, loading, error, refetch } = useAdminData('/admin/leads', {
    params: { page, limit: 25, status: status || undefined, q: debounced || undefined },
  });

  const setStatusFilter = (next) => {
    const params = new URLSearchParams(searchParams);
    if (next) params.set('status', next);
    else params.delete('status');
    setSearchParams(params, { replace: true });
  };

  const updateStatus = async (id, next) => {
    setBusyId(id);
    setNotice('');
    try {
      await api.patch(`/admin/leads/${id}`, { status: next });
      setSelected((s) => (s && s._id === id ? { ...s, status: next } : s));
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (lead) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Delete the enquiry from ${lead.name}? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/leads/${lead._id}`);
      setSelected(null);
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  const exportCsv = async () => {
    try {
      const res = await api.get('/admin/leads-export', {
        params: { status: status || undefined },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dostsol-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  return (
    <>
      <PageHead title="Leads" sub={meta ? `${meta.total} enquiries` : 'Enquiries from the website'}>
        <Button variant="secondary" size="sm" onClick={exportCsv}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </PageHead>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, company…"
            aria-label="Search leads"
            className="field py-2.5 pl-10 text-sm"
          />
        </div>

        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('')}
            aria-pressed={!status}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              !status ? 'border-brand bg-brand text-white' : 'border-line text-muted hover:text-ink'
            }`}
          >
            All
          </button>
          {LEAD_STATUSES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStatusFilter(s.key)}
              aria-pressed={status === s.key}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                status === s.key
                  ? 'border-brand bg-brand text-white'
                  : 'border-line text-muted hover:text-ink'
              }`}
            >
              <s.icon className="h-3 w-3" aria-hidden="true" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {notice && (
        <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-2.5 text-sm text-red-500">
          {notice}
        </p>
      )}

      {loading && !leads ? (
        <Loading label="Loading leads…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !leads?.length ? (
        <EmptyState
          title={status || debounced ? 'No leads match those filters' : 'No leads yet'}
          body={
            status || debounced
              ? 'Clear the filters to see everything in the inbox.'
              : 'Enquiries submitted through the website contact form land here.'
          }
        />
      ) : (
        <>
          <Table head={['Name', 'Company', 'Practice', 'Received', 'Status', '']}>
            {leads.map((lead) => {
              const meta2 = statusMeta(lead.status);
              return (
                <tr key={lead._id} className="transition hover:bg-raised/60">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelected(lead)}
                      className="text-left font-medium text-ink hover:text-brand"
                    >
                      {lead.name}
                    </button>
                    <p className="truncate text-xs text-faint">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted">{lead.company || '—'}</td>
                  <td className="px-4 py-3 text-muted">{lead.service || '—'}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-faint">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip icon={meta2.icon} label={meta2.label} tone={meta2.tone} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {busyId === lead._id && <Spinner className="h-3.5 w-3.5 text-muted" />}
                      <StatusSelect
                        value={lead.status}
                        busy={busyId === lead._id}
                        onChange={(s) => updateStatus(lead._id, s)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>

          <Pagination meta={meta} page={page} onPage={setPage} />
        </>
      )}

      <LeadDrawer
        lead={selected}
        onClose={() => setSelected(null)}
        onStatus={updateStatus}
        onDelete={remove}
        canDelete={user?.role === 'admin'}
      />
    </>
  );
}
