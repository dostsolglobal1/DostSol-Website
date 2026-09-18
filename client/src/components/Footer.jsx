import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react';

import { company, footerNav } from '@shared/site.js';
import { api, toFormError } from '@/lib/api';
import { Button, Spinner } from './ui';
import Logo from './Logo';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | done | error
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');
    try {
      const res = await api.post('/subscribers', { email, source: 'footer' });
      setState('done');
      setMessage(res.data?.message || "You're on the list.");
      setEmail('');
    } catch (err) {
      setState('error');
      setMessage(toFormError(err).message);
    }
  };

  if (state === 'done') {
    return (
      <p className="flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal">
        <Check className="h-4 w-4 shrink-0" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="footer-email" className="label">
        Operations notes, monthly
      </label>
      <div className="flex gap-2">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="field flex-1"
          aria-describedby={state === 'error' ? 'footer-email-error' : undefined}
        />
        <Button type="submit" size="md" aria-label="Subscribe" className="px-4">
          {state === 'loading' ? <Spinner /> : <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
      {state === 'error' && (
        <p id="footer-email-error" className="mt-2 text-xs text-red-500">
          {message}
        </p>
      )}
      <p className="mt-2 text-xs text-faint">
        One email a month on offshore delivery. Unsubscribe any time.
      </p>
    </form>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="container">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr] lg:py-20">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">{company.promise}</p>

            <div className="mt-7 space-y-3 text-sm">
              {company.phones.slice(0, 2).map((p) => (
                <a
                  key={p.value}
                  href={p.href}
                  className="flex items-center gap-2.5 text-muted transition hover:text-ink"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  <span>{p.value}</span>
                  <span className="text-xs text-faint">{p.label}</span>
                </a>
              ))}
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2.5 text-muted transition hover:text-ink"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                {company.email}
              </a>
              <p className="flex items-start gap-2.5 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {company.offices[0].address}
              </p>
            </div>

            <div className="mt-7 flex gap-2">
              {company.social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition duration-300 hover:border-brand/40 hover:text-ink"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-faint">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        className="text-sm text-muted transition duration-300 hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="sm:col-span-2 lg:col-span-1">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="divider-x" />

        <div className="flex flex-col gap-3 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
              </span>
              {company.hours}
            </span>
            <Link to="/privacy" className="transition hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="transition hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
