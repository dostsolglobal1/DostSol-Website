import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import Hero from '@/sections/Hero';
import Stats from '@/sections/Stats';
import ServicesGrid from '@/sections/ServicesGrid';
import Differentiators from '@/sections/Differentiators';
import Process from '@/sections/Process';
import Testimonials from '@/sections/Testimonials';
import CTA from '@/sections/CTA';

import { posts as fallbackPosts } from '@shared/posts.js';
import { useContent } from '@/hooks/useContent';
import { Button, RevealGroup, RevealItem, SectionHeader } from '@/components/ui';
import { formatDate } from '@/lib/format';
import { useSeo } from '@/hooks/useSeo';

function InsightsPreview() {
  const { data: posts } = useContent('/posts', fallbackPosts, { params: { limit: 3 } });
  const items = posts.slice(0, 3);

  return (
    <section className="section border-t border-line">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Insights"
            title="What we have learned running other people's operations"
            lead="Written by the practitioners doing the work, including the parts that do not flatter us."
          />
          <Button to="/insights" variant="secondary" className="shrink-0 self-start md:self-end">
            All insights
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <Link
                to={`/insights/${p.slug}`}
                className="card card-hover group flex h-full flex-col p-7"
              >
                <div className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.14em]">
                  <span className="text-brand">{p.category}</span>
                  <span className="text-faint">·</span>
                  <span className="text-faint">{p.readMinutes} min read</span>
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                  {p.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-xs text-faint">{formatDate(p.publishedAt)}</span>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default function Home() {
  useSeo({
    title: 'DostSol Global — Outsource smarter. Operate better. Grow faster.',
    description:
      'Dedicated offshore teams across eleven disciplines: engineering, finance, marketing, people and operations. Senior by default, live in fourteen days.',
  });

  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <Differentiators />
      <Process />
      <Testimonials />
      <InsightsPreview />
      <CTA />
    </>
  );
}
