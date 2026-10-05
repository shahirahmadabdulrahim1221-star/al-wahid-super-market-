/* ============ LOADER MODULE ============ */
const Loader = (() => {
  let preloaderEl, counterEl, barEl, currentProgress = 0;

  function injectPreloader() {
    if (document.querySelector('.preloader')) return;
    const html = `
      <div class="preloader">
        <div class="preloader-inner">
          <div class="preloader-logo">AW</div>
          <div class="preloader-brand">Al Wahid</div>
          <div class="preloader-sub">Hyper Market</div>
          <div class="preloader-counter">
            <span class="val">0</span><span class="pct">%</span>
          </div>
          <div class="preloader-bar"><div class="preloader-bar-fill"></div></div>
          <div class="preloader-hint">Loading experience</div>
        </div>
      </div>
      <div class="page-transition">
        <div class="page-transition-text">Al Wahid Hyper Market</div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', html);
  }

  function simulateProgress(callback) {
    currentProgress = 0;
    const pre = document.querySelector('.preloader');
    const val = pre.querySelector('.val');
    const fill = pre.querySelector('.preloader-bar-fill');

    const tick = setInterval(() => {
      currentProgress += Math.random() * 12 + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(tick);
        val.textContent = '100';
        fill.style.width = '100%';
        setTimeout(() => {
          pre.classList.add('hidden');
          document.body.style.overflow = '';
          if (callback) callback();
        }, 350);
      } else {
        val.textContent = Math.floor(currentProgress);
        fill.style.width = currentProgress + '%';
      }
    }, 90);
  }

  function init() {
    injectPreloader();
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => simulateProgress());
    // Fallback if load doesn't fire (cached pages etc.)
    setTimeout(() => {
      const pre = document.querySelector('.preloader');
      if (pre && !pre.classList.contains('hidden')) simulateProgress();
    }, 2500);
  }

  /* ---------- NAVIGATION TRANSITION ---------- */
  function navigate(url) {
    const curtain = document.querySelector('.page-transition');
    if (!curtain) { window.location.href = url; return; }
    curtain.classList.add('active');
    setTimeout(() => { window.location.href = url; }, 550);
  }

  function attachLinks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      // Skip anchors, external, new-tab, javascript
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') ||
          href.startsWith('javascript:') || a.target === '_blank' ||
          href.startsWith('http') && !href.includes(location.host)) return;
      // Skip same-page anchors
      const samePage = href.split('#')[0] === '' || href.split('#')[0] === location.pathname.split('/').pop();
      if (samePage && href.includes('#')) return;

      e.preventDefault();
      navigate(href);
    });
  }

  return { init, navigate, attachLinks };
})();