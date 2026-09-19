import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

import { useSeo } from '@/hooks/useSeo';
import { Button } from '@/components/ui';

const SUGGESTIONS = [
  { label: 'Browse all services', href: '/services' },
  { label: 'How engagements run', href: '/how-we-work' },
  { label: 'Read our insights', href: '/insights' },
  { label: 'Open roles', href: '/careers' },
];

export default function NotFound() {
  useSeo({ title: 'Page not found — DostSol Global', description: 'That page does not exist.' });

  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/10 blur-[110px]" />
      </div>

      <div className="text-center">
        <p className="font-display text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none tracking-tighter text-line">
          404
        </p>
        <h1 className="mt-2 text-title">This page has been outsourced elsewhere.</h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          The link is broken or the page has moved. Here is where most people were heading.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg">
            <Home className="h-4 w-4" />
            Back to home
          </Button>
          <Button to="/contact" variant="secondary" size="lg">
            Talk to us
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <Link key={s.href} to={s.href} className="chip transition hover:border-brand/40 hover:text-ink">
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
