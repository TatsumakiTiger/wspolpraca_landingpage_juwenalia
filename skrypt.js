/* ============================================================== */
/* === OSOBA B - JS (Animacje przy scrollu) === */
/* ============================================================== */

document.addEventListener("DOMContentLoaded", () => {
 
  const animatedElements = document.querySelectorAll('.b-fade-in');

  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible'); 
        observer.unobserve(entry.target);       
      }
    });
  }, observerOptions);

  
  animatedElements.forEach(el => scrollObserver.observe(el));
});