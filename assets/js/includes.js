async function loadIncludes(root = document) {
  const slots = root.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async (slot) => {
    const url = slot.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      slot.innerHTML = await res.text();
    } catch (err) {
      slot.innerHTML = `<!-- include failed: ${url} (${err.message}) -->`;
      console.warn('[includes] failed to load', url, err);
    }
  }));
  markCurrentNav();
  document.dispatchEvent(new CustomEvent('includes:loaded'));
}

function markCurrentNav() {
  const path = location.pathname.replace(/\/index\.html$/, '/') || '/';
  document.querySelectorAll('.sidebar__nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const normalized = href.replace(/\/index\.html$/, '/');
    if (normalized === path) {
      a.setAttribute('aria-current', 'page');
      const group = a.closest('details.sidebar__group');
      if (group) group.open = true;
    }
  });
}

loadIncludes();
