import {
  computePosition,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.13/+esm';

let glossaryPromise = null;
function getGlossary() {
  if (!glossaryPromise) {
    glossaryPromise = fetch('data/glossary.json')
      .then((r) => r.json())
      .catch((err) => {
        console.warn('[tooltips] glossary fetch failed', err);
        return {};
      });
  }
  return glossaryPromise;
}

function buildTooltipEl() {
  const el = document.createElement('div');
  el.className = 'tooltip';
  el.setAttribute('role', 'tooltip');
  const arrowEl = document.createElement('span');
  arrowEl.className = 'tooltip__arrow';
  el.appendChild(arrowEl);
  const content = document.createElement('div');
  content.className = 'tooltip__content';
  el.appendChild(content);
  document.body.appendChild(el);
  return { el, arrowEl, content };
}

function renderContent(contentEl, entry, key) {
  const long = entry.short || entry.long || '';
  contentEl.innerHTML = `
    <span class="tooltip__title"></span>
    <span class="tooltip__short"></span>
    <a class="tooltip__link" href="pages/glossary.html#${key}">→ Mehr im Glossar</a>
  `;
  contentEl.querySelector('.tooltip__title').textContent = entry.term || key;
  contentEl.querySelector('.tooltip__short').textContent = long;
}

async function initTooltips() {
  const glossary = await getGlossary();
  const triggers = document.querySelectorAll('.term[data-glossary]');
  if (!triggers.length) return;

  const { el: tooltip, arrowEl, content } = buildTooltipEl();
  let activeTrigger = null;
  let cleanup = null;
  let hideTimer = null;

  const HIDE_DELAY = 200;

  function update(trigger) {
    computePosition(trigger, tooltip, {
      placement: 'top',
      middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowEl })],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` });
      const side = placement.split('-')[0];
      const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];
      if (middlewareData.arrow) {
        const { x: ax, y: ay } = middlewareData.arrow;
        Object.assign(arrowEl.style, {
          left: ax != null ? `${ax}px` : '',
          top:  ay != null ? `${ay}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-4px',
        });
      }
    });
  }

  function cancelHide() {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
  }

  function show(trigger) {
    cancelHide();
    if (activeTrigger === trigger) return;
    const key = trigger.dataset.glossary;
    const entry = glossary[key];
    if (!entry) return;
    if (cleanup) { cleanup(); cleanup = null; }
    renderContent(content, entry, key);
    tooltip.setAttribute('data-show', '');
    activeTrigger = trigger;
    cleanup = autoUpdate(trigger, tooltip, () => update(trigger));
  }

  function scheduleHide() {
    cancelHide();
    hideTimer = setTimeout(hideNow, HIDE_DELAY);
  }

  function hideNow() {
    cancelHide();
    tooltip.removeAttribute('data-show');
    if (cleanup) { cleanup(); cleanup = null; }
    activeTrigger = null;
  }

  tooltip.addEventListener('mouseenter', cancelHide);
  tooltip.addEventListener('mouseleave', scheduleHide);

  triggers.forEach((trigger) => {
    if (!glossary[trigger.dataset.glossary]) {
      trigger.style.borderBottomStyle = 'dashed';
      trigger.style.borderBottomColor = 'var(--danger-border)';
      trigger.title = `Glossar-Eintrag fehlt: ${trigger.dataset.glossary}`;
      return;
    }
    trigger.addEventListener('mouseenter', () => show(trigger));
    trigger.addEventListener('focus',      () => show(trigger));
    trigger.addEventListener('mouseleave', scheduleHide);
    trigger.addEventListener('blur',       scheduleHide);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeTrigger) {
      activeTrigger.blur();
      hideNow();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTooltips);
} else {
  initTooltips();
}
document.addEventListener('includes:loaded', initTooltips);
