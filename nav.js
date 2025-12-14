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
      <a href="index.html" style="color: inherit; text-decoration: none;">indira</a>
    </div>
    <div class="mobile-toggle" id="mobileToggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav id="nav">
      <a href="index.html">home</a>
      <a href="spaces.html">spaces</a>
      <a href="contact.html">contact</a>
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

  // Close menu when clicking a navigation link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu(mobileToggle, nav));
  });

  // Close menu when clicking the overlay (outside links)
  nav.addEventListener('click', (e) => {
    if (e.target === nav) closeMenu(mobileToggle, nav);
  });
}

/**
 * Toggle mobile menu open/closed
 */
function toggleMenu(toggle, nav) {
  toggle.classList.toggle('active');
  nav.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMenu(toggle, nav) {
  toggle.classList.remove('active');
  nav.classList.remove('active');
}

/**
 * Highlight the current page in navigation
 */
function highlightActivePage() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  nav.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.textDecoration = 'underline';
    }
  });
}