import { useState } from 'react';
import { ArrowRight, Check, Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

import { company } from '@shared/site.js';
import { services } from '@shared/services.js';
import { api, toFormError } from '@/lib/api';
import { useSeo } from '@/hooks/useSeo';
import PageHero from '@/components/PageHero';
import { Button, Reveal, Spinner } from '@/components/ui';

const TEAM_SIZES = ['1–10', '11–50', '51–200', '201–1000', '1000+'];
const BUDGETS = ['Under $5k / mo', '$5k–15k / mo', '$15k–40k / mo', '$40k+ / mo', 'Not sure yet'];
const TIMELINES = ['Immediately', 'Within a month', 'This quarter', 'Exploring'];

const EMPTY = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  teamSize: '',
  budget: '',
  timeline: '',
  message: '',
  website: '', // honeypot
};

function Field({ label, name, error, children, required, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | loading | done | error
  const [banner, setBanner] = useState('');

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  /** Client-side checks mirror the server's zod schema so errors feel instant. */
  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'That email address looks off.';
    if (values.message.trim().length < 10)
      next.message = 'A sentence or two helps us route you correctly.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'loading') return;
    if (!validate()) return;

    setState('loading');
    setBanner('');
    try {
      const res = await api.post('/leads', { ...values, source: 'contact-page' });
      setState('done');
      setBanner(res.data?.message || "Thanks — we'll reply within one business day.");
      setValues(EMPTY);
    } catch (err) {
      const { message, fields } = toFormError(err);
      setErrors(fields);
      setState('error');
      setBanner(message);
    }
  };

  if (state === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="card flex min-h-[420px] flex-col items-center justify-center p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-teal/12 text-teal">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-2xl">Message received</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">{banner}</p>
        <p className="mt-2 max-w-sm text-sm text-faint">
          A confirmation is on its way to your inbox. If it is urgent, call{' '}
          <a href={company.phones[0].href} className="font-medium text-brand">
            {company.phones[0].value}
          </a>{' '}
          — the desk is staffed 24/7.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setState('idle');
            setBanner('');
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card relative p-7 md:p-9">
      <h2 className="text-xl">Tell us what you need</h2>
      <p className="mt-2 text-sm text-muted">
        The more context you give, the more useful our first reply will be. Fields marked
        <span className="text-brand"> *</span> are required.
      </p>

      {state === 'error' && banner && (
        <p role="alert" className="mt-5 rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3 text-sm text-red-500">
          {banner}
        </p>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name} required>
          <input
            id="name"
            value={values.name}
            onChange={set('name')}
            autoComplete="name"
            placeholder="Jordan Ellis"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`field ${errors.name ? 'field-error' : ''}`}
          />
        </Field>

        <Field label="Work email" name="email" error={errors.email} required>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={set('email')}
            autoComplete="email"
            placeholder="jordan@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`field ${errors.email ? 'field-error' : ''}`}
          />
        </Field>

        <Field label="Company" name="company" error={errors.company}>
          <input
            id="company"
            value={values.company}
            onChange={set('company')}
            autoComplete="organization"
            placeholder="Company name"
            className="field"
          />
        </Field>

        <Field label="Phone" name="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={set('phone')}
            autoComplete="tel"
            placeholder="+1 555 000 0000"
            className="field"
          />
        </Field>

        <Field label="Practice of interest" name="service" className="sm:col-span-2">
          <select id="service" value={values.service} onChange={set('service')} className="field">
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Company size" name="teamSize">
          <select id="teamSize" value={values.teamSize} onChange={set('teamSize')} className="field">
            <option value="">Select</option>
            {TEAM_SIZES.map((t) => (
              <option key={t} value={t}>
                {t} people
              </option>
            ))}
          </select>
        </Field>

        <Field label="Indicative budget" name="budget">
          <select id="budget" value={values.budget} onChange={set('budget')} className="field">
            <option value="">Select</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Timeline" name="timeline" className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValues((v) => ({ ...v, timeline: v.timeline === t ? '' : t }))}
                aria-pressed={values.timeline === t}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                  values.timeline === t
                    ? 'border-brand bg-brand text-white'
                    : 'border-line text-muted hover:border-brand/35 hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <Field label="What are you trying to solve?" name="message" error={errors.message} required className="sm:col-span-2">
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={set('message')}
            placeholder="Describe the problem rather than the role — what is slowing you down, and what would good look like in ninety days?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`field resize-y ${errors.message ? 'field-error' : ''}`}
          />
        </Field>
      </div>

      {/* Honeypot — visually and semantically hidden from real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === 'loading'}>
          {state === 'loading' ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="flex items-center gap-2 text-xs text-faint">
          <ShieldCheck className="h-3.5 w-3.5" />
          Your details stay with us. No lists, no resale.
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  useSeo({
    title: 'Contact — DostSol Global',
    description:
      'Book a 30-minute scoping call with DostSol Global. Offices in Lahore and a US client desk, with support staffed 24/7.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      email: company.email,
      telephone: company.phones[0].value,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '251-L Johar Town',
        addressLocality: 'Lahore',
        addressCountry: 'PK',
      },
      sameAs: company.social.map((s) => s.href),
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Thirty minutes. No deck. An honest answer."
        lead="Tell us what is slowing you down and we will map it to a team shape, a timeline and a number — or tell you plainly that we are not the right fit."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
            {/* Details */}
            <Reveal className="space-y-5">
              <div className="card p-7">
                <h2 className="text-lg">Talk to us directly</h2>
                <div className="mt-6 space-y-4">
                  {company.phones.map((p) => (
                    <a
                      key={p.value}
                      href={p.href}
                      className="group flex items-center gap-4 rounded-xl border border-line p-4 transition duration-300 hover:border-brand/35 hover:bg-raised"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
                          {p.label}
                        </span>
                        <span className="block font-semibold text-ink">{p.value}</span>
                      </span>
                    </a>
                  ))}

                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-4 rounded-xl border border-line p-4 transition duration-300 hover:border-brand/35 hover:bg-raised"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
                        Email
                      </span>
                      <span className="block truncate font-semibold text-ink">{company.email}</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="card p-7">
                <h2 className="text-lg">Offices</h2>
                <div className="mt-6 space-y-5">
                  {company.offices.map((o) => (
                    <div key={o.city} className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-raised text-brand">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-ink">
                          {o.city}, {o.country}
                        </p>
                        <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-faint">
                          {o.label}
                        </p>
                        <p className="mt-1.5 text-sm text-muted">{o.address}</p>
                        <p className="mt-1 font-mono text-xs text-faint">{o.timezone}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-2.5 rounded-xl border border-teal/25 bg-teal/8 px-4 py-3">
                  <Clock className="h-4 w-4 shrink-0 text-teal" />
                  <p className="text-sm text-teal">{company.hours}</p>
                </div>
              </div>

              <div className="card p-7">
                <h2 className="text-lg">What happens next</h2>
                <ol className="mt-5 space-y-4">
                  {[
                    'We read your message and route it to the practice lead who can actually answer it.',
                    'You get a reply within one business day, with a proposed call time.',
                    'On the call we scope the requirement and give you an indicative number.',
                    'If it fits, contracting and team assembly start in parallel the same week.',
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3.5 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 font-mono text-2xs font-bold text-brand">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-muted">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
