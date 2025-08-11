// js/main.js
// Унифицированный скрипт для index.html: перевод, карусель, lazy-load, моб.меню, аккордеон, a11y.

// -------------------- TRANSLATIONS --------------------
const TRANSLATIONS = {
  ru: {
    brandName: "Эрготерм",
    brandTag: "Производство твердотопливных котлов — Брест",
    navHome: "Главная",
    navProducts: "Продукция ▾",
    prodSolid: "Твердотопливные котлы",
    prodPellet: "Пеллетные решения",
    prodService: "Монтаж и сервис",
    navAbout: "О компании",
    navContact: "Контакты",
    ctaContact: "Связаться",
    heroEyebrow1: "Промышленное производство",
    heroTitle1: "Твердотопливные котлы Эрготерм — надежно и экономично",
    heroText1: "Производство в Бресте. Модели для дома и промышленности: длительного горения, пеллетные и комбинированные.",
    heroCta1: "Каталог",
    heroEyebrow2: "Гарантия и сервис",
    heroTitle2: "Сертифицированные материалы и сервис в регионе",
    heroText2: "Гарантийная поддержка, обучение персонала и запасные части в наличии.",
    heroCta2: "Связаться",
    heroEyebrow3: "Энергоэффективность",
    heroTitle3: "Решения для оптимизации расхода топлива",
    heroText3: "Модели длительного горения и автоматические пеллетные решения с высоким КПД.",
    heroCta3: "Подробнее",
    prodHeading: "Продукция",
    card1Title: "Котлы длительного горения",
    card1Text: "Модели от 20 до 500 кВт. Надёжность и простота обслуживания.",
    card2Title: "Пеллетные котлы",
    card2Text: "Автоматическая подача топлива для длительной автономной работы.",
    card3Title: "Запчасти и сервис",
    card3Text: "Оригинальные комплектующие, монтаж и гарантийное обслуживание.",
    aboutHeading: "О компании Эрготерм",
    aboutText: "Эрготерм — производитель твердотопливных котлов, производство в Бресте. (Информация основана на открытых источниках и будет уточнена.)",
    aboutCta: "Узнать больше",
    footerAbout: "Производство твердотопливных котлов — Брест",
    contactsHeading: "Контакты",
    footerPhone: "Тел: +375 (xx) xxx-xx-xx",
    footerEmail: "Email: info@ergoterm.by",
    addressHeading: "Адрес",
    footerAddress: "г. Брест, ул. Солнечная, 91"
  },
  en: {
    brandName: "Ergoterm",
    brandTag: "Solid fuel boilers — Brest",
    navHome: "Home",
    navProducts: "Products ▾",
    prodSolid: "Solid fuel boilers",
    prodPellet: "Pellet solutions",
    prodService: "Installation & service",
    navAbout: "About",
    navContact: "Contact",
    ctaContact: "Contact",
    heroEyebrow1: "Industrial production",
    heroTitle1: "Ergoterm solid fuel boilers — reliable and economical",
    heroText1: "Manufactured in Brest. Models for homes and industry: long-burning, pellet and hybrid solutions.",
    heroCta1: "Catalog",
    heroEyebrow2: "Warranty & service",
    heroTitle2: "Certified materials and regional support",
    heroText2: "Warranty support, staff training and spare parts available.",
    heroCta2: "Contact",
    heroEyebrow3: "Energy efficiency",
    heroTitle3: "Solutions to optimize fuel consumption",
    heroText3: "Long-burning models and automated pellet solutions with high efficiency.",
    heroCta3: "Learn more",
    prodHeading: "Products",
    card1Title: "Long-burning boilers",
    card1Text: "Models from 20 to 500 kW. Reliability and easy maintenance.",
    card2Title: "Pellet boilers",
    card2Text: "Automatic fuel feed for long autonomous operation.",
    card3Title: "Parts and service",
    card3Text: "Original components, installation and warranty service.",
    aboutHeading: "About Ergoterm",
    aboutText: "Ergoterm — manufacturer of solid fuel boilers, production in Brest. (Info based on public sources and will be verified.)",
    aboutCta: "More",
    footerAbout: "Solid fuel boilers — Brest",
    contactsHeading: "Contacts",
    footerPhone: "Tel: +375 (xx) xxx-xx-xx",
    footerEmail: "Email: info@ergoterm.by",
    addressHeading: "Address",
    footerAddress: "Brest, Solnechnaya St., 91"
  }
};

