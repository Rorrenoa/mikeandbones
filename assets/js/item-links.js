// Wickelt Item-Texte mit Links zu skullandbonestools.de.
// Funktioniert auf zwei Wegen:
// 1. Explizit: <span data-item="Divine Thunder">Divine Thunder</span> → wird gelinkt
// 2. Auto: <td class="item ..."> mit reinem Item-Text → wird gelinkt wenn Slug bekannt

const SBT_BASE = 'https://skullandbonestools.de/en/codex/item/';

async function init() {
  let map = null;
  try {
    map = await fetch('data/item-links.json').then((r) => r.json());
  } catch (e) {
    console.warn('[item-links] fetch failed', e);
    return;
  }

  // Build flat lookup: itemName -> slug (across all categories)
  const lookup = {};
  for (const [cat, items] of Object.entries(map)) {
    if (typeof items !== 'object' || cat.startsWith('_')) continue;
    for (const [name, slug] of Object.entries(items)) {
      lookup[name.toLowerCase()] = slug;
    }
  }

  function slugFor(name) {
    if (!name) return null;
    return lookup[name.toLowerCase().trim()] || null;
  }

  function wrap(el, name, slug) {
    // Replace inner text with an anchor while preserving any child <img> (thumbs).
    const img = el.querySelector('img');
    const link = document.createElement('a');
    link.href = SBT_BASE + slug;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'sbt-link';
    link.title = `${name} auf skullandbonestools.de`;
    if (img) {
      link.appendChild(img);
    }
    link.appendChild(document.createTextNode(name));
    const ext = document.createElement('span');
    ext.className = 'sbt-link__ext';
    ext.setAttribute('aria-hidden', 'true');
    ext.textContent = '↗';
    link.appendChild(ext);

    el.innerHTML = '';
    el.appendChild(link);
  }

  // 1. Explicit data-item
  document.querySelectorAll('[data-item]').forEach((el) => {
    const name = el.dataset.item;
    const slug = slugFor(name);
    if (slug) wrap(el, name, slug);
  });

  // 2. Auto: <td class="item ..."> mit nur Text-/Thumb-Inhalt
  document.querySelectorAll('td.item, .item-cell').forEach((el) => {
    if (el.querySelector('a')) return; // schon Link drin
    // Sammle reinen Text (ohne <em>, <strong> etc. — nur unmittelbar)
    const textNodes = [];
    for (const n of el.childNodes) {
      if (n.nodeType === Node.TEXT_NODE) textNodes.push(n);
    }
    const text = textNodes.map((n) => n.nodeValue).join('').trim();
    if (!text) return;
    const slug = slugFor(text);
    if (!slug) return;
    wrap(el, text, slug);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
