// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
  
  // Animate sections on scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );
  
  // Apply observer to sections
  document.querySelectorAll(".section").forEach(section => {
    section.classList.add("fade-in-section");
    observer.observe(section);
  });
  
  // Parallax effect on hero background
  const hero = document.querySelector(".hero");
  window.addEventListener("mousemove", e => {
    const x = (e.clientX - window.innerWidth / 2) / 60;
    const y = (e.clientY - window.innerHeight / 2) / 60;
    hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });
  
  // Link hover glow effect
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.textShadow = "0 0 8px rgba(255, 136, 0, 0.8)";
    });
    link.addEventListener("mouseleave", () => {
      link.style.textShadow = "none";
    });
  });
  