import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, Moon, Phone, Sun, X } from 'lucide-react';

import { navigation, company } from '@shared/site.js';
import { services } from '@shared/services.js';
import { Button, Icon, accent } from './ui';
import Logo from './Logo';

/* --------------------------------------------------------------- theming --- */

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('dostsol-theme', next);
    } catch {
      /* private mode — the theme simply will not persist */
    }
  };

  return [theme, toggle];
}

function ThemeToggle({ className = '' }) {
  const [theme, toggle] = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`grid h-9 w-9 place-items-center rounded-full border border-line text-muted
                  transition duration-300 hover:border-brand/40 hover:text-ink ${className}`}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/* ------------------------------------------------------------- mega menu --- */

function ServicesMega({ onNavigate }) {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      // Centred with inset-x-0 + mx-auto rather than -translate-x-1/2: Framer Motion
      // writes transform inline for the y animation, which would override a
      // translate utility class and drop the panel off the right edge.
      className="absolute inset-x-0 top-full z-50 mx-auto w-full max-w-[1168px] px-6 pt-3"
    >
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
        <div className="grid gap-8 p-7 lg:grid-cols-[1.75fr_1fr]">
          <div>
            <p className="eyebrow mb-4">Core practices</p>
            <div className="grid gap-1 sm:grid-cols-2">
              {featured.map((s) => {
                const a = accent(s.accent);
                return (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    onClick={onNavigate}
                    className="group flex gap-3 rounded-xl p-3 transition duration-300 hover:bg-raised"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border ${a.bg} ${a.border} ${a.text}`}
                    >
                      <Icon name={s.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                        {s.title}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                        {s.tagline}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="divider-x my-5" />

            <p className="eyebrow mb-3">Specialist practices</p>
            <div className="flex flex-wrap gap-2">
              {rest.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={onNavigate}
                  className="chip transition duration-300 hover:border-brand/40 hover:text-ink"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-raised p-6">
            <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-brand">
              Not sure where to start?
            </p>
            <h3 className="mt-3 text-lg leading-snug">
              Book a 30-minute scoping call
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We will map your requirement to a team shape and give you an honest cost comparison
              against hiring in-house. No deck.
            </p>
            <Button to="/contact" size="sm" className="mt-5 w-full" onClick={onNavigate}>
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href={company.phones[0].href}
              className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-muted transition hover:text-ink"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phones[0].value}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- header --- */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMegaOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  // While the transparent bar floats over the homepage's photographic hero, it
  // borrows the dark tokens so the logo and links read against the scrim. Only
  // the bar opts in — the mega menu and mobile drawer keep the site theme.
  const overHero = pathname === '/' && !scrolled && !mobileOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                   focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm
                   focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
          scrolled || mobileOpen
            ? 'glass border-b border-line'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container" data-theme={overHero ? 'dark' : undefined}>
          <div className="flex h-[74px] items-center justify-between gap-6">
            <Link to="/" className="shrink-0" aria-label="DostSol Global — home">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {navigation.map((item) =>
                item.mega ? (
                  <div
                    key={item.label}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                    className="relative"
                  >
                    <NavLink
                      to={item.href}
                      onFocus={openMega}
                      aria-expanded={megaOpen}
                      className={({ isActive }) =>
                        `flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition duration-300 ${
                          isActive || megaOpen
                            ? 'bg-raised text-ink'
                            : 'text-muted hover:bg-raised hover:text-ink'
                        }`
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          megaOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      `rounded-full px-3.5 py-2 text-sm font-medium transition duration-300 ${
                        isActive ? 'bg-raised text-ink' : 'text-muted hover:bg-raised hover:text-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              <ThemeToggle className="hidden sm:grid" />
              <Button to="/contact" size="sm" className="hidden sm:inline-flex">
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <div onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
              <ServicesMega onNavigate={() => setMegaOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[74px] z-40 overflow-y-auto bg-canvas lg:hidden"
          >
            <div className="container py-8">
              <nav className="flex flex-col" aria-label="Mobile">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-line py-4 font-display text-xl font-semibold ${
                          isActive ? 'text-brand' : 'text-ink'
                        }`
                      }
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-faint" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-7">
                <p className="eyebrow mb-3">Services</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="chip">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <Button to="/contact" size="lg" className="flex-1">
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <ThemeToggle className="h-12 w-12" />
              </div>

              <div className="mt-8 space-y-2">
                {company.phones.map((p) => (
                  <a
                    key={p.value}
                    href={p.href}
                    className="flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm"
                  >
                    <span className="text-muted">{p.label}</span>
                    <span className="font-semibold text-ink">{p.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
