// Photography: each photo takes up the entire screen, pinned in place,
// and switches to the next one as the person scrolls through the section.

(function () {
  const section = document.getElementById('photoFullscreenSection');
  const stack = document.getElementById('photoStack');
  if (!section || !stack) return;

  const photos = JSON.parse(stack.dataset.photos || '[]');
  if (!photos.length) return;

  stack.innerHTML = photos
    .map((src, i) => `<img src="${src}" alt="Photo" class="${i === 0 ? 'active' : ''}">`)
    .join('');
  const imgs = Array.from(stack.children);

  // One viewport-height of scroll per photo, so each one gets a
  // comfortable, deliberate stretch before switching to the next.
  const numPhotos = photos.length;
  section.style.height = numPhotos * 100 + 'vh';

  let current = 0;

  function goTo(index) {
    if (index === current) return;
    imgs[current].classList.remove('active');
    imgs[index].classList.add('active');
    current = index;
  }

  if (numPhotos > 1 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const target = Math.min(Math.round(self.progress * (numPhotos - 1)), numPhotos - 1);
        goTo(target);
      },
    });
  }
})();