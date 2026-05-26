async function renderGlossary() {
  const container = document.getElementById('glossary-list');
  const filter = document.getElementById('glossary-filter');
  if (!container) return;

  const data = await fetch('data/glossary.json').then((r) => r.json());
  const entries = Object.entries(data)
    .map(([key, val]) => ({ key, ...val }))
    .sort((a, b) => a.term.localeCompare(b.term, 'de'));

  function render(list) {
    container.innerHTML = list.map((e) => `
      <li class="glossary-entry" id="${e.key}">
        <h3>${escapeHtml(e.term)}</h3>
        <p class="caption">${(e.tags || []).map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join(' ')}</p>
        <p>${escapeHtml(e.long || e.short || '')}</p>
      </li>
    `).join('');
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  render(entries);

  function score(entry, q) {
    const term  = entry.term.toLowerCase();
    const short = (entry.short || '').toLowerCase();
    const long  = (entry.long  || '').toLowerCase();
    const tags  = (entry.tags  || []).map((t) => t.toLowerCase());

    if (term === q)                                return 0;
    if (term.startsWith(q))                        return 1;
    if (tags.includes(q))                          return 2;
    if (term.includes(q))                          return 3 + term.indexOf(q) / 100;
    if (tags.some((t) => t.startsWith(q)))         return 4;
    if (short.includes(q))                         return 5 + short.indexOf(q) / 1000;
    if (long.includes(q))                          return 6 + long.indexOf(q)  / 10000;
    return Infinity;
  }

  if (filter) {
    filter.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return render(entries);
      const ranked = entries
        .map((entry) => ({ entry, s: score(entry, q) }))
        .filter((r) => r.s !== Infinity)
        .sort((a, b) => a.s - b.s || a.entry.term.localeCompare(b.entry.term, 'de'))
        .map((r) => r.entry);
      render(ranked);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderGlossary);
} else {
  renderGlossary();
}
