// Product Database
const PRODUCTS = [
  {
    id: 1,
    name: "Velvet Satin Lipstick",
    category: "lips",
    price: 34.00,
    rating: "4.9 ★ (128 reviews)",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    shades: ["#b82e46", "#e53e6e", "#8b263e", "#c45c48"]
  },
  {
    id: 2,
    name: "Luminous Silk Foundation",
    category: "face",
    price: 48.00,
    rating: "4.8 ★ (240 reviews)",
    badge: "Award Winner",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=600&q=80",
    shades: ["#f5d6ba", "#e0ab8b", "#c48866", "#875338"]
  },
  {
    id: 3,
    name: "Celestial Eyeshadow Palette",
    category: "eyes",
    price: 56.00,
    rating: "5.0 ★ (98 reviews)",
    badge: "Limited Edition",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    shades: ["#d4af37", "#9b4dca", "#e88ca5", "#4a2545"]
  },
  {
    id: 4,
    name: "Radiant Skin Elixir Serum",
    category: "skincare",
    price: 62.00,
    rating: "4.9 ★ (310 reviews)",
    badge: "Clean Beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    shades: []
  },
  {
    id: 5,
    name: "Golden Hour Baked Highlighter",
    category: "glow",
    price: 38.00,
    rating: "4.7 ★ (175 reviews)",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    shades: ["#f4d06f", "#e88ca5"]
  },
  {
    id: 6,
    name: "Hydrating Plumping Lip Gloss",
    category: "lips",
    price: 28.00,
    rating: "4.8 ★ (89 reviews)",
    badge: "New",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=600&q=80",
    shades: ["#ff758c", "#ff7eb3", "#fa709a"]
  },
  {
    id: 7,
    name: "Precision Liquid Eyeliner",
    category: "eyes",
    price: 24.00,
    rating: "4.9 ★ (412 reviews)",
    badge: "Waterproof",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    shades: ["#111111", "#3d2314"]
  },
  {
    id: 8,
    name: "Soft Cloud Setting Powder",
    category: "face",
    price: 42.00,
    rating: "4.8 ★ (150 reviews)",
    badge: "Blurring",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80",
    shades: ["#fff5eb", "#f7d7c4"]
  }
];

// Initial Reviews Database
const REVIEWS = [
  {
    id: 101,
    author: "Elena Rostova",
    initials: "ER",
    stars: 5,
    title: "Unmatched formula & luxurious finish!",
    comment: "The Velvet Satin Lipstick in Ruby Royal is incredible. Smooth application, zero drying, and stays vivid through dinner.",
    product: "Velvet Satin Lipstick",
    verified: true,
    helpful: 24,
    liked: false
  },
  {
    id: 102,
    author: "Camila Vance",
    initials: "CV",
    stars: 5,
    title: "Perfect skin match every time",
    comment: "Used the Shade Finder quiz and found my exact tone (Medium Warm). The Luminous Silk Foundation looks like pure silk on skin!",
    product: "Luminous Silk Foundation",
    verified: true,
    helpful: 19,
    liked: false
  },
  {
    id: 103,
    author: "Aaliyah Khan",
    initials: "AK",
    stars: 5,
    title: "GLAM Studio Bridal Transformation",
    comment: "Booked GLAM Studio for my bridal makeup package. The team was punctual, attentive, and made me look radiantly glowing!",
    product: "Bridal Makeup Service",
    verified: true,
    helpful: 31,
    liked: false
  }
];

// App State
let cart = [];
let selectedToneName = "Fair";
let selectedUndertoneName = "Cool";
let selectedFinishName = "Dewy";

// ==================================================
// 1. THEME MANAGEMENT (DARK / LIGHT MODE)
// ==================================================
const THEME_STORAGE_KEY = 'glam-theme';

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// Bind Theme Toggle Buttons
document.getElementById('theme-toggle-desktop')?.addEventListener('click', toggleTheme);
document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);

// ==================================================
// 2. MOBILE NAVIGATION DRAWER & ACCORDION
// ==================================================
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const closeMobileNav = document.getElementById('close-mobile-nav');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileServicesAccordion = document.getElementById('mobile-services-accordion');
const mobileServicesSublist = document.getElementById('mobile-services-sublist');

