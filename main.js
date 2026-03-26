/**
 * ============================================================
 *  DIAS 350 — Main Application Script
 *  Handles: language switching, rendering all sections,
 *           header scroll behavior, contact form, mobile nav.
 * ============================================================
 */

// Current language state
let currentLang = localStorage.getItem('dias350_lang') || 'en';

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderAll(currentLang);
  initHeader();
  initMobileNav();
  initContactForm();
  initLangButtons();
  setActiveLangButtons(currentLang);
  initHeroSlider();
});

// ── HERO SLIDER ──────────────────────────────────────────────
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000);
}

// ── LANGUAGE SWITCH ──────────────────────────────────────────
function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('dias350_lang', lang);
  renderAll(lang);
  setActiveLangButtons(lang);
}

function setActiveLangButtons(lang) {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langBtn === lang);
  });
}

function initLangButtons() {
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.langBtn));
  });
}

// ── RENDER ALL SECTIONS ───────────────────────────────────────
function renderAll(lang) {
  const c = CONTENT[lang];
  renderNav(c.nav);
  renderHero(c.hero);
  renderAbout(c.about, lang);
  renderLocation(c.location);
  renderGallery(c.gallery, lang);
  renderHighlights(c.highlights);
  renderTeam(c.team, lang);
  renderContact(c.contact);
  renderFooter(c.footer, c.nav);
}

// ── NAV ───────────────────────────────────────────────────────
function renderNav(nav) {
  const links = [
    ['#home',       nav.home],
    ['#project',    nav.project],
    ['#location',   nav.location],
    ['#gallery',    nav.gallery],
    ['#team',       nav.team],
    ['#contact',    nav.contact],
  ];

  // Desktop nav
  const desktopNav = document.getElementById('main-nav');
  if (desktopNav) {
    desktopNav.innerHTML = links
      .map(([href, label]) => `<a href="${href}">${label}</a>`)
      .join('');
  }

  // Mobile nav links
  const mobileNavLinks = document.getElementById('mobile-nav-links');
  if (mobileNavLinks) {
    mobileNavLinks.innerHTML = links
      .map(([href, label]) => `<a href="${href}" class="mobile-close-trigger">${label}</a>`)
      .join('');

    // Reattach close on link click
    mobileNavLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMobileNav);
    });
  }

  // Footer nav
  const footerNav = document.getElementById('footer-nav');
  if (footerNav) {
    footerNav.innerHTML = links
      .map(([href, label]) => `<a href="${href}">${label}</a>`)
      .join('');
  }
}

// ── HERO ─────────────────────────────────────────────────────
function renderHero(hero) {
  setText('hero-headline', hero.headline);
  setText('hero-subtitle', hero.subtitle);
  setText('hero-cta-primary', hero.cta_primary);
  setText('hero-cta-secondary', hero.cta_secondary);
}

// ── ABOUT ────────────────────────────────────────────────────
function renderAbout(about, lang) {
  const projectType = lang === 'en' ? CONFIG.PROJECT_TYPE_EN : CONFIG.PROJECT_TYPE_PT;

  setText('about-section-label', about.section_label);
  setText('about-title', about.title);
  setText('about-description', about.description);
  setText('stat-label-type', about.stats_label_type);
  setText('stat-label-units', about.stats_label_units);
  setText('stat-label-floors', about.stats_label_floors);
  setText('stat-label-mix', about.stats_label_mix);
  setText('stat-label-delivery', about.stats_label_delivery);
  setText('stat-value-type', projectType);
  setText('stat-value-units', CONFIG.NUMBER_OF_UNITS);
  setText('stat-value-floors', CONFIG.FLOORS);
  setText('stat-value-mix', CONFIG.APARTMENT_MIX);
  setText('stat-value-delivery', CONFIG.DELIVERY_DATE);

  const featureGrid = document.getElementById('feature-cards');
  if (featureGrid) {
    featureGrid.innerHTML = about.features
      .map(f => `
        <div class="feature-card">
          <span class="icon">${f.icon}</span>
          <h4>${f.title}</h4>
        </div>
      `).join('');
  }
}

// ── LOCATION ─────────────────────────────────────────────────
function renderLocation(location) {
  setText('location-section-label', location.section_label);
  setText('location-title', location.title);
  setText('location-description', location.description);
  setText('location-address-text', CONFIG.ADDRESS);

  const hList = document.getElementById('location-highlights');
  if (hList) {
    hList.innerHTML = location.highlights
      .map(h => `
        <div class="highlight-item">
          <span class="hi-icon">${h.icon}</span>
          <span>${h.text}</span>
        </div>
      `).join('');
  }

  // Google Maps embed
  const mapEl = document.getElementById('map-container');
  if (mapEl) {
    const url = CONFIG.GOOGLE_MAPS_EMBED_URL;
    // Show placeholder if URL contains 0x0 (default placeholder)
    if (url && !url.includes('0x0%3A0x0')) {
      mapEl.innerHTML = `<iframe src="${url}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="DIAS 350 location map"></iframe>`;
    } else {
      mapEl.innerHTML = `
        <div class="map-placeholder">
          <div class="map-icon">🗺</div>
          <strong>${CONFIG.ADDRESS}</strong>
          <small>Replace GOOGLE_MAPS_EMBED_URL in js/content.js to show the live map</small>
        </div>
      `;
    }
  }
}

