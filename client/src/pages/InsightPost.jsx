import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Link2 } from 'lucide-react';

import { posts as allPosts } from '@shared/posts.js';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import CTA from '@/sections/CTA';
import { formatDate, initials, renderMarkdown } from '@/lib/format';
import { Button, Reveal } from '@/components/ui';

/** Thin progress bar showing how far through the article the reader is. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand transition-transform duration-150"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}

function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user dismissed the sheet — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — nothing useful to do */
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition duration-300 hover:border-brand/40 hover:text-ink"
    >
      {copied ? <Check className="h-4 w-4 text-teal" /> : <Link2 className="h-4 w-4" />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}

export default function InsightPost() {
  const { slug } = useParams();
  const fallback = allPosts.find((p) => p.slug === slug);

  const { data: post, loading } = useContent(`/posts/${slug}`, fallback, {
    enabled: Boolean(slug),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const html = useMemo(() => renderMarkdown(post?.body || ''), [post?.body]);

  if (!fallback && !loading && !post) return <Navigate to="/insights" replace />;
  if (!post) return null;

  const related =
    post.related?.length
      ? post.related
      : allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <PostSeo post={post} />
      <ReadingProgress />

      <article>
        <header className="relative overflow-hidden border-b border-line pb-12 pt-32 md:pt-40">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 grid-bg opacity-35 mask-fade-b" />
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-[100px]" />
          </div>

          <div className="container max-w-3xl">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              All insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2 text-2xs font-semibold uppercase tracking-[0.14em]">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">{post.category}</span>
              <span className="text-faint">{post.readMinutes} min read</span>
              <span className="text-faint">·</span>
              <span className="text-faint">{formatDate(post.publishedAt)}</span>
            </div>

            <h1 className="mt-6 text-hero">{post.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{post.excerpt}</p>

            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-soft to-brand-deep font-display text-sm font-bold text-white">
                  {initials(post.author?.name || 'DostSol')}
                </span>
                <div>
                  <p className="font-semibold text-ink">{post.author?.name}</p>
                  <p className="text-sm text-muted">{post.author?.role}</p>
                </div>
              </div>
              <ShareButton title={post.title} />
            </div>
          </div>
        </header>

        <div className="container max-w-3xl py-14 md:py-20">
          {/* Content is authored in-house and rendered through our own limited
              markdown subset — no third-party HTML enters this path. */}
          <div className="prose-article" dangerouslySetInnerHTML={{ __html: html }} />

          {post.tags?.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((t) => (
                <span key={t} className="chip">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line py-16 md:py-20">
          <div className="container">
            <Reveal>
              <h2 className="text-2xl">Keep reading</h2>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Reveal key={r.slug}>
                  <Link to={`/insights/${r.slug}`} className="card card-hover group flex h-full flex-col p-7">
                    <span className="text-2xs font-semibold uppercase tracking-[0.14em] text-brand">
                      {r.category}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug transition-colors group-hover:text-brand">
                      {r.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                      {r.excerpt}
                    </p>
                    <ArrowUpRight className="mt-5 h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <Button to="/insights" variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                Back to all insights
              </Button>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}

function PostSeo({ post }) {
  useSeo({
    title: `${post.title} — DostSol Global`,
    description: post.excerpt,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      author: { '@type': 'Person', name: post.author?.name },
      publisher: { '@type': 'Organization', name: 'DostSol Global' },
    },
  });
  return null;
}
