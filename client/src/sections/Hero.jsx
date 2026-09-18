import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Play, Star } from 'lucide-react';

import { company, industries } from '@shared/site.js';
import { Button, Icon } from '@/components/ui';

const EASE = [0.22, 1, 0.36, 1];

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.06 * i, ease: EASE },
  }),
};

/** Live-looking engagement panel — the "product shot" a service business lacks. */
function EngagementPanel() {
  const rows = [
    { icon: 'Code2', label: 'Engineering pod', meta: '4 specialists', tone: 'text-brand', bar: 'w-[86%] bg-brand' },
    { icon: 'Calculator', label: 'Month-end close', meta: 'Day 4 of 5', tone: 'text-gold', bar: 'w-[74%] bg-gold' },
    { icon: 'TrendingUp', label: 'Organic growth', meta: '+164% YoY', tone: 'text-violet', bar: 'w-[92%] bg-violet' },
    { icon: 'Users', label: 'Open roles', meta: '2 shortlisted', tone: 'text-teal', bar: 'w-[58%] bg-teal' },
  ];

  return (
    <motion.div
      variants={rise}
      custom={3}
      className="relative mx-auto w-full max-w-[420px] lg:max-w-none"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-brand/20 via-violet/10 to-transparent blur-3xl"
      />

      <div className="card overflow-hidden p-0 shadow-lift">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            <span className="text-xs font-semibold text-ink">Engagement dashboard</span>
          </div>
          <span className="font-mono text-2xs text-faint">WEEK 14</span>
        </div>

        <div className="space-y-4 p-5">
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: EASE }}
            >
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Icon name={r.icon} className={`h-4 w-4 ${r.tone}`} />
                  {r.label}
                </span>
                <span className="font-mono text-xs text-muted">{r.meta}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-raised">
                <motion.div
                  className={`h-full origin-left rounded-full ${r.bar}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9 + i * 0.12, duration: 0.9, ease: EASE }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-line bg-raised px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-faint">
                Cost vs. in-house
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                −58<span className="text-base text-muted">%</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-faint">
                On-time delivery
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">93%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating proof card */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
        className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-line bg-surface px-4 py-3 shadow-lift sm:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            {['AA', 'AI', 'SS'].map((n) => (
              <span
                key={n}
                className="grid h-7 w-7 place-items-center rounded-full border-2 border-surface bg-gradient-to-br from-brand-soft to-brand-deep text-[0.5625rem] font-bold text-white"
              >
                {n}
              </span>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="text-xs font-bold text-ink">4.7</span>
              <span className="text-2xs text-faint">avg. rating</span>
            </div>
            <p className="text-2xs text-muted">50+ engagements delivered</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-[0.55] mask-fade-b" />
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand/12 blur-[120px]" />
        <div className="absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-violet/10 blur-[120px]" />
      </div>

      <div className="container">
        <motion.div
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-20"
        >
          <div>
            <motion.div variants={rise} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1.5 pl-1.5 pr-4 text-xs shadow-soft backdrop-blur">
                <span className="rounded-full bg-brand px-2.5 py-1 text-2xs font-bold uppercase tracking-wider text-white">
                  New
                </span>
                <span className="font-medium text-muted">
                  Teams live in 14 days — not six weeks
                </span>
              </span>
            </motion.div>

            <motion.h1 variants={rise} custom={1} className="mt-6 text-display">
              Outsource smarter.
              <br />
              <span className="bg-gradient-to-br from-brand-soft via-brand to-violet bg-clip-text text-transparent">
                Operate better.
              </span>
              <br />
              Grow faster.
            </motion.h1>

            <motion.p
              variants={rise}
              custom={2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
            >
              {company.name} builds dedicated offshore teams across eleven disciplines — engineering,
              finance, marketing, people and operations. Senior by default, governed by design, and
              reported on every single week.
            </motion.p>

            <motion.div variants={rise} custom={3} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/contact" size="lg">
                Book a scoping call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/how-we-work" variant="secondary" size="lg">
                <Play className="h-3.5 w-3.5" />
                See how we work
              </Button>
            </motion.div>

            <motion.ul
              variants={rise}
              custom={4}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted"
            >
              {['No long-term lock-in', 'IP assigned to you', 'NDA before kickoff'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-teal" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <EngagementPanel />
        </motion.div>

        {/* Industry marquee */}
        <motion.div
          variants={rise}
          custom={6}
          initial="hidden"
          animate="show"
          className="mt-20 border-t border-line pt-8"
        >
          <p className="text-center text-2xs font-semibold uppercase tracking-[0.2em] text-faint">
            Trusted across
          </p>
          <div className="mask-fade-x mt-5 overflow-hidden">
            <div className="flex w-max animate-marquee gap-10">
              {[...industries, ...industries].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap font-display text-sm font-semibold text-faint"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
