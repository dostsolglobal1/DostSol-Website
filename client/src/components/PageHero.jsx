import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Shared inner-page masthead: breadcrumb, eyebrow, title, lead, optional aside. */
export default function PageHero({ eyebrow, title, lead, breadcrumbs = [], children, aside }) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-14 pt-32 md:pb-20 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" />
        <div className="absolute -left-32 -top-28 h-96 w-96 rounded-full bg-brand/10 blur-[110px]" />
      </div>

      <div className="container">
        {breadcrumbs.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-faint"
          >
            <Link to="/" className="transition hover:text-ink">
              Home
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {b.href && i < breadcrumbs.length - 1 ? (
                  <Link to={b.href} className="transition hover:text-ink">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-muted">{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div className={aside ? 'grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end' : ''}>
          <div>
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="eyebrow"
              >
                <span className="h-1 w-1 rounded-full bg-brand" />
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
              className="mt-4 max-w-4xl text-hero"
            >
              {title}
            </motion.h1>

            {lead && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
              >
                {lead}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
                className="mt-9"
              >
                {children}
              </motion.div>
            )}
          </div>

          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
