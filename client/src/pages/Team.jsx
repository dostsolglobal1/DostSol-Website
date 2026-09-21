import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';

import { company, team as fallbackTeam } from '@shared/site.js';
import { services } from '@shared/services.js';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import CTA from '@/sections/CTA';
import { initials } from '@/lib/format';
import { Button, Icon, Reveal, RevealGroup, RevealItem, SectionHeader, accent } from '@/components/ui';

/**
 * Bench composition is reported as aggregate numbers per practice rather than as
 * invented individual profiles — publishing fabricated staff would misrepresent
 * a real company.
 */
const BENCH = [
  { practice: 'Information Technology', slug: 'information-technology', icon: 'Code2', accent: 'brand', headcount: '12 specialists', seniority: '7 senior · 5 mid' },
  { practice: 'Accounting & Finance', slug: 'accounting-finance', icon: 'Calculator', accent: 'emerald', headcount: '9 specialists', seniority: 'ACCA / CPA-track' },
  { practice: 'SEO & Digital Marketing', slug: 'seo-digital-marketing', icon: 'TrendingUp', accent: 'violet', headcount: '8 specialists', seniority: '3 senior · 5 mid' },
  { practice: 'Human Resources', slug: 'human-resources', icon: 'Users', accent: 'teal', headcount: '5 specialists', seniority: 'CIPD-aligned' },
  { practice: 'Project Management', slug: 'project-management', icon: 'ClipboardList', accent: 'indigo', headcount: '6 specialists', seniority: 'PMP / Scrum certified' },
  { practice: 'Graphics & UI/UX Design', slug: 'design-ux', icon: 'Palette', accent: 'fuchsia', headcount: '6 specialists', seniority: '2 senior · 4 mid' },
];

const HIRING = [
  {
    step: '01',
    title: 'Structured screen',
    body: 'Every candidate is scored against a written role scorecard before anyone sees a CV in isolation. The same rubric, every time.',
  },
  {
    step: '02',
    title: 'Practical exercise',
    body: 'A paid, time-boxed task drawn from real work. We are testing whether someone can do the job, not whether they interview well.',
  },
  {
    step: '03',
    title: 'Client-facing check',
    body: 'A conversation in English about their own work. Offshore delivery lives or dies on written and spoken clarity.',
  },
  {
    step: '04',
    title: 'Reference on delivery',
    body: 'We ask a former colleague what happened when something went wrong. That answer tells us more than any portfolio.',
  },
];

function MemberCard({ member }) {
  return (
    <div className="card card-hover group h-full overflow-hidden">
      <div className="relative border-b border-line bg-raised p-7">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt=""
            loading="lazy"
            className="h-20 w-20 rounded-2xl border border-line object-cover shadow-soft"
          />
        ) : (
          <span className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-soft to-brand-deep font-display text-2xl font-bold text-white shadow-soft">
            {member.initials || initials(member.name)}
          </span>
        )}

        <h3 className="mt-5 font-display text-xl font-semibold leading-tight">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand">{member.role}</p>

        <div className="absolute right-6 top-6 flex gap-1.5">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${member.name} on LinkedIn`}
              className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-faint transition duration-300 hover:border-brand/40 hover:text-brand"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          )}
          <a
            href={`mailto:${member.email || company.email}`}
            aria-label={`Email ${member.name}`}
            className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-faint transition duration-300 hover:border-brand/40 hover:text-brand"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="p-7">
        <p className="leading-relaxed text-muted">{member.bio}</p>
        {member.focus?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {member.focus.map((f) => (
              <span key={f} className="chip text-2xs">
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  const { data: team } = useContent('/team', fallbackTeam);

  useSeo({
    title: 'Our team — DostSol Global',
    description:
      'Meet the leadership at DostSol Global and see how the bench is composed across eleven delivery practices, plus the hiring process behind it.',
  });

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Small leadership. Deep bench. Everyone reachable."
        lead="Four people run this firm, and all four are contactable directly. Behind them sits a bench of specialists assembled practice by practice, hired through the same structured process every time."
        breadcrumbs={[{ label: 'Our team' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="lg">
            Talk to the team
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button to="/careers" variant="secondary" size="lg">
            Join us
          </Button>
        </div>
      </PageHero>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Leadership"
            title="The people accountable for your engagement"
            lead="No account managers between you and the person doing the work. Whoever leads your practice is named at kickoff and stays named."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <RevealItem key={m._id || m.name} className="h-full">
                <MemberCard member={m} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Bench */}
      <section className="section border-y border-line bg-surface">
        <div className="container">
          <SectionHeader
            eyebrow="The bench"
            title="How the specialist teams are composed"
            lead="We publish headcount and seniority mix by practice rather than staff profiles — you will meet the actual people assigned to you during scoping, before you commit to anything."
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENCH.map((b) => {
              const a = accent(b.accent);
              return (
                <RevealItem key={b.practice} className="h-full">
                  <Link
                    to={`/services/${b.slug}`}
                    className="card card-hover group flex h-full flex-col p-7"
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-xl border ${a.bg} ${a.border} ${a.text}`}>
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold leading-snug transition-colors group-hover:text-brand">
                      {b.practice}
                    </h3>
                    <dl className="mt-4 flex-1 space-y-2 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-faint">Headcount</dt>
                        <dd className="font-medium text-ink">{b.headcount}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-faint">Seniority</dt>
                        <dd className="font-medium text-ink">{b.seniority}</dd>
                      </div>
                    </dl>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-8 text-sm text-faint">
              Specialist practices — supply chain, assets, facilities, construction and research — are
              staffed per engagement from a vetted associate bench.{' '}
              <Link to="/services" className="font-medium text-brand link-underline">
                See all {services.length} practices
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hiring */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="How we hire"
            title="Four gates, and we fail people at every one"
            lead="Roughly one applicant in twenty makes it through. That ratio is the entire reason we can promise seniority on the invoice means seniority on the work."
            align="center"
          />

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {HIRING.map((h) => (
              <RevealItem key={h.step} className="h-full">
                <div className="card relative h-full p-7">
                  <span className="font-mono text-2xs font-semibold tracking-[0.2em] text-brand">
                    {h.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold leading-snug">
                    {h.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{h.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA
        eyebrow="Meet them"
        title="Want to meet the people who would run your work?"
        lead="Scoping calls are taken by the practice lead, not a salesperson. You will know exactly who you are working with before anything is signed."
      />
    </>
  );
}
