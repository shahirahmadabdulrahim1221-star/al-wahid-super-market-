/* ============ PRODUCT DATA + RENDERING MODULE ============ */
const DEPARTMENTS = [
  { id: 'grocery',     name: 'Grocery',       desc: 'Rice, flour, oils, spices',  count: 1240, icon: '🌾', color: 'linear-gradient(135deg,#22c55e,#15803d)' },
  { id: 'fresh',       name: 'Fresh Food',    desc: 'Fruits, vegetables, meat',   count: 680,  icon: '🥬', color: 'linear-gradient(135deg,#84cc16,#16a34a)' },
  { id: 'beverages',   name: 'Beverages',     desc: 'Water, juices, tea, coffee', count: 420,  icon: '☕', color: 'linear-gradient(135deg,#06b6d4,#0e7490)' },
  { id: 'household',   name: 'Household',     desc: 'Cleaning, laundry, paper',   count: 560,  icon: '🏠', color: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
  { id: 'personal',    name: 'Personal Care', desc: 'Shampoo, soap, skincare',    count: 480,  icon: '🧴', color: 'linear-gradient(135deg,#ec4899,#be185d)' },
  { id: 'baby',        name: 'Baby',          desc: 'Baby food, diapers, care',   count: 260,  icon: '🍼', color: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { id: 'electronics', name: 'Electronics',   desc: 'Appliances, accessories',    count: 320,  icon: '⚡', color: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' },
  { id: 'fashion',     name: 'Fashion',       desc: 'Clothing, shoes, bags',      count: 390,  icon: '👕', color: 'linear-gradient(135deg,#f97316,#dc2626)' },
];

const PRODUCTS = [
  { id: 'p1',  name: 'Premium Basmati Rice',     brand: 'Al Wahid Select',  dept: 'grocery',     price: 320, oldPrice: 380, discount: 16, rating: 4.8, reviews: 1240, unit: '5 kg',     image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p2',  name: 'Fresh Tomatoes',           brand: 'Local Farm',       dept: 'fresh',       price: 45,  oldPrice: 60,  discount: 25, rating: 4.6, reviews: 340,  unit: '1 kg',     image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p3',  name: 'Nestlé Pure Life Water',   brand: 'Nestlé',           dept: 'beverages',   price: 90,                              rating: 4.7, reviews: 890,  unit: '6-pack',   image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p4',  name: 'Persil Laundry Detergent', brand: 'Persil',           dept: 'household',   price: 240, oldPrice: 300, discount: 20, rating: 4.5, reviews: 220,  unit: '3 L',      image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p5',  name: 'Dove Repair Shampoo',      brand: 'Dove',             dept: 'personal',    price: 180,                             rating: 4.7, reviews: 560,  unit: '400 ml',   new: true, image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p6',  name: 'Pampers Baby Diapers',     brand: 'Pampers',          dept: 'baby',        price: 420, oldPrice: 500, discount: 16, rating: 4.9, reviews: 1520, unit: 'Size 3',   image: 'https://images.pexels.com/photos/3845457/pexels-photo-3845457.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p7',  name: 'Philips Electric Kettle',  brand: 'Philips',          dept: 'electronics', price: 950, oldPrice: 1200, discount: 21, rating: 4.6, reviews: 180, unit: '1.7 L',    image: 'https://images.pexels.com/photos/6996085/pexels-photo-6996085.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p8',  name: "Men's Cotton Shirt",       brand: 'Al Wahid Fashion', dept: 'fashion',     price: 650,                             rating: 4.4, reviews: 90,   new: true, image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p9',  name: 'Fresh Chicken Breast',     brand: 'Al Wahid Butcher', dept: 'fresh',       price: 280, oldPrice: 320, discount: 12, rating: 4.7, reviews: 210, unit: '1 kg',     image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p10', name: 'Lipton Yellow Label Tea',  brand: 'Lipton',           dept: 'beverages',   price: 220,                             rating: 4.8, reviews: 720, unit: '100 bags', image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p11', name: 'Fresh Bananas',            brand: 'Local Farm',       dept: 'fresh',       price: 80,                              rating: 4.6, reviews: 410, unit: '1 kg',     image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'p12', name: 'Ariel Washing Powder',     brand: 'Ariel',            dept: 'household',   price: 380, oldPrice: 450, discount: 15, rating: 4.6, reviews: 380, unit: '4 kg',     image: 'https://images.pexels.com/photos/7263006/pexels-photo-7263006.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const PRODUCT_CATEGORIES = {
  p1: 'Rice', p2: 'Vegetables', p3: 'Water', p4: 'Laundry', p5: 'Hair Care', p6: 'Diapers',
  p7: 'Kitchen Appliances', p8: 'Clothing', p9: 'Chicken', p10: 'Tea', p11: 'Fruits', p12: 'Laundry',
};

const CATEGORIES = {
  grocery:     ['All', 'Rice', 'Flour', 'Sugar', 'Cooking Oil', 'Pasta', 'Canned Food', 'Spices', 'Breakfast'],
  fresh:       ['All', 'Fruits', 'Vegetables', 'Meat', 'Chicken', 'Fish', 'Dairy', 'Eggs', 'Bakery'],
  beverages:   ['All', 'Water', 'Juice', 'Soft Drinks', 'Tea', 'Coffee', 'Energy Drinks'],
  household:   ['All', 'Cleaning', 'Laundry', 'Kitchen', 'Paper Products', 'Home Essentials'],
  personal:    ['All', 'Shampoo', 'Soap', 'Skincare', 'Oral Care', 'Hair Care', 'Hygiene'],
  baby:        ['All', 'Baby Food', 'Diapers', 'Baby Care', 'Accessories'],
  electronics: ['All', 'Small Appliances', 'Kitchen Appliances', 'Accessories', 'Batteries'],
  fashion:     ['All', 'Clothing', 'Shoes', 'Bags', 'Accessories'],
};

/* ---------- PRODUCT CARD (real images) ---------- */
function productCardHTML(p) {
  const wished = Cart.isWished(p.id);
  const badge = p.discount
    ? `<span class="product-badge">-${p.discount}%</span>`
    : p.new ? `<span class="product-badge new">NEW</span>` : '';
  return `
    <div class="product-card" data-reveal>
      <div class="product-image">
        ${badge}
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.parentElement.parentElement.style.background='${p.bg || '#f0fdf4'}';this.style.display='none';this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:96px\\'>${p.emoji || '🛍️'}</div>'" />
        </a>
        <div class="product-actions">
          <button onclick="Cart.toggleWishlist('${p.id}')" class="${wished ? 'active' : ''}" aria-label="Wishlist">
            <i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <button onclick="location.href='product.html?id=${p.id}'" aria-label="View"><i class="fa-regular fa-eye"></i></button>
        </div>
        <button class="add-cart-btn" onclick="Cart.add(PRODUCTS.find(x => x.id === '${p.id}'))">
          <i class="fa-solid fa-bag-shopping"></i> Add to Cart
        </button>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <a href="product.html?id=${p.id}" class="product-name">${p.name}</a>
        <div class="product-meta">
          <span class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating}</span>
          <span>(${p.reviews})</span>
          ${p.unit ? `<span>· ${p.unit}</span>` : ''}
        </div>
        <div class="product-price">
          <span class="price-current">${formatAFN(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatAFN(p.oldPrice)}</span>` : ''}
        </div>
      </div>
    </div>`;
}

/* ---------- HOME PAGE ---------- */
function renderHome() {
  const featured = document.getElementById('featuredGrid');
  if (featured) featured.innerHTML = PRODUCTS.slice(0, 8).map(productCardHTML).join('');

  const deals = document.getElementById('dealsGrid');
  if (deals) deals.innerHTML = PRODUCTS.filter(p => p.discount).map(productCardHTML).join('');

  const newG = document.getElementById('newGrid');
  if (newG) newG.innerHTML = PRODUCTS.filter(p => p.new).map(productCardHTML).join('');

  const deptGrid = document.getElementById('deptGrid');
  if (deptGrid) {
    deptGrid.innerHTML = DEPARTMENTS.map(d => `
      <a href="categories.html?dept=${d.id}" class="dept-card">
        <div class="dept-icon" style="background:${d.color};color:white;">${d.icon}</div>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="dept-count">${d.count}+ products</div>
      </a>
    `).join('');
  }
}

/* ---------- CATEGORIES PAGE ---------- */
let shopState = { dept: 'all', category: 'All', sort: 'popular', search: '' };

function initCategoriesPage() {
  const pillsEl = document.getElementById('deptPills');
  if (!pillsEl) return;

  const urlDept = new URLSearchParams(location.search).get('dept');
  if (urlDept && DEPARTMENTS.some(d => d.id === urlDept)) shopState.dept = urlDept;

  renderDeptPills();
  renderCategoryBar();
  applyFilters();

  document.getElementById('sortSelect')?.addEventListener('change', e => {
    shopState.sort = e.target.value;
    applyFilters();
  });
}

function renderDeptPills() {
  const el = document.getElementById('deptPills');
  if (!el) return;
  const total = PRODUCTS.length;
  el.innerHTML = `
    <button class="dept-pill ${shopState.dept === 'all' ? 'active' : ''}" onclick="setDept('all')">
      🛍️ All Products <small>${total}</small>
    </button>
    ${DEPARTMENTS.map(d => {
      const count = PRODUCTS.filter(p => p.dept === d.id).length;
      return `<button class="dept-pill ${shopState.dept === d.id ? 'active' : ''}" onclick="setDept('${d.id}')">
        ${d.icon} ${d.name} <small>${count}</small>
      </button>`;
    }).join('')}
  `;
}

function setDept(id) {
  shopState.dept = id;
  shopState.category = 'All';
  renderDeptPills();
  renderCategoryBar();
  updateShopHeader();
  applyFilters();

  const url = new URL(location);
  if (id === 'all') url.searchParams.delete('dept');
  else url.searchParams.set('dept', id);
  history.replaceState({}, '', url);
}

function renderCategoryBar() {
  const el = document.getElementById('categoryBar');
  if (!el) return;
  if (shopState.dept === 'all') { el.innerHTML = ''; el.style.display = 'none'; return; }
  const cats = CATEGORIES[shopState.dept] || ['All'];
  el.style.display = 'flex';
  el.innerHTML = cats.map(c => `
    <button class="category-chip ${shopState.category === c ? 'active' : ''}" onclick="setCategory('${c}')">${c}</button>
  `).join('');
}

function setCategory(c) {
  shopState.category = c;
  renderCategoryBar();
  applyFilters();
}

function updateShopHeader() {
  const titleEl = document.getElementById('pageTitle');
  const subEl = document.getElementById('pageSubtitle');
  const eyebrowEl = document.getElementById('pageEyebrow');
  if (!titleEl) return;
  if (shopState.dept === 'all') {
    eyebrowEl.textContent = 'Explore';
    titleEl.textContent = 'All Departments';
    subEl.textContent = 'Every aisle of Al Wahid Hyper Market — from fresh food to electronics.';
  } else {
    const d = DEPARTMENTS.find(x => x.id === shopState.dept);
    eyebrowEl.textContent = 'Department';
    titleEl.textContent = d.name;
    subEl.textContent = d.desc;
  }
}

function applyFilters() {
  const grid = document.getElementById('shopGrid');
  const empty = document.getElementById('shopEmpty');
  const count = document.getElementById('resultCount');
  if (!grid) return;

  let list = [...PRODUCTS];
  if (shopState.dept !== 'all') list = list.filter(p => p.dept === shopState.dept);
  if (shopState.category !== 'All') list = list.filter(p => (PRODUCT_CATEGORIES[p.id] || '') === shopState.category);

  switch (shopState.sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default:           list.sort((a, b) => b.reviews - a.reviews);
  }

  if (list.length === 0) { grid.innerHTML = ''; empty.style.display = 'block'; }
  else { empty.style.display = 'none'; grid.innerHTML = list.map(productCardHTML).join(''); }

  if (count) count.innerHTML = `Showing <strong>${list.length}</strong> of <strong>${PRODUCTS.length}</strong> products`;
}

/* ---------- PRODUCT DETAIL PAGE ---------- */
function initProductPage() {
  const container = document.getElementById('productDetail');
  if (!container) return;

  const id = new URLSearchParams(location.search).get('id');
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const wished = Cart.isWished(p.id);

  container.innerHTML = `
    <div class="pd-grid">
      <div class="pd-gallery">
        <img src="${p.image}" alt="${p.name}" />
        ${p.discount ? `<span class="product-badge">-${p.discount}%</span>` : ''}
        ${p.new && !p.discount ? `<span class="product-badge new">NEW</span>` : ''}
      </div>
      <div>
        <div class="product-brand">${p.brand}</div>
        <h1 class="pd-title" data-reveal>${p.name}</h1>
        <div class="product-meta" style="margin-top:12px;">
          <span class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating}</span>
          <span>(${p.reviews} reviews)</span>
          ${p.unit ? `<span>· ${p.unit}</span>` : ''}
        </div>
        <div class="pd-price">
          <span class="price-current">${formatAFN(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatAFN(p.oldPrice)}</span>` : ''}
        </div>
        <p class="pd-desc">Premium quality from Al Wahid Hyper Market, Kabul. Carefully selected for our customers. Delivered fresh to your door — or your money back.</p>
        <div class="pd-stock"><span class="dot"></span> In Stock</div>

        <div class="pd-buy-row">
          <div class="qty-control pd-qty">
            <button onclick="pdQty(-1)"><i class="fa-solid fa-minus"></i></button>
            <span id="pdQtyVal">1</span>
            <button onclick="pdQty(1)"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="btn btn-primary pd-add" onclick="pdAdd('${p.id}')"><i class="fa-solid fa-bag-shopping"></i> Add to Cart</button>
          <button class="pd-wish ${wished ? 'active' : ''}" onclick="Cart.toggleWishlist('${p.id}'); this.classList.toggle('active');">
            <i class="fa-${wished ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <button class="btn btn-primary pd-buy-now" onclick="pdBuyNow('${p.id}')"><i class="fa-solid fa-bolt"></i> Buy Now</button>

        <div class="pd-features">
          <div><i class="fa-solid fa-truck-fast"></i> <strong>Free delivery</strong> over 500 AFN in Kabul</div>
          <div><i class="fa-solid fa-shield-halved"></i> <strong>Fresh guarantee</strong> or money back</div>
          <div><i class="fa-solid fa-rotate-left"></i> <strong>Easy returns</strong> within 24 hours</div>
        </div>
      </div>
    </div>
  `;

  const related = PRODUCTS.filter(x => x.id !== p.id && x.dept === p.dept).slice(0, 4);
  const rel = document.getElementById('relatedGrid');
  if (rel && related.length) rel.innerHTML = related.map(productCardHTML).join('');

  if (new URLSearchParams(location.search).get('checkout') === '1') {
    document.getElementById('checkoutSection')?.scrollIntoView();
  }
}

let pdQ = 1;
function pdQty(d) {
  pdQ = Math.max(1, pdQ + d);
  const el = document.getElementById('pdQtyVal');
  if (el) el.textContent = pdQ;
}

function pdAdd(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  Cart.add(p, pdQ);
  pdQ = 1;
  const el = document.getElementById('pdQtyVal');
  if (el) el.textContent = 1;
}

function pdBuyNow(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  Cart.clear();
  Cart.add(p, pdQ);
  Cart.close();
  goCheckout();
}

/* ---------- CHECKOUT ---------- */
function goCheckout() {
  const section = document.getElementById('checkoutSection');
  if (!section) { location.href = 'product.html?checkout=1'; return; }
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth' });
  goStep(1);
}

function goStep(step) {
  document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + step)?.classList.add('active');
  document.querySelectorAll('.checkout-progress-item').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === step);
    s.classList.toggle('done', i + 1 < step);
  });
  const section = document.getElementById('checkoutSection');
  if (section) window.scrollTo({ top: section.offsetTop - 100, behavior: 'smooth' });
}

