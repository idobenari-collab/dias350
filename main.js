document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  var currentLang = 'en';
  var activeUnitId = null;

  // NAV
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var drawer = document.getElementById('navDrawer');
  var menuOpen = false;

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
  nav.classList.toggle('scrolled', window.scrollY > 60);

  burger.addEventListener('click', function() {
    menuOpen = !menuOpen;
    drawer.classList.toggle('open', menuOpen);
    burger.innerHTML = menuOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  document.querySelectorAll('.drawer-link').forEach(function(l) {
    l.addEventListener('click', function() {
      menuOpen = false;
      drawer.classList.remove('open');
      burger.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  // LANGUAGE
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      currentLang = btn.dataset.lang;
      document.querySelectorAl
cat > ~/Projects/dias350/main.js << 'EOF'
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') lucide.createIcons();

  var currentLang = 'en';
  var activeUnitId = null;

  // NAV
  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var drawer = document.getElementById('navDrawer');
  var menuOpen = false;

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
  nav.classList.toggle('scrolled', window.scrollY > 60);

  burger.addEventListener('click', function() {
    menuOpen = !menuOpen;
    drawer.classList.toggle('open', menuOpen);
    burger.innerHTML = menuOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });

  document.querySelectorAll('.drawer-link').forEach(function(l) {
    l.addEventListener('click', function() {
      menuOpen = false;
      drawer.classList.remove('open');
      burger.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    });
  });

  // LANGUAGE
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      currentLang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(function(b) {
        b.classList.toggle('active', b.dataset.lang === currentLang);
      });
      buildTabs();
      if (activeUnitId) renderUnit(activeUnitId);
    });
  });

  // HERO SLIDESHOW
  var slides = document.querySelectorAll('.hero__slide');
  var slideIndex = 0;
  if (slides.length > 1) {
    setInterval(function() {
      slides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
    }, 5000);
  }

  // PARALLAX
  var layers = document.querySelectorAll('.parallax-layer');
  var raf = false;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function() {
      if (!raf) {
        raf = true;
        requestAnimationFrame(function() {
          var sy = window.scrollY;
          layers.forEach(function(layer) {
            var speed = parseFloat(layer.dataset.parallaxSpeed || 0.25);
            var parent = layer.closest('.parallax-section');
            if (!parent) return;
            var rect = parent.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            layer.style.transform = 'translateY(' + ((sy - (rect.top + sy)) * speed) + 'px)';
          });
          raf = false;
        });
      }
    }, { passive: true });
  }

  // UNIT TABS
  var aptTabsEl  = document.getElementById('aptTabs');
  var aptImage   = document.getElementById('aptImage');
  var aptName    = document.getElementById('aptName');
  var aptStatus  = document.getElementById('aptStatus');
  var aptTypo    = document.getElementById('aptTypology');
  var aptArea    = document.getElementById('aptArea');
  var aptBalcony = document.getElementById('aptBalcony');
  var aptTerrace = document.getElementById('aptTerrace');
  var aptStorage = document.getElementById('aptStorage');
  var aptGarden  = document.getElementById('aptGarden');
  var aptPanel   = document.getElementById('aptPanel');

  function buildTabs() {
    if (!aptTabsEl || typeof CONTENT === 'undefined') return;
    aptTabsEl.innerHTML = '';
    CONTENT.units.forEach(function(unit) {
      var btn = document.createElement('button');
      btn.className = 'apt-tab' + (unit.id === activeUnitId ? ' active' : '');
      btn.dataset.id = unit.id;
      btn.setAttribute('role', 'tab');
      btn.textContent = unit.label[currentLang] || unit.label['en'];
      btn.addEventListener('click', function() {
        activeUnitId = unit.id;
        document.querySelectorAll('.apt-tab').forEach(function(t) {
          t.classList.toggle('active', t.dataset.id === activeUnitId);
        });
        renderUnit(activeUnitId);
      });
      aptTabsEl.appendChild(btn);
    });
    lucide.createIcons();
  }

  function renderUnit(unitId) {
    if (typeof CONTENT === 'undefined' || !unitId) return;
    var unit = CONTENT.units.find(function(u) { return u.id === unitId; });
    if (!unit) return;
    var d = unit.details[currentLang] || unit.details['en'];
    if (aptImage)   { aptImage.src = unit.image; aptImage.alt = d.name; }
    if (aptName)    aptName.textContent = d.name;
    if (aptStatus)  {
      var sold = unit.status === 'sold';
      aptStatus.textContent = sold ? 'Sold' : 'Available';
      aptStatus.className = 'apt-status apt-status--' + (sold ? 'sold' : 'available');
    }
    if (aptTypo)    aptTypo.textContent    = d.typology || '-';
    if (aptArea)    aptArea.textContent    = d.area     || '-';
    if (aptBalcony) aptBalcony.textContent = d.balcony  || '-';
    if (aptTerrace) aptTerrace.textContent = d.terrace  || '-';
    if (aptStorage) aptStorage.textContent = d.storage  || '-';
    if (aptGarden)  aptGarden.textContent  = d.garden   || '-';
    if (aptPanel)   {
      aptPanel.style.animation = 'none';
      void aptPanel.offsetWidth;
      aptPanel.style.animation = '';
    }
    lucide.createIcons();
  }

  if (typeof CONTENT !== 'undefined' && CONTENT.units.length) {
    activeUnitId = CONTENT.units[0].id;
    buildTabs();
    renderUnit(activeUnitId);
  }

  // GALLERY
  var track = document.getElementById('galleryTrack');
  var prev  = document.getElementById('galleryPrev');
  var next  = document.getElementById('galleryNext');
  if (track) {
    function step() { return (track.querySelector('.gallery__item') ? track.querySelector('.gallery__item').offsetWidth : 320) + 16; }
    if (prev) prev.addEventListener('click', function() { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function() { track.scrollBy({ left:  step(), behavior: 'smooth' }); });
    var dragging = false, startX = 0, startScroll = 0;
    track.addEventListener('mousedown', function(e) { dragging = false; startX = e.pageX; startScroll = track.scrollLeft; track.style.scrollSnapType = 'none'; });
    track.addEventListener('mousemove', function(e) { if (!(e.buttons & 1)) return; var d = e.pageX - startX; if (Math.abs(d) > 4) { dragging = true; track.scrollLeft = startScroll - d; } });
    track.addEventListener('mouseup', function() { track.style.scrollSnapType = ''; });
    track.addEventListener('click', function(e) { if (dragging) e.stopPropagation(); dragging = false; });
    var tx = 0, ts = 0;
    track.addEventListener('touchstart', function(e) { tx = e.touches[0].pageX; ts = track.scrollLeft; }, { passive: true });
    track.addEventListener('touchmove',  function(e) { track.scrollLeft = ts - (e.touches[0].pageX - tx); }, { passive: true });
  }

  // SCROLL REVEAL
  var revealEls = document.querySelectorAll('.section-header, .about__text, .about__image-wrap, .apt-panel, .location__map, .location__highlights, .contact__info, .contact__form-wrap');
  revealEls.forEach(function(el) { el.classList.add('reveal'); });
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

  // FORM
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var orig = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(function() {
        btn.textContent = 'Sent!';
        setTimeout(function() { btn.innerHTML = orig; btn.disabled = false; form.reset(); lucide.createIcons(); }, 3000);
      }, 1400);
    });
  }
});
