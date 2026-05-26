document.addEventListener('includes:loaded', () => {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    const open = sidebar.getAttribute('data-open') === 'true';
    sidebar.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.getAttribute('data-open') === 'true') {
      sidebar.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
});
