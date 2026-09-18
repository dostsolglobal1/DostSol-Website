import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { services as fallbackServices } from '@shared/services.js';
import { useContent } from '@/hooks/useContent';
import { Button, Icon, RevealGroup, RevealItem, SectionHeader, accent } from '@/components/ui';

export function ServiceCard({ service, size = 'default' }) {
  const a = accent(service.accent);
  const large = size === 'large';

  return (
    <Link
      to={`/services/${service.slug}`}
      className={`card card-hover group relative flex h-full flex-col overflow-hidden ${
        large ? 'p-7 md:p-9' : 'p-6 md:p-7'
      }`}
    >
      {/* Corner wash on hover */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${a.glowFrom} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <span
        className={`grid h-12 w-12 place-items-center rounded-xl border ${a.bg} ${a.border} ${a.text} transition-transform duration-500 ease-premium group-hover:scale-105`}
      >
        <Icon name={service.icon} className="h-5 w-5" />
      </span>

      <h3 className={`mt-5 font-semibold leading-snug ${large ? 'text-xl' : 'text-lg'}`}>
        {service.title}
      </h3>
      <p className={`mt-1 text-xs font-medium uppercase tracking-wider ${a.text}`}>
        {service.tagline}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
        Explore practice
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function ServicesGrid() {
  const { data: services } = useContent('/services', fallbackServices, {
    params: { featured: 'true' },
  });
  const featured = services.filter((s) => s.featured !== false).slice(0, 6);

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="What we do"
            title="Eleven practices. One accountable partner."
            lead="Each practice is led by a practitioner who has done the job. You get the specialist depth of a boutique with the breadth of a full operations partner."
          />
          <Button to="/services" variant="secondary" size="md" className="shrink-0 self-start md:self-end">
            All services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard service={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
