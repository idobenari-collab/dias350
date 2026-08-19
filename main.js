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
     Images: images/gallery-2.jpg (slide 1), hero-2.jpg, hero-3.jpg ...
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

  /* Lightbox — used by floor plans (single image) and the gallery (looping list) */
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxClose   = document.getElementById('lightboxClose');
  const lightboxPrev    = document.getElementById('lightboxPrev');
  const lightboxNext    = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let lightboxList  = [];   // [{ src, alt }, ...] — empty for single-image mode
  let lightboxIndex = 0;

  function showLightboxItem(i) {
    const item = lightboxList[i];
    if (!item || !lightboxImg) return;
    lightboxIndex = i;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt || '';
    if (lightboxCounter) {
      lightboxCounter.textContent = lightboxList.length > 1
        ? `${i + 1} / ${lightboxList.length}` : '';
    }
  }

  /* src/alt for a single image, or (list, startIndex) to enable prev/next + looping */
  function openLightbox(src, alt, list, startIndex) {
    if (!lightbox || !lightboxImg) return;
    lightboxList = list && list.length ? list : [{ src, alt }];
    const hasNav = lightboxList.length > 1;
    if (lightboxPrev) lightboxPrev.hidden = !hasNav;
    if (lightboxNext) lightboxNext.hidden = !hasNav;
    showLightboxItem(startIndex || 0);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function lightboxStep(dir) {
    if (lightboxList.length < 2) return;
    const next = (lightboxIndex + dir + lightboxList.length) % lightboxList.length;
    showLightboxItem(next);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', () => lightboxStep(-1));
  if (lightboxNext)  lightboxNext.addEventListener('click', () => lightboxStep(1));
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxStep(-1);
    if (e.key === 'ArrowRight') lightboxStep(1);
  });

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
      const BASE_WIDTH = 1100; // matches .apt-image-wrap max-width in styles.css (largest unit fills the container)
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
        img.addEventListener('click', () => openLightbox(plan.src, img.alt));
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
     5b. LOCATION PHOTO — click-to-zoom
  ══════════════════════════════════════════ */
  const locationPhoto = document.querySelector('.location__photo');
  if (locationPhoto) {
    const img = locationPhoto.querySelector('img');
    if (img) {
      locationPhoto.addEventListener('click', () => openLightbox(img.src, img.alt));
    }
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

    /* Click-to-zoom — build the loopable list once from the DOM */
    const galleryItems = Array.from(track.querySelectorAll('.gallery__item img'));
    const galleryList  = galleryItems.map(img => ({ src: img.currentSrc || img.src, alt: img.alt }));
    galleryItems.forEach((img, i) => {
      img.closest('.gallery__item').addEventListener('click', () => {
        if (dragging) return;
        openLightbox(null, null, galleryList, i);
      });
    });
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
    const FORMINIT_FORM_ID = 'uqyqqq7hqzy'; // 350DIAS contact form
    const forminit = (typeof Forminit !== 'undefined') ? new Forminit() : null;
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn  = form.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled  = true;
      btn.innerHTML = 'Sending… <i data-lucide="loader"></i>';
      if (status) { status.textContent = ''; status.className = 'form__status'; }
      lucide.createIcons();

      if (!forminit) {
        btn.innerHTML = 'Error <i data-lucide="x"></i>';
        if (status) { status.textContent = 'Something went wrong loading the form. Please try again later.'; status.className = 'form__status form__status--error'; }
        lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; lucide.createIcons(); }, 3000);
        return;
      }

      const formData = new FormData(form);
      const { error } = await forminit.submit(FORMINIT_FORM_ID, formData);

      if (error) {
        btn.innerHTML = orig;
        btn.disabled = false;
        if (status) { status.textContent = error.message || 'Something went wrong. Please try again.'; status.className = 'form__status form__status--error'; }
        lucide.createIcons();
        return;
      }

      btn.innerHTML = 'Sent! <i data-lucide="check"></i>';
      if (status) { status.textContent = 'Thanks — we\'ll be in touch shortly.'; status.className = 'form__status form__status--success'; }
      lucide.createIcons();
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; form.reset(); if (status) status.textContent = ''; lucide.createIcons(); }, 3000);
    });
  }

});
