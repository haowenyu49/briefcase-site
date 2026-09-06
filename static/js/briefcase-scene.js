// The real 3D briefcase model, replacing the earlier photo-based flap
// illusion. Body and Flap are separate objects in the .glb (Blender file
// had them merged as one mesh originally — the Flap was split out and its
// pivot point placed exactly on the hinge seam via geometric analysis of
// where the two pieces' vertices coincide).

(function () {
  const canvas = document.getElementById('briefcase3dCanvas');
  if (!canvas) return; // only runs on the homepage

  const stage = canvas.parentElement; // .briefcase-scene
  const landingEl = document.getElementById('landing');
  const reopenTab = document.getElementById('reopenTab');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const keyLight = new THREE.DirectionalLight(0xfff4d6, 1.2);
  keyLight.position.set(4, 6, 6);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0xffe9b3, 0.5);
  fillLight.position.set(-5, -3, 4);
  scene.add(fillLight);

  let root = null;
  let flap = null;
  let baseScale = 1;
  let basePosition = null;
  let isOpen = false;
  let isAnimating = false;

  // Verified against the source model: rotating the Flap's local X-axis
  // to -90° swings it up and clear of the body. If your model's axes
  // differ, flip this sign.
  const CLOSED_ROT = 0;
  const OPEN_ROT = -Math.PI / 2;

  // How much bigger it grows, and how far it turns (90° = narrow side
  // facing forward) before the flap opens. Flip TURN_Z's sign if it
  // turns the wrong way for your model.
  const GROW_FACTOR = 2.5;
  const TURN_Z = Math.PI / 2;
  const DROP_AMOUNT = 2; // how far down it settles before opening — tune to taste

  function positionCamera() {
    camera.position.set(0, 6.2, 3.4);
    camera.lookAt(0, 0, 0.2);
  }
  positionCamera();

  const loader = new THREE.GLTFLoader();
  loader.load('/static/models/briefcase.glb', (gltf) => {
    root = gltf.scene;
    flap = root.getObjectByName('Flap');

    // Normalize scale/position so the whole model sits centered and
    // consistently sized, regardless of the source file's own units.
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    baseScale = 3.2 / maxDim;
    root.scale.setScalar(baseScale);

    const center = new THREE.Vector3();
    box.getCenter(center);
    root.position.sub(center.multiplyScalar(baseScale));
    basePosition = root.position.clone();

    scene.add(root);
  });

  function resize() {
    const rect = stage.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  function animateFlap(from, to, duration, onDone) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      flap.rotation.x = from + (to - from) * eased;
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }
    }
    requestAnimationFrame(step);
  }

  function animateGrowAndTurn(duration, onDone) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = .75 - Math.pow(1 - t, 3); // ease-out cubic
      root.scale.setScalar(baseScale * (1 + (GROW_FACTOR - 1) * eased));
      root.rotation.x = -1*TURN_Z * eased;
      root.position.y = basePosition.y - DROP_AMOUNT * eased;
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (onDone) {
        onDone();
      }
    }
    requestAnimationFrame(step);
  }

  function openCase() {
    if (isAnimating || isOpen || !flap || !root) return;
    isAnimating = true;

    const titleEl = document.querySelector('.landing-title');
    const hintEl = document.querySelector('.hint');
    if (titleEl) titleEl.classList.add('fade-out');
    if (hintEl) hintEl.classList.add('fade-out');

    animateGrowAndTurn(700, () => {
      animateFlap(CLOSED_ROT, OPEN_ROT, 900, () => {
        isAnimating = false;
        isOpen = true;
        setTimeout(() => {
          landingEl.classList.add('hidden');
          reopenTab.style.display = 'block';
          document.body.classList.add('site-open');
          document.dispatchEvent(new Event('briefcase:opened'));
        }, 200);
      });
    });
  }
function closeCase() {
    document.body.classList.remove('site-open');
    reopenTab.style.display = 'none';
    landingEl.classList.remove('hidden');
    const titleEl = document.querySelector('.landing-title');
    const hintEl = document.querySelector('.hint');
    if (titleEl) titleEl.classList.remove('fade-out');
    if (hintEl) hintEl.classList.remove('fade-out');
    if (flap) flap.rotation.x = CLOSED_ROT;
    if (root) {
      root.rotation.y = 0;
      root.scale.setScalar(baseScale);
      if (basePosition) root.position.y = basePosition.y;
    }
    isOpen = false;
  }

  stage.addEventListener('click', openCase);
  if (reopenTab) reopenTab.addEventListener('click', closeCase);
})();