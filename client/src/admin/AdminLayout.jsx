import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Moon,
  Sun,
  Users,
  X,
} from 'lucide-react';

import Logo from '@/components/Logo';
import { useAuth } from './AuthContext';

const NAV = [
  { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/leads', label: 'Leads', icon: Users },
  { to: '/admin/applications', label: 'Applications', icon: BriefcaseBusiness },
  { to: '/admin/subscribers', label: 'Subscribers', icon: Mail },
  { to: '/admin/posts', label: 'Articles', icon: FileText },
];

function ThemeToggle() {
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
      /* private mode */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:border-brand/40 hover:text-ink"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-line px-5">
        <Logo compact />
        <div className="leading-none">
          <p className="text-sm font-bold text-ink">DostSol</p>
          <p className="mt-0.5 text-2xs font-semibold uppercase tracking-[0.16em] text-faint">
            Console
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Admin">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition duration-200 ${
                isActive ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-raised hover:text-ink'
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-raised hover:text-ink"
        >
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          View live site
        </Link>

        <div className="mt-2 flex items-center gap-2 rounded-lg bg-raised px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-soft to-brand-deep text-2xs font-bold text-white">
            {(user?.name || 'A')
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-ink">{user?.name}</p>
            <p className="truncate text-2xs capitalize text-faint">{user?.role}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-faint transition hover:bg-canvas hover:text-ink"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-line bg-surface lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-60 border-r border-line bg-surface lg:hidden">
            {sidebar}
          </aside>
        </>
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-surface/85 px-5 backdrop-blur">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <p className="hidden text-sm text-muted lg:block">
            Signed in as <span className="font-medium text-ink">{user?.email}</span>
          </p>

          <ThemeToggle />
        </header>

        <main className="p-5 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
