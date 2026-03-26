/**
 * main.js — 350DIAS
 *
 * Handles:
 *  1. Navigation — scroll state + mobile drawer
 *  2. Language toggle (EN / PT)
 *  3. Parallax scroll effect on hero & about image
 *  4. Apartments tabs section
 *  5. Gallery horizontal scroll — arrows + drag/touch
 *  6. Scroll reveal animations
 *  7. Contact form (client-side only; wire to backend as needed)
 *  8. Lucide icon hydration
 */

/* ─── WAIT FOR DOM ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Lucide icons (must run first) ──────────────────────── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ── Current language ────────────────────────────────────── */
  let currentLang = 'en';

  /* ═══════════════════════════════════════════════
     1. NAVIGATION
  ═══════════════════════════════════════════════ */
  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('navBurger');
  const drawer   = document.getElementById('navDrawer');
  let drawerOpen = false;

  /* Scroll → add .scrolled class */
  function onNavScroll() {
    const past = window.scrollY > 60;
    nav.classList.toggle('scrolled', past);
  }
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll(); // run once on load

  /* Burger → toggle drawer */
  burger.addEventListener('click', () => {
    drawerOpen = !drawerOpen;
    drawer.classList.toggle('open', drawerOpen);
    burger.setAttribute('aria-expanded', drawerOpen);
    drawer.setAttribute('aria-hidden', !drawerOpen);

    // Swap icon between menu and X
    burger.querySelector('svg')?.remove();
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', drawerOpen ? 'x' : 'menu');
    burger.appendChild(icon);
    lucide.createIcons();
  });

  /* Close drawer when a link is clicked */
  drawer.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      drawerOpen = false;
      drawer.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });

  /* ═══════════════════════════════════════════════
     2. LANGUAGE TOGGLE
  ═══════════════════════════════════════════════ */
  const langBtns = document.querySelectorAll('.lang-btn');

  /**
   * Very simple i18n: maps data-i18n attributes to CONTENT object paths.
   * CONTENT lives in content.js.
   */
  const I18N_MAP = {
    'nav.about':        { en: 'About',            pt: 'Sobre' },
    'nav.apartments':   { en: 'Apartments',        pt: 'Frações' },
    'nav.gallery':      { en: 'Gallery',           pt: 'Galeria' },
    'nav.location':     { en: 'Location',          pt: 'Localização' },
    'nav.contact':      { en: 'Contact',           pt: 'Contacto' },
    'hero.heading':     { en: 'A new residential\nvision in Porto',
                          pt: 'Uma nova visão\nresidencial no Porto' },
    'hero.subheading':  { en: 'Where architecture meets the rhythm of the city.',
                          pt: 'Onde a arquitetura encontra o ritmo da cidade.' },
    'hero.cta.primary': { en: 'Request Details',   pt: 'Solicitar Informações' },
    'hero.cta.secondary':{ en: 'View Location',    pt: 'Ver Localização' },
    'about.heading':    { en: 'Living in harmony with the beauty of details',
                          pt: 'Viver em harmonia com a beleza dos detalhes' },
    'about.body':       { en: '350DIAS is the new residential landmark at Rua de Dias 350, Porto.',
                          pt: 'O 350DIAS é o novo marco residencial na Rua de Dias 350, Porto.' },
    'apartments.heading':{ en: 'Find your ideal apartment', pt: 'Encontre o seu apartamento ideal' },
    'gallery.label':    { en: 'Gallery',           pt: 'Galeria' },
    'gallery.heading':  { en: 'The perfect balance between comfort and privacy',
                          pt: 'O equilíbrio perfeito entre conforto e privacidade' },
    'gallery.drag':     { en: 'Drag to explore',   pt: 'Arraste para explorar' },
    'location.heading': { en: 'At the heart of Porto', pt: 'No coração do Porto' },
    'location.address': { en: 'Rua de Dias 350, Porto, Portugal',
                          pt: 'Rua de Dias 350, Porto, Portugal' },
    'location.highlight1': { en: 'City centre 5 min',   pt: 'Centro 5 min' },
    'location.highlight2': { en: 'Parks nearby',         pt: 'Parques próximos' },
    'location.highlight3': { en: 'Metro access',         pt: 'Acesso ao Metro' },
    'location.highlight4': { en: 'Restaurants & culture', pt: 'Restaurantes & cultura' },
    'contact.heading':  { en: 'Request more information', pt: 'Solicitar mais informações' },
    'contact.subheading':{ en: 'Our team will get back to you shortly.',
                           pt: 'A nossa equipa entrará em contacto brevemente.' },
    'cta.moreInfo':     { en: 'More information',  pt: 'Mais informações' },
    'cta.requestInfo':  { en: 'Request information', pt: 'Solicitar informações' },
    'form.name':        { en: 'Full name',         pt: 'Nome completo' },
    'form.email':       { en: 'Email',             pt: 'Email' },
    'form.phone':       { en: 'Phone',             pt: 'Telefone' },
    'form.message':     { en: 'Message',           pt: 'Mensagem' },
    'form.submit':      { en: 'Send message',      pt: 'Enviar mensagem' },
    'form.privacy':     { en: 'By submitting you agree to our privacy policy.',
                          pt: 'Ao enviar concorda com a nossa política de privacidade.' },
    'footer.copy':      { en: '© 2025 350DIAS. All rights reserved.',
                          pt: '© 2025 350DIAS. Todos os direitos reservados.' },
    'footer.privacy':   { en: 'Privacy Policy',    pt: 'Política de Privacidade' },
    'stats.floors':     { en: 'Floors',            pt: 'Pisos' },
    'stats.apartments': { en: 'Apartments',        pt: 'Apartamentos' },
    'stats.typologies': { en: 'Typologies',        pt: 'Tipologias' },
    'stats.completion': { en: 'Completion',        pt: 'Conclusão' },
  };

  function applyLanguage(lang) {
    currentLang = lang;

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const map = I18N_MAP[key];
      if (!map) return;
      const text = map[lang] || map['en'];
      // Preserve child icons — only update text nodes
      if (el.querySelector('i, svg')) {
        // Update last text node if present, otherwise use textContent trick
        const nodes = [...el.childNodes].filter(n => n.nodeType === 3);
        if (nodes.length) {
          nodes[nodes.length - 1].textContent = text;
        } else {
          // Append text after icons
          el.appendChild(document.createTextNode(text));
        }
      } else {
        el.textContent = text;
      }
    });

    // Update tab labels from CONTENT
    updateApartmentTabs(lang);

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Mark active button
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  /* ═══════════════════════════════════════════════
     3. PARALLAX
  ═══════════════════════════════════════════════ */

  /**
   * Uses translateY on .parallax-layer elements.
   * data-parallax-speed: 0 = no movement, 1 = full movement (same as scroll)
   * Default: 0.4 (moves 40% as fast as scroll — appears slower = depth)
   */
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxLayers.forEach(layer => {
      const speed    = parseFloat(layer.dataset.parallaxSpeed ?? 0.4);
      const rect     = layer.closest('.parallax-section, .hero')?.getBoundingClientRect()
                     ?? layer.getBoundingClientRect();
      const vh       = window.innerHeight;

      // Only process visible sections
      if (rect.bottom < 0 || rect.top > vh) return;

      // Offset relative to section's position in viewport
      const sectionTop  = rect.top + scrollY;
      const scrollOffset = scrollY - sectionTop;
      const translate    = scrollOffset * speed;

      layer.style.transform = `translateY(${translate}px)`;
    });
  }

  // Throttle with requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Disable parallax on mobile for performance
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    updateParallax();
  }

  /* ═══════════════════════════════════════════════
     4. APARTMENT TABS
  ═══════════════════════════════════════════════ */
  const aptTabs     = document.querySelectorAll('.apt-tab');
  const aptFloorPlan = document.getElementById('aptFloorPlan');
  const aptName      = document.getElementById('aptName');
  const aptArea      = document.getElementById('aptArea');
  const aptBedrooms  = document.getElementById('aptBedrooms');
  const aptBathrooms = document.getElementById('aptBathrooms');
  const aptBalcony   = document.getElementById('aptBalcony');
  const aptGarage    = document.getElementById('aptGarage');
  const aptPrice     = document.getElementById('aptPrice');
  const aptPanel     = document.getElementById('aptPanel');

  /**
   * Update tab labels from CONTENT.apartments (content.js)
   * and populate initial state.
   */
  function updateApartmentTabs(lang) {
    if (typeof CONTENT === 'undefined') return;

    aptTabs.forEach((tab, i) => {
      const apt = CONTENT.apartments[i];
      if (!apt) return;
      tab.textContent = apt.label[lang] || apt.label['en'];
    });

    // Re-render active apartment in current language
    const activeTab = document.querySelector('.apt-tab.active');
    if (activeTab) {
      const aptId = activeTab.dataset.apt;
      renderApartment(aptId, lang);
    }
  }

  function renderApartment(aptId, lang) {
    if (typeof CONTENT === 'undefined') return;

    const apt = CONTENT.apartments.find(a => a.id === aptId);
    if (!apt) return;

    const d = apt.details[lang] || apt.details['en'];

    // Floor plan with loading fade
    if (aptFloorPlan && apt.floorPlan) {
      aptPanel.classList.add('loading');
      aptFloorPlan.onload = () => {
        aptPanel.classList.remove('loading');
        lucide.createIcons(); // refresh icons after DOM update
      };
      aptFloorPlan.src = apt.floorPlan;
      aptFloorPlan.alt = d.name;
    }

    // Details
    if (aptName)      aptName.textContent      = d.name      || '';
    if (aptArea)      aptArea.textContent      = d.area      || '';
    if (aptBedrooms)  aptBedrooms.textContent  = d.bedrooms  || '';
    if (aptBathrooms) aptBathrooms.textContent = d.bathrooms || '';
    if (aptBalcony)   aptBalcony.textContent   = d.balcony   || '';
    if (aptGarage)    aptGarage.textContent    = d.garage    || '';
    if (aptPrice)     aptPrice.textContent     = d.price     || '';

    // Trigger re-animation of panel
    aptPanel.style.animation = 'none';
    // Force reflow
    void aptPanel.offsetWidth;
    aptPanel.style.animation = '';
  }

  // Tab click handler
  aptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active state
      aptTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Render content
      renderApartment(tab.dataset.apt, currentLang);
    });
  });

  // Initial render
  updateApartmentTabs(currentLang);

  /* ═══════════════════════════════════════════════
     5. GALLERY — horizontal scroll + drag + arrows
  ═══════════════════════════════════════════════ */
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrev  = document.getElementById('galleryPrev');
  const galleryNext  = document.getElementById('galleryNext');

  if (galleryTrack) {
    // Arrow scroll — move by one item width
    const scrollAmount = () =>
      galleryTrack.querySelector('.gallery__item')?.offsetWidth + 20 || 320;

    galleryNext?.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
    galleryPrev?.addEventListener('click', () => {
      galleryTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    /* ── Drag-to-scroll ────────────────────────────────────── */
    let isDragging   = false;
    let startX       = 0;
    let scrollLeft   = 0;
    const DRAG_THRESHOLD = 5; // px before we start dragging

    galleryTrack.addEventListener('mousedown', e => {
      isDragging  = false;
      startX      = e.pageX - galleryTrack.offsetLeft;
      scrollLeft  = galleryTrack.scrollLeft;
      galleryTrack.style.scrollSnapType = 'none'; // disable snap while dragging
    });

    galleryTrack.addEventListener('mousemove', e => {
      if (!(e.buttons & 1)) return; // left button not held
      const x    = e.pageX - galleryTrack.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > DRAG_THRESHOLD) {
        isDragging = true;
        galleryTrack.scrollLeft = scrollLeft - walk;
        e.preventDefault();
      }
    });

    galleryTrack.addEventListener('mouseup', () => {
      galleryTrack.style.scrollSnapType = '';
    });

    // Prevent click events on images after drag
    galleryTrack.addEventListener('click', e => {
      if (isDragging) e.stopPropagation();
      isDragging = false;
    });

    /* ── Touch support ─────────────────────────────────────── */
    let touchStartX   = 0;
    let touchScrollLeft = 0;

    galleryTrack.addEventListener('touchstart', e => {
      touchStartX    = e.touches[0].pageX;
      touchScrollLeft = galleryTrack.scrollLeft;
    }, { passive: true });

    galleryTrack.addEventListener('touchmove', e => {
      const x    = e.touches[0].pageX;
      const walk = x - touchStartX;
      galleryTrack.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════
     6. SCROLL REVEAL
  ═══════════════════════════════════════════════ */

  // Add .reveal class to key sections
  const revealTargets = [
    '.stats__grid .stat',
    '.about__text',
    '.about__image-wrap',
    '.section-header',
    '.apt-tabs',
    '.apt-panel',
    '.location__map',
    '.location__highlights',
    '.contact__info',
    '.contact__form-wrap',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
      if (i === 3) el.classList.add('reveal-delay-3');
    });
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ═══════════════════════════════════════════════
     7. CONTACT FORM (client-side only)
  ═══════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const orig      = submitBtn.innerHTML;

      // Visual feedback
      submitBtn.innerHTML = currentLang === 'pt'
        ? 'A enviar… <i data-lucide="loader"></i>'
        : 'Sending… <i data-lucide="loader"></i>';
      submitBtn.disabled = true;
      lucide.createIcons();

      // Simulate async (replace with real fetch to your backend/Formspree/etc.)
      setTimeout(() => {
        submitBtn.innerHTML = currentLang === 'pt'
          ? 'Enviado! <i data-lucide="check"></i>'
          : 'Sent! <i data-lucide="check"></i>';
        lucide.createIcons();

        setTimeout(() => {
          submitBtn.innerHTML = orig;
          submitBtn.disabled  = false;
          contactForm.reset();
          lucide.createIcons();
        }, 3000);
      }, 1400);
    });
  }

  /* ═══════════════════════════════════════════════
     DONE — initial language pass
  ═══════════════════════════════════════════════ */
  applyLanguage('en');

});
