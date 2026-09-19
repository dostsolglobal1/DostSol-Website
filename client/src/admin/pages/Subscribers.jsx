import { useState } from 'react';
import { BellOff, BellRing, Check, Copy, Download } from 'lucide-react';

import { api, toFormError } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Button } from '@/components/ui';
import { useSeo } from '@/hooks/useSeo';
import { useAdminData } from '../useAdminData';
import { EmptyState, ErrorState, Loading, PageHead, Pagination, StatusChip, Table } from '../components/shell';

export default function Subscribers() {
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);

  useSeo({ title: 'Subscribers — DostSol Console', description: 'Newsletter subscribers.' });

  const { data: subs, meta, loading, error, refetch } = useAdminData('/admin/subscribers', {
    params: { page, limit: 50 },
  });

  const toggle = async (sub) => {
    setNotice('');
    try {
      await api.patch(`/admin/subscribers/${sub._id}`, { active: !sub.active });
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  const copyActive = async () => {
    const list = (subs || []).filter((s) => s.active).map((s) => s.email).join(', ');
    try {
      await navigator.clipboard.writeText(list);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setNotice('Clipboard access was blocked by the browser.');
    }
  };

  const downloadCsv = () => {
    const rows = ['email,active,source,subscribed'].concat(
      (subs || []).map((s) => `"${s.email}",${s.active},"${s.source || ''}","${s.createdAt}"`)
    );
    const blob = new Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dostsol-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeCount = (subs || []).filter((s) => s.active).length;

  return (
    <>
      <PageHead
        title="Subscribers"
        sub={meta ? `${meta.total} total · ${activeCount} active on this page` : 'Newsletter list'}
      >
        <Button variant="secondary" size="sm" onClick={copyActive} disabled={!subs?.length}>
          {copied ? <Check className="h-3.5 w-3.5 text-viz-good" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy active'}
        </Button>
        <Button variant="secondary" size="sm" onClick={downloadCsv} disabled={!subs?.length}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </PageHead>

      {notice && (
        <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-2.5 text-sm text-red-500">
          {notice}
        </p>
      )}

      {loading && !subs ? (
        <Loading label="Loading subscribers…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !subs?.length ? (
        <EmptyState
          title="No subscribers yet"
          body="Sign-ups from the footer form on the website appear here."
        />
      ) : (
        <>
          <Table head={['Email', 'Source', 'Subscribed', 'Status', '']}>
            {subs.map((s) => (
              <tr key={s._id} className="transition hover:bg-raised/60">
                <td className="px-4 py-3">
                  <a href={`mailto:${s.email}`} className="font-medium text-ink hover:text-brand">
                    {s.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-muted">{s.source || '—'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-faint">
                  {formatDate(s.createdAt)}
                </td>
                <td className="px-4 py-3">
                  {s.active ? (
                    <StatusChip icon={BellRing} label="Active" tone="good" />
                  ) : (
                    <StatusChip icon={BellOff} label="Unsubscribed" tone="neutral" />
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggle(s)}
                    className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-brand/40 hover:text-ink"
                  >
                    {s.active ? 'Unsubscribe' : 'Resubscribe'}
                  </button>
                </td>
              </tr>
            ))}
          </Table>

          <Pagination meta={meta} page={page} onPage={setPage} />
        </>
      )}
    </>
  );
}
