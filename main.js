/**
 * main.js — 350DIAS
 * Reads all data from CONTENT (content.js).
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Icons ───────────────────────────────── */
  if (typeof lucide !== 'undefined') lucide.createIcons();

  let currentLang = 'en';

  /* ══════════════════════════════════════════
     1. NAVIGATION
  ══════════════════════════════════════════ */
  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('navBurger');
  const drawer   = document.getElementById('navDrawer');
  let   menuOpen = false;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
  nav.classList.toggle('scrolled', window.scrollY > 60);

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    drawer.classList.toggle('open', menuOpen);
    burger.setAttribute('aria-expanded', menuOpen);
    burger.innerHTML = menuOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  drawer.querySelectorAll('.drawer-link').forEach(l => {
    l.addEventListener('click', () => {
      menuOpen = false;
      drawer.classList.remove('open');
      burger.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  /* ══════════════════════════════════════════
     2. LANGUAGE TOGGLE
  ══════════════════════════════════════════ */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === currentLang)
      );
      buildUnitTabs();
      renderUnit(activeUnitId);
    });
  });

  /* ══════════════════════════════════════════
     3. HERO SLIDESHOW
     Images: images/hero-1.jpg, hero-2.jpg ...
     Interval: 5 seconds
  ══════════════════════════════════════════ */
  const slides     = document.querySelectorAll('.hero__slide');
  let   slideIndex = 0;

  function nextSlide() {
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
  }

  if (slides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  /* ══════════════════════════════════════════
     4. PARALLAX
  ══════════════════════════════════════════ */
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  let   rafPending     = false;

  function updateParallax() {
    const sy = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed  = parseFloat(layer.dataset.parallaxSpeed || 0.25);
      const parent = layer.closest('.parallax-section');
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      layer.style.transform = `translateY(${(sy - (rect.top + sy)) * speed}px)`;
    });
    rafPending = false;
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      if (!rafPending) { rafPending = true; requestAnimationFrame(updateParallax); }
    }, { passive: true });
    updateParallax();
  }

  /* ══════════════════════════════════════════
     5. UNIT TABS — built from CONTENT.units
  ══════════════════════════════════════════ */
  const aptTabsEl  = document.getElementById('aptTabs');
  const aptImageWrap = document.querySelector('.apt-image-wrap');
  const aptName    = document.getElementById('aptName');
  const aptStatus  = document.getElementById('aptStatus');
  const aptTypo    = document.getElementById('aptTypology');
  const aptArea    = document.getElementById('aptArea');
  const aptBalcony = document.getElementById('aptBalcony');
  const aptTerrace = document.getElementById('aptTerrace');
  const aptStorage = document.getElementById('aptStorage');
  const aptGarden  = document.getElementById('aptGarden');
  const aptPanel   = document.getElementById('aptPanel');

  let activeUnitId = null;

  function buildUnitTabs() {
    if (!aptTabsEl || typeof CONTENT === 'undefined') return;

    aptTabsEl.innerHTML = '';

    CONTENT.units.forEach(unit => {
      const btn = document.createElement('button');
      btn.className  = 'apt-tab' + (unit.id === activeUnitId ? ' active' : '');
      btn.dataset.id = unit.id;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', unit.id === activeUnitId);
      btn.textContent = unit.label[currentLang] || unit.label['en'];

      btn.addEventListener('click', () => {
        activeUnitId = unit.id;
        document.querySelectorAll('.apt-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.id === activeUnitId);
          t.setAttribute('aria-selected', t.dataset.id === activeUnitId);
        });
        renderUnit(activeUnitId);
      });

      aptTabsEl.appendChild(btn);
    });

    lucide.createIcons();
  }

  function renderUnit(unitId) {
    if (typeof CONTENT === 'undefined' || !unitId) return;

    const unit = CONTENT.units.find(u => u.id === unitId);
    if (!unit) return;

    const d = unit.details[currentLang] || unit.details['en'];

    /* Floor plan image(s) — one image, or two stacked floors for duplex units */
    if (aptImageWrap) {
      aptImageWrap.innerHTML = '';
      const plans = unit.images || [];
      aptImageWrap.classList.toggle('apt-image-wrap--split', plans.length > 1);

      /* Scale the plan's display width by real floor area, so units are
         shown in proportion to one another (relative to the largest unit). */
      const BASE_WIDTH = 780; // matches --plan-base-width in styles.css
      const MIN_SCALE = 0.55;
      if (unit.areaM2) {
        const maxArea = Math.max(...CONTENT.units.map(u => u.areaM2 || 0));
        const scale = Math.max(MIN_SCALE, Math.sqrt(unit.areaM2 / maxArea));
        aptImageWrap.style.maxWidth = Math.round(BASE_WIDTH * scale) + 'px';
      } else {
        aptImageWrap.style.maxWidth = '';
      }

      plans.forEach(plan => {
        const floor = document.createElement('div');
        floor.className = 'apt-floor';
        if (plan.label) {
          const label = document.createElement('span');
          label.className = 'apt-floor__label';
          label.textContent = plan.label[currentLang] || plan.label.en;
          floor.appendChild(label);
        }
        const img = document.createElement('img');
        img.src = plan.src;
        img.alt = plan.label ? `${d.name} — ${plan.label[currentLang] || plan.label.en}` : d.name;
        img.loading = 'lazy';
        floor.appendChild(img);
        aptImageWrap.appendChild(floor);
      });
    }

    /* Name + status badge */
    if (aptName)   aptName.textContent = d.name;
    if (aptStatus) {
      const sold = unit.status === 'sold';
      aptStatus.textContent  = sold ? 'Sold' : 'Available';
      aptStatus.className    = 'apt-status apt-status--' + (sold ? 'sold' : 'available');
    }

    /* Details */
    if (aptTypo)    aptTypo.textContent    = d.typology  || '—';
    if (aptArea)    aptArea.textContent    = d.area      || '—';
    if (aptBalcony) aptBalcony.textContent = d.balcony   || '—';
    if (aptTerrace) aptTerrace.textContent = d.terrace   || '—';
    if (aptStorage) aptStorage.textContent = d.storage   || '—';
    if (aptGarden)  aptGarden.textContent  = d.garden    || '—';

    /* Re-animate panel */
    if (aptPanel) {
      aptPanel.style.animation = 'none';
      void aptPanel.offsetWidth;
      aptPanel.style.animation = '';
    }

    lucide.createIcons();
  }

  /* Init tabs — show first unit */
  if (typeof CONTENT !== 'undefined' && CONTENT.units.length) {
    activeUnitId = CONTENT.units[0].id;
    buildUnitTabs();
    renderUnit(activeUnitId);
  }

  /* ══════════════════════════════════════════
     6. GALLERY — drag + arrows
  ══════════════════════════════════════════ */
  const track = document.getElementById('galleryTrack');
  const prev  = document.getElementById('galleryPrev');
  const next  = document.getElementById('galleryNext');

  if (track) {
    const step = () => (track.querySelector('.gallery__item')?.offsetWidth || 320) + 16;

    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));

    /* Drag */
    let dragging = false, startX = 0, startScroll = 0;

    track.addEventListener('mousedown', e => {
      dragging    = false;
      startX      = e.pageX;
      startScroll = track.scrollLeft;
      track.style.scrollSnapType = 'none';
    });
    track.addEventListener('mousemove', e => {
      if (!(e.buttons & 1)) return;
      const d = e.pageX - startX;
      if (Math.abs(d) > 4) { dragging = true; track.scrollLeft = startScroll - d; }
    });
    track.addEventListener('mouseup',  () => { track.style.scrollSnapType = ''; });
    track.addEventListener('click',    e  => { if (dragging) e.stopPropagation(); dragging = false; });

    /* Touch */
    let tx = 0, ts = 0;
    track.addEventListener('touchstart', e => { tx = e.touches[0].pageX; ts = track.scrollLeft; }, { passive: true });
    track.addEventListener('touchmove',  e => { track.scrollLeft = ts - (e.touches[0].pageX - tx); }, { passive: true });
  }

  /* ══════════════════════════════════════════
     7. SCROLL REVEAL
  ══════════════════════════════════════════ */
  document.querySelectorAll('.section-header, .about__text, .about__image-wrap, .apt-panel, .location__map, .location__highlights, .contact__info, .contact__form-wrap').forEach(el => {
    el.classList.add('reveal');
  });

  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 }).observe.bind(
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 })
  );

  /* Simpler reveal */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ══════════════════════════════════════════
     8. CONTACT FORM
  ══════════════════════════════════════════ */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled  = true;
      btn.innerHTML = 'Sending… <i data-lucide="loader"></i>';
      lucide.createIcons();
      setTimeout(() => {
        btn.innerHTML = 'Sent! <i data-lucide="check"></i>';
        lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; form.reset(); lucide.createIcons(); }, 3000);
      }, 1400);
    });
  }

});
