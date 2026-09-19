import { company } from '@shared/site.js';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';

const UPDATED = 'September 2026';

const PRIVACY = [
  {
    h: 'What we collect',
    p: [
      'When you submit a form on this site we collect the details you provide: your name, email address, and optionally your company, phone number, budget band, timeline and the message itself. We also record the submission time, your IP address and browser user agent, which we use for spam prevention and nothing else.',
      'If you subscribe to our monthly note we store only your email address and the page you subscribed from.',
    ],
  },
  {
    h: 'Why we collect it',
    p: [
      'To reply to your enquiry, to route it to the right practice lead, and to keep a record of the conversation so a colleague can pick it up if the original contact is unavailable. We do not build advertising profiles and we do not sell, rent or share your details with third parties for their own marketing.',
    ],
  },
  {
    h: 'How long we keep it',
    p: [
      'Enquiries are retained for 24 months from the last contact, after which they are deleted. Newsletter subscriptions are kept until you unsubscribe, which you can do from any email we send.',
    ],
  },
  {
    h: 'Client data during an engagement',
    p: [
      'Data you give us access to during a live engagement is governed by the data processing agreement signed at kickoff, not by this policy. In practice we work inside your systems rather than copying data into ours, access is role-scoped and logged, and every individual on the engagement signs an NDA personally.',
    ],
  },
  {
    h: 'Cookies',
    p: [
      'This site stores one item in your browser: your light or dark theme preference. It never leaves your device and we do not use advertising or cross-site tracking cookies.',
    ],
  },
  {
    h: 'Your rights',
    p: [
      'You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted. Write to info@dostsol.com and we will respond within thirty days.',
    ],
  },
];

const TERMS = [
  {
    h: 'About these terms',
    p: [
      'These terms govern your use of this website. They do not govern any engagement between you and DostSol Global — that is covered by the master services agreement and statement of work signed by both parties.',
    ],
  },
  {
    h: 'Use of this site',
    p: [
      'You may read, print and share the content here for your own business purposes. You may not republish it as your own, scrape it at volume, or use it to train a commercial model without written permission.',
    ],
  },
  {
    h: 'Accuracy of information',
    p: [
      'Pricing bands, timelines and outcome figures shown on this site are indicative and drawn from past engagements. They are not an offer and they are not a guarantee of your result. Anything binding will be in your statement of work.',
    ],
  },
  {
    h: 'Intellectual property',
    p: [
      'The content, design and code of this site belong to DostSol Global. Work produced during a client engagement belongs to the client, assigned in full before work begins.',
    ],
  },
  {
    h: 'Limitation of liability',
    p: [
      'This site is provided as-is. We are not liable for decisions made solely on the basis of general information published here. For advice specific to your circumstances, talk to us directly.',
    ],
  },
  {
    h: 'Governing law',
    p: [
      'These terms are governed by the laws of Pakistan. Engagement contracts specify their own governing law, agreed with each client.',
    ],
  },
];

function LegalBody({ sections }) {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="rounded-xl border border-line bg-raised px-5 py-4 text-sm text-muted">
          Last updated {UPDATED}. Questions about anything here go to{' '}
          <a href={`mailto:${company.email}`} className="font-medium text-brand">
            {company.email}
          </a>
          .
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para.slice(0, 40)} className="mt-4 leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Privacy() {
  useSeo({
    title: 'Privacy policy — DostSol Global',
    description: 'How DostSol Global collects, uses and retains your information.',
  });
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lead="Short, specific and written to be read. We collect what we need to reply to you, and nothing else."
        breadcrumbs={[{ label: 'Privacy' }]}
      />
      <LegalBody sections={PRIVACY} />
    </>
  );
}

export function Terms() {
  useSeo({
    title: 'Terms of service — DostSol Global',
    description: 'Terms governing use of the DostSol Global website.',
  });
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        lead="These cover this website. Your engagement is governed by the agreement we both sign."
        breadcrumbs={[{ label: 'Terms' }]}
      />
      <LegalBody sections={TERMS} />
    </>
  );
}
