// nav.js

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  setupMobileMenu();
  highlightActivePage();
});

/**
 * Insert navigation HTML into the header
 */
function initializeNavigation() {
  const header = document.querySelector('header');
  if (!header) return;

  header.innerHTML = `
    <div class="logo">
      <a href="/" style="color: inherit; text-decoration: none;">indira</a>
    </div>
    <button class="mobile-toggle" id="mobileToggle" type="button"
            aria-label="Open menu" aria-expanded="false" aria-controls="nav">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav id="nav">
      <a href="spaces">spaces</a>
      <a href="contact">contact</a>
    </nav>
  `;
}

/**
 * Setup mobile hamburger menu functionality
 */
function setupMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');

  if (!mobileToggle || !nav) return;

  // Toggle menu when clicking hamburger/X button
  mobileToggle.addEventListener('click', () => toggleMenu(mobileToggle, nav));

  // Close menu when clicking a navigation link (instant close to prevent glitch)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu(mobileToggle, nav, true));
  });

  // Close menu when clicking the overlay (outside links)
  nav.addEventListener('click', (e) => {
    if (e.target === nav) closeMenu(mobileToggle, nav);
  });

  // Close menu on Escape, and return focus to the toggle button
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu(mobileToggle, nav);
      mobileToggle.focus();
    }
  });

  // Trap focus within the open menu so Tab can't reach the page behind it
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !nav.classList.contains('active')) return;

    const focusables = [mobileToggle, ...nav.querySelectorAll('a')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/**
 * Toggle mobile menu open/closed
 */
function toggleMenu(toggle, nav) {
  const isOpen = toggle.classList.toggle('active');
  nav.classList.toggle('active');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

  // Move focus into the menu when it opens so the focus trap has a start point
  if (isOpen) {
    const firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus();
  }
}

/**
 * Close mobile menu
 */
function closeMenu(toggle, nav, instant = false) {
  if (instant) {
    // Remove transition for instant close
    nav.style.transition = 'none';
    toggle.style.transition = 'none';
  }

  toggle.classList.remove('active');
  nav.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');

  if (instant) {
    // Restore transitions after a brief moment
    setTimeout(() => {
      nav.style.transition = '';
      toggle.style.transition = '';
    }, 50);
  }
}

/**
 * Highlight the current page in navigation
 */
function highlightActivePage() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Get current page without .html extension
  let currentPage = window.location.pathname.split('/').pop() || 'index.html';
  currentPage = currentPage.replace('.html', '') || 'index';

  nav.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index' && href === '/')) {
      link.classList.add('current');
      link.setAttribute('aria-current', 'page');
    }
  });
}