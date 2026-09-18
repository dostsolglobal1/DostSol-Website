import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

import { testimonials as fallback } from '@shared/site.js';
import { useContent } from '@/hooks/useContent';
import { SectionHeader, Stars } from '@/components/ui';

const EASE = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  const { data: items } = useContent('/testimonials', fallback);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, go, items.length]);

  // Guard against the list shrinking when live data replaces the fallback.
  const current = items[Math.min(index, items.length - 1)];
  if (!current) return null;

  return (
    <section
      className="section relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/8 blur-[110px]" />
      </div>

      <div className="container">
        <SectionHeader
          eyebrow="Client results"
          title="The engagements, in their words"
          lead="Every quote below is attached to a number the client agreed to publish."
          align="center"
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="card relative overflow-hidden p-8 md:p-12">
            <Quote
              aria-hidden="true"
              className="absolute right-8 top-8 h-16 w-16 text-brand/10"
              strokeWidth={1.5}
            />

            <AnimatePresence mode="wait">
              <motion.figure
                key={current.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Stars rating={current.rating} />

                <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed text-ink md:text-2xl md:leading-relaxed">
                  “{current.quote}”
                </blockquote>

                <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-soft to-brand-deep font-display text-sm font-bold text-white">
                      {current.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{current.name}</p>
                      <p className="text-sm text-muted">
                        {current.role}
                        {current.company ? ` · ${current.company}` : ''}
                      </p>
                    </div>
                  </div>

                  {current.metric?.value && (
                    <div className="rounded-xl border border-teal/25 bg-teal/10 px-4 py-2.5">
                      <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-teal/90">
                        {current.metric.label}
                      </p>
                      <p className="mt-0.5 font-display text-lg font-bold text-teal">
                        {current.metric.value}
                      </p>
                    </div>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-400 ease-premium ${
                    i === index ? 'w-8 bg-brand' : 'w-1.5 bg-line hover:bg-faint'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition duration-300 hover:border-brand/40 hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition duration-300 hover:border-brand/40 hover:text-ink"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
