import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { differentiators } from '@shared/site.js';
import { Icon, Reveal, RevealGroup, RevealItem, accent } from '@/components/ui';

export default function Differentiators() {
  return (
    <section className="section border-y border-line bg-surface">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Why DostSol
            </span>
            <h2 className="mt-4 text-title">
              Offshore delivery fails for four reasons. We engineered around all of them.
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Most bad experiences with offshore teams trace back to the same handful of causes:
              juniors sold as seniors, governance treated as an afterthought, reporting that hides
              problems, and a ramp so slow the business moved on. Our operating model exists to
              close each one.
            </p>
            <Link
              to="/how-we-work"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand link-underline"
            >
              Read the full operating model
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {differentiators.map((d) => {
              const a = accent(d.accent);
              return (
                <RevealItem key={d.title} className="h-full">
                  <div className="card card-hover group h-full p-7">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-xl border ${a.border} ${a.bg} ${a.text} transition-transform duration-500 ease-premium group-hover:scale-105`}
                    >
                      <Icon name={d.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg leading-snug">{d.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{d.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
