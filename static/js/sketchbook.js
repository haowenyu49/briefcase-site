// Flippable sketchbook (Play page) — flips as the user scrolls through
// the pinned section. Buttons still work too, going through the same
// flip()/idx state so everything stays in sync either way.

const sketchbook = document.getElementById('sketchbook');
if (sketchbook) {
  const pages = JSON.parse(sketchbook.dataset.pages || '[]');
  const spread = document.getElementById('sbSpread');
  const imgLeft = document.getElementById('sbImgLeft');
  const imgRight = document.getElementById('sbImgRight');
  const prevBtn = document.getElementById('sbPrev');
  const nextBtn = document.getElementById('sbNext');
  const sketchbookSection = document.getElementById('sketchbookSection');

  let idx = 0; // index of the left page in the current spread
  let isFlipping = false;

  function render() {
    imgLeft.src = pages[idx] || '';
    imgRight.src = pages[idx + 1] || '';
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx + 2 >= pages.length;
  }

  function flip(direction) {
    if (isFlipping) return;
    isFlipping = true;
    const cls = direction === 'next' ? 'flipping-next' : 'flipping-prev';
    spread.classList.add(cls);
    setTimeout(() => {
      idx += direction === 'next' ? 2 : -2;
      idx = Math.max(0, Math.min(idx, pages.length - 2));
      render();
      spread.classList.remove(cls);
      isFlipping = false;
    }, 350);
  }

  nextBtn.addEventListener('click', () => { if (idx + 2 < pages.length) flip('next'); });
  prevBtn.addEventListener('click', () => { if (idx > 0) flip('prev'); });

  render();

  // Give the pinned scroll section enough height for one viewport's
  // worth of scroll per spread, so each page-turn gets its own
  // comfortable stretch of scroll rather than flying by instantly.
  const numSpreads = Math.max(1, Math.ceil(pages.length / 2));
  if (sketchbookSection) {
    sketchbookSection.style.height = numSpreads * 100 + 'vh';
  }

  if (numSpreads > 1 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: sketchbookSection,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (isFlipping) return;
        const targetIdx = Math.min(
          Math.round(self.progress * (numSpreads - 1)) * 2,
          pages.length - 2
        );
        if (targetIdx > idx) flip('next');
        else if (targetIdx < idx) flip('prev');
      },
    });
  }
}