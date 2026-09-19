import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, toFormError } from '@/lib/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'dostsol-token';

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(readToken()));

  // Validate a stored token on boot — a JWT in localStorage may be expired or
  // signed with a rotated secret, so we confirm with the server before trusting it.
  useEffect(() => {
    if (!readToken()) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    api
      .get('/auth/me')
      .then((res) => {
        if (!cancelled) setUser(res.data.data);
      })
      .catch(() => {
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch {
          /* ignore */
        }
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user: nextUser } = res.data.data;
      try {
        localStorage.setItem(TOKEN_KEY, token);
      } catch {
        /* private mode — the session lives for this tab only */
      }
      setUser(nextUser);
      return { ok: true };
    } catch (err) {
      return { ok: false, ...toFormError(err) };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, checking, login, logout }),
    [user, checking, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>.');
  return ctx;
}
