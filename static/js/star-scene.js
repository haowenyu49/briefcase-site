// Scroll-driven 3D star: floats upright, tips over to lie flat as the
// person scrolls through the pinned section, then reveals the contact
// info once it's fully down.
//
// Drop your real model at /static/models/star.glb and it'll be used
// automatically — until then, a placeholder star shape stands in so the
// whole effect is testable right away.

(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return; // only runs on the Contact page

  const pin = document.getElementById('starPin');
  const reveal = document.getElementById('contactReveal');

  // ---- Scene setup ----
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const keyLight = new THREE.DirectionalLight(0xfff4d6, 1.1);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0xffe9b3, 0.6);
  fillLight.position.set(-4, -2, 3);
  scene.add(fillLight);

  // Bright spotlight shining directly on the star for a strong highlight/shine
  const spotLight = new THREE.SpotLight(0xffffff, 2.2);
  spotLight.position.set(0, 3, 5);
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.4;
  spotLight.decay = 1;
  spotLight.distance = 20;
  spotLight.target.position.set(0, 0, 0);
  scene.add(spotLight);
  scene.add(spotLight.target);

  let star = null;

  // ---- Placeholder star (used until the real .glb is in place) ----
  function buildPlaceholderStar() {
    const points = [];
    const outerR = 1.2;
    const innerR = 0.5;
    const spikes = 5;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      points.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
    }
    const shape = new THREE.Shape(points);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
    geometry.center();
    const material = new THREE.MeshStandardMaterial({
      color: 0xd8bc72,
      metalness: 0.6,
      roughness: 0.3,
    });
    return new THREE.Mesh(geometry, material);
  }

  // ---- Load the real model if present, fall back to the placeholder ----
  const loader = new THREE.GLTFLoader();
  loader.load(
    '/static/models/star.glb',
    (gltf) => addStar(gltf.scene),
    undefined,
    () => addStar(buildPlaceholderStar()) // no real model yet
  );

  function addStar(obj) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    obj.scale.setScalar(2.4 / maxDim);

    const center = new THREE.Vector3();
    box.getCenter(center);
    obj.position.sub(center.multiplyScalar(2.4 / maxDim));

    star = obj;
    scene.add(star);
    setupScrollAnimation();
  }

  function resize() {
    const rect = pin.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  // ---- Idle floating motion (independent of scroll) ----
   let idleT = 0;
  function renderLoop() {
    idleT += 0.01;
    /* if (star) {
      star.rotation.x += 0.004;
      star.rotation.y += 0.003;
      star.rotation.z += 0.002;
      star.position.y = Math.sin(idleT) * 0.08;
    } */
    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
  }
  renderLoop(); 

  // ---- Scroll-driven tip-over + reveal ----
  function setupScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(reveal, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.star-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // Star tips from upright (0) to lying flat (90°) across the whole
    // scroll range, then contact info fades/slides in during the last
    // 15% — reversible, so scrolling back up hides it and stands the
    // star back up.
    tl.to(star.rotation, { y: Math.PI / 4, x: Math.PI / 2, ease: 'none', duration: 1 }, 0)
  .to(reveal, { opacity: 1, y: 0, ease: 'none', duration: 0.15 }, 0.85)
  .to(canvas, { opacity: 0, ease: 'none', duration: 0.08 }, 0.92);
  }
})();