function toggleMobileDrawer(open) {
  if (open) {
    mobileNavDrawer?.classList.add('open');
    mobileNavOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    mobileNavDrawer?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

mobileNavToggle?.addEventListener('click', () => toggleMobileDrawer(true));
closeMobileNav?.addEventListener('click', () => toggleMobileDrawer(false));
mobileNavOverlay?.addEventListener('click', () => toggleMobileDrawer(false));

mobileServicesAccordion?.addEventListener('click', () => {
  const isOpen = mobileServicesSublist?.classList.contains('open');
  if (isOpen) {
    mobileServicesSublist?.classList.remove('open');
    mobileServicesAccordion?.classList.remove('open');
    mobileServicesAccordion.setAttribute('aria-expanded', 'false');
  } else {
    mobileServicesSublist?.classList.add('open');
    mobileServicesAccordion?.classList.add('open');
    mobileServicesAccordion.setAttribute('aria-expanded', 'true');
  }
});

document.querySelectorAll('.mobile-nav-link, .mobile-service-link, .mobile-try-on-btn').forEach(link => {
  link.addEventListener('click', () => {
    toggleMobileDrawer(false);
  });
});

// ==================================================
// 3. PRODUCTS RENDER & FILTERING
// ==================================================
const productsGrid = document.getElementById('products-grid');
const filterTabs = document.querySelectorAll('#products-filter-tabs .tab-btn');

function renderProducts(category = 'all') {
  if (!productsGrid) return;
  
  const filtered = category === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);
    
  productsGrid.innerHTML = filtered.map(product => `
    <div class="product-card">
      <span class="product-badge">${product.badge}</span>
      <div class="product-thumb">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <button class="quick-view-btn" onclick="quickView(${product.id})">Quick View ✨</button>
      </div>
      <div class="product-details">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating" onclick="scrollToReviews()" title="Click to view customer reviews" style="cursor: pointer;">${product.rating}</div>
        <div class="product-footer">
          <button class="add-cart-btn" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.category);
  });
});

window.quickView = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  showToast(`Viewing <strong>${product.name}</strong>`);
};

// ==================================================
// 4. REVIEWS SYSTEM
// ==================================================
const reviewsGrid = document.getElementById('reviews-grid');

function renderReviews(filter = 'all') {
  if (!reviewsGrid) return;

  let filtered = REVIEWS;
  if (filter === '5') {
    filtered = REVIEWS.filter(r => r.stars === 5);
  } else if (filter === '4') {
    filtered = REVIEWS.filter(r => r.stars === 4);
  } else if (filter === 'verified') {
    filtered = REVIEWS.filter(r => r.verified);
  }

  if (filtered.length === 0) {
    reviewsGrid.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-muted); grid-column: 1 / -1; background: var(--bg-card); border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
        <p style="font-size: 32px; margin-bottom: 8px;">💬</p>
        <p style="font-size: 15px; font-weight: 600; color: var(--text-main);">No reviews currently displayed.</p>
        <p style="font-size: 13px; opacity: 0.8; margin-top: 4px;">Click "Write a Review ✍️" above to submit your feedback!</p>
      </div>
    `;
    return;
  }

  reviewsGrid.innerHTML = filtered.map(r => `
    <div class="review-card">
      <div>
        <div class="review-header">
          <div class="review-user">
            <div class="user-avatar">${r.initials}</div>
            <div class="user-meta">
              <h4>${r.author}</h4>
              ${r.verified ? '<span class="verified-tag">✓ Verified Buyer</span>' : ''}
            </div>
          </div>
          <div class="review-rating-stars">${'★'.repeat(r.stars)}</div>
        </div>
        <h4 class="review-card-title">${r.title}</h4>
        <p class="review-card-text">"${r.comment}"</p>
      </div>
      <div class="review-footer">
        <span class="product-tag">${r.product}</span>
        <button class="helpful-btn ${r.liked ? 'liked' : ''}" onclick="toggleHelpful(${r.id})">
          👍 Helpful (${r.helpful})
        </button>
      </div>
    </div>
  `).join('');
}

window.toggleHelpful = function(id) {
  const review = REVIEWS.find(r => r.id === id);
  if (!review) return;
  if (review.liked) {
    review.helpful -= 1;
    review.liked = false;
  } else {
    review.helpful += 1;
    review.liked = true;
  }
  const activeTab = document.querySelector('[data-review-filter].active');
  renderReviews(activeTab ? activeTab.dataset.reviewFilter : 'all');
};

window.scrollToReviews = function() {
  const reviewsEl = document.getElementById('reviews');
  if (reviewsEl) {
    reviewsEl.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const reviewLink = document.querySelector('.nav-link[href="#reviews"]');
    if (reviewLink) reviewLink.classList.add('active');
  }
};

document.querySelectorAll('[data-review-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-review-filter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderReviews(tab.dataset.reviewFilter);
  });
});

// Review Modal Handlers
const openReviewBtn = document.getElementById('open-review-modal-btn');
const closeReviewBtn = document.getElementById('close-review-modal');
const reviewModalOverlay = document.getElementById('review-modal-overlay');
const reviewModal = document.getElementById('review-modal');
const reviewForm = document.getElementById('review-form');
const starRatingSelect = document.getElementById('star-rating-select');
let currentSelectedStars = 5;

function toggleReviewModal(open) {
  if (open) {
    reviewModal?.classList.add('open');
    reviewModalOverlay?.classList.add('open');
  } else {
    reviewModal?.classList.remove('open');
    reviewModalOverlay?.classList.remove('open');
  }
}

openReviewBtn?.addEventListener('click', () => toggleReviewModal(true));
closeReviewBtn?.addEventListener('click', () => toggleReviewModal(false));
reviewModalOverlay?.addEventListener('click', () => toggleReviewModal(false));

