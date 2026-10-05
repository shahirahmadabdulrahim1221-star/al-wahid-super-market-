/* ============ CART MODULE ============ */
const Cart = (() => {
  let cart = JSON.parse(localStorage.getItem('aw_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('aw_wishlist') || '[]');

  function save() {
    localStorage.setItem('aw_cart', JSON.stringify(cart));
    localStorage.setItem('aw_wishlist', JSON.stringify(wishlist));
    render();
    updateCount();
  }

  function add(product, qty = 1) {
    const ex = cart.find(x => x.id === product.id);
    if (ex) ex.qty += qty;
    else cart.push({ ...product, qty });
    save();
    open();
    toast(`${product.name} added to cart`);
  }

  function remove(id) {
    cart = cart.filter(x => x.id !== id);
    save();
  }

  function updateQty(id, delta) {
    const item = cart.find(x => x.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
    save();
  }

  function clear() { cart = []; save(); }

  function toggleWishlist(id) {
    const i = wishlist.indexOf(id);
    if (i >= 0) wishlist.splice(i, 1);
    else { wishlist.push(id); toast('Added to wishlist'); }
    save();
    // refresh product cards
    document.dispatchEvent(new CustomEvent('wishlist:changed'));
  }

  function isWished(id) { return wishlist.includes(id); }

  function getItems() { return cart; }

  function subtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

  function itemCount() { return cart.reduce((s, i) => s + i.qty, 0); }

  function updateCount() {
    const el = document.getElementById('cartCount');
    if (el) el.textContent = itemCount();
  }

  function open() {
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('cartBackdrop')?.classList.add('open');
  }

  function close() {
    document.getElementById('cartDrawer')?.classList.remove('open');
    document.getElementById('cartBackdrop')?.classList.remove('open');
  }

  function render() {
    const body = document.getElementById('cartBody');
    const foot = document.getElementById('cartFoot');
    if (!body || !foot) return;

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-bag-shopping"></i>
          <h3>Your cart is empty</h3>
          <p>Start shopping to fill it up with fresh groceries.</p>
          <a href="categories.html" class="btn btn-primary">Start Shopping</a>
        </div>`;
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-brand">${item.brand}</div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button onclick="Cart.updateQty('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
              <span>${item.qty}</span>
              <button onclick="Cart.updateQty('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span class="cart-item-price">${formatAFN(item.price * item.qty)}</span>
            <button class="cart-item-remove" onclick="Cart.remove('${item.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    `).join('');

    const sub = subtotal();
    const delivery = sub >= 500 ? 0 : 100;
    const total = sub + delivery;

    foot.innerHTML = `
      <div class="cart-row"><span>Subtotal</span><span>${formatAFN(sub)}</span></div>
      <div class="cart-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : formatAFN(delivery)}</span></div>
      <div class="cart-row total"><span>Total</span><span style="color:var(--brand)">${formatAFN(total)}</span></div>
      <button class="btn btn-primary" onclick="Cart.checkout()">Proceed to Checkout <i class="fa-solid fa-arrow-right"></i></button>
    `;
  }

  function checkout() {
    if (cart.length === 0) return;
    window.location.href = 'product.html?checkout=1';
  }

  function bindUI() {
    document.getElementById('cartBtn')?.addEventListener('click', open);
    document.getElementById('cartClose')?.addEventListener('click', close);
    document.getElementById('cartBackdrop')?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  function init() {
    render();
    updateCount();
    bindUI();
  }

  return { init, add, remove, updateQty, clear, toggleWishlist, isWished, getItems, subtotal, itemCount, open, close, render, checkout };
})();

function formatAFN(n) { return n.toLocaleString('en-US') + ' AFN'; }

function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}