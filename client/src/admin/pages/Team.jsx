import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Linkedin, Pencil, Plus, Trash2, X } from 'lucide-react';

import { api, toFormError } from '@/lib/api';
import { initials as initialsOf } from '@/lib/format';
import { Button, Spinner } from '@/components/ui';
import { useSeo } from '@/hooks/useSeo';
import { useAdminData } from '../useAdminData';
import { useAuth } from '../AuthContext';
import { EmptyState, ErrorState, Loading, PageHead, StatusChip, Table } from '../components/shell';

const BLANK = {
  name: '',
  role: '',
  initials: '',
  email: '',
  linkedin: '',
  avatar: '',
  focus: '',
  bio: '',
  published: true,
};

function toForm(member) {
  return {
    name: member.name || '',
    role: member.role || '',
    initials: member.initials || '',
    email: member.email || '',
    linkedin: member.linkedin || '',
    avatar: member.avatar || '',
    focus: (member.focus || []).join(', '),
    bio: member.bio || '',
    published: member.published !== false,
  };
}

function toPayload(form) {
  return {
    name: form.name.trim(),
    role: form.role.trim(),
    // Fall back to derived initials so the avatar tile is never blank.
    initials: form.initials.trim() || initialsOf(form.name),
    email: form.email.trim(),
    linkedin: form.linkedin.trim(),
    avatar: form.avatar.trim(),
    focus: form.focus.split(',').map((f) => f.trim()).filter(Boolean),
    bio: form.bio.trim(),
    published: form.published,
  };
}