if (starRatingSelect) {
  const stars = starRatingSelect.querySelectorAll('span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentSelectedStars = parseInt(star.dataset.star, 10);
      stars.forEach(s => {
        const val = parseInt(s.dataset.star, 10);
        s.classList.toggle('selected', val <= currentSelectedStars);
      });
    });

    star.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(star.dataset.star, 10);
      stars.forEach(s => {
        const val = parseInt(s.dataset.star, 10);
        s.classList.toggle('hovered', val <= hoverVal);
      });
    });

    starRatingSelect.addEventListener('mouseleave', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });
  });
}

reviewForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const author = document.getElementById('review-author').value.trim();
  const product = document.getElementById('review-product').value;
  const title = document.getElementById('review-title').value.trim();
  const comment = document.getElementById('review-comment').value.trim();

  if (!author || !title || !comment) return;

  const initials = author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "U";
  
  const newReview = {
    id: Date.now(),
    author,
    initials,
    stars: currentSelectedStars,
    title,
    comment,
    product,
    verified: true,
    helpful: 1,
    liked: false
  };

  REVIEWS.unshift(newReview);
  renderReviews();
  toggleReviewModal(false);
  reviewForm.reset();
  showToast(`✨ Thank you <strong>${author}</strong>! Your review has been posted.`);
  scrollToReviews();
});

// ==================================================
// 5. FEATURED SERVICES & APPOINTMENT BOOKING
// ==================================================
const FEATURED_SERVICES = {
  'mens-cut': {
    title: "Men's Style & Precision Cut",
    category: "BEAUTY & HAIR",
    badge: "Barber & Stylist Pick",
    image: "/service-mens-cut.jpg",
    desc: "Precision textured haircut, crisp fade styling, line-up, and scalp refreshing wash for modern gentlemen.",
    price: "$45.00",
    duration: "⏱ 45 min session"
  },
  'pedicure': {
    title: "Deluxe Pedicure & Foot Spa",
    category: "NAILS & SPA",
    badge: "Relaxing Spa",
    image: "/service-pedicure.jpg",
    desc: "Therapeutic warm foot soak, exfoliative scrub, cuticle care, massaged hydration, and gel polish finish.",
    price: "$65.00",
    duration: "⏱ 60 min session"
  },
  'hair-treatment': {
    title: "Keratin Hair Smoothing & Repair",
    category: "HAIR RESTORATION",
    badge: "Before & After Marvel",
    image: "/service-hair-treatment.jpg",
    desc: "Deep protein restructuring treatment transforming coarse & frizzy tresses into silky straight shine.",
    price: "$120.00",
    duration: "⏱ 90 min session"
  },
  'eyebrows': {
    title: "Trending Eyebrow Threading & Shaping",
    category: "BEAUTY & MAKEUP",
    badge: "Trending Service",
    image: "/service-eyebrows.jpg",
    desc: "High-precision organic thread arch mapping, brow shaping, and soothing aloe gel finish for sharp elegance.",
    price: "$30.00",
    duration: "⏱ 30 min session"
  },
  'womens-cut': {
    title: "Women's Layered Haircut",
    category: "BEAUTY & HAIR",
    badge: "Couture Styling",
    image: "/service-womens-cut.jpg",
    desc: "Bespoke face-framing layers, soft curtain fringe, split-end trim, and blow-dry styling for natural volume.",
    price: "$55.00",
    duration: "⏱ 50 min session"
  },
  'hair-extensions': {
    title: "Micro-Bonding Luxury Hair Extensions",
    category: "HAIR ARTISTRY",
    badge: "Salon Masterclass",
    image: "/service-hair-extensions.jpg",
    desc: "100% Remy human hair seamless micro-bonding extension installation for instant length & lavish fullness.",
    price: "$180.00",
    duration: "⏱ 120 min session"
  },
  'mens-barber': {
    title: "Men's Professional Barber Cut",
    category: "BEAUTY & HAIR",
    badge: "Gentleman's Choice",
    image: "/service-mens-barber.jpg",
    desc: "Master barber clipper work, tapered neck finish, beard trim sculpting, and hair tonic massage.",
    price: "$50.00",
    duration: "⏱ 45 min session"
  },
  'hair-colour': {
    title: "Hair Colour & Gloss Toner",
    category: "COLOR STUDIO",
    badge: "Autumn Special",
    image: "/service-hair-colour.jpg",
    desc: "Custom hand-painted auburn & chestnut highlights, gloss toner treatment, and dimensional wave styling.",
    price: "$110.00",
    duration: "⏱ 90 min session"
  },
  'mole-removal': {
    title: "Dermatological Mole Removal",
    category: "SKIN CARE",
    badge: "Dermatology",
    image: "/service-mole-removal.jpg",
    desc: "Safe, hygienic, and painless precision dermatological mole removal treatment by certified specialists.",
    price: "$75.00",
    duration: "⏱ 30 min session"
  },
  'ear-piercing': {
    title: "Medical Ear Piercing",
    category: "BEAUTY & PIERCING",
    badge: "Hygiene Certified",
    image: "/service-ear-piercing.jpg",
    desc: "Sterile, medical-grade ear piercing with hypoallergenic gold studs and antiseptic soothing aftercare.",
    price: "$40.00",
    duration: "⏱ 20 min session"
  },
  'bridal-makeup': {
    title: "HD Waterproof Bridal Makeover",
    category: "MAKEUP ARTISTRY",
    badge: "Bridal Luxury",
    image: "/service-bridal-makeup.jpg",
    desc: "High-definition waterproof bridal makeover, lash application, saree/dupatta draping, and skin prep.",
    price: "$250.00",
    duration: "⏱ 150 min session"
  },
  'mehandi': {
    title: "Organic Henna Mehandi Art",
    category: "TRADITIONAL ART",
    badge: "Organic Henna",
    image: "/service-mehandi.jpg",
    desc: "Intricate bridal & festive henna art design using 100% natural, dark-staining organic herbal mehandi.",
    price: "$80.00",
    duration: "⏱ 90 min session"
  },
  'groom-makeup': {
    title: "Groom Complexion & Hair Prep",
    category: "GROOMING",
    badge: "Groom Special",
    image: "/service-groom-makeup.jpg",
    desc: "Natural anti-shine skin retouching, beard definition, hair styling, and photo-ready complexion prep.",
    price: "$120.00",
    duration: "⏱ 60 min session"
  },
  'facial': {
    title: "Hydra Glow Facial Spa",
    category: "SKIN SPA",
    badge: "Radiant Glow",
    image: "/service-facial.jpg",
    desc: "Deep cleansing hydra-facial, steam extraction, collagen massage mask, and botanical serum glow therapy.",
    price: "$85.00",
    duration: "⏱ 60 min session"
  },
  'nail-arts': {
    title: "Gel Extension & Chrome Nail Art",
    category: "NAIL ARTISTRY",
    badge: "Nail Couture",
    image: "/service-nail-arts.jpg",
    desc: "Custom gel extension art, chrome powder finishes, 3D rhinestones, and hand-painted nail designs.",
    price: "$50.00",
    duration: "⏱ 45 min session"
  }
};

