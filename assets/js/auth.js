/* ============ AUTH MODULE ============ */
const Auth = (() => {

  function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.querySelectorAll('[data-form]').forEach(f => f.style.display = f.dataset.form === tab ? 'block' : 'none');
  }

  function togglePass(btn) {
    const input = btn.previousElementSibling;
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.innerHTML = show ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
  }

  function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value.trim();
    const pass = document.getElementById('loginPass')?.value.trim();
    if (!email || !pass) { toast('Please fill in all fields'); return; }
    // Demo only — real auth needs a backend
    localStorage.setItem('aw_user', JSON.stringify({ email, name: email.split('@')[0] }));
    toast('Welcome back!');
    setTimeout(() => location.href = 'index.html', 800);
  }

  function signup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName')?.value.trim();
    const email = document.getElementById('signupEmail')?.value.trim();
    const pass = document.getElementById('signupPass')?.value.trim();
    const confirm = document.getElementById('signupConfirm')?.value.trim();
    if (!name || !email || !pass) { toast('Please fill in all fields'); return; }
    if (pass !== confirm) { toast('Passwords do not match'); return; }
    localStorage.setItem('aw_user', JSON.stringify({ name, email }));
    toast('Account created!');
    setTimeout(() => location.href = 'index.html', 800);
  }

  function init() {
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    document.querySelectorAll('.auth-toggle-pass').forEach(btn => {
      btn.addEventListener('click', () => togglePass(btn));
    });
    document.getElementById('loginForm')?.addEventListener('submit', login);
    document.getElementById('signupForm')?.addEventListener('submit', signup);
  }

  return { init };
})();