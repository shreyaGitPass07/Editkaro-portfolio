/* ============================================
   EDITKARO.IN — PORTFOLIO JS
   Features: Filter, Lightbox, Scroll Animations,
             Navbar, Mobile Menu
   ============================================ */

// ─── DISCLAIMER BANNER ────────────────────────
const disclaimerBar   = document.getElementById('disclaimerBar');
const disclaimerClose = document.getElementById('disclaimerClose');

if (disclaimerClose && disclaimerBar) {
  disclaimerClose.addEventListener('click', () => {
    disclaimerBar.style.transition = 'opacity 0.3s ease, max-height 0.4s ease, padding 0.4s ease';
    disclaimerBar.style.opacity    = '0';
    disclaimerBar.style.maxHeight  = '0';
    disclaimerBar.style.padding    = '0';
    disclaimerBar.style.overflow   = 'hidden';
    setTimeout(() => disclaimerBar.classList.add('hidden'), 400);
  });
}

// ─── DOM REFERENCES ───────────────────────────
const navbar        = document.querySelector('.navbar');
const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const filterBtns    = document.querySelectorAll('.filter-btn');
const videoCards    = document.querySelectorAll('.video-card');
const videoGrid     = document.getElementById('videoGrid');
const noResults     = document.getElementById('noResults');
const lightbox      = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBack  = document.getElementById('lightboxBackdrop');
const lightboxPlayer= document.getElementById('lightboxPlayer');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCraft = document.getElementById('lightboxCraft');

// ─── NAVBAR: scroll shadow ─────────────────────
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── MOBILE MENU ──────────────────────────────
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);

  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

// ─── FILTER SYSTEM ────────────────────────────
let activeFilter = 'all';

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    if (filter === activeFilter) return;

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = filter;

    // Filter cards with staggered animation
    let visibleCount = 0;
    let delay = 0;

    videoCards.forEach(card => {
      const category = card.dataset.category;
      const matches  = filter === 'all' || category === filter;

      if (matches) {
        card.classList.remove('hidden');
        // Stagger the re-appearance
        card.style.transitionDelay = `${delay * 60}ms`;
        // Force reflow for animation restart
        card.classList.remove('visible');
        void card.offsetWidth;
        card.classList.add('visible');
        delay++;
        visibleCount++;
      } else {
        card.classList.remove('visible');
        card.style.transitionDelay = '0ms';
        // Small timeout so exit animation plays before hiding
        setTimeout(() => {
          if (card.dataset.category !== activeFilter && activeFilter !== 'all') {
            card.classList.add('hidden');
          }
        }, 200);
      }
    });

    // Show/hide no results message
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  });
});

// ─── SCROLL REVEAL (Intersection Observer) ────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      // Natural stagger based on position in grid
      const cards = Array.from(videoCards);
      const cardIndex = cards.indexOf(card);
      const staggerGroup = cardIndex % 3;

      setTimeout(() => {
        card.classList.add('visible');
      }, staggerGroup * 80);

      cardObserver.unobserve(card);
    }
  });
}, observerOptions);

// Observe all cards on load
videoCards.forEach(card => {
  cardObserver.observe(card);
});

// ─── LIGHTBOX ─────────────────────────────────
let currentVideoId = null;

function openLightbox(videoId, title, craft, type) {
  currentVideoId = videoId;

  // Set meta
  lightboxTitle.textContent = title;
  lightboxCraft.textContent = craft;

  // Build embed URL
  // For Shorts, use the standard embed URL — YouTube handles it
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;

  lightboxPlayer.innerHTML = `
    <iframe
      src="${embedUrl}"
      title="${title}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;

  // Show lightbox
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  setTimeout(() => lightboxClose.blur(), 300);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  currentVideoId = null;

  // Destroy iframe to stop video
  setTimeout(() => {
    lightboxPlayer.innerHTML = '';
  }, 300);
}

// Card click → open lightbox
videoCards.forEach(card => {
  card.addEventListener('click', () => {
    const videoId = card.dataset.id;
    const title   = card.dataset.title;
    const craft   = card.dataset.craft;
    const type    = card.dataset.type;
    openLightbox(videoId, title, craft, type);
  });
});

// Close via button
lightboxClose.addEventListener('click', closeLightbox);

// Close via backdrop
lightboxBack.addEventListener('click', closeLightbox);

// Close via Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

// ─── SMOOTH ANCHOR SCROLL ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── STATS COUNTER ANIMATION ──────────────────
const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el, target, duration = 1200) {
  const isZero = target === 0;
  if (isZero) return; // "0" stays as 0 — the joke works only at 0

  let start     = 0;
  const step    = Math.ceil(target / (duration / 16));
  const plus    = el.querySelector('.stat-plus');
  const plusHTML = plus ? plus.outerHTML : '';

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.innerHTML = start + plusHTML;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const rawText = el.textContent.replace('+', '').trim();
      const target  = parseInt(rawText, 10);

      if (!isNaN(target) && target > 0) {
        animateCounter(el, target);
      }

      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(num => statsObserver.observe(num));

// ─── HERO PARALLAX (subtle) ───────────────────
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  if (!hero) return;
  const scrolled = window.scrollY;
  const heroH    = hero.offsetHeight;
  if (scrolled < heroH) {
    const ratio = scrolled / heroH;
    heroContent.style.transform = `translateY(${ratio * 40}px)`;
    heroContent.style.opacity   = 1 - ratio * 1.2;
  }
}, { passive: true });

// ─── CARD TILT ON HOVER (desktop only) ────────
if (window.matchMedia('(hover: hover)').matches) {
  videoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) *  4;

      card.style.transform = `
        translateY(-6px) scale(1.01)
        perspective(600px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── FILTER BAR: drag to scroll on mobile ─────
const filterBar = document.getElementById('filterBar');
let isDown   = false;
let startX   = 0;
let scrollLeft = 0;

filterBar.addEventListener('mousedown', (e) => {
  isDown = true;
  filterBar.style.cursor = 'grabbing';
  startX     = e.pageX - filterBar.offsetLeft;
  scrollLeft = filterBar.scrollLeft;
});
filterBar.addEventListener('mouseleave', () => {
  isDown = false;
  filterBar.style.cursor = '';
});
filterBar.addEventListener('mouseup', () => {
  isDown = false;
  filterBar.style.cursor = '';
});
filterBar.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x    = e.pageX - filterBar.offsetLeft;
  const walk = (x - startX) * 1.5;
  filterBar.scrollLeft = scrollLeft - walk;
});

// ─── INIT LOG ─────────────────────────────────
console.log('%c[editkaro.in] Portfolio loaded. Every frame counts.', 
  'color: #8b5cf6; font-family: monospace; font-size: 13px; font-weight: bold;'
);