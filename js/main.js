/* ========================================
   RENOVA — Main JavaScript
   Menu mobile, header sticky, utilidades
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initActiveNav();
});

/* === MOBILE MENU === */
function initMobileMenu() {
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  const links = document.querySelectorAll('.header__link');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      menuBtn.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* === STICKY HEADER === */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* === ACTIVE NAV === */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.header__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
