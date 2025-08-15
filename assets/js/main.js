document.addEventListener("DOMContentLoaded", function () {

  /* ===== Бургер-меню ===== */
  const burger = document.getElementById("burger-menu");
  const nav = document.querySelector(".main-nav ul");

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("open");
  });

  /* ===== Слайдер ===== */
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  let currentSlide = 0;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    const slidesContainer = document.querySelector(".slides");
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  }

  // Автопереключение слайдов
  setInterval(() => showSlide(currentSlide + 1), 5000);

  /* ===== Переключатель языков ===== */
  const langButtons = document.querySelectorAll(".lang-switch");
  const texts = document.querySelectorAll("[data-text]");

  const dictionary = {
    ru: {
      home: "Главная",
      about: "О компании",
      products: "Продукция",
      projects: "Наши проекты",
      contacts: "Контакты"
    },
    en: {
      home: "Home",
      about: "About",
      products: "Products",
      projects: "Projects",
      contacts: "Contacts"
    }
  };

  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      texts.forEach(el => {
        const key = el.dataset.text;
        if (dictionary[lang][key]) el.textContent = dictionary[lang][key];
      });
    });
  });

  /* ===== Анимация fade-in при скролле ===== */
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

});
