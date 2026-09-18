export function formatDate(value, opts = {}) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...opts,
  });
}

/**
 * Minimal markdown renderer for article bodies.
 * Deliberately small: we control the content, so we only support the subset the
 * editorial team actually uses — h2, h3, bold, links, bullet lists, paragraphs.
 */
export function renderMarkdown(md = '') {
  const escape = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const inline = (s) =>
    escape(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(
        /\[([^\]]+)\]\(([^)\s]+)\)/g,
        '<a href="$2" rel="noopener noreferrer">$1</a>'
      );

  const blocks = md.trim().split(/\n{2,}/);
  const html = [];
  let list = null;

  const flushList = () => {
    if (list) {
      html.push(`<ul>${list.join('')}</ul>`);
      list = null;
    }
  };

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    if (block.startsWith('### ')) {
      flushList();
      html.push(`<h3>${inline(block.slice(4))}</h3>`);
    } else if (block.startsWith('## ')) {
      flushList();
      html.push(`<h2>${inline(block.slice(3))}</h2>`);
    } else if (/^[-*]\s/.test(block)) {
      list = block
        .split('\n')
        .filter((l) => /^[-*]\s/.test(l.trim()))
        .map((l) => `<li>${inline(l.trim().replace(/^[-*]\s/, ''))}</li>`);
      flushList();
    } else {
      flushList();
      html.push(`<p>${inline(block).replace(/\n/g, '<br />')}</p>`);
    }
  }
  flushList();

  return html.join('');
}

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
