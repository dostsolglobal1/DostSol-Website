import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { process as steps } from '@shared/site.js';
import { Reveal, SectionHeader } from '@/components/ui';

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section className="section relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-40" />

      <div className="container">
        <SectionHeader
          eyebrow="How it works"
          title="Four pillars, run the same way every time"
          lead="The process is deliberately unglamorous. It is also why engagements that start in week two are still running three years later."
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Step selector */}
          <div className="relative">
            {/* Spine */}
            <span
              aria-hidden="true"
              className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-line sm:block"
            />

            <div className="space-y-2">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    className={`relative flex w-full items-start gap-4 rounded-2xl p-4 text-left transition duration-400 ease-premium ${
                      isActive ? 'bg-surface shadow-soft' : 'hover:bg-raised/60'
                    }`}
                  >
                    <span
                      className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border font-display text-sm font-bold transition duration-400 ${
                        isActive
                          ? 'border-brand bg-brand text-white shadow-glow'
                          : 'border-line bg-canvas text-faint'
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="min-w-0 pt-2">
                      <span
                        className={`block font-display font-semibold transition-colors ${
                          isActive ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {step.title}
                      </span>
                      {!isActive && (
                        <span className="mt-1 line-clamp-1 block text-sm text-faint">
                          {step.body}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <Reveal>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="card h-full p-8 md:p-10"
            >
              <span className="font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-brand">
                Pillar {steps[active].step}
              </span>
              <h3 className="mt-4 text-2xl leading-snug">{steps[active].title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{steps[active].body}</p>

              <ul className="mt-8 space-y-3">
                {steps[active].points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-raised px-4 py-3 text-sm font-medium text-ink"
                  >
                    <Check className="h-4 w-4 shrink-0 text-teal" />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
