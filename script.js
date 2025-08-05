document.addEventListener("DOMContentLoaded", () => {
    // Проверка наличия GSAP и Draggable
    if (!window.gsap || !window.Draggable || !window.ScrollTrigger) {
        console.error("GSAP, Draggable, or ScrollTrigger not loaded!");
        return;
    }

    // Анимации геройского раздела
    gsap.from(".hero h1", { opacity: 0, y: 100, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.from(".hero p", { opacity: 0, y: 100, duration: 1, delay: 0.7, ease: "power3.out" });
    gsap.from(".cta-button", { opacity: 0, scale: 0.8, duration: 1, delay: 0.9, ease: "elastic.out(1, 0.5)" });
    gsap.from(".hero-path", { scale: 1.2, opacity: 0.5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Анимации секций при прокрутке
    gsap.utils.toArray(".animate-section").forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Анимация таблицы характеристик
    gsap.utils.toArray(".product-details table").forEach(table => {
        gsap.from(table, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: table,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Слайдер отзывов
    const testimonials = document.querySelectorAll(".testimonial");
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle("active", i === index);
            if (i === index) {
                gsap.fromTo(testimonial, 
                    { opacity: 0, x: 100 }, 
                    { opacity: 1, x: 0, duration: 1, ease: "power2.inOut" }
                );
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    showTestimonial(currentTestimonial);
    const testimonialInterval = setInterval(nextTestimonial, 5000);

    // Поддержка drag-and-drop для слайдера
    const slider = document.querySelector(".testimonial-slider");
    if (slider) {
        Draggable.create(slider, {
            type: "x",
            bounds: { minX: -slider.offsetWidth, maxX: 0 },
            onDragEnd: function () {
                const index = Math.round(this.x / (slider.offsetWidth / testimonials.length));
                currentTestimonial = Math.abs(index) % testimonials.length;
                showTestimonial(currentTestimonial);
                clearInterval(testimonialInterval);
            }
        });
    }

    // Интерактивные эффекты для карточек продуктов
    gsap.utils.toArray(".product").forEach(product => {
        product.addEventListener("mouseenter", () => {
            gsap.to(product, { scale: 1.05, rotateY: 10, duration: 0.5, ease: "power2.out" });
        });
        product.addEventListener("mouseleave", () => {
            gsap.to(product, { scale: 1, rotateY: 0, duration: 0.5, ease: "power2.out" });
        });
    });

    // Анимация кнопки при клике
    gsap.utils.toArray(".cta-button").forEach(button => {
        button.addEventListener("click", () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
            });
        });
    });

    // Анимация SVG иконок
    gsap.utils.toArray(".social-svg").forEach(svg => {
        svg.addEventListener("mouseenter", () => {
            gsap.to(svg, { scale: 1.2, rotate: 10, duration: 0.3, ease: "power2.out" });
        });
        svg.addEventListener("mouseleave", () => {
            gsap.to(svg, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
        });
    });
});