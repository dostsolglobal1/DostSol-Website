import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, Check, ChevronDown, MapPin } from 'lucide-react';

import { jobs as fallbackJobs } from '@shared/site.js';
import { api, toFormError } from '@/lib/api';
import { useContent } from '@/hooks/useContent';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import CTA from '@/sections/CTA';
import { Button, Reveal, RevealGroup, RevealItem, SectionHeader, Spinner } from '@/components/ui';

const PERKS = [
  { title: 'Work that is actually visible', body: 'You are embedded with the client, not hidden behind an account manager. Your name is on the work.' },
  { title: 'Seniority earned, not titled', body: 'Promotion follows a documented competency framework, reviewed twice a year with written feedback.' },
  { title: 'Learning budget that gets spent', body: 'An annual allowance for certifications and courses, plus paid time to actually take them.' },
  { title: 'Hybrid, with real flexibility', body: 'Two to three days on-site for most roles, and genuine autonomy over the rest of your week.' },
  { title: 'Health cover for your family', body: 'Comprehensive medical cover extended to spouse and children from day one.' },
  { title: 'Overlap, not night shifts', body: 'We staff for four to six hours of US overlap. Full graveyard shifts are opt-in and paid as such.' },
];

const EMPTY = { name: '', email: '', phone: '', portfolio: '', resumeUrl: '', note: '' };

function ApplyForm({ job, onClose }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [banner, setBanner] = useState('');

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'loading') return;

    const next = {};
    if (values.name.trim().length < 2) next.name = 'Tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'That email address looks off.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setState('loading');
    try {
      const res = await api.post('/applications', { ...values, jobSlug: job.slug });
      setState('done');
      setBanner(res.data?.message || 'Application received.');
    } catch (err) {
      const { message, fields } = toFormError(err);
      setErrors(fields);
      setState('error');
      setBanner(message);
    }
  };

  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal/8 p-6 text-center">
        <Check className="mx-auto h-8 w-8 text-teal" />
        <p className="mt-3 font-semibold text-ink">{banner}</p>
        <p className="mt-1.5 text-sm text-muted">
          We review every application ourselves and reply either way.
        </p>
        <Button variant="secondary" size="sm" className="mt-5" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-line bg-canvas p-6">
      <h4 className="font-display font-semibold">Apply for {job.title}</h4>

      {state === 'error' && banner && (
        <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-2 text-sm text-red-500">
          {banner}
        </p>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${job.slug}-name`} className="label">
            Full name <span className="text-brand">*</span>
          </label>
          <input
            id={`${job.slug}-name`}
            value={values.name}
            onChange={set('name')}
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`${job.slug}-email`} className="label">
            Email <span className="text-brand">*</span>
          </label>
          <input
            id={`${job.slug}-email`}
            type="email"
            value={values.email}
            onChange={set('email')}
            className={`field ${errors.email ? 'field-error' : ''}`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={`${job.slug}-phone`} className="label">
            Phone
          </label>
          <input id={`${job.slug}-phone`} type="tel" value={values.phone} onChange={set('phone')} className="field" />
        </div>

        <div>
          <label htmlFor={`${job.slug}-portfolio`} className="label">
            Portfolio or LinkedIn
          </label>
          <input
            id={`${job.slug}-portfolio`}
            value={values.portfolio}
            onChange={set('portfolio')}
            placeholder="https://"
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${job.slug}-resume`} className="label">
            Link to your CV
          </label>
          <input
            id={`${job.slug}-resume`}
            value={values.resumeUrl}
            onChange={set('resumeUrl')}
            placeholder="Google Drive, Dropbox or personal site"
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${job.slug}-note`} className="label">
            Anything you want us to know
          </label>
          <textarea
            id={`${job.slug}-note`}
            rows={3}
            value={values.note}
            onChange={set('note')}
            placeholder="The one project you would want us to ask about."
            className="field resize-y"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="submit" disabled={state === 'loading'}>
          {state === 'loading' ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            <>
              Submit application <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function JobRow({ job }) {
  const [open, setOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 p-6 text-left transition duration-300 hover:bg-raised md:p-7"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
            <span className="text-brand">{job.department}</span>
            <span>·</span>
            <span>{job.level}</span>
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{job.title}</h3>
          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-faint" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-faint" />
              {job.type}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-faint transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line p-6 md:p-7">
              <p className="leading-relaxed text-muted">{job.summary}</p>

              <div className="mt-7 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="text-2xs font-semibold uppercase tracking-[0.16em] text-faint">
                    What you will do
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xs font-semibold uppercase tracking-[0.16em] text-faint">
                    What we are looking for
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                {applying ? (
                  <ApplyForm job={job} onClose={() => setApplying(false)} />
                ) : (
                  <Button onClick={() => setApplying(true)}>
                    Apply for this role
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Careers() {
  const { data: jobs } = useContent('/jobs', fallbackJobs);
  const [dept, setDept] = useState('All');

  useSeo({
    title: 'Careers — DostSol Global',
    description:
      'Open roles at DostSol Global in Lahore: engineering, accounting, SEO, design and client success. Hybrid working, real overlap hours, documented progression.',
  });

  const departments = ['All', ...new Set(jobs.map((j) => j.department))];
  const visible = dept === 'All' ? jobs : jobs.filter((j) => j.department === dept);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career on work you can point at."
        lead="We are small, deliberately senior, and we hire people who would rather own an outcome than fill a seat. If that is you, the list below is worth reading properly."
        breadcrumbs={[{ label: 'Careers' }]}
      >
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {departments.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDept(d)}
              aria-pressed={dept === d}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                dept === d
                  ? 'border-brand bg-brand text-white'
                  : 'border-line text-muted hover:border-brand/35 hover:text-ink'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-2xl">Open roles</h2>
            <span className="text-sm text-faint">
              {visible.length} {visible.length === 1 ? 'position' : 'positions'}
            </span>
          </div>

          {visible.length === 0 ? (
            <div className="card p-14 text-center">
              <p className="font-display text-lg font-semibold">No open roles in that team.</p>
              <p className="mt-2 text-sm text-muted">
                We still read speculative applications. Send one to{' '}
                <a href="mailto:info@dostsol.com" className="font-medium text-brand">
                  info@dostsol.com
                </a>
                .
              </p>
            </div>
          ) : (
            <RevealGroup className="space-y-4">
              {visible.map((j) => (
                <RevealItem key={j.slug}>
                  <JobRow job={j} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <section className="section border-t border-line bg-surface">
        <div className="container">
          <SectionHeader
            eyebrow="Working here"
            title="What we actually offer"
            lead="Written plainly, because every careers page claims the same six things and most of them are aspirational."
            align="center"
          />

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p) => (
              <RevealItem key={p.title} className="h-full">
                <div className="card card-hover h-full p-7">
                  <h3 className="font-display text-base font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-10 text-center text-sm text-faint">
              Nothing here fits but you think we should talk? Write to{' '}
              <a href="mailto:info@dostsol.com" className="font-medium text-brand">
                info@dostsol.com
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTA
        eyebrow="For clients"
        title="Looking to hire a team rather than join one?"
        lead="The same people you would be applying to work with are the ones who would run your engagement."
      />
    </>
  );
}
