import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Plus, Sparkles } from 'lucide-react';

import { engagementModels, faqs, process as steps } from '@shared/site.js';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import CTA from '@/sections/CTA';
import { Button, Reveal, RevealGroup, RevealItem, SectionHeader } from '@/components/ui';

const RAMP = [
  { day: 'Day 1–2', title: 'Discovery workshop', body: 'Objectives, constraints, success metrics and the current process, with your actual practitioners in the room.' },
  { day: 'Day 3–5', title: 'Knowledge transfer', body: 'Your team explains once. We write it down, play it back, and you correct the playback. That runbook is the asset.' },
  { day: 'Day 6–10', title: 'Supervised production', body: 'Real work, fully reviewed, with the error rate tracked deliberately rather than anecdotally.' },
  { day: 'Day 11–14', title: 'First deliverable', body: 'Output you would have needed anyway, plus the first weekly written report against your agreed metrics.' },
];

function FaqAccordion({ items }) {
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

export default function HowWeWork() {
  useSeo({
    title: 'How we work — DostSol Global',
    description:
      'Engagement models, the fourteen-day ramp, governance, and the questions clients ask before signing. Transparent pricing bands and no long-term lock-in.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  });

  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="The operating model, written down before you ask for it."
        lead="Engagement shapes, pricing bands, the ramp schedule and the governance that sits underneath all of it. If something here is not clear, that is a defect on our side."
        breadcrumbs={[{ label: 'How we work' }]}
      >
        <Button to="/contact" size="lg">
          Book a scoping call
          <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      {/* Engagement models */}
      <section id="models" className="section scroll-mt-24">
        <div className="container">
          <SectionHeader
            eyebrow="Engagement models"
            title="Three shapes. Pick the one that matches the problem."
            lead="Rates below are indicative bands for a full-time equivalent. Your actual number depends on seniority, discipline and overlap requirement, and we will quote it precisely after scoping."
            align="center"
          />

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {engagementModels.map((m) => (
              <RevealItem key={m.name} className="h-full">
                <div
                  className={`card relative flex h-full flex-col p-8 ${
                    m.featured ? 'border-brand/40 shadow-lift lg:-mt-4 lg:mb-4' : 'card-hover'
                  }`}
                >
                  {m.featured && (
                    <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-2xs font-bold uppercase tracking-wider text-white shadow-soft">
                      <Sparkles className="h-3 w-3" />
                      Most chosen
                    </span>
                  )}

                  <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{m.description}</p>

                  <div className="mt-7 border-y border-line py-5">
                    <span className="font-display text-3xl font-bold text-ink">{m.price}</span>
                    <span className="ml-2 text-sm text-muted">{m.unit}</span>
                  </div>

                  <p className="mt-5 text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
                    Best for
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-ink">{m.best}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {m.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    to="/contact"
                    variant={m.featured ? 'primary' : 'secondary'}
                    className="mt-8 w-full"
                  >
                    Scope this model
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-faint">
              All models: rolling monthly terms · 30 days notice · IP assigned to you · replacement
              at no cost
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ramp */}
      <section className="section border-y border-line bg-surface">
        <div className="container">
          <SectionHeader
            eyebrow="The ramp"
            title="Fourteen days, sequenced honestly"
            lead="Most providers quote six weeks because they serialise work that is genuinely independent. Scoping, contracting and team assembly run in parallel here."
          />

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {RAMP.map((r, i) => (
              <RevealItem key={r.day} className="h-full">
                <div className="card relative h-full p-7">
                  <span className="font-mono text-2xs font-semibold uppercase tracking-[0.16em] text-brand">
                    {r.day}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold leading-snug">
                    {r.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{r.body}</p>
                  <span className="absolute right-6 top-6 font-display text-4xl font-bold text-line">
                    {i + 1}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Governance"
            title="The four pillars every engagement runs on"
            align="center"
          />

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {steps.map((s) => (
              <RevealItem key={s.step} className="h-full">
                <div className="card card-hover h-full p-8">
                  <div className="flex items-start gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand/25 bg-brand/10 font-display text-sm font-bold text-brand">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="text-lg leading-snug">{s.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.points.map((p) => (
                          <li key={p} className="chip text-2xs">
                            <Check className="h-3 w-3 text-teal" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section scroll-mt-24 border-t border-line">
        <div className="container max-w-3xl">
          <SectionHeader
            eyebrow="Questions"
            title="Everything clients ask before signing"
            align="center"
            className="mb-12"
          />
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTA
        title="Still have a question we have not answered?"
        lead="Ask it directly. We would rather spend thirty minutes telling you we are the wrong fit than three months proving it."
      />
    </>
  );
}
