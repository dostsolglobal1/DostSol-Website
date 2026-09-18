import { stats } from '@shared/site.js';
import { useCountUp } from '@/hooks/useContent';
import { RevealGroup, RevealItem } from '@/components/ui';

function StatCard({ stat }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals || 0 });

  return (
    <RevealItem className="h-full">
      <div ref={ref} className="card card-hover group h-full p-6 md:p-7">
        <p className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          {stat.decimals ? display.toFixed(stat.decimals) : Math.round(display)}
          <span className="text-brand">{stat.suffix}</span>
        </p>
        <p className="mt-3 text-sm font-semibold text-ink">{stat.label}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{stat.detail}</p>
      </div>
    </RevealItem>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-raised/40 py-16 md:py-20">
      <div className="container">
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
