import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';

import { posts as fallbackPosts } from '@shared/posts.js';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import CTA from '@/sections/CTA';
import { formatDate, initials } from '@/lib/format';
import { Badge, RevealGroup, RevealItem } from '@/components/ui';

function PostCard({ post, featured = false }) {
  return (
    <Link
      to={`/insights/${post.slug}`}
      className={`card card-hover group flex h-full flex-col ${featured ? 'p-8 md:p-10' : 'p-7'}`}
    >
      <div className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.14em]">
        <span className="text-brand">{post.category}</span>
        <span className="text-faint">·</span>
        <span className="text-faint">{post.readMinutes} min read</span>
      </div>

      <h3
        className={`mt-4 font-semibold leading-snug transition-colors duration-300 group-hover:text-brand ${
          featured ? 'text-2xl md:text-3xl' : 'text-lg'
        }`}
      >
        {post.title}
      </h3>

      <p
        className={`mt-3 flex-1 leading-relaxed text-muted ${
          featured ? 'text-[1.0625rem]' : 'text-sm line-clamp-3'
        }`}
      >
        {post.excerpt}
      </p>

      <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-soft to-brand-deep text-2xs font-bold text-white">
            {initials(post.author?.name || 'DostSol')}
          </span>
          <div className="text-xs">
            <p className="font-medium text-ink">{post.author?.name}</p>
            <p className="text-faint">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>
    </Link>
  );
}

export default function Insights() {
  const { data: posts, meta } = useContent('/posts', fallbackPosts, { params: { limit: 24 } });
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  useSeo({
    title: 'Insights — DostSol Global',
    description:
      'Practical writing on offshore delivery, outsourced finance, search and operations — by the practitioners doing the work.',
  });

  const categories = useMemo(() => {
    const fromApi = meta?.categories;
    const list = fromApi?.length ? fromApi : [...new Set(posts.map((p) => p.category))];
    return ['All', ...list.filter(Boolean).sort()];
  }, [meta, posts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, category, query]);

  const [lead, ...rest] = visible;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes from running other people's operations."
        lead="No thought leadership, no listicles. Specific writing on what works in offshore delivery, what does not, and the numbers behind both."
        breadcrumbs={[{ label: 'Insights' }]}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="field pl-11"
            />
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                  category === c
                    ? 'border-brand bg-brand text-white'
                    : 'border-line text-muted hover:border-brand/35 hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          {visible.length === 0 ? (
            <div className="card p-14 text-center">
              <p className="font-display text-lg font-semibold">Nothing matches that search.</p>
              <p className="mt-2 text-sm text-muted">
                Try a different term or clear the category filter.
              </p>
            </div>
          ) : (
            <>
              {lead && (
                <RevealGroup className="mb-5">
                  <RevealItem>
                    <div className="relative">
                      <Badge className="absolute -top-3 left-8 z-10">Latest</Badge>
                      <PostCard post={lead} featured />
                    </div>
                  </RevealItem>
                </RevealGroup>
              )}

              <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <RevealItem key={p.slug} className="h-full">
                    <PostCard post={p} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          )}
        </div>
      </section>

      <CTA
        eyebrow="Subscribe"
        title="One email a month, worth the inbox space."
        lead="New writing on offshore delivery, sent monthly. If a month produces nothing worth reading, we do not send anything."
      />
    </>
  );
}
