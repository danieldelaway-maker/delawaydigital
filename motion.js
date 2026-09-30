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
    '.testimonial', '.featured-testimonial', '.faq details', '.contact-copy', '.contact-form', '.proof-card',
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

  // Headline stats rapidly count up from zero whenever they scroll fully into view.
  // They reset to 0 once they leave the screen, so they replay when you come back.
  const counters = document.querySelectorAll('[data-count]');
  const pageStart = performance.now();
  const entranceDelay = 1100; // let the stat cards finish fading in on first load
  // data-decimals="2" keeps decimal places (1.97%); whole numbers get thousands separators ($222,933)
  const format = (el, n) => {
    const decimals = Number(el.dataset.decimals || 0);
    const body = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US');
    return (el.dataset.prefix || '') + body + (el.dataset.suffix || '');
  };
  const run = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    el.classList.remove('counted');
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = format(el, target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.classList.add('counted');
    };
    requestAnimationFrame(tick);
  };
  counters.forEach((el) => { el.textContent = format(el, 0); });
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.intersectionRatio >= 0.95) {
        if (el.dataset.running) return;
        el.dataset.running = '1';
        const wait = Math.max(0, entranceDelay - (performance.now() - pageStart));
        setTimeout(() => run(el), wait);
      } else if (!entry.isIntersecting) {
        delete el.dataset.running;
        el.classList.remove('counted');
        el.textContent = format(el, 0);
      }
    });
  }, { threshold: [0, 0.95] });
  counters.forEach((el) => counter.observe(el));
})();
