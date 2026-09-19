import { useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Trash2, X } from 'lucide-react';

import { api, toFormError } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { Button, Spinner } from '@/components/ui';
import { useSeo } from '@/hooks/useSeo';
import { useAdminData } from '../useAdminData';
import { useAuth } from '../AuthContext';
import { EmptyState, ErrorState, Loading, PageHead, StatusChip, Table } from '../components/shell';

const BLANK = {
  title: '',
  slug: '',
  category: 'Insights',
  excerpt: '',
  body: '',
  tags: '',
  readMinutes: 5,
  authorName: '',
  authorRole: '',
  published: true,
  featured: false,
};

const slugify = (s) =>
  s.toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function toForm(post) {
  return {
    title: post.title || '',
    slug: post.slug || '',
    category: post.category || 'Insights',
    excerpt: post.excerpt || '',
    body: post.body || '',
    tags: (post.tags || []).join(', '),
    readMinutes: post.readMinutes || 5,
    authorName: post.author?.name || '',
    authorRole: post.author?.role || '',
    published: post.published !== false,
    featured: Boolean(post.featured),
  };
}

function toPayload(form) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim() || slugify(form.title),
    category: form.category.trim() || 'Insights',
    excerpt: form.excerpt.trim(),
    body: form.body,
    tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    readMinutes: Number(form.readMinutes) || 5,
    author: { name: form.authorName.trim(), role: form.authorRole.trim() },
    published: form.published,
    featured: form.featured,
  };
}

