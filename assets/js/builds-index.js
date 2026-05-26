async function renderBuilds() {
  const container = document.getElementById('builds-list');
  const filter = document.getElementById('builds-filter');
  const tierFilter = document.getElementById('builds-tier');
  const tagFilter = document.getElementById('builds-tag');
  if (!container) return;

  const slugs = new Set([
    'brigantine-longcannons-beginner',
    'brigantine-longcannons-intermediate',
    'brigantine-longcannons-endgame',
    'schooner-reaper',
    'frigate-coven',
    'padewakang-hostile-takeover',
    'sambuk-pyro',
    'snow-versatile',
    'garuda-meta',
    'sloop-smuggler',
    'galleon-broadside',
  ]);

  function pageUrlFor(build) {
    if (build.id.startsWith('brigantine-longcannons-')) {
      const anchor = build.id.replace('brigantine-longcannons-', '');
      return `pages/builds/brigantine-longcannons.html#${anchor}`;
    }
    if (slugs.has(build.id)) return `pages/builds/${build.id}.html`;
    return null;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  const builds = await fetch('data/builds.json').then((r) => r.json());

  const tags = new Set();
  builds.forEach((b) => (b.tags || []).forEach((t) => tags.add(t)));
  if (tagFilter) {
    tagFilter.innerHTML = '<option value="">Alle Tags</option>' +
      [...tags].sort().map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
  }

  function render(list) {
    if (!list.length) {
      container.innerHTML = '<p class="caption">Keine Builds passen zu den Filtern.</p>';
      return;
    }
    container.innerHTML = list.map((b) => {
      const url = pageUrlFor(b);
      const tierClass = `badge-tier-${b.tier}`;
      const tags = (b.tags || []).map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join(' ');
      const activities = (b.activities || []).slice(0, 3).join(', ');
      const cardInner = `
        <h3 class="card__title">${escapeHtml(b.name)}</h3>
        <p class="caption"><span class="badge ${tierClass}">${escapeHtml(b.tier)}</span> ${tags}</p>
        <p class="card__desc">${escapeHtml(b.ship)} · ${escapeHtml(activities)}</p>
        ${b.rotation ? `<p class="card__desc"><em>${escapeHtml(b.rotation.slice(0, 140))}${b.rotation.length > 140 ? '…' : ''}</em></p>` : ''}
        <span class="card__tag">${url ? 'Details →' : 'Nur Daten (Seite folgt)'}</span>
      `;
      return url
        ? `<a class="card" href="${url}">${cardInner}</a>`
        : `<div class="card" style="opacity:.7;cursor:default;">${cardInner}</div>`;
    }).join('');
  }

  function apply() {
    const q = (filter?.value || '').trim().toLowerCase();
    const tier = tierFilter?.value || '';
    const tag = tagFilter?.value || '';
    const filtered = builds.filter((b) => {
      if (tier && b.tier !== tier) return false;
      if (tag && !(b.tags || []).includes(tag)) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.ship.toLowerCase().includes(q) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (b.activities || []).some((a) => a.toLowerCase().includes(q))
      );
    });
    render(filtered);
  }

  [filter, tierFilter, tagFilter].forEach((el) => el && el.addEventListener('input', apply));
  apply();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBuilds);
} else {
  renderBuilds();
}
