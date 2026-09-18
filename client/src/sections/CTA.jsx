import { ArrowRight, Calendar, Phone } from 'lucide-react';

import { company } from '@shared/site.js';
import { Button, Reveal } from '@/components/ui';

export default function CTA({
  eyebrow = 'Next step',
  title = 'Tell us what is slowing you down.',
  lead = 'Thirty minutes, no deck. We will map your requirement to a team shape, give you an honest cost comparison against hiring in-house, and tell you plainly if we are not the right fit.',
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-line bg-gradient-to-br from-brand-deep via-brand to-violet px-7 py-14 text-white md:px-14 md:py-20">
            {/* Texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.28) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
                maskImage: 'radial-gradient(ellipse at 30% 0%, black, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 30% 0%, black, transparent 72%)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative max-w-2xl">
              <span className="text-2xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {eyebrow}
              </span>
              <h2 className="mt-4 text-title text-white">{title}</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/85">{lead}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  to="/contact"
                  size="lg"
                  className="bg-white text-brand-deep shadow-soft hover:bg-white/90"
                >
                  <Calendar className="h-4 w-4" />
                  Book a scoping call
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={company.phones[0].href}
                  size="lg"
                  className="border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  {company.phones[0].value}
                </Button>
              </div>

              <p className="mt-7 text-sm text-white/70">
                Replies within one business day · Support desk staffed 24/7
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