// -------------------- DOM READY --------------------
document.addEventListener('DOMContentLoaded', () => {
  // ---- Helpers ----
  const setHTML = (el, value) => { if (!el) return; el.innerHTML = value; };

  // ---- Language switching ----
  const applyTranslations = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        setHTML(el, TRANSLATIONS[lang][key]);
      }
    });
    // mark buttons
    const btnRu = document.getElementById('lang-ru');
    const btnEn = document.getElementById('lang-en');
    if (btnRu) btnRu.setAttribute('aria-selected', lang === 'ru');
    if (btnEn) btnEn.setAttribute('aria-selected', lang === 'en');
    document.documentElement.lang = (lang === 'ru') ? 'ru' : 'en';
    try { localStorage.setItem('site_lang', lang); } catch(e) {}
  };

  // init language
  const savedLang = localStorage.getItem('site_lang') || 'ru';
  applyTranslations(savedLang);

  // bind language buttons
  const langRuBtn = document.getElementById('lang-ru');
  const langEnBtn = document.getElementById('lang-en');
  if (langRuBtn) langRuBtn.addEventListener('click', () => applyTranslations('ru'));
  if (langEnBtn) langEnBtn.addEventListener('click', () => applyTranslations('en'));

  // Accessibility: keyboard support for language buttons
  [langRuBtn, langEnBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  // -------------------- Carousel / Slides --------------------
  const slides = Array.from(document.querySelectorAll('.carousel .slide'));
  const indicatorsWrap = document.getElementById('indicators');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let idx = 0, timer = null;
  const INTERVAL = 5000;

  function go(i) {
    if (!slides.length) return;
    slides.forEach(s => { s.classList.remove('active'); s.setAttribute('aria-hidden', 'true'); });
    const buttons = indicatorsWrap ? Array.from(indicatorsWrap.querySelectorAll('button')) : [];
    buttons.forEach(b => b.classList.remove('active'));
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
    slides[idx].setAttribute('aria-hidden', 'false');
    if (buttons[idx]) buttons[idx].classList.add('active');
    // ensure lazy image loads
    const img = slides[idx].querySelector('img.lazy');
    if (img) loadImage(img);
  }

  function nextSlide() { go(idx + 1); }
  function prevSlide() { go(idx - 1); }

  function buildIndicators(){
    if (!indicatorsWrap || !slides.length) return;
    indicatorsWrap.innerHTML = '';
    slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.to = i;
      btn.setAttribute('aria-label', 'Slide ' + (i + 1));
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', (e) => { go(+e.currentTarget.dataset.to); resetTimer(); });
      indicatorsWrap.appendChild(btn);
    });
  }

  function startTimer(){
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(nextSlide, INTERVAL);
  }
  function resetTimer(){ clearInterval(timer); startTimer(); }

  if (slides.length){
    buildIndicators();
    go(0);
    if (nextBtn) nextBtn.addEventListener('click', ()=>{ nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', ()=>{ prevSlide(); resetTimer(); });

    const carouselEl = document.getElementById('carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', ()=>{ /* pause */ clearInterval(timer); });
      carouselEl.addEventListener('mouseleave', ()=>{ resetTimer(); });
      carouselEl.addEventListener('focusin', ()=>{ clearInterval(timer); });
      carouselEl.addEventListener('focusout', ()=>{ resetTimer(); });
    }

    // keyboard navigation
    document.addEventListener('keydown', (e)=> {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    startTimer();
  }

  // -------------------- Lazy-loading images --------------------
  function loadImage(img){
    if (!img) return;
    const src = img.dataset.src || img.getAttribute('data-src');
    if (!src) return;
    // if already loaded, skip
    if (img.dataset.loaded) { img.classList.add('loaded'); return; }
    img.src = src;
    img.addEventListener('load', ()=> { img.classList.add('loaded'); img.dataset.loaded = '1'; });
    img.addEventListener('error', ()=> { img.classList.add('loaded'); img.dataset.loaded = '1'; });
  }

  (function initLazy(){
    const lazyImgs = Array.from(document.querySelectorAll('img.lazy'));
    if (!lazyImgs.length) return;
    if ('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px' });
      lazyImgs.forEach(img => io.observe(img));
    } else {
      lazyImgs.forEach(loadImage);
    }
  })();

  // -------------------- Mobile menu & accordion --------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', ()=>{
      const open = mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', !open);
      mobileToggle.setAttribute('aria-expanded', open);
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', ()=>{
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileToggle && mobileToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // accordion in mobile
  document.querySelectorAll('.acc-toggle').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const panel = btn.nextElementSibling;
      if (!panel) return;
      const open = panel.classList.toggle('open');
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', open);
    });
  });

  // -------------------- Small accessibility helpers --------------------
  document.querySelectorAll('.menu > li > a, .dropdown-toggle').forEach(a=>{
    a.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' || e.key === ' ') {
        // For links, let default click happen; for dropdown toggles we might need to toggle aria-expanded
        const role = a.getAttribute('aria-haspopup');
        if (role === 'true') {
          // toggle associated dropdown if exists
          const id = a.id;
          if (id) {
            const dd = document.querySelector(`[aria-labelledby="${id}"]`);
            if (dd) {
              const isVisible = dd.style.display !== 'none' && dd.offsetParent !== null;
              dd.style.display = isVisible ? 'none' : 'block';
            }
          }
        } else {
          a.click();
        }
      }
    });
  });

  // -------------------- Reveal animations on load --------------------
  window.addEventListener('load', ()=> {
    document.querySelectorAll('.card, .fade-in, .hero-cta').forEach((el, i)=>{
      el.style.animationDelay = (i * 80) + 'ms';
      el.classList.add('fade-in-anim');
    });
  });

}); // DOMContentLoaded end
