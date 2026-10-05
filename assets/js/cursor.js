/* ============ CUSTOM CURSOR MODULE ============ */
const Cursor = (() => {
  let dot, ring, trail;
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let ringPos = { x: mouse.x, y: mouse.y };
  let trailPos = { x: mouse.x, y: mouse.y };

  function inject() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="cursor-trail"></div>
      <div class="cursor-ring"></div>
      <div class="cursor-dot"></div>
    `);
    dot = document.querySelector('.cursor-dot');
    ring = document.querySelector('.cursor-ring');
    trail = document.querySelector('.cursor-trail');
  }

  function loop() {
    if (!dot) return;
    // dot instant
    dot.style.left = mouse.x + 'px';
    dot.style.top = mouse.y + 'px';

    // ring lerp
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;
    ring.style.left = ringPos.x + 'px';
    ring.style.top = ringPos.y + 'px';

    // trail slower
    trailPos.x += (mouse.x - trailPos.x) * 0.08;
    trailPos.y += (mouse.y - trailPos.y) * 0.08;
    trail.style.left = trailPos.x + 'px';
    trail.style.top = trailPos.y + 'px';

    requestAnimationFrame(loop);
  }

  function bindEvents() {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Hover state for interactive elements
    const interactive = 'a, button, input, textarea, select, [role="button"], .product-card, .dept-card, .dept-pill, .category-chip';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive) && ring) ring.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive) && ring) ring.classList.remove('hover');
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      [dot, ring, trail].forEach(el => el && (el.style.opacity = '0'));
    });
    document.addEventListener('mouseenter', () => {
      [dot, ring, trail].forEach(el => el && (el.style.opacity = '1'));
    });
  }

  /* ---------- TEXT REVEAL (2-color split) ---------- */
  function applyRevealText() {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      if (el.classList.contains('reveal-text')) return;
      el.classList.add('reveal-text');
      el.setAttribute('data-text', el.textContent.trim());
    });
  }

  function revealMouse() {
    document.querySelectorAll('.reveal-text').forEach(el => {
      const rect = el.getBoundingClientRect();
      const x = mouse.x - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      el.style.setProperty('--x', pct + '%');
    });
  }

  function init() {
    inject();
    if (dot) { loop(); bindEvents(); }
    applyRevealText();
    window.addEventListener('mousemove', revealMouse);
    // Re-apply after dynamic content renders
    const observer = new MutationObserver(() => applyRevealText());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  return { init };
})();