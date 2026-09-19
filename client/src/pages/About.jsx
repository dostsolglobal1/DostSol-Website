import { Linkedin, Quote } from 'lucide-react';

import { company, team as fallbackTeam, stats, industries } from '@shared/site.js';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import CTA from '@/sections/CTA';
import Stats from '@/sections/Stats';
import { initials } from '@/lib/format';
import { Reveal, RevealGroup, RevealItem, SectionHeader } from '@/components/ui';

const VALUES = [
  {
    title: 'Say the uncomfortable thing first',
    body: 'If a tactic is not working, a timeline is slipping or the engagement is the wrong shape, you hear it from us before you find it yourself. Bad news does not improve with age.',
  },
  {
    title: 'Document everything once',
    body: 'Process that lives in one head is a liability. Everything we take on gets written down, which is what makes a replacement productive in days rather than months.',
  },
  {
    title: 'Seniority is not a billing category',
    body: 'A senior on the invoice is a senior on the work. We have turned down engagements rather than staff them with people who were not ready.',
  },
  {
    title: 'Measure what the client named',
    body: 'Success metrics are agreed at kickoff and reported against every week. We do not get to change the scoreboard halfway through.',
  },
];

const TIMELINE = [
  { year: '2019', title: 'Founded in Lahore', body: 'Adil Abdullah starts the firm with four people and one client, on the conviction that offshore work fails when treated as a cost line.' },
  { year: '2021', title: 'First managed function', body: 'The firm moves beyond staff augmentation, taking full ownership of a US client accounting function end to end.' },
  { year: '2023', title: 'Eleven practices', body: 'Delivery expands across engineering, finance, marketing, people, supply chain, facilities and research.' },
  { year: '2026', title: '50+ engagements delivered', body: 'A 100-plus year bench of combined experience, with engagements running multiple years rather than months.' },
];

function TeamCard({ member }) {
  return (
    <div className="card card-hover group h-full overflow-hidden">
      <div className="relative flex items-center gap-4 border-b border-line bg-raised p-6">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-soft to-brand-deep font-display text-lg font-bold text-white shadow-soft">
          {member.initials || initials(member.name)}
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold leading-tight">{member.name}</h3>
          <p className="mt-1 text-sm text-brand">{member.role}</p>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${member.name} on LinkedIn`}
            className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-line text-faint transition duration-300 hover:border-brand/40 hover:text-brand"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-muted">{member.bio}</p>
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

export default function About() {
  const { data: team } = useContent('/team', fallbackTeam);

  useSeo({
    title: 'About — DostSol Global',
    description:
      'DostSol Global bridges global talent and local businesses. Founded in 2019 in Lahore, with 100+ years of combined experience across eleven delivery practices.',
  });

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We build the teams that let ambitious companies stop waiting."
        lead={`${company.name} exists because capable people are not evenly distributed, and neither is the ability to hire them. We close that gap — properly, with governance, and without pretending it is simple.`}
        breadcrumbs={[{ label: 'About' }]}
      />

      <Stats />

      {/* Vision & mission */}
      <section className="section">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-8 md:p-10">
                <span className="eyebrow">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  Vision
                </span>
                <h2 className="mt-4 text-2xl leading-snug">
                  Empower global businesses with trusted outsourcing excellence
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  We want offshore delivery to stop being a compromise companies apologise for and
                  start being the obvious way capable organisations build capacity. That means
                  raising the standard rather than lowering the price.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card h-full p-8 md:p-10">
                <span className="eyebrow">
                  <span className="h-1 w-1 rounded-full bg-gold" />
                  Mission
                </span>
                <h2 className="mt-4 text-2xl leading-snug">
                  Deliver scalable solutions with precision and purpose
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Expert teams, documented process and technology that removes friction rather than
                  adding ceremony. Every engagement is designed to be handed over cleanly, which is
                  the only honest test of whether it was built well.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder note */}
      <section className="section border-y border-line bg-surface">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-brand/25" strokeWidth={1.5} />
            <blockquote className="mt-7 font-display text-xl font-medium leading-relaxed text-ink md:text-2xl md:leading-relaxed">
              “We started DostSol because I kept watching good companies settle. They settled for a
              cheaper team that needed rework, or they waited nine months for a hire that never came.
              Neither is necessary. What is necessary is treating an offshore team like a team —
              briefed properly, governed properly, and held to the same standard as the people
              sitting in your office.”
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-3.5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand-soft to-brand-deep font-display text-sm font-bold text-white">
                AA
              </span>
              <span className="text-left">
                <span className="block font-semibold text-ink">Adil Abdullah</span>
                <span className="block text-sm text-muted">Founder & Chief Executive</span>
              </span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="How we behave"
            title="Four commitments we are willing to be held to"
            lead="These are not posters on a wall. Each one has cost us revenue at least once, which is the only evidence that a value is real."
            align="center"
          />

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <RevealItem key={v.title} className="h-full">
                <div className="card card-hover h-full p-7 md:p-8">
                  <span className="font-mono text-2xs font-semibold tracking-[0.2em] text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Timeline */}
      <section className="section border-y border-line bg-surface">
        <div className="container">
          <SectionHeader eyebrow="Our story" title="From four people to eleven practices" />

          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {TIMELINE.map((t) => (
              <RevealItem key={t.year} className="h-full">
                <div className="h-full bg-canvas p-7">
                  <span className="font-display text-3xl font-bold text-brand">{t.year}</span>
                  <h3 className="mt-3 font-display text-base font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Leadership"
            title="The people accountable for your engagement"
            lead="Small on purpose. Every person here is reachable, and every one of them has done the work they now oversee."
            align="center"
          />

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <RevealItem key={m.name} className="h-full">
                <TeamCard member={m} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Industries */}
      <section className="section border-t border-line">
        <div className="container">
          <SectionHeader
            eyebrow="Sectors"
            title="Where we have depth"
            lead="Domain familiarity shortens the knowledge transfer. These are the sectors where we already speak the language."
          />

          <RevealGroup className="mt-10 flex flex-wrap gap-2.5">
            {industries.map((ind) => (
              <RevealItem key={ind}>
                <span className="inline-flex items-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-muted transition duration-300 hover:border-brand/35 hover:text-ink">
                  {ind}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA />
    </>
  );
}
