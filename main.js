/**
 * main.js — 350DIAS
 *
 * Handles:
 *  1. Navigation — scroll state + mobile drawer
 *  2. Language toggle (EN / PT)
 *  3. Parallax scroll effect on hero & about image
 *  4. Apartments tabs section (6 units)
 *  5. Gallery horizontal scroll — arrows + drag/touch
 *  6. Scroll reveal animations
 *  7. Contact form (client-side only)
 *  8. Lucide icon hydration
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lucide icons ────────────────────────────────────────── */
  if (typeof lucide !== 'undefined') lucide.createIcons();

  let currentLang = 'en';

  /* ═══════════════════════════════════════════════
     1. NAVIGATION
  ═══════════════════════════════════════════════ */
  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('navBurger');
  const drawer   = document.getElementById('navDrawer');
  let drawerOpen = false;

  function onNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  burger.addEventListener('click', () => {
    drawerOpen = !drawerOpen;
    drawer.classList.toggle('open', drawerOpen);
    burger.setAttribute('aria-expanded', drawerOpen);
    drawer.setAttribute('aria-hidden', !drawerOpen);
    burger.querySelector('svg')?.remove();
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', drawerOpen ? 'x' : 'menu');
    burger.appendChild(icon);
    lucide.createIcons();
  });

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

  const I18N_MAP = {
    'nav.about':         { en: 'About',            pt: 'Sobre' },
    'nav.apartments':    { en: 'Apartments',        pt: 'Frações' },
    'nav.gallery':       { en: 'Gallery',           pt: 'Galeria' },
    'nav.location':      { en: 'Location',          pt: 'Localização' },
    'nav.contact':       { en: 'Contact',           pt: 'Contacto' },
    'hero.heading':      { en: 'A new residential\nvision in Porto',
                           pt: 'Uma nova visão\nresidencial no Porto' },
    'hero.subheading':   { en: 'Where architecture meets the rhythm of the city.',
                           pt: 'Onde a arquitetura encontra o ritmo da cidade.' },
    'hero.cta.primary':  { en: 'Request Details',   pt: 'Solicitar Informações' },
    'hero.cta.secondary':{ en: 'View Location',     pt: 'Ver Localização' },
    'about.heading':     { en: 'Living in harmony with the beauty of details',
                           pt: 'Viver em harmonia com a beleza dos detalhes' },
    'apartments.heading':{ en: 'Find your ideal apartment', pt: 'Encontre o seu apartamento ideal' },
    'gallery.label':     { en: 'Gallery',           pt: 'Galeria' },
    'gallery.heading':   { en: 'The perfect balance between comfort and privacy',
                           pt: 'O equilíbrio perfeito entre conforto e privacidade' },
    'gallery.drag':      { en: 'Drag to explore',   pt: 'Arraste para explorar' },
    'location.heading':  { en: 'At the heart of Porto', pt: 'No coração do Porto' },
    'location.address':  { en: 'R. Carlos Malheiro Dias 350, 4200-154 Porto, Portugal',
                           pt: 'R. Carlos Malheiro Dias 350, 4200-154 Porto, Portugal' },
    'location.highlight1': { en: 'City centre 5 min',    pt: 'Centro 5 min' },
    'location.highlight2': { en: 'Parks nearby',          pt: 'Parques próximos' },
    'location.highlight3': { en: 'Metro access',          pt: 'Acesso ao Metro' },
    'location.highlight4': { en: 'Restaurants & culture', pt: 'Restaurantes & cultura' },
    'contact.heading':   { en: 'Request more information', pt: 'Solicitar mais informações' },
    'contact.subheading':{ en: 'Our team will get back to you shortly.',
                           pt: 'A nossa equipa entrará em contacto brevemente.' },
    'cta.moreInfo':      { en: 'More information',  pt: 'Mais informações' },
    'cta.requestInfo':   { en: 'Request information', pt: 'Solicitar informações' },
    'form.name':         { en: 'Full name',         pt: 'Nome completo' },
    'form.email':        { en: 'Email',             pt: 'Email' },
    'form.phone':        { en: 'Phone',             pt: 'Telefone' },
    'form.message':      { en: 'Message',           pt: 'Mensagem' },
    'form.submit':       { en: 'Send message',      pt: 'Enviar mensagem' },
    'form.privacy':      { en: 'By submitting you agree to our privacy policy.',
                           pt: 'Ao enviar concorda com a nossa política de privacidade.' },
    'footer.copy':       { en: '© 2025 350DIAS. All rights reserved.',
                           pt: '© 2025 350DIAS. Todos os direitos reservados.' },
    'footer.privacy':    { en: 'Privacy Policy',    pt: 'Política de Privacidade' },
    'stats.floors':      { en: 'Floors',            pt: 'Pisos' },
    'stats.apartments':  { en: 'Apartments',        pt: 'Apartamentos' },
    'stats.typologies':  { en: 'Typologies',        pt: 'Tipologias' },
    'stats.completion':  { en: 'Completion',        pt: 'Conclusão' },
  };

  function applyLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.getAttribute('data-i18n');
      const map  = I18N_MAP[key];
      if (!map) return;
      const text = map[lang] || map['en'];

      if (el.querySelector('i, svg')) {
        const nodes = [...el.childNodes].filter(n => n.nodeType === 3);
        if (nodes.length) nodes[nodes.length - 1].textContent = text;
        else el.appendChild(document.createTextNode(text));
      } else {
        el.textContent = text;
      }
    });

    updateApartmentTabs(lang);
    document.documentElement.lang = lang;
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  }

  langBtns.forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));

  /* ═══════════════════════════════════════════════
     3. PARALLAX
  ═══════════════════════════════════════════════ */
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed   = parseFloat(layer.dataset.parallaxSpeed ?? 0.4);
      const parent  = layer.closest('.parallax-section, .hero');
      const rect    = (parent ?? layer).getBoundingClientRect();
      const vh      = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const sectionTop   = rect.top + scrollY;
      const scrollOffset = scrollY - sectionTop;
      layer.style.transform = `translateY(${scrollOffset * speed}px)`;
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateParallax(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) updateParallax();

  /* ═══════════════════════════════════════════════
     4. APARTMENT TABS
  ═══════════════════════════════════════════════ */
  const aptTabs      = document.querySelectorAll('.apt-tab');
  const aptFloorPlan = document.getElementById('aptFloorPlan');
  const aptName      = document.getElementById('aptName');
  const aptTypology  = document.getElementById('aptTypology');
  const aptArea      = document.getElementById('aptArea');
  const aptBalcony   = document.getElementById('aptBalcony');
  const aptTerrace   = document.getElementById('aptTerrace');
  const aptStorage   = document.getElementById('aptStorage');
  const aptGarden    = document.getElementById('aptGarden');
  const aptPanel     = document.getElementById('aptPanel');

  function updateApartmentTabs(lang) {
    if (typeof CONTENT === 'undefined') return;

    aptTabs.forEach(tab => {
      const apt = CONTENT.apartments.find(a => a.id === tab.dataset.apt);
      if (apt) tab.textContent = apt.label[lang] || apt.label['en'];
    });

    const activeTab = document.querySelector('.apt-tab.active');
    if (activeTab) renderApartment(activeTab.dataset.apt, lang);
  }

  function renderApartment(aptId, lang) {
    if (typeof CONTENT === 'undefined') return;
    const apt = CONTENT.apartments.find(a => a.id === aptId);
    if (!apt) return;

    const d = apt.details[lang] || apt.details['en'];

    if (aptFloorPlan && apt.floorPlan) {
      aptFloorPlan.onload = () => lucide.createIcons();
      aptFloorPlan.src    = apt.floorPlan;
      aptFloorPlan.alt    = d.name;
    }

    if (aptName)     aptName.textContent     = d.name      || '';
    if (aptTypology) aptTypology.textContent = d.typology  || '';
    if (aptArea)     aptArea.textContent     = d.area      || '';
    if (aptBalcony)  aptBalcony.textContent  = d.balcony   || '—';
    if (aptTerrace)  aptTerrace.textContent  = d.terrace   || '—';
    if (aptStorage)  aptStorage.textContent  = d.storage   || '—';
    if (aptGarden)   aptGarden.textContent   = d.garden    || '—';

    // Re-trigger panel animation
    aptPanel.style.animation = 'none';
    void aptPanel.offsetWidth;
    aptPanel.style.animation = '';
  }

  aptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      aptTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderApartment(tab.dataset.apt, currentLang);
    });
  });

  updateApartmentTabs(currentLang);

  /* ═══════════════════════════════════════════════
     5. GALLERY — horizontal scroll + drag + arrows
  ═══════════════════════════════════════════════ */
  const galleryTrack = document.getElementById('galleryTrack');
  const galleryPrev  = document.getElementById('galleryPrev');
  const galleryNext  = document.getElementById('galleryNext');

  if (galleryTrack) {
    const scrollAmount = () =>
      (galleryTrack.querySelector('.gallery__item')?.offsetWidth || 320) + 20;

    galleryNext?.addEventListener('click', () => galleryTrack.scrollBy({ left:  scrollAmount(), behavior: 'smooth' }));
    galleryPrev?.addEventListener('click', () => galleryTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));

    /* Drag-to-scroll */
    let isDragging = false, startX = 0, scrollLeft = 0;

    galleryTrack.addEventListener('mousedown', e => {
      isDragging = false;
      startX     = e.pageX - galleryTrack.offsetLeft;
      scrollLeft = galleryTrack.scrollLeft;
      galleryTrack.style.scrollSnapType = 'none';
    });

    galleryTrack.addEventListener('mousemove', e => {
      if (!(e.buttons & 1)) return;
      const walk = (e.pageX - galleryTrack.offsetLeft) - startX;
      if (Math.abs(walk) > 5) {
        isDragging = true;
        galleryTrack.scrollLeft = scrollLeft - walk;
        e.preventDefault();
      }
    });

    galleryTrack.addEventListener('mouseup',    () => { galleryTrack.style.scrollSnapType = ''; });
    galleryTrack.addEventListener('click',      e  => { if (isDragging) e.stopPropagation(); isDragging = false; });

    /* Touch */
    let touchStartX = 0, touchScrollLeft = 0;
    galleryTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].pageX; touchScrollLeft = galleryTrack.scrollLeft; }, { passive: true });
    galleryTrack.addEventListener('touchmove',  e => { galleryTrack.scrollLeft = touchScrollLeft - (e.touches[0].pageX - touchStartX); }, { passive: true });
  }

  /* ═══════════════════════════════════════════════
     6. SCROLL REVEAL
  ═══════════════════════════════════════════════ */
  const revealSelectors = [
    '.stats__grid .stat', '.about__text', '.about__image-wrap',
    '.section-header', '.apt-tabs', '.apt-panel',
    '.location__map', '.location__highlights',
    '.contact__info', '.contact__form-wrap',
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ═══════════════════════════════════════════════
     7. CONTACT FORM
  ═══════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = contactForm.querySelector('[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = currentLang === 'pt' ? 'A enviar… <i data-lucide="loader"></i>' : 'Sending… <i data-lucide="loader"></i>';
      btn.disabled  = true;
      lucide.createIcons();
      setTimeout(() => {
        btn.innerHTML = currentLang === 'pt' ? 'Enviado! <i data-lucide="check"></i>' : 'Sent! <i data-lucide="check"></i>';
        lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; contactForm.reset(); lucide.createIcons(); }, 3000);
      }, 1400);
    });
  }

  /* ── Initial render ──────────────────────────────────────── */
  applyLanguage('en');

});
