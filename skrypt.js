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
/* === LICZNIK ODLICZANIA DO JUWENALIÓW (NAPRAWIONY FLIP) === */
/* ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const countDownDate = new Date("May 30, 2026 17:00:00").getTime();
    const containerEl = document.querySelector(".countdown-container");

    if (!containerEl) return;

    const padZero = (num) => (num < 10 ? "0" + num : num);

    // Główna funkcja wymieniająca kartkę BEZ mrugania
    function updateCard(cardId, newValue) {
        const card = document.getElementById(cardId);
        if (!card) return;

        // Znajdź statyczne warstwy (tło)
        const topHalf = card.querySelector('.top span');
        const bottomHalf = card.querySelector('.bottom span');
        
        if (!topHalf || !bottomHalf) return;
        const currentValue = topHalf.innerText;

        // Jeśli czas się nie zmienił, pomiń
        if (currentValue === newValue) return;

        // 1. Zmieniamy górną (tylną) kartkę na NOWĄ wartość (zostanie odsłonięta)
        topHalf.innerText = newValue;
        // Dolna (tylna) kartka zatrzymuje STARĄ wartość (aż animacja się nie skończy)
        bottomHalf.innerText = currentValue;

        // 2. Generujemy tymczasowe animowane kartki
        const flipTop = document.createElement('div');
        flipTop.classList.add('flip-top');
        flipTop.innerHTML = `<span>${currentValue}</span>`; // Opadająca góra ze starą wartością

        const flipBottom = document.createElement('div');
        flipBottom.classList.add('flip-bottom');
        flipBottom.innerHTML = `<span>${newValue}</span>`; // Opadający dół z nową wartością

        // Wrzucamy animowane kartki na stronę
        card.appendChild(flipTop);
        card.appendChild(flipBottom);

        // 3. Po zakończeniu animacji (0.5 sekundy) sprzątamy i aktualizujemy tło
        setTimeout(() => {
            bottomHalf.innerText = newValue; // Dół też ma już nową wartość
            if(card.contains(flipTop)) card.removeChild(flipTop);       // Kasujemy tymczasową kartkę
            if(card.contains(flipBottom)) card.removeChild(flipBottom); // Kasujemy tymczasową kartkę
        }, 500); 
    }

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            containerEl.innerHTML = "<div style='color: var(--primary, #FF6600); font-weight: bold; font-size: 1.5rem; margin-top:20px;'>JUWENALIA TRWAJĄ! 🎉</div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Uruchamiamy aktualizację
        updateCard("cd-days", padZero(days).toString());
        updateCard("cd-hours", padZero(hours).toString());
        updateCard("cd-minutes", padZero(minutes).toString());
        updateCard("cd-seconds", padZero(seconds).toString());
    }, 1000);
});