function nextStep(from) {
  if (from === 1) {
    const name = document.getElementById('custName')?.value.trim();
    const phone = document.getElementById('custPhone')?.value.trim();
    if (!name || !phone) { toast('Please enter your name and phone'); return; }
  }
  if (from === 2) {
    const addr = document.getElementById('custAddress')?.value.trim();
    if (!addr) { toast('Please enter your address'); return; }
  }
  goStep(from + 1);
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const box = document.getElementById('checkoutSummary');
  const items = document.getElementById('checkoutItems');
  if (!box || !items) return;
  const cartItems = Cart.getItems();

  if (cartItems.length === 0) {
    items.innerHTML = '<p style="color:var(--muted);">Your cart is empty.</p>';
    box.innerHTML = '';
    return;
  }

  items.innerHTML = cartItems.map(i => `
    <div class="checkout-item">
      <img src="${i.image}" alt="${i.name}" onerror="this.style.display='none'" />
      <div style="flex:1">
        <div class="product-brand">${i.brand}</div>
        <div style="font-size:13px;font-weight:500;">${i.name}</div>
        <div style="font-size:12px;color:var(--muted);">Qty ${i.qty} × ${formatAFN(i.price)}</div>
      </div>
      <div style="font-family:'Sora';font-weight:700;color:var(--brand);font-size:14px;">${formatAFN(i.price * i.qty)}</div>
    </div>
  `).join('');

  const sub = Cart.subtotal();
  const delivery = sub >= 500 ? 0 : 100;
  const total = sub + delivery;

  box.innerHTML = `
    <div class="cart-row"><span>Subtotal</span><span>${formatAFN(sub)}</span></div>
    <div class="cart-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : formatAFN(delivery)}</span></div>
    <div class="cart-row total"><span>Total</span><span style="color:var(--brand)">${formatAFN(total)}</span></div>
  `;
}

