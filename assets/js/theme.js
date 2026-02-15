// Theme management
(function() {
  'use strict';

  const THEME_KEY = 'theme';
  const THEME_ATTR = 'data-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  // Get current theme
  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved;
    }

    // Default to dark unless user has explicitly saved a preference
    return THEME_DARK;
  }

  // Set theme
  function setTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle theme
  function toggleTheme() {
    const current = getTheme();
    const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    setTheme(next);
  }

  // Initialize theme toggle button
  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleTheme();
    });
  }

  // Listen for system theme changes
  function watchSystemTheme() {
    // No-op by design: this site intentionally defaults to dark and
    // should not switch themes based on OS preference changes.
    return;
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initThemeToggle();
      watchSystemTheme();
    });
  } else {
    initThemeToggle();
    watchSystemTheme();
  }
})();