function Editor({ post, onClose, onSaved }) {
  const isNew = !post;
  const [form, setForm] = useState(() => (post ? toForm(post) : BLANK));
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
    if (form.title.trim().length < 4) next.title = 'Give the article a title.';
    if (form.excerpt.trim().length < 10) next.excerpt = 'Write a one-line summary.';
    setFieldErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setError('');
    try {
      const payload = toPayload(form);
      if (isNew) await api.post('/admin/posts', payload);
      else await api.patch(`/admin/posts/${post._id}`, payload);
      onSaved();
    } catch (err) {
      const { message, fields } = toFormError(err);
      setError(message);
      setFieldErrors(fields);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/45" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={isNew ? 'New article' : `Edit ${post.title}`}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-line bg-surface shadow-lift"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line p-5">
          <h2 className="font-display text-lg font-semibold text-ink">
            {isNew ? 'New article' : 'Edit article'}
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
                <label htmlFor="p-title" className="label">
                  Title <span className="text-brand">*</span>
                </label>
                <input
                  id="p-title"
                  value={form.title}
                  onChange={(e) => {
                    set('title')(e);
                    // Keep the slug in step with the title until it is edited by hand.
                    if (isNew && (!form.slug || form.slug === slugify(form.title))) {
                      setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                    }
                  }}
                  className={`field ${fieldErrors.title ? 'field-error' : ''}`}
                />
                {fieldErrors.title && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.title}</p>}
              </div>

              <div>
                <label htmlFor="p-slug" className="label">URL slug</label>
                <input id="p-slug" value={form.slug} onChange={set('slug')} className="field font-mono text-xs" />
              </div>

              <div>
                <label htmlFor="p-category" className="label">Category</label>
                <input id="p-category" value={form.category} onChange={set('category')} className="field" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="p-excerpt" className="label">
                  Excerpt <span className="text-brand">*</span>
                </label>
                <textarea
                  id="p-excerpt"
                  rows={2}
                  value={form.excerpt}
                  onChange={set('excerpt')}
                  className={`field resize-y ${fieldErrors.excerpt ? 'field-error' : ''}`}
                />
                {fieldErrors.excerpt && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.excerpt}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="p-body" className="label">
                  Body <span className="text-faint">— markdown: ## heading, **bold**, - list</span>
                </label>
                <textarea
                  id="p-body"
                  rows={14}
                  value={form.body}
                  onChange={set('body')}
                  className="field resize-y font-mono text-xs leading-relaxed"
                />
              </div>

              <div>
                <label htmlFor="p-author" className="label">Author name</label>
                <input id="p-author" value={form.authorName} onChange={set('authorName')} className="field" />
              </div>

              <div>
                <label htmlFor="p-role" className="label">Author role</label>
                <input id="p-role" value={form.authorRole} onChange={set('authorRole')} className="field" />
              </div>

              <div>
                <label htmlFor="p-tags" className="label">Tags <span className="text-faint">comma separated</span></label>
                <input id="p-tags" value={form.tags} onChange={set('tags')} className="field" />
              </div>

              <div>
                <label htmlFor="p-read" className="label">Read time (minutes)</label>
                <input
                  id="p-read"
                  type="number"
                  min="1"
                  max="60"
                  value={form.readMinutes}
                  onChange={set('readMinutes')}
                  className="field"
                />
              </div>

              <div className="flex flex-wrap gap-5 sm:col-span-2">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={set('published')}
                    className="h-4 w-4 rounded border-line accent-[rgb(var(--c-brand))]"
                  />
                  Published
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={set('featured')}
                    className="h-4 w-4 rounded border-line accent-[rgb(var(--c-brand))]"
                  />
                  Featured
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
                <>{isNew ? 'Publish article' : 'Save changes'}</>
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

export default function Posts() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(null); // null | 'new' | post
  const [notice, setNotice] = useState('');

  useSeo({ title: 'Articles — DostSol Console', description: 'Manage insights articles.' });

  const { data: posts, loading, error, refetch } = useAdminData('/admin/posts');

  const remove = async (post) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setNotice('');
    try {
      await api.delete(`/admin/posts/${post._id}`);
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  const togglePublished = async (post) => {
    setNotice('');
    try {
      await api.patch(`/admin/posts/${post._id}`, { published: !post.published });
      refetch();
    } catch (err) {
      setNotice(toFormError(err).message);
    }
  };

  return (
    <>
      <PageHead title="Articles" sub={posts ? `${posts.length} articles` : 'Insights content'}>
        <Button size="sm" onClick={() => setEditing('new')}>
          <Plus className="h-3.5 w-3.5" />
          New article
        </Button>
      </PageHead>

      {notice && (
        <p role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-2.5 text-sm text-red-500">
          {notice}
        </p>
      )}

      {loading && !posts ? (
        <Loading label="Loading articles…" />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !posts?.length ? (
        <EmptyState title="No articles yet" body="Write the first one.">
          <Button size="sm" onClick={() => setEditing('new')}>
            <Plus className="h-3.5 w-3.5" />
            New article
          </Button>
        </EmptyState>
      ) : (
        <Table head={['Title', 'Category', 'Author', 'Published', 'State', '']}>
          {posts.map((p) => (
            <tr key={p._id} className="transition hover:bg-raised/60">
              <td className="max-w-md px-4 py-3">
                <button
                  type="button"
                  onClick={() => setEditing(p)}
                  className="text-left font-medium text-ink hover:text-brand"
                >
                  {p.title}
                </button>
                <p className="truncate font-mono text-2xs text-faint">/{p.slug}</p>
              </td>
              <td className="px-4 py-3 text-muted">{p.category}</td>
              <td className="px-4 py-3 text-muted">{p.author?.name || '—'}</td>
              <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-faint">
                {formatDate(p.publishedAt)}
              </td>
              <td className="px-4 py-3">
                {p.published ? (
                  <StatusChip icon={Eye} label="Live" tone="good" />
                ) : (
                  <StatusChip icon={EyeOff} label="Draft" tone="neutral" />
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => togglePublished(p)}
                    aria-label={p.published ? `Unpublish ${p.title}` : `Publish ${p.title}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-ink"
                  >
                    {p.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    aria-label={`Edit ${p.title}`}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-raised hover:text-ink"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => remove(p)}
                      aria-label={`Delete ${p.title}`}
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
          post={editing === 'new' ? null : editing}
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