function placeOrder() {
  const items = Cart.getItems();
  if (items.length === 0) { toast('Cart is empty'); return; }

  const order = {
    id: 'AW-' + Date.now().toString().slice(-6),
    items,
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    date: new Date().toISOString(),
    name: document.getElementById('custName')?.value || '',
    phone: document.getElementById('custPhone')?.value || '',
    address: document.getElementById('custAddress')?.value || '',
    payment: document.querySelector('input[name="payment"]:checked')?.value || 'cod',
  };
  localStorage.setItem('aw_last_order', JSON.stringify(order));
  Cart.clear();

  document.getElementById('checkoutSection').innerHTML = `
    <div class="success-hero">
      <div class="success-icon"><i class="fa-solid fa-check"></i></div>
      <h1 data-reveal>Order Confirmed!</h1>
      <p>Thank you for shopping with Al Wahid. Order <strong>${order.id}</strong> is being prepared and will be delivered shortly.</p>
      <a href="index.html" class="btn btn-primary"><i class="fa-solid fa-house"></i> Continue Shopping</a>
    </div>
  `;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('Order placed successfully');
}

/* ---------- SEARCH ---------- */
function initSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (!overlay) return;
  document.getElementById('searchBtn')?.addEventListener('click', () => {
    overlay.classList.add('open');
    setTimeout(() => document.getElementById('searchInput')?.focus(), 200);
  });
  document.getElementById('searchClose')?.addEventListener('click', () => overlay.classList.remove('open'));
  document.getElementById('searchInput')?.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    const results = document.getElementById('searchResults');
    if (!q) { results.innerHTML = ''; return; }
    const found = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    ).slice(0, 6);
    if (found.length === 0) {
      results.innerHTML = `<div style="color:rgba(255,255,255,.5);text-align:center;padding:20px;">No results for "${q}"</div>`;
      return;
    }
    results.innerHTML = found.map(p => `
      <a href="product.html?id=${p.id}" class="search-result">
        <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'" />
        <div style="flex:1">
          <strong>${p.name}</strong>
          <small style="display:block">${p.brand} · ${formatAFN(p.price)}</small>
        </div>
        <i class="fa-solid fa-arrow-right" style="color:rgba(255,255,255,.4)"></i>
      </a>
    `).join('');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  renderHome();
  initCategoriesPage();
  initProductPage();
  initSearch();
  renderCheckoutSummary();

  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

  const themeBtn = document.getElementById('themeBtn');
  const savedTheme = localStorage.getItem('aw_theme');
  const sysTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initial = savedTheme || sysTheme;
  document.documentElement.setAttribute('data-theme', initial);
  updateThemeIcon(initial);
  themeBtn?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aw_theme', next);
    updateThemeIcon(next);
  });

  document.getElementById('menuBtn')?.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    if (!links) return;
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    Object.assign(links.style, {
      position: 'absolute', top: '100%', left: '0', right: '0',
      flexDirection: 'column', background: 'var(--card)',
      padding: '12px', borderBottom: '1px solid var(--border)',
    });
  });
});

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeBtn');
  if (btn) btn.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}