// ── GALLERY ──────────────────────────────────────────────────
function renderGallery(gallery, lang) {
  setText('gallery-section-label', gallery.section_label);
  setText('gallery-title', gallery.title);
  setText('gallery-subtitle', gallery.subtitle);

  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  // Exclude images used in the hero slider
  const sliderFiles = ['assets/images/hero.jpg', 'assets/images/existing-building-1.jpg', 'assets/images/neighborhood.jpg'];
  const galleryImages = CONFIG.GALLERY_IMAGES.filter(img => !sliderFiles.includes(img.file));

  grid.innerHTML = galleryImages.map((img) => {
    const caption = lang === 'en' ? img.caption_en : img.caption_pt;
    const filename = img.file.split('/').pop();
    return `
      <div class="gallery-item">
        <img
          src="${img.file}"
          alt="${caption}"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="gallery-placeholder" style="display:none;">
          <div class="ph-icon">🏛</div>
          <div class="ph-name">${filename}</div>
        </div>
        <div class="gallery-caption">${caption}</div>
      </div>
    `;
  }).join('');
}

// ── HIGHLIGHTS ───────────────────────────────────────────────
function renderHighlights(highlights) {
  setText('highlights-section-label', highlights.section_label);
  setText('highlights-title', highlights.title);

  const grid = document.getElementById('highlights-grid');
  if (!grid) return;

  grid.innerHTML = highlights.cards.map(card => `
    <div class="highlight-card">
      <span class="hc-icon">${card.icon}</span>
      <h3 class="hc-title">${card.title}</h3>
      <p class="hc-text">${card.text}</p>
    </div>
  `).join('');
}

// ── TEAM ─────────────────────────────────────────────────────
function renderTeam(team, lang) {
  setText('team-section-label', team.section_label);
  setText('team-title', team.title);

  const grid = document.getElementById('team-grid');
  if (!grid) return;

  grid.innerHTML = CONFIG.TEAM_MEMBERS.map(member => {
    const role = lang === 'en' ? member.role_en : member.role_pt;
    const bio  = lang === 'en' ? member.bio_en  : member.bio_pt;
    return `
      <div class="team-card">
        <div class="team-photo">
          <img
            src="${member.photo}"
            alt="${member.name}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="team-photo-placeholder" style="display:none;">👤</div>
        </div>
        <h3 class="team-name">${member.name}</h3>
        <div class="team-role">${role}</div>
        <p class="team-bio">${bio}</p>
      </div>
    `;
  }).join('');
}

// ── CONTACT ──────────────────────────────────────────────────
function renderContact(contact) {
  setText('contact-section-label', contact.section_label);
  setText('contact-title', contact.title);
  setText('contact-description', contact.description);
  setText('contact-disclaimer', contact.disclaimer);

  // Labels
  setText('label-name', contact.form.name);
  setText('label-email', contact.form.email);
  setText('label-phone', contact.form.phone);
  setText('label-message', contact.form.message);

  const submitBtn = document.getElementById('form-submit');
  if (submitBtn) submitBtn.textContent = contact.form.submit;

  // Store messages for form use
  const form = document.getElementById('contact-form');
  if (form) {
    form.dataset.msgSuccess = contact.form.success;
    form.dataset.msgError = contact.form.error;
  }

  // Contact details
  setText('contact-email', CONFIG.CONTACT_EMAIL);
  const emailLink = document.getElementById('contact-email');
  if (emailLink) emailLink.href = `mailto:${CONFIG.CONTACT_EMAIL}`;

  setText('contact-phone', CONFIG.CONTACT_PHONE);
  const phoneLink = document.getElementById('contact-phone');
  if (phoneLink) phoneLink.href = `tel:${CONFIG.CONTACT_PHONE.replace(/\s/g,'')}`;

  setText('contact-whatsapp', CONFIG.CONTACT_PHONE);
  const waLink = document.getElementById('contact-whatsapp');
  if (waLink) waLink.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
}

// ── FOOTER ───────────────────────────────────────────────────
function renderFooter(footer, nav) {
  setText('footer-tagline', footer.tagline);
  setText('footer-disclaimer', footer.disclaimer);
  setText('footer-copyright', footer.copyright);
}

// ── CONTACT FORM ─────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msgEl = document.getElementById('form-message');

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      msgEl.className = 'form-message error';
      msgEl.textContent = form.dataset.msgError || 'Please fill in all required fields.';
      return;
    }

    // ── HOW TO CONNECT TO FORMSPREE ───────────────────────────
    // 1. Go to https://formspree.io and create a free account
    // 2. Create a new form and get your form endpoint URL
    // 3. Replace the mock below with a real fetch:
    //
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    //   body: JSON.stringify({ name, email, phone, message })
    // })
    // .then(res => res.ok ? showSuccess() : showError())
    // .catch(() => showError());
    // ──────────────────────────────────────────────────────────

    // Mock success for now
    msgEl.className = 'form-message success';
    msgEl.textContent = form.dataset.msgSuccess || 'Thank you. We will be in touch shortly.';
    form.reset();
  });
}

// ── HEADER SCROLL ────────────────────────────────────────────
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── MOBILE NAV ───────────────────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (toggle) toggle.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
}

function closeMobileNav() {
  const overlay = document.getElementById('mobile-nav');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── UTIL ─────────────────────────────────────────────────────
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
