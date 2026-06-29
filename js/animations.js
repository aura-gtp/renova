/* ========================================
   RENOVA — Scroll Animations
   Intersection Observer API
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCounters();
  initParallax();
});

/* === SCROLL ANIMATIONS (Fade-in, Slide, Scale) === */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right, .scale-in'
  );

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* === ANIMATED COUNTERS === */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-counter'));
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(easeOut * target);

    element.textContent = prefix + current.toLocaleString('pt-BR') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* === PARALLAX EFFECT === */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const yPos = -(scrolled * speed);
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }, { passive: true });
}
