/* ============================================
   THE CAPPERS — main.js
   All interactivity & dynamic content
   ============================================ */

'use strict';

/* ── Product Data ── */
const PRODUCTS = [
  {
    name: 'Snapback — Block Logo',
    desc: 'Structured crown, flat brim, rear snap closure.',
    price: 'Rs 1,200',
    priceClass: 'price-gold',
    badge: 'Best Seller',
    badgeClass: 'badge-gold',
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80&auto=format&fit=crop',
    dots: ['#0a0a0a', '#f5f2ed', '#1a3a5c', '#3d5a3e'],
  },
  {
    name: 'Washed Dad Cap',
    desc: 'Relaxed fit, vintage distress, soft crown.',
    price: 'Rs 1,400',
    priceClass: 'price-coral',
    badge: 'New Drop',
    badgeClass: 'badge-coral',
    img: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500&q=80&auto=format&fit=crop',
    dots: ['#2d2d2d', '#c8b89a', '#4a3728', '#8b7355'],
  },
  {
    name: '5 Panel Fitted',
    desc: 'Structured panels, flat brim, street-ready.',
    price: 'Rs 1,500',
    priceClass: 'price-violet',
    badge: 'Limited',
    badgeClass: 'badge-violet',
    img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500&q=80&auto=format&fit=crop',
    dots: ['#0a0a0a', '#3d5a3e', '#8b7355', '#1a3a5c'],
  },
  {
    name: 'Mesh Trucker',
    desc: 'Foam front, breathable mesh back, snapback.',
    price: 'Rs 1,100',
    priceClass: 'price-teal',
    badge: 'Sale',
    badgeClass: 'badge-teal',
    img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&q=80&auto=format&fit=crop',
    dots: ['#0a0a0a', '#f5f2ed', '#c8b89a'],
  },
  {
    name: 'Bucket — Street Edition',
    desc: 'Wide brim, all-season, unisex fit.',
    price: 'Rs 1,300',
    priceClass: 'price-gold',
    badge: null,
    badgeClass: '',
    img: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500&q=80&auto=format&fit=crop',
    dots: ['#2d2d2d', '#c8b89a', '#3d5a3e', '#1a3a5c'],
  },
  {
    name: 'Custom Embroidery',
    desc: 'Your logo. Your colors. Your cap.',
    price: 'Rs 2,000+',
    priceClass: 'price-coral',
    badge: 'Custom',
    badgeClass: 'badge-coral',
    img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80&auto=format&fit=crop',
    dots: ['#e8c84a', '#ff5c3a', '#7c4dff', '#00c9a7'],
  },
];

/* ── Color Palette Data ── */
const PALETTES = [
  { name: 'All Black',      color: '#0a0a0a' },
  { name: 'Cream White',    color: '#f0ece4' },
  { name: 'Olive Green',    color: '#3d5a3e' },
  { name: 'Navy Blue',      color: '#0d1b3e' },
  { name: 'Coral Red',      color: '#ff5c3a' },
  { name: 'Sand Beige',     color: '#c8b89a' },
  { name: 'Charcoal',       color: '#2d2d2d' },
  { name: 'Gold',           color: '#e8c84a' },
];

/* ── Marquee Words ── */
const MARQUEE_WORDS = [
  'THE CAPPERS', 'FRESH CAPS', 'STREET STYLE', 'BADIN PK',
  'BOLD COLORS', 'SNAPBACK', 'CUSTOM FITS', 'LIMITED DROPS', 'AUTHENTIC',
];

/* ============================================
   BUILD PRODUCT GRID
   ============================================ */
function buildProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  PRODUCTS.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const dotsHTML = p.dots
      .map((c) => `<div class="dot" style="background:${c}" aria-hidden="true"></div>`)
      .join('');

    const badgeHTML = p.badge
      ? `<div class="card-badge ${p.badgeClass}">${p.badge}</div>`
      : '';

    card.innerHTML = `
      <div class="card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${badgeHTML}
        <div class="card-overlay">
          <button class="add-btn" data-name="${p.name}">Add to Order</button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-footer">
          <div class="card-price ${p.priceClass}">${p.price}</div>
          <div class="card-dots">${dotsHTML}</div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  /* Delegate click on "Add to Order" buttons */
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    const name = btn.dataset.name;
    prefillStyle(name);
    smoothScroll('#order');
    showToast(`${name} selected — complete your order below!`);
  });
}

/* ============================================
   BUILD PALETTE GRID
   ============================================ */
function buildPalette() {
  const grid = document.getElementById('palette-grid');
  if (!grid) return;

  PALETTES.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'palette-card';
    card.innerHTML = `
      <div class="palette-swatch" style="background:${p.color}"></div>
      <div class="palette-label">${p.name}</div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================
   BUILD MARQUEE
   ============================================ */
function buildMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  const allWords = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  const inner = allWords.map((w) => `<span>◆ ${w}</span>`).join('');
  /* Duplicate for seamless looping */
  track.innerHTML = inner + inner;
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    /* Close mobile menu when a link is clicked */
    mobileMenu.querySelectorAll('.mob-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* Shrink nav on scroll */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.borderBottomColor = '#2a2a2a';
    } else {
      navbar.style.borderBottomColor = '#1f1f1f';
    }
  });
}

/* ============================================
   SMOOTH SCROLL HELPER
   ============================================ */
function smoothScroll(selector) {
  const target = document.querySelector(selector);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   PREFILL ORDER FORM STYLE
   ============================================ */
function prefillStyle(productName) {
  const sel = document.getElementById('fs');
  if (!sel) return;
  /* Try to match the first word of the product name */
  const keyword = productName.split(' ')[0].toLowerCase();
  for (const opt of sel.options) {
    if (opt.text.toLowerCase().includes(keyword)) {
      sel.value = opt.value;
      break;
    }
  }
}

/* ============================================
   ORDER FORM SUBMIT
   ============================================ */
function submitOrder(e) {
  e.preventDefault();

  const name  = document.getElementById('fn').value.trim();
  const phone = document.getElementById('fp').value.trim();
  const style = document.getElementById('fs').value;

  if (!name || !phone || !style) {
    showToast('Please fill in name, phone & style.', true);
    return;
  }

  /* Success */
  showToast("Order placed! We'll WhatsApp you soon 🎉");

  /* Reset form */
  document.getElementById('order-form').reset();
  document.getElementById('fq').value = 1;
}

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.style.background = isError ? '#ff5c3a' : '#e8c84a';
  toast.style.color       = isError ? '#fff'    : '#080808';

  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3400);
}

/* ============================================
   INTERSECTION OBSERVER — fade-in on scroll
   ============================================ */
function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.product-card, .palette-card, .stat, .about-img-wrap, .about-content'
  );

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildProducts();
  buildPalette();
  buildMarquee();
  initNav();
  initScrollReveal();
});
