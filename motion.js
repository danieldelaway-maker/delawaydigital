// Scroll and entrance effects. Everything here is optional polish:
// without JavaScript (or with "reduce motion" on) the page shows fully and statically.
(function () {
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('motion');

  // Fade and slide elements in as they enter the viewport, staggering siblings
  const revealSelector = [
    '.section-title', '.section-subtitle', '.story p', '.story-photo', '.intro-card',
    '.step', '.service-card', '.result', '.subhead', '.case-card', '.compare-wrap',
    '.testimonial', '.featured-testimonial', '.faq details', '.contact-copy', '.contact-form',
    '.trust-label', '.reviews-bar', '.cta-box', '.about h1', '.about > .container > p'
  ].join(',');
  const items = document.querySelectorAll(revealSelector);
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.matches(revealSelector));
    el.style.setProperty('--delay', `${Math.min(siblings.indexOf(el), 5) * 90}ms`);
    el.classList.add('reveal');
  });
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => revealer.observe(el));

  // Count the headline stats up from zero the first time they're seen
  const counters = document.querySelectorAll('[data-count]');
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 1400;
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counter.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counter.observe(el));
})();