function Editor({ member, onClose, onSaved }) {
  const isNew = !member;
  const [form, setForm] = useState(() => (member ? toForm(member) : BLANK));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const set = (name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [name]: value }));
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;

    const next = {};
    if (form.name.trim().length < 2) next.name = 'Give the member a name.';
    if (!form.role.trim()) next.role = 'Add the role shown under their name.';
    if (form.bio.trim().length < 20) next.bio = 'Write a short bio — this is the body of their card.';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = 'That does not look like an email address.';
    }
    setFieldErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setError('');
    try {
      const payload = toPayload(form);
      if (isNew) await api.post('/admin/team', payload);
      else await api.patch(`/admin/team/${member._id}`, payload);
      onSaved();
    } catch (err) {
      const { message, fields } = toFormError(err);
      setError(message);
      setFieldErrors(fields);
    } finally {
      setBusy(false);
    }
  };

  const preview = form.initials.trim() || initialsOf(form.name) || '—';

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/45" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isNew ? 'New team member' : `Edit ${member.name}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-line bg-surface shadow-lift"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isNew ? 'New team member' : 'Edit team member'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-5">
            {error && (
              <p role="alert" className="mb-5 rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-2.5 text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="t-name" className="label">
                  Name <span className="text-brand">*</span>
                </label>
                <input
                  id="t-name"
                  value={form.name}
                  onChange={(e) => {
                    set('name')(e);
                    // Keep initials in step with the name until they are set by hand.
                    if (!form.initials || form.initials === initialsOf(form.name)) {
                      setForm((f) => ({ ...f, initials: initialsOf(e.target.value) }));
                    }
                  }}
                  className={`field ${fieldErrors.name ? 'field-error' : ''}`}
                />
                {fieldErrors.name && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="t-role" className="label">
                  Role <span className="text-brand">*</span>
                </label>
                <input
                  id="t-role"
                  value={form.role}
                  onChange={set('role')}
                  placeholder="Founder & Chief Executive"
                  className={`field ${fieldErrors.role ? 'field-error' : ''}`}
                />
                {fieldErrors.role && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.role}</p>}
              </div>

              <div>
                <label htmlFor="t-initials" className="label">
                  Initials <span className="text-faint">used when there is no photo</span>
                </label>
                <input
                  id="t-initials"
                  value={form.initials}
                  onChange={set('initials')}
                  maxLength={3}
                  className="field uppercase"
                />
              </div>

              <div>
                <label htmlFor="t-email" className="label">Email</label>
                <input
                  id="t-email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  className={`field ${fieldErrors.email ? 'field-error' : ''}`}
                />
                {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="t-linkedin" className="label">LinkedIn URL</label>
                <input
                  id="t-linkedin"
                  value={form.linkedin}
                  onChange={set('linkedin')}
                  placeholder="https://www.linkedin.com/in/…"
                  className="field text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="t-avatar" className="label">
                  Photo URL <span className="text-faint">optional — initials are shown when empty</span>
                </label>
                <div className="flex items-center gap-3">
                  {form.avatar.trim() ? (
                    <img
                      src={form.avatar.trim()}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-xl border border-line object-cover"
                    />
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-soft to-brand-deep text-xs font-bold text-white">
                      {preview}
                    </span>
                  )}
                  <input id="t-avatar" value={form.avatar} onChange={set('avatar')} className="field text-xs" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="t-focus" className="label">
                  Focus areas <span className="text-faint">comma separated</span>
                </label>
                <input
                  id="t-focus"
                  value={form.focus}
                  onChange={set('focus')}
                  placeholder="Strategy, Client partnerships"
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="t-bio" className="label">
                  Bio <span className="text-brand">*</span>
                </label>
                <textarea
                  id="t-bio"
                  rows={6}
                  value={form.bio}
                  onChange={set('bio')}
                  className={`field resize-y leading-relaxed ${fieldErrors.bio ? 'field-error' : ''}`}
                />
                {fieldErrors.bio && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.bio}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={set('published')}
                    className="h-4 w-4 rounded border-line accent-[rgb(var(--c-brand))]"
                  />
                  Show on the public team page
                </label>
              </div>
            </div>
          </div>

          <footer className="flex items-center gap-3 border-t border-line p-5">
            <Button type="submit" disabled={busy}>
              {busy ? (
                <>
                  <Spinner /> Saving…
                </>
              ) : (
                <>{isNew ? 'Add member' : 'Save changes'}</>
              )}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </footer>
        </form>
      </aside>
    </>
  );
}

export default function Team() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(null); // null | 'new' | member
  const [notice, setNotice] = useState('');

  useSeo({ title: 'Team — DostSol Console', description: 'Manage the people shown on the team page.' });

  const { data: team, loading, error, refetch, setData } = useAdminData('/admin/team');

  const remove = async (member) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Remove "${member.name}" from the team page? This cannot be undone.`)) return;
    setNotice('');
    try {
      await api.delete(`/admin/team/${member._id}`);
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  const togglePublished = async (member) => {
    setNotice('');
    try {
      await api.patch(`/admin/team/${member._id}`, { published: !member.published });
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  /** Swaps a member with its neighbour and persists the whole order in one call. */
  const move = async (index, delta) => {
    const target = index + delta;
    if (!team || target < 0 || target >= team.length) return;

    const next = [...team];
    [next[index], next[target]] = [next[target], next[index]];
    setNotice('');
    setData(next); // optimistic — the row moves before the round trip

    try {
      const res = await api.patch('/admin/team/reorder', { ids: next.map((m) => m._id) });
      setData(res.data.data);
    } catch (err) {
      setNotice(toFormError(err).message);
      refetch();
    }
  };

  return (
    <>
      <PageHead
        title="Team"
        sub={team ? `${team.length} members · shown on /team in this order` : 'People on the team page'}
      >
        <Button size="sm" onClick={() => setEditing('new')}>
          <Plus className="h-3.5 w-3.5" />
          New member
        </Button>
      </PageHead>

      {notice && (
        <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-2.5 text-sm text-red-500">
          {notice}
        </p>
      )}

      {loading && !team ? (
        <Loading label="Loading team…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !team?.length ? (
        <EmptyState title="No team members yet" body="Add the first person to show on the team page.">
          <Button size="sm" onClick={() => setEditing('new')}>
            <Plus className="h-3.5 w-3.5" />
            New member
          </Button>
        </EmptyState>
      ) : (
        <Table head={['Member', 'Role', 'Focus', 'State', 'Order', '']}>
          {team.map((m, i) => (
            <tr key={m._id} className="transition hover:bg-raised/60">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {m.avatar ? (
                    <img
                      src={m.avatar}
                      alt=""
                      className="h-9 w-9 shrink-0 rounded-lg border border-line object-cover"
                    />
                  ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-soft to-brand-deep text-2xs font-bold text-white">
                      {m.initials || initialsOf(m.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setEditing(m)}
                      className="text-left font-medium text-ink hover:text-brand"
                    >
                      {m.name}
                    </button>
                    {m.email && <p className="truncate text-2xs text-faint">{m.email}</p>}
                  </div>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${m.name} on LinkedIn`}
                      className="text-faint transition hover:text-brand"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-muted">{m.role || '—'}</td>
              <td className="px-4 py-3">
                {m.focus?.length ? (
                  <div className="flex flex-wrap gap-1">
                    {m.focus.map((f) => (
                      <span key={f} className="chip text-2xs">
                        {f}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-faint">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                {m.published ? (
                  <StatusChip icon={Eye} label="Live" tone="good" />
                ) : (
                  <StatusChip icon={EyeOff} label="Hidden" tone="neutral" />
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label={`Move ${m.name} up`}
                    className="grid h-7 w-7 place-items-center rounded-md text-muted transition hover:bg-raised hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === team.length - 1}
                    aria-label={`Move ${m.name} down`}
                    className="grid h-7 w-7 place-items-center rounded-md text-muted transition hover:bg-raised hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => togglePublished(m)}
                    aria-label={m.published ? `Hide ${m.name}` : `Show ${m.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-ink"
                  >
                    {m.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(m)}
                    aria-label={`Edit ${m.name}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-ink"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => remove(m)}
                      aria-label={`Delete ${m.name}`}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-viz-critical/10 hover:text-viz-critical"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {editing && (
        <Editor
          member={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            refetch();
          }}
        />
      )}
    </>
  );
}