window.openServiceBooking = function(serviceKey) {
  const service = FEATURED_SERVICES[serviceKey];
  if (!service) return;

  const bookingModal = document.getElementById('booking-modal');
  const bookingOverlay = document.getElementById('booking-modal-overlay');
  
  const imgEl = document.getElementById('booking-img');
  const badgeEl = document.getElementById('booking-badge');
  const nameEl = document.getElementById('booking-service-name');
  const descEl = document.getElementById('booking-service-desc');
  const priceEl = document.getElementById('booking-price');
  const durationEl = document.getElementById('booking-duration');

  if (imgEl && service.image) {
    imgEl.src = service.image;
  }
  if (badgeEl) badgeEl.textContent = service.badge;
  if (nameEl) nameEl.textContent = service.title;
  if (descEl) descEl.textContent = service.desc;
  if (durationEl) durationEl.textContent = service.duration;
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = document.getElementById('booking-date');
  if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];

  bookingModal?.classList.add('open');
  bookingOverlay?.classList.add('open');
};

function toggleBookingModal(open) {
  const bookingModal = document.getElementById('booking-modal');
  const bookingOverlay = document.getElementById('booking-modal-overlay');
  if (open) {
    bookingModal?.classList.add('open');
    bookingOverlay?.classList.add('open');
  } else {
    bookingModal?.classList.remove('open');
    bookingOverlay?.classList.remove('open');
  }
}

document.getElementById('close-booking-modal')?.addEventListener('click', () => toggleBookingModal(false));
document.getElementById('booking-modal-overlay')?.addEventListener('click', () => toggleBookingModal(false));

document.getElementById('booking-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('booking-client-name').value;
  const time = document.getElementById('booking-time').value;
  const date = document.getElementById('booking-date').value;
  const serviceName = document.getElementById('booking-service-name').textContent;

  toggleBookingModal(false);
  document.getElementById('booking-form').reset();
  showToast(`🎉 <strong>Appointment Booked!</strong> ${name}, we confirmed your appointment for ${serviceName} on ${date} at ${time}.`);
});

function handleServiceSelection(serviceName) {
  if (!serviceName) return;

  const map = {
    'Pedicure': 'pedicure',
    'Hair Extensions': 'hair-extensions',
    'Hair Colour': 'hair-colour',
    "Men's Style Cut": 'mens-cut',
    'Hair Treatment': 'hair-treatment',
    "Women's Haircut": 'womens-cut',
    'Mole Removal': 'mole-removal',
    'Ear Piercing': 'ear-piercing',
    'Trending Eyebrow Styling': 'eyebrows',
    "Men's Professional Cut": 'mens-barber',
    'Bridal Makeup': 'bridal-makeup',
    'Mehandi': 'mehandi',
    'Groom Makeup': 'groom-makeup',
    'Facial': 'facial',
    'Nail Arts': 'nail-arts'
  };

  const matchedKey = map[serviceName];
  if (matchedKey) {
    openServiceBooking(matchedKey);
  } else {
    showToast(`✨ <strong>${serviceName}</strong> selected — Book your session at GLAM Studio!`);
  }

  document.querySelectorAll('.service-chip').forEach(chip => {
    if (chip.getAttribute('data-service') === serviceName) {
      chip.classList.add('active');
      setTimeout(() => chip.classList.remove('active'), 3000);
    } else {
      chip.classList.remove('active');
    }
  });

  document.getElementById('services-nav-item')?.classList.remove('open');
  toggleMobileDrawer(false);

  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  }
}

