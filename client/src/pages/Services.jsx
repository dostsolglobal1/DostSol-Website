import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { services as fallbackServices } from '@shared/services.js';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import { ServiceCard } from '@/sections/ServicesGrid';
import CTA from '@/sections/CTA';
import Process from '@/sections/Process';
import { RevealGroup, RevealItem } from '@/components/ui';

const FILTERS = [
  { key: 'all', label: 'All practices' },
  { key: 'core', label: 'Core' },
  { key: 'specialist', label: 'Specialist' },
];

export default function Services() {
  const { data: services } = useContent('/services', fallbackServices);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useSeo({
    title: 'Services — DostSol Global',
    description:
      'Eleven outsourcing practices: IT, accounting and finance, SEO and digital marketing, HR, project management, design, supply chain, assets, facilities, construction and research.',
  });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (filter === 'core' && !s.featured) return false;
      if (filter === 'specialist' && s.featured) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        (s.summary || '').toLowerCase().includes(q) ||
        (s.tagline || '').toLowerCase().includes(q)
      );
    });
  }, [services, filter, query]);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every function you could hand over, run by people who have done it."
        lead="Eleven practices, each led by a practitioner rather than an account manager. Start with one, or let us run an entire function end to end."
        breadcrumbs={[{ label: 'Services' }]}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search practices…"
              aria-label="Search practices"
              className="field pl-11"
            />
          </div>

          <div
            className="flex gap-1 rounded-full border border-line bg-surface p-1"
            role="tablist"
            aria-label="Filter practices"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  filter === f.key
                    ? 'bg-brand text-white shadow-soft'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <p className="mb-8 text-sm text-faint">
            Showing {visible.length} of {services.length} practices
          </p>

          {visible.length === 0 ? (
            <div className="card p-14 text-center">
              <p className="font-display text-lg font-semibold">No practice matches that search.</p>
              <p className="mt-2 text-sm text-muted">
                Try a broader term, or tell us what you need and we will say honestly whether we
                cover it.
              </p>
            </div>
          ) : (
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((s) => (
                <RevealItem key={s.slug} className="h-full">
                  <ServiceCard service={s} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <Process />
      <CTA
        title="Not sure which practice you need?"
        lead="Describe the problem rather than the role. We will tell you which practice fits, what it would cost, and whether you would be better off hiring in-house."
      />
    </>
  );
}
