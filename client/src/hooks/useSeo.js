import { useEffect } from 'react';

function setMeta(selector, attr, value) {
  if (!value) return;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) tag.setAttribute(key, val);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

/** Per-route document title, description, canonical and OG tags. */
export function useSeo({ title, description, canonical, jsonLd } = {}) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);

    const href = canonical || `https://dostsol.com${window.location.pathname}`;
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);

    let script = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (script) script.remove();
    };
  }, [title, description, canonical, jsonLd]);
}
