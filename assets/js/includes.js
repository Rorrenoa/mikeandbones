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
  const currentUrl = new URL(location.href);
  document.querySelectorAll('.sidebar__nav a').forEach((a) => {
    const target = new URL(a.href);
    if (target.pathname === currentUrl.pathname) {
      a.setAttribute('aria-current', 'page');
      const group = a.closest('details.sidebar__group');
      if (group) group.open = true;
    }
  });
}

loadIncludes();
