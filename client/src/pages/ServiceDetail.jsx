import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Minus, Plus } from 'lucide-react';

import { serviceBySlug, services as allServices } from '@shared/services.js';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import CTA from '@/sections/CTA';
import Testimonials from '@/sections/Testimonials';
import {
  Button,
  Icon,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeader,
  accent,
} from '@/components/ui';

function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition duration-300 hover:bg-raised"
            >
              <span className="font-display font-semibold text-ink">{item.q}</span>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition duration-300 ${
                  isOpen ? 'border-brand bg-brand text-white' : 'border-line text-muted'
                }`}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pr-16 leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const fallback = serviceBySlug(slug);

  const { data: service, loading } = useContent(`/services/${slug}`, fallback, {
    enabled: Boolean(slug),
  });

  if (!fallback && !loading && !service) return <Navigate to="/services" replace />;
  if (!service) return null;

  const a = accent(service.accent);
  const related =
    service.related?.length
      ? service.related
      : allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <ServiceSeo service={service} />

      <PageHero
        eyebrow={service.title}
        title={service.heroHeadline || service.title}
        lead={service.heroSub || service.summary}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
        aside={
          service.outcomes?.length ? (
            <div className="card p-6">
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-faint">
                Typical outcomes
              </p>
              <dl className="mt-5 space-y-4">
                {service.outcomes.map((o) => (
                  <div key={o.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-muted">{o.label}</dt>
                    <dd className={`font-display text-xl font-bold ${a.text}`}>{o.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="lg">
            Discuss this practice
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button to="/how-we-work" variant="secondary" size="lg">
            How engagements run
          </Button>
        </div>
      </PageHero>

      {/* Capabilities */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Capabilities"
            title="What this practice actually covers"
            lead="Scope is agreed in writing before kickoff. Anything below can be a standalone engagement or part of a managed function."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(service.capabilities || []).map((c) => (
              <RevealItem key={c.title} className="h-full">
                <div className="card card-hover group h-full p-7">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg border ${a.bg} ${a.border} ${a.text}`}
                  >
                    <Icon name={service.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Deliverables */}
      {service.deliverables?.length > 0 && (
        <section className="section border-y border-line bg-surface">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <span className="eyebrow">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  What you receive
                </span>
                <h2 className="mt-4 text-title">Deliverables, not activity reports</h2>
                <p className="mt-5 leading-relaxed text-muted">
                  Every engagement in this practice produces the same baseline artefacts. They are
                  yours from day one and they stay yours if the engagement ends.
                </p>
                <Button to="/contact" variant="secondary" className="mt-8">
                  Request a sample pack
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>

              <RevealGroup className="space-y-3">
                {service.deliverables.map((d, i) => (
                  <RevealItem key={d}>
                    <div className="flex items-start gap-4 rounded-2xl border border-line bg-canvas p-5">
                      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal/12 text-teal">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <p className="font-medium text-ink">{d}</p>
                        <p className="mt-0.5 font-mono text-2xs text-faint">
                          ARTEFACT {String(i + 1).padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs?.length > 0 && (
        <section className="section">
          <div className="container max-w-3xl">
            <SectionHeader
              eyebrow="Questions"
              title="The things clients ask first"
              align="center"
              className="mb-12"
            />
            <Reveal>
              <Accordion items={service.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      <Testimonials />

      {/* Related */}
      <section className="section border-t border-line">
        <div className="container">
          <SectionHeader eyebrow="Also consider" title="Practices that pair well with this one" />

          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((r) => {
              const ra = accent(r.accent);
              return (
                <RevealItem key={r.slug} className="h-full">
                  <Link
                    to={`/services/${r.slug}`}
                    className="card card-hover group flex h-full flex-col p-7"
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-lg border ${ra.bg} ${ra.border} ${ra.text}`}
                    >
                      <Icon name={r.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold transition-colors group-hover:text-brand">
                      {r.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                      {r.summary}
                    </p>
                    <ArrowUpRight className="mt-5 h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CTA
        title={`Ready to scope ${service.title.toLowerCase()}?`}
        lead="Tell us the outcome you need and the constraints you are working within. We will come back with a team shape, a timeline and a number."
      />
    </>
  );
}

function ServiceSeo({ service }) {
  useSeo({
    title: `${service.title} — DostSol Global`,
    description: service.summary,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.summary,
      provider: { '@type': 'Organization', name: 'DostSol Global', url: 'https://dostsol.com' },
      areaServed: ['US', 'CA', 'GB', 'AE'],
    },
  });
  return null;
}
