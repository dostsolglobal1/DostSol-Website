import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';

import Logo from '@/components/Logo';
import { Button, Spinner } from '@/components/ui';
import { useSeo } from '@/hooks/useSeo';
import { useAuth } from './AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useSeo({ title: 'Sign in — DostSol Console', description: 'Administrator sign-in.' });

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');

    const res = await login(email, password);
    if (!res.ok) setError(res.message);
    setBusy(false);
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-canvas px-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-40 mask-fade-b" />
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/10 blur-[110px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <form onSubmit={submit} noValidate className="card p-7">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <h1 className="font-display text-lg font-semibold leading-tight">Console sign-in</h1>
              <p className="text-xs text-muted">Staff access only</p>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-2.5 text-sm text-red-500"
            >
              {error}
            </p>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="label">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                placeholder="you@dostsol.com"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="label">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full" disabled={busy}>
            {busy ? (
              <>
                <Spinner />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted transition hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dostsol.com
        </Link>
      </div>
    </div>
  );
}
