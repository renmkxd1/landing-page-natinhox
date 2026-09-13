// Decorative enhancements never gate content or navigation.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.getElementById('effectsToggle');
  let paused = reducedMotion.matches;
  const animations = new Set();
  const cards = document.querySelectorAll('.featured-card, .link-card, .mini-project');

  function applyPreference() {
    document.documentElement.dataset.effects = paused ? 'off' : 'on';
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Ativar efeitos' : 'Pausar efeitos';
    if (paused) {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      cards.forEach(card => card.removeAttribute('style'));
    }
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => { paused = !paused; applyPreference(); });
  reducedMotion.addEventListener('change', event => { paused = event.matches; applyPreference(); });
  applyPreference();

  cards.forEach(card => {
    let frame;
    card.addEventListener('pointermove', event => {
      if (paused || !finePointer.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (paused) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--light-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--light-y', `${event.clientY - rect.top}px`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      card.style.removeProperty('--light-x');
      card.style.removeProperty('--light-y');
    });
  });

  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveals.unobserve(entry.target);
        if (paused || typeof entry.target.animate !== 'function') return;
        const animation = entry.target.animate([
          { opacity: .55, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 550, easing: 'cubic-bezier(.2,.7,.2,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: .08 });
    document.querySelectorAll('.shell > section').forEach(section => reveals.observe(section));
  }

  const navLinks = [...document.querySelectorAll('.quick-nav a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollFrame;
  function updateNavigation() {
    scrollFrame = null;
    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= 160) active = index;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections.length - 1;
    navLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleNavigation() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavigation);
  }
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  updateNavigation();

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.hidden = false;
    const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 480);
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }
})();
