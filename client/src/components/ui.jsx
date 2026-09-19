import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Boxes,
  Building2,
  Calculator,
  ClipboardList,
  Clock,
  Code2,
  HardHat,
  LineChart,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

/* ------------------------------------------------------------------ icons -- */

/**
 * Explicit registry rather than `import * as Icons` — the barrel import pulls
 * the entire lucide set (~1 MB) into the main bundle.
 */
const ICONS = {
  Boxes,
  Building2,
  Calculator,
  ClipboardList,
  Clock,
  Code2,
  HardHat,
  LineChart,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Truck,
  Users,
};

/** Resolves a registered icon by name, falling back to a neutral mark. */
export function Icon({ name, className = 'h-5 w-5', ...rest }) {
  const Cmp = ICONS[name] || Sparkles;
  return <Cmp className={className} aria-hidden="true" {...rest} />;
}

/* ---------------------------------------------------------------- buttons -- */

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  invert: 'btn-invert',
};

const SIZES = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' };

export const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className = '', children, ...rest },
  ref
) {
  const cls = `${VARIANTS[variant] || VARIANTS.primary} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  const Cmp = as || 'button';
  return (
    <Cmp ref={ref} className={cls} {...rest}>
      {children}
    </Cmp>
  );
});

/* ----------------------------------------------------------------- reveal -- */

const EASE = [0.22, 1, 0.36, 1];

/** Scroll-triggered entrance. Honours reduced-motion via framer's own handling. */
export function Reveal({ children, delay = 0, y = 20, className = '', as = 'div' }) {
  const Cmp = motion[as] || motion.div;
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Cmp>
  );
}

/** Staggers direct children on scroll. */
export function RevealGroup({ children, className = '', stagger = 0.07 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = '', y = 22 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------- section header -- */

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
  children,
}) {
  const centered = align === 'center';
  return (
    <Reveal className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>
          <span className="h-1 w-1 rounded-full bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-title">{title}</h2>
      {lead && <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">{lead}</p>}
      {children}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ misc --- */

export function Badge({ children, tone = 'brand', className = '' }) {
  const tones = {
    brand: 'border-brand/25 bg-brand/10 text-brand',
    gold: 'border-gold/30 bg-gold/10 text-gold',
    violet: 'border-violet/25 bg-violet/10 text-violet',
    teal: 'border-teal/25 bg-teal/10 text-teal',
    neutral: 'border-line bg-raised text-muted',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        tones[tone] || tones.brand
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function Stars({ rating = 5, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-gold text-gold' : 'text-line'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Spinner({ className = 'h-4 w-4' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z"
      />
    </svg>
  );
}

/** Accent colour map shared by service cards and detail pages. */
export const ACCENTS = {
  brand: {
    text: 'text-brand',
    bg: 'bg-brand/10',
    border: 'border-brand/25',
    ring: 'group-hover:border-brand/45',
    glowFrom: 'from-brand/18',
  },
  gold: {
    text: 'text-gold',
    bg: 'bg-gold/10',
    border: 'border-gold/25',
    ring: 'group-hover:border-gold/45',
    glowFrom: 'from-gold/18',
  },
  violet: {
    text: 'text-violet',
    bg: 'bg-violet/10',
    border: 'border-violet/25',
    ring: 'group-hover:border-violet/45',
    glowFrom: 'from-violet/18',
  },
  teal: {
    text: 'text-teal',
    bg: 'bg-teal/10',
    border: 'border-teal/25',
    ring: 'group-hover:border-teal/45',
    glowFrom: 'from-teal/18',
  },
};

export const accent = (key) => ACCENTS[key] || ACCENTS.brand;
