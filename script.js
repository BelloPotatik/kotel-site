document.addEventListener("DOMContentLoaded", function () {
    // Плавный скроллинг
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Анимация появления элементов
    const fadeInElements = document.querySelectorAll('.fade-in');
    function checkPosition() {
        fadeInElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.5;
            if (position < screenPosition) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Проверяем позиции при загрузке страницы
});
