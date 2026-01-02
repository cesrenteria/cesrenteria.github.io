// Mobile nav toggle and footer year
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle) {
  navToggle.addEventListener('click', () => navList.classList.toggle('open'));
}
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle: dark <-> night <-> light
const THEMES = ['dark', 'night', 'light'];
function applyTheme(theme) {
  const t = THEMES.includes(theme) ? theme : 'dark';
  // Use empty attribute (no data-theme) for dark to keep defaults
  if (t === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', t);
  }
  try { localStorage.setItem('theme', t); } catch {}
    const btns = document.querySelectorAll('.theme-toggle');
    const icon = t === 'dark' ? '🌑' : t === 'night' ? '🌙' : '☀️';
    btns.forEach(btn => { btn.textContent = icon; btn.setAttribute('title', `Theme: ${t}`); });
}
function initTheme() {
  let saved = 'dark';
  try { saved = localStorage.getItem('theme') || 'dark'; } catch {}
  applyTheme(saved);
  const btns = document.querySelectorAll('.theme-toggle');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = (localStorage.getItem('theme') || 'dark');
      const idx = THEMES.indexOf(current);
      const next = THEMES[(idx + 1) % THEMES.length];
      applyTheme(next);
    });
  });
}
initTheme();