document.querySelectorAll('.service-link, .mobile-service-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const service = link.getAttribute('data-service');
    handleServiceSelection(service);
  });
});

document.querySelectorAll('.service-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const service = chip.getAttribute('data-service');
    handleServiceSelection(service);
  });
});

// ==================================================
// 6. CART DRAWER & CHECKOUT
// ==================================================
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');

function toggleCart(open) {
  if (open) {
    cartDrawer?.classList.add('open');
    cartOverlay?.classList.add('open');
  } else {
    cartDrawer?.classList.remove('open');
    cartOverlay?.classList.remove('open');
  }
}

cartBtn?.addEventListener('click', () => toggleCart(true));
closeCartBtn?.addEventListener('click', () => toggleCart(false));
cartOverlay?.addEventListener('click', () => toggleCart(false));

window.addToCart = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  
  cart.push(product);
  updateCart();
  showToast(`Added <strong>${product.name}</strong> to your bag ✨`);
};

window.removeFromCart = function(index) {
  const item = cart[index];
  cart.splice(index, 1);
  updateCart();
  showToast(`Removed ${item.name}`);
};

function updateCart() {
  if (!cartCountEl || !cartItemsContainer || !cartTotalEl) return;
  
  cartCountEl.textContent = cart.length;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
        <p style="font-size: 36px; margin-bottom: 12px;">🛍️</p>
        <p>Your bag is currently empty</p>
      </div>
    `;
    if (cartTotalEl) cartTotalEl.textContent = "";
    return;
  }
  
  let total = 0;
  cartItemsContainer.innerHTML = cart.map((item, idx) => {
    total += item.price;
    return `
      <div class="cart-item">
        <img src="${item.image}" class="cart-item-img" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${idx})" aria-label="Remove item">✕</button>
      </div>
    `;
  }).join('');
  
  if (cartTotalEl) cartTotalEl.textContent = "";
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length === 0) {
    showToast("Your cart is empty! Add items before checking out.");
    return;
  }
  alert("🎉 Thank you for your order! This is a demo checkout for GLAM Makeover Studio.");
  cart = [];
  updateCart();
  toggleCart(false);
});

// ==================================================
// 7. VIRTUAL TRY-ON & MANUAL LIP MASK CORRECTION SYSTEM
// ==================================================
// Baseline Automatic Lip Coordinates
const AUTO_LIP_POINTS = {
  upperLeft: { x: 327, y: 248 },
  upperLeftPeak: { x: 352, y: 232 },
  upperDip: { x: 362, y: 235 },
  upperRightPeak: { x: 372, y: 231 },
  upperRight: { x: 404, y: 236 },
  upperInner: { x: 365, y: 246 },
  lowerBottom: { x: 365, y: 263 },
  lowerInner: { x: 365, y: 246 }
};

let currentLipPoints = JSON.parse(JSON.stringify(AUTO_LIP_POINTS));
let savedLipPoints = JSON.parse(JSON.stringify(AUTO_LIP_POINTS));

let isManualAdjustMode = false;
let activeRegion = 'both'; // 'both' | 'upper' | 'lower'
let draggedPointKey = null;

let activeVirtualShade = {
  name: 'Ruby Royal',
  color: '#b82e46'
};

// Bezier Path Constructors
function buildUpperLipPath(pts) {
  const { upperLeft, upperLeftPeak, upperDip, upperRightPeak, upperRight, upperInner } = pts;
  
  const c1 = {
    x: upperLeft.x + (upperLeftPeak.x - upperLeft.x) * 0.28,
    y: upperLeft.y + (upperLeftPeak.y - upperLeft.y) * 0.38
  };
  const c2 = {
    x: upperLeft.x + (upperLeftPeak.x - upperLeft.x) * 0.68,
    y: upperLeftPeak.y + (upperLeft.y - upperLeftPeak.y) * 0.06
  };

  const c3 = {
    x: upperLeftPeak.x + (upperDip.x - upperLeftPeak.x) * 0.4,
    y: upperLeftPeak.y + (upperDip.y - upperLeftPeak.y) * 0.33
  };
  const c4 = {
    x: upperLeftPeak.x + (upperDip.x - upperLeftPeak.x) * 0.8,
    y: upperDip.y
  };

  const c5 = {
    x: upperDip.x + (upperRightPeak.x - upperDip.x) * 0.3,
    y: upperDip.y
  };
  const c6 = {
    x: upperDip.x + (upperRightPeak.x - upperDip.x) * 0.6,
    y: upperRightPeak.y + (upperDip.y - upperRightPeak.y) * 0.5
  };

  const c7 = {
    x: upperRightPeak.x + (upperRight.x - upperRightPeak.x) * 0.28,
    y: upperRightPeak.y + (upperRight.y - upperRightPeak.y) * 0.2
  };
  const c8 = {
    x: upperRightPeak.x + (upperRight.x - upperRightPeak.x) * 0.75,
    y: upperRightPeak.y + (upperRight.y - upperRightPeak.y) * 0.6
  };

  const c9 = {
    x: upperRight.x + (upperInner.x - upperRight.x) * 0.23,
    y: upperRight.y + (upperInner.y - upperRight.y) * 0.5
  };
  const c10 = {
    x: upperRight.x + (upperInner.x - upperRight.x) * 0.61,
    y: upperInner.y + (upperRight.y - upperInner.y) * 0.1
  };

  const c11 = {
    x: upperInner.x + (upperLeft.x - upperInner.x) * 0.39,
    y: upperInner.y + (upperLeft.y - upperInner.y) * 0.0
  };
  const c12 = {
    x: upperInner.x + (upperLeft.x - upperInner.x) * 0.76,
    y: upperInner.y + (upperLeft.y - upperInner.y) * 0.5
  };

  return `M ${upperLeft.x},${upperLeft.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${upperLeftPeak.x},${upperLeftPeak.y} C ${c3.x},${c3.y} ${c4.x},${c4.y} ${upperDip.x},${upperDip.y} C ${c5.x},${c5.y} ${c6.x},${c6.y} ${upperRightPeak.x},${upperRightPeak.y} C ${c7.x},${c7.y} ${c8.x},${c8.y} ${upperRight.x},${upperRight.y} C ${c9.x},${c9.y} ${c10.x},${c10.y} ${upperInner.x},${upperInner.y} C ${c11.x},${c11.y} ${c12.x},${c12.y} ${upperLeft.x},${upperLeft.y} Z`;
}

function buildLowerLipPath(pts) {
  const { upperLeft, upperRight, lowerBottom, lowerInner, upperInner } = pts;
  const lowerLeft = pts.lowerLeft || upperLeft;
  const lowerRight = pts.lowerRight || upperRight;
  const innerCenter = lowerInner || upperInner;

  const c1 = {
    x: lowerLeft.x + (innerCenter.x - lowerLeft.x) * 0.24,
    y: lowerLeft.y + (innerCenter.y - lowerLeft.y) * -1.0
  };
  const c2 = {
    x: lowerLeft.x + (innerCenter.x - lowerLeft.x) * 0.61,
    y: innerCenter.y
  };

  const c3 = {
    x: innerCenter.x + (lowerRight.x - innerCenter.x) * 0.38,
    y: innerCenter.y + (lowerRight.y - innerCenter.y) * -0.1
  };
  const c4 = {
    x: innerCenter.x + (lowerRight.x - innerCenter.x) * 0.77,
    y: lowerRight.y + (innerCenter.y - lowerRight.y) * 0.5
  };

  const c5 = {
    x: lowerRight.x + (lowerBottom.x - lowerRight.x) * 0.23,
    y: lowerRight.y + (lowerBottom.y - lowerRight.y) * 0.7
  };
  const c6 = {
    x: lowerRight.x + (lowerBottom.x - lowerRight.x) * 0.56,
    y: lowerBottom.y
  };

  const c7 = {
    x: lowerBottom.x + (lowerLeft.x - lowerBottom.x) * 0.45,
    y: lowerBottom.y
  };
  const c8 = {
    x: lowerBottom.x + (lowerLeft.x - lowerBottom.x) * 0.76,
    y: lowerBottom.y + (lowerLeft.y - lowerBottom.y) * 0.47
  };

  return `M ${lowerLeft.x},${lowerLeft.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${innerCenter.x},${innerCenter.y} C ${c3.x},${c3.y} ${c4.x},${c4.y} ${lowerRight.x},${lowerRight.y} C ${c5.x},${c5.y} ${c6.x},${c6.y} ${lowerBottom.x},${lowerBottom.y} C ${c7.x},${c7.y} ${c8.x},${c8.y} ${lowerLeft.x},${lowerLeft.y} Z`;
}

// Update all 4 SVG blend mode layers + editor handle circles
function updateLipLayers(pts) {
  const upperD = buildUpperLipPath(pts);
  const lowerD = buildLowerLipPath(pts);

  document.querySelectorAll('.upper-lip').forEach(el => el.setAttribute('d', upperD));
  document.querySelectorAll('.lower-lip').forEach(el => el.setAttribute('d', lowerD));

  const guideUpper = document.getElementById('guide-upper-lip');
  const guideLower = document.getElementById('guide-lower-lip');
  if (guideUpper) guideUpper.setAttribute('d', upperD);
  if (guideLower) guideLower.setAttribute('d', lowerD);

  const handleMap = {
    'handle-u_left': pts.upperLeft,
    'handle-u_left_peak': pts.upperLeftPeak,
    'handle-u_dip': pts.upperDip,
    'handle-u_right_peak': pts.upperRightPeak,
    'handle-u_right': pts.upperRight,
    'handle-u_inner': pts.upperInner,
    'handle-l_bottom': pts.lowerBottom,
    'handle-l_inner': pts.lowerInner || pts.upperInner
  };

  for (const [id, pos] of Object.entries(handleMap)) {
    const handleEl = document.getElementById(id);
    if (handleEl && pos) {
      handleEl.setAttribute('cx', Math.round(pos.x * 10) / 10);
      handleEl.setAttribute('cy', Math.round(pos.y * 10) / 10);
    }
  }
}

// Transform operations (Move, Scale, Rotate)
function getTargetKeys(region) {
  if (region === 'upper') {
    return ['upperLeft', 'upperLeftPeak', 'upperDip', 'upperRightPeak', 'upperRight', 'upperInner'];
  } else if (region === 'lower') {
    return ['lowerBottom', 'lowerInner'];
  } else {
    return ['upperLeft', 'upperLeftPeak', 'upperDip', 'upperRightPeak', 'upperRight', 'upperInner', 'lowerBottom', 'lowerInner'];
  }
}

window.transformMask = function(action, val1, val2) {
  const keys = getTargetKeys(activeRegion);

  if (action === 'move') {
    const dx = val1 || 0;
    const dy = val2 || 0;
    keys.forEach(k => {
      if (currentLipPoints[k]) {
        currentLipPoints[k].x += dx;
        currentLipPoints[k].y += dy;
      }
    });
  } else if (action === 'scale') {
    const factor = val1 || 1.0;
    let sumX = 0, sumY = 0, count = 0;
    keys.forEach(k => {
      if (currentLipPoints[k]) {
        sumX += currentLipPoints[k].x;
        sumY += currentLipPoints[k].y;
        count++;
      }
    });
    if (count > 0) {
      const cx = sumX / count;
      const cy = sumY / count;
      keys.forEach(k => {
        if (currentLipPoints[k]) {
          currentLipPoints[k].x = cx + (currentLipPoints[k].x - cx) * factor;
          currentLipPoints[k].y = cy + (currentLipPoints[k].y - cy) * factor;
        }
      });
    }
  } else if (action === 'rotate') {
    const deg = val1 || 0;
    const rad = (deg * Math.PI) / 180;
    let sumX = 0, sumY = 0, count = 0;
    keys.forEach(k => {
      if (currentLipPoints[k]) {
        sumX += currentLipPoints[k].x;
        sumY += currentLipPoints[k].y;
        count++;
      }
    });
    if (count > 0) {
      const cx = sumX / count;
      const cy = sumY / count;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      keys.forEach(k => {
        if (currentLipPoints[k]) {
          const dx = currentLipPoints[k].x - cx;
          const dy = currentLipPoints[k].y - cy;
          currentLipPoints[k].x = cx + dx * cos - dy * sin;
          currentLipPoints[k].y = cy + dx * sin + dy * cos;
        }
      });
    }
  }

  updateLipLayers(currentLipPoints);
};

// SVG Coordinate Helper for Drag Events
function getSVGCoordinates(svg, e) {
  const pt = svg.createSVGPoint();
  if (e.touches && e.touches.length > 0) {
    pt.x = e.touches[0].clientX;
    pt.y = e.touches[0].clientY;
  } else {
    pt.x = e.clientX;
    pt.y = e.clientY;
  }
  const ctm = svg.getScreenCTM();
  if (ctm) {
    return pt.matrixTransform(ctm.inverse());
  }
  return { x: pt.x, y: pt.y };
}

// Handle Dragging Initialization
function initHandleDragging() {
  const svgEditor = document.getElementById('lip-editor-svg');
  if (!svgEditor) return;

  const handles = document.querySelectorAll('.lip-handle');

  handles.forEach(handle => {
    const onStart = (e) => {
      e.preventDefault();
      draggedPointKey = handle.getAttribute('data-point');
      handle.classList.add('active-dragging');
    };

    handle.addEventListener('mousedown', onStart);
    handle.addEventListener('touchstart', onStart, { passive: false });
  });

  const onMove = (e) => {
    if (!draggedPointKey || !isManualAdjustMode) return;
    e.preventDefault();

    const pos = getSVGCoordinates(svgEditor, e);
    if (currentLipPoints[draggedPointKey]) {
      currentLipPoints[draggedPointKey].x = Math.round(pos.x * 10) / 10;
      currentLipPoints[draggedPointKey].y = Math.round(pos.y * 10) / 10;
      updateLipLayers(currentLipPoints);
    }
  };

  const onEnd = () => {
    if (draggedPointKey) {
      document.querySelectorAll('.lip-handle').forEach(h => h.classList.remove('active-dragging'));
      draggedPointKey = null;
    }
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

// Manual Adjust Mode Switcher
function setManualAdjustMode(active) {
  isManualAdjustMode = active;
  const panel = document.getElementById('manual-adjust-panel');
  const group = document.getElementById('lip-editor-group');
  const toggleBtn = document.getElementById('toggle-manual-mode-btn');
  const tag = document.getElementById('mask-status-tag');
  const shadeGroup = document.getElementById('shade-picker-group');

  if (active) {
    panel?.classList.remove('hidden');
    group?.classList.remove('hidden');
    toggleBtn?.classList.add('active-mode');
    if (tag) {
      tag.textContent = "✏️ Manual Adjustment Mode Active";
      tag.classList.add('manual-active');
    }
    currentLipPoints = JSON.parse(JSON.stringify(savedLipPoints));
    updateLipLayers(currentLipPoints);
  } else {
    panel?.classList.add('hidden');
    group?.classList.add('hidden');
    toggleBtn?.classList.remove('active-mode');
    if (tag) {
      tag.textContent = "✨ Custom Mask Applied";
      tag.classList.remove('manual-active');
    }
  }
}

document.getElementById('toggle-manual-mode-btn')?.addEventListener('click', () => {
  setManualAdjustMode(!isManualAdjustMode);
});

// Region Tab Selector
document.querySelectorAll('.adjust-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.adjust-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeRegion = tab.dataset.region || 'both';
  });
});

// Reset & Confirm Buttons
document.getElementById('reset-mask-btn')?.addEventListener('click', () => {
  currentLipPoints = JSON.parse(JSON.stringify(AUTO_LIP_POINTS));
  savedLipPoints = JSON.parse(JSON.stringify(AUTO_LIP_POINTS));
  updateLipLayers(currentLipPoints);
  const tag = document.getElementById('mask-status-tag');
  if (tag) {
    tag.textContent = "✨ Auto Detection Active";
    tag.classList.remove('manual-active');
  }
  showToast("🔄 Restored auto-detected lip mask!");
});

document.getElementById('confirm-mask-btn')?.addEventListener('click', () => {
  savedLipPoints = JSON.parse(JSON.stringify(currentLipPoints));
  setManualAdjustMode(false);
  showToast("✅ Saved custom lip mask! Select any shade below.");
});

// Shade Selector Handler
window.selectVirtualShade = function(colorHex, shadeName) {
  activeVirtualShade = { name: shadeName, color: colorHex };

  const studioColorName = document.getElementById('studio-color-name');
  if (studioColorName) studioColorName.textContent = shadeName;

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.classList.remove('active');
    if (dot.getAttribute('data-shade') === shadeName) {
      dot.classList.add('active');
    }
  });

  const studioCartBtn = document.getElementById('studio-cart-btn');
  if (studioCartBtn) {
    studioCartBtn.textContent = `Add ${shadeName} to Cart`;
  }

  // Update fill colors on all 4 blend mode layers
  const lipPaths = document.querySelectorAll('.lip-path, .lip-path-soft, .lip-path-mult, .lip-path-overlay');
  lipPaths.forEach(path => {
    path.style.fill = colorHex;
  });

  // Apply saved mask coordinates
  updateLipLayers(savedLipPoints);
};

window.addStudioShadeToCart = function() {
  const shadeName = activeVirtualShade.name || 'Ruby Royal';
  const colorHex = activeVirtualShade.color || '#b82e46';
  
  const studioItem = {
    id: Date.now(),
    name: `Velvet Satin Lipstick (${shadeName})`,
    category: "lips",
    price: 34.00,
    rating: "4.9 ★ (128 reviews)",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    shades: [colorHex]
  };

  cart.push(studioItem);
  updateCart();
  showToast(`Added <strong>Velvet Satin Lipstick (${shadeName})</strong> to your bag ✨`);
};

// ==================================================
// 8. SHADE MATCHING QUIZ LOGIC
// ==================================================
window.selectTone = function(btn, toneName) {
  btn.parentElement.querySelectorAll('.swatch-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedToneName = toneName;
  updateShadeRecommendation();
};

window.selectUndertone = function(btn, undertoneName) {
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedUndertoneName = undertoneName;
  updateShadeRecommendation();
};

window.selectFinish = function(btn, finishName) {
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedFinishName = finishName;
  updateShadeRecommendation();
};

function updateShadeRecommendation() {
  const nameEl = document.getElementById('matched-shade-name');
  if (nameEl) {
    nameEl.textContent = `${selectedToneName} (${selectedUndertoneName} ${selectedFinishName})`;
  }
}

// ==================================================
// 9. TOAST NOTIFICATIONS & INITIALIZATION
// ==================================================
const toastContainer = document.getElementById('toast-container');

function showToast(message) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.showToast = showToast;

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.id === 'services-toggle' && window.innerWidth <= 992) return;

    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts();
  renderReviews();
  initHandleDragging();
  updateLipLayers(savedLipPoints);
});
