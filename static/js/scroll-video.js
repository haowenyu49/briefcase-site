// Scroll-scrubbed image-sequence "video" — the classic Apple-style effect.
// A tall section is pinned in place while the user scrolls through it;
// scroll progress (0 → 1) maps directly to which frame is drawn on canvas.

(function () {
  const canvas = document.getElementById('scrollVideoCanvas');
  if (!canvas) return; // only runs on pages that actually have this section

  const ctx = canvas.getContext('2d');

  // ---- Configure your frame sequence here ----
  const FRAME_COUNT = 69;
  const frameUrl = (i) =>
    `/static/img/scroll-frames/frame_${String(i).padStart(4, '0')}.jpg`;

  const images = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = frameUrl(i);
    images.push(img);
  }
  images[0].onload = () => { resizeCanvas(); render(); };

  function resizeCanvas() {
    const parent = canvas.parentElement; // .scroll-video-pin
    const rect = parent.getBoundingClientRect();

    // Set these directly on the element so filling the container doesn't
    // depend on the stylesheet rule alone — belt and suspenders.
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = Math.round(rect.width);
    canvas.height = Math.round(rect.height);
  }
  window.addEventListener('resize', () => { resizeCanvas(); render(); });
  resizeCanvas();

  const state = { frame: 0 };

  function render() {
    const img = images[Math.round(state.frame)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // cover-fit draw, same idea as CSS object-fit:cover
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth, drawHeight, offsetX, offsetY;
    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(state, {
    frame: FRAME_COUNT - 1,
    ease: 'none',
    onUpdate: render,
    scrollTrigger: {
      trigger: '.scroll-video-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      // pin: true,  // uncomment if .scroll-video-pin isn't already position:sticky
    },
  });
})();