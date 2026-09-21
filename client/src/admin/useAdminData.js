import { useCallback, useEffect, useState } from 'react';
import { api, toFormError } from '@/lib/api';

/**
 * Admin fetching. Unlike the marketing `useContent` there is no static fallback:
 * an operator must see a real error rather than stale or invented numbers.
 */
export function useAdminData(path, { params } = {}) {
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);

  const paramKey = JSON.stringify(params ?? null);
  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get(path, { params })
      .then((res) => {
        if (cancelled) return;
        setData(res.data.data);
        setMeta(res.data.meta ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError(toFormError(err).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, paramKey, nonce]);

  return { data, meta, loading, error, refetch, setData };
}
