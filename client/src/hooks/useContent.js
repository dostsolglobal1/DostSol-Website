import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';

/**
 * Fetches from the API and falls back to bundled static content when the API is
 * unavailable. The marketing site must never show an empty page because Mongo
 * is down, so `fallback` is the contract, not a nicety.
 */
export function useContent(path, fallback, { params, enabled = true } = {}) {
  const [data, setData] = useState(fallback);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [live, setLive] = useState(false);
  const paramKey = JSON.stringify(params ?? null);

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    setLoading(true);

    api
      .get(path, { params })
      .then((res) => {
        if (cancelled) return;
        const payload = res.data?.data;
        if (payload && (!Array.isArray(payload) || payload.length)) {
          setData(payload);
          setLive(true);
        }
        setMeta(res.data?.meta ?? null);
      })
      .catch(() => {
        if (!cancelled) setLive(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, paramKey, enabled]);

  return { data, meta, loading, live };
}

/** Counts up to `value` once the element scrolls into view. */
export function useCountUp(value, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(Number((value * eased).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, decimals]);

  return { ref, display };
}

/** True once the element has entered the viewport. */
export function useInView({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}
