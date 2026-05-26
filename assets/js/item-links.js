// Item-Hover-Tooltip im Stil von Icy-Veins/Wowhead.
// Datenquelle: SkullAndBonesTools/SkullAndBonesData (GitHub raw, AGPL-3.0).
// Live-Fetch beim ersten Hover, dann in-Memory-Cache.

const SBT_CODEX = 'https://skullandbonestools.de/en/codex/item/';
const RAW = 'https://raw.githubusercontent.com/SkullAndBonesTools/SkullAndBonesData/main';
const HIDE_DELAY = 200;

const RARITY_CLASS = {
  common: 'item-common',
  uncommon: 'item-uncommon',
  rare: 'item-rare',
  epic: 'item-epic',
  legendary: 'item-legendary',
};

let dataPromise = null;
function loadData() {
  if (!dataPromise) {
    dataPromise = Promise.all([
      fetch('data/item-links.json').then((r) => r.json()),
      fetch(`${RAW}/data/items.json`).then((r) => r.json()),
      fetch(`${RAW}/languages/en/en_items.json`).then((r) => r.json()).then((d) => d.items || {}),
      fetch(`${RAW}/languages/en/en_perks.json`).then((r) => r.json()).then((d) => d.perks || {}),
    ]).then(([slugs, items, names, perks]) => ({
      slugs: slugs.items || slugs,
      items,
      names,
      perks,
    })).catch((err) => {
      console.warn('[item-tooltip] data load failed', err);
      return null;
    });
  }
  return dataPromise;
}

function buildTooltipEl() {
  const el = document.createElement('div');
  el.className = 'item-tooltip';
  el.setAttribute('role', 'tooltip');
  document.body.appendChild(el);
  return el;
}

function fmt(n, suffix = '') {
  if (n == null) return '';
  return Number.isInteger(n) ? `${n}${suffix}` : `${n.toFixed(1)}${suffix}`;
}

