/* ============ THREE.JS SCENE MODULE ============ */
const Scene3D = (() => {

  function createSupermarketScene(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof THREE === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const mode = options.mode || 'entrance'; // 'entrance' | 'ambient' | 'login'

    const scene = new THREE.Scene();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const bg = mode === 'login' ? 0x0a0e1a : (isDark ? 0x0a0e1a : 0xf0f9ff);
    scene.background = new THREE.Color(bg);
    scene.fog = new THREE.Fog(bg, 10, 32);

    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1.6, 12);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: mode === 'login' });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.shadowMap.enabled = !isMobile;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, mode === 'login' ? 0.4 : 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, mode === 'login' ? 1 : 0.8);
    dir.position.set(5, 8, 5);
    dir.castShadow = !isMobile;
    scene.add(dir);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({
        color: mode === 'login' ? 0x1a2332 : 0xe2e8f0,
        roughness: 0.3,
        metalness: 0.2
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = !isMobile;
    scene.add(floor);

    // Grid
    if (mode !== 'login') {
      const grid = new THREE.GridHelper(40, 20, 0x94a3b8, 0xcbd5e1);
      grid.position.y = 0.01;
      scene.add(grid);
    }

    // Ceiling lights
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff8e7, emissiveIntensity: 2 });
    for (let x = -4; x <= 4; x += 2.5) {
      for (let z = -3; z <= 3; z += 3) {
        const l = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.4), lightMat);
        l.position.set(x, 4.5, z);
        scene.add(l);
      }
    }

    // Shelf builder
    function buildShelf(x, z = 0) {
      const g = new THREE.Group();
      const shelfMat = new THREE.MeshStandardMaterial({ color: mode === 'login' ? 0x2a3547 : 0xe2e8f0, roughness: 0.6 });
      const legMat = new THREE.MeshStandardMaterial({ color: mode === 'login' ? 0x3a4a5d : 0x94a3b8 });

      for (let y = 0; y <= 2.7; y += 0.9) {
        const s = new THREE.Mesh(new THREE.BoxGeometry(2, 0.08, 0.9), shelfMat);
        s.position.y = y;
        if (!isMobile) s.castShadow = true;
        g.add(s);
      }
      [-1.05, 1.05].forEach(sx => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3, 0.9), legMat);
        leg.position.set(sx, 1.5, 0);
        if (!isMobile) leg.castShadow = true;
        g.add(leg);
      });

      const colors = [0xfbbf24, 0x22c55e, 0x3b82f6, 0xef4444, 0xa855f7];
      for (let y = 0.28; y <= 2.98; y += 0.9) {
        for (let px = -0.6; px <= 0.6; px += 0.6) {
          const box = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.45, 0.5),
            new THREE.MeshStandardMaterial({
              color: colors[Math.floor(Math.random() * colors.length)],
              roughness: 0.4
            })
          );
          box.position.set(px, y, 0);
          if (!isMobile) box.castShadow = true;
          g.add(box);
        }
      }
      g.position.set(x, 0, z);
      return g;
    }

    scene.add(buildShelf(-3.5));
    scene.add(buildShelf(3.5));

    // Shopping cart
    function buildCart(x, z) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.5, 1),
        new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.3 })
      );
      body.position.y = 0.4;
      if (!isMobile) body.castShadow = true;
      g.add(body);

      [-0.3, 0.3].forEach(wx => {
        [-0.4, 0.4].forEach(wz => {
          const wheel = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.05),
            new THREE.MeshStandardMaterial({ color: 0x1e293b })
          );
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(wx, 0.08, wz);
          g.add(wheel);
        });
      });
      g.position.set(x, 0, z);
      return g;
    }

    if (mode !== 'login') {
      scene.add(buildCart(-2, 5));
      scene.add(buildCart(2, 5));
    }

    // Sliding doors
    let leftDoor, rightDoor;
    if (mode === 'entrance') {
      const doorMat = new THREE.MeshPhysicalMaterial({
        color: 0xbae6fd, transmission: 0.9, roughness: 0.05,
        thickness: 0.5, transparent: true, opacity: 0.75
      });
      leftDoor = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.06), doorMat);
      rightDoor = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.06), doorMat);
      leftDoor.position.set(-1.1, 1.4, 4);
      rightDoor.position.set(1.1, 1.4, 4);
      scene.add(leftDoor, rightDoor);

      // Frame
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(4.4, 0.15, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
      );
      frame.position.set(0, 2.9, 4);
      scene.add(frame);
    }

    // Floating orbs for login mode
    if (mode === 'login') {
      for (let i = 0; i < 12; i++) {
        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(Math.random() * 0.15 + 0.05, 16, 16),
          new THREE.MeshStandardMaterial({
            color: [0x22c55e, 0xfbbf24, 0x4ade80][i % 3],
            emissive: [0x22c55e, 0xfbbf24, 0x4ade80][i % 3],
            emissiveIntensity: 0.6
          })
        );
        orb.position.set(
          (Math.random() - 0.5) * 16,
          Math.random() * 4 + 1,
          (Math.random() - 0.5) * 16
        );
        orb.userData.speed = 0.3 + Math.random() * 0.5;
        orb.userData.offset = Math.random() * Math.PI * 2;
        orb.userData.baseY = orb.position.y;
        scene.add(orb);
        if (!scene.userData.orbs) scene.userData.orbs = [];
        scene.userData.orbs.push(orb);
      }
    }

    // Scroll camera (only for entrance)
    let scrollY = 0;
    if (mode === 'entrance') {
      window.addEventListener('scroll', () => {
        scrollY = window.scrollY / window.innerHeight;
      }, { passive: true });
    }

    // Resize
    window.addEventListener('resize', () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Animate
    let t = 0;
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      t += reduced ? 0.002 : delta;

      if (leftDoor && rightDoor) {
        const open = (Math.sin(t * 0.8) + 1) / 2;
        leftDoor.position.x = -1.1 - open * 0.9;
        rightDoor.position.x = 1.1 + open * 0.9;
      }

      if (mode === 'entrance') {
        const targetZ = 12 - Math.min(scrollY, 1) * 8;
        camera.position.z += (targetZ - camera.position.z) * 0.05;
        camera.position.y = 1.6 + Math.sin(scrollY * Math.PI) * 0.3;
        camera.lookAt(0, 1.6, camera.position.z - 4);
      } else if (mode === 'login') {
        camera.position.x = Math.sin(t * 0.3) * 1.2;
        camera.position.y = 1.6 + Math.sin(t * 0.5) * 0.2;
        camera.lookAt(0, 1.6, 0);

        if (scene.userData.orbs) {
          scene.userData.orbs.forEach(orb => {
            orb.position.y = orb.userData.baseY + Math.sin(t * orb.userData.speed + orb.userData.offset) * 0.6;
            orb.rotation.y += delta * 0.5;
          });
        }
      } else {
        // ambient: slow drift
        camera.position.x = Math.sin(t * 0.2) * 0.8;
        camera.position.y = 1.8 + Math.sin(t * 0.4) * 0.15;
        camera.lookAt(0, 1.6, 0);
      }

      renderer.render(scene, camera);
    }
    animate();
  }

  function init() {
    // Homepage entrance
    if (document.getElementById('heroCanvas')) {
      createSupermarketScene('heroCanvas', { mode: 'entrance' });
    }
    // Login page
    if (document.getElementById('loginCanvas')) {
      createSupermarketScene('loginCanvas', { mode: 'login' });
    }
    // Other pages ambient (categories, product, about, contact)
    document.querySelectorAll('[data-scene]').forEach(el => {
      createSupermarketScene(el.id, { mode: el.dataset.scene || 'ambient' });
    });
  }

  return { init, createSupermarketScene };
})();