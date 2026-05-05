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
/* ================================================
   JUWENALIA AT TARNÓW 2026 — JavaScript
   ================================================ */

/* === NAWIGACJA — Osoba A === */

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

/* Navbar background on scroll */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = current;
});

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* === SCROLL ANIMATIONS — Osoba A === */
/* taste-skill: use IntersectionObserver, NEVER window scroll listener for animations */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered reveal with delay per item (taste-skill: cascade animation-delay)
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    revealObserver.observe(item);
});

/* ============================================================== */
/* === LICZNIK ODLICZANIA DO JUWENALIÓW === */
/* ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Ustawiamy datę startu Juwenaliów (30 Maja 2026, godz. 17:00)
    const countDownDate = new Date("May 30, 2026 17:00:00").getTime();

    // Pobieramy elementy z HTML
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");
    const containerEl = document.querySelector(".countdown-container");

    // Jeśli licznika nie ma na stronie, przerywamy funkcję
    if (!daysEl) return;

    // Funkcja dodająca zero wiodące (np. "05" zamiast "5")
    const padZero = (num) => (num < 10 ? "0" + num : num);

    // Aktualizujemy licznik co 1 sekundę
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Gdy odliczanie się skończy (czas minął)
        if (distance < 0) {
            clearInterval(timer);
            containerEl.innerHTML = "<div style='color: var(--primary, #FF6600); font-weight: bold; font-size: 1.5rem;'>JUWENALIA TRWAJĄ! 🎉</div>";
            return;
        }

        // Obliczenia dla dni, godzin, minut i sekund
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Zastępowanie treści w HTML
        daysEl.innerText = padZero(days);
        hoursEl.innerText = padZero(hours);
        minutesEl.innerText = padZero(minutes);
        secondsEl.innerText = padZero(seconds);
    }, 1000);
});