function renderTooltip(itemId, data) {
  const item = data.items[itemId];
  const nameInfo = data.names[itemId];
  if (!item) return null;

  const name = nameInfo?.name || itemId;
  const desc = nameInfo?.description?.general || '';
  const rarity = (item.rarity || '').toLowerCase();
  const rarityCls = RARITY_CLASS[rarity] || '';

  const stats = [];
  if (item.gearScore != null) stats.push(['Gear Score', item.gearScore]);
  if (item.damagePerShot != null) stats.push(['Damage / Shot', fmt(item.damagePerShot)]);
  if (item.projectilesPerShot != null && item.projectilesPerShot > 1) stats.push(['Projectiles / Shot', item.projectilesPerShot]);
  if (item.optimalRange != null) stats.push(['Range', `${item.optimalRange}m`]);
  if (item.projectileSpeed != null) stats.push(['Projectile Speed', `${item.projectileSpeed}m/s`]);
  if (item.rateOfFire != null) stats.push(['Rate of Fire', `${(item.rateOfFire / 60).toFixed(2)}/s`]);
  if (item.reloadSpeed != null) stats.push(['Reload', `${(item.reloadSpeed / 1000).toFixed(1)}s`]);
  if (item.weight != null) stats.push(['Weight', item.weight]);

  const perksHtml = (item.perks || []).map((perkId) => {
    const p = data.perks[perkId];
    if (!p) return '';
    const pdesc = p.description?.general || '';
    return `<div class="item-tooltip__perk">
      <strong>${escapeHtml(p.name)}</strong>
      ${pdesc ? `<div class="item-tooltip__perk-desc">${escapeHtml(pdesc)}</div>` : ''}
    </div>`;
  }).filter(Boolean).join('');

  const obtainable = (item.obtainable || []).slice(0, 3).join(', ');

  return `
    <div class="item-tooltip__head">
      <h4 class="item-tooltip__name ${rarityCls}">${escapeHtml(name)}</h4>
      ${item.gearScore != null ? `<div class="item-tooltip__gs">Gear Score ${item.gearScore}</div>` : ''}
    </div>
    ${desc ? `<p class="item-tooltip__desc">${escapeHtml(desc)}</p>` : ''}
    ${stats.length ? `<dl class="item-tooltip__stats">${
      stats.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')
    }</dl>` : ''}
    ${perksHtml ? `<div class="item-tooltip__perks">${perksHtml}</div>` : ''}
    ${obtainable ? `<p class="item-tooltip__obtain"><strong>Obtainable:</strong> ${escapeHtml(obtainable)}</p>` : ''}
    <p class="item-tooltip__source">Werte: <a href="${SBT_CODEX}${itemId}" target="_blank" rel="noopener">skullandbonestools.de ↗</a></p>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function positionTooltip(target, tooltip) {
  const rect = target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const margin = 8;
  let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  let top = rect.top - tooltipRect.height - margin;
  if (top < margin) top = rect.bottom + margin;
  if (left < margin) left = margin;
  if (left + tooltipRect.width > window.innerWidth - margin) {
    left = window.innerWidth - tooltipRect.width - margin;
  }
  tooltip.style.left = `${left + window.scrollX}px`;
  tooltip.style.top = `${top + window.scrollY}px`;
}

function makeLink(text, itemId, originalChildren) {
  const link = document.createElement('a');
  link.href = SBT_CODEX + itemId;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'sbt-link';
  link.dataset.itemId = itemId;
  link.setAttribute('title', `${text} — Details auf skullandbonestools.de`);
  for (const node of originalChildren) link.appendChild(node);
  link.appendChild(document.createTextNode(text));
  const ext = document.createElement('span');
  ext.className = 'sbt-link__ext';
  ext.setAttribute('aria-hidden', 'true');
  ext.textContent = '↗';
  link.appendChild(ext);
  return link;
}

async function init() {
  const data = await loadData();
  if (!data) return;

  const tooltip = buildTooltipEl();
  let activeTrigger = null;
  let hideTimer = null;

  function cancelHide() { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } }
  function show(trigger) {
    cancelHide();
    if (activeTrigger === trigger) return;
    const id = trigger.dataset.itemId;
    if (!id) return;
    const html = renderTooltip(id, data);
    if (!html) return;
    tooltip.innerHTML = html;
    tooltip.setAttribute('data-show', '');
    activeTrigger = trigger;
    positionTooltip(trigger, tooltip);
  }
  function hideNow() {
    cancelHide();
    tooltip.removeAttribute('data-show');
    activeTrigger = null;
  }
  function scheduleHide() { cancelHide(); hideTimer = setTimeout(hideNow, HIDE_DELAY); }
  tooltip.addEventListener('mouseenter', cancelHide);
  tooltip.addEventListener('mouseleave', scheduleHide);

  function bindLink(link) {
    link.addEventListener('mouseenter', () => show(link));
    link.addEventListener('focus', () => show(link));
    link.addEventListener('mouseleave', scheduleHide);
    link.addEventListener('blur', scheduleHide);
  }

  // Build lookup: name -> itemId (lowercase)
  const lookup = {};
  for (const [name, id] of Object.entries(data.slugs)) {
    lookup[name.toLowerCase()] = id;
  }

  function lookupItem(text) {
    if (!text) return null;
    let t = text.trim();
    // Strip common suffixes wie (ascended), (Y3S1), (Heal-on-Ram)
    t = t.replace(/\s*\(.*?\)\s*$/g, '').trim();
    // x4, ×4 entfernen
    t = t.replace(/\s*[x×]\s*\d+\s*$/i, '').trim();
    if (lookup[t.toLowerCase()]) return [t, lookup[t.toLowerCase()]];
    // Try without roman numeral suffix
    const base = t.replace(/\s+(I{1,3}|IV|V)$/, '').trim();
    if (base !== t && lookup[base.toLowerCase()]) return [t, lookup[base.toLowerCase()]];
    return null;
  }

  // 1. Auto-wrap td.item
  document.querySelectorAll('td.item, .item-cell').forEach((el) => {
    if (el.querySelector('a.sbt-link')) return;
    // Collect text nodes + images
    const textNodes = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE);
    const imgs = [...el.querySelectorAll('img')];
    const fullText = textNodes.map((n) => n.nodeValue).join('').trim();
    if (!fullText) return;
    const match = lookupItem(fullText);
    if (!match) return;
    const [displayText, itemId] = match;

    // Clear cell, rebuild with link wrapping
    el.innerHTML = '';
    const link = makeLink(displayText, itemId, imgs);
    el.appendChild(link);
    bindLink(link);
  });

  // 2. Explicit data-item attribute
  document.querySelectorAll('[data-item]').forEach((el) => {
    if (el.tagName === 'A') { bindLink(el); return; }
    const name = el.dataset.item;
    const id = lookup[name.toLowerCase()];
    if (!id) return;
    el.dataset.itemId = id;
    el.classList.add('sbt-link');
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    bindLink(el);
    el.addEventListener('click', () => window.open(SBT_CODEX + id, '_blank', 'noopener'));
  });

  // Reposition on scroll/resize when shown
  window.addEventListener('scroll', () => activeTrigger && positionTooltip(activeTrigger, tooltip), { passive: true });
  window.addEventListener('resize', () => activeTrigger && positionTooltip(activeTrigger, tooltip));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeTrigger) { activeTrigger.blur(); hideNow(); }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
