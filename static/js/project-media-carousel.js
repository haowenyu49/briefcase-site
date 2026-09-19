// A carousel for the project detail sidebar — mixes images and videos in
// any combination, and resizes its own height to match whichever slide is
// currently showing, so portrait and landscape media both look right
// instead of being squeezed into one fixed-shape box.

(function () {
  const carousel = document.querySelector('.project-media-carousel');
  if (!carousel) return;

  const media = JSON.parse(carousel.dataset.media || '[]');
  if (!media.length) return;

  const viewport = carousel.querySelector('.pmc-viewport');
  const track = carousel.querySelector('.pmc-track');
  const dotsEl = carousel.querySelector('.pmc-dots');
  const prevBtn = carousel.querySelector('.pmc-prev');
  const nextBtn = carousel.querySelector('.pmc-next');

  track.innerHTML = media
    .map((m) => {
      if (m.type === 'video') {
        return `<div><video src="${m.src}" controls playsinline></video></div>`;
      }
      return `<div><img src="${m.src}" alt=""></div>`;
    })
    .join('');

  const slideEls = Array.from(track.children);
  const mediaEls = slideEls.map((s) => s.firstElementChild);

  dotsEl.innerHTML = media
    .map((_, i) => `<div class="pmc-dot" data-index="${i}"></div>`)
    .join('');
  const dots = Array.from(dotsEl.children);

  let index = 0;
  const ratios = new Array(media.length).fill(null); // height/width per slide, filled in as each loads

  function applyHeightForCurrentSlide() {
    const ratio = ratios[index];
    if (ratio) {
      viewport.style.height = viewport.offsetWidth * ratio + 'px';
    }
  }

  function recordRatio(i, w, h) {
    if (!w || !h) return;
    ratios[i] = h / w;
    if (i === index) applyHeightForCurrentSlide();
  }

  mediaEls.forEach((el, i) => {
    if (el.tagName === 'IMG') {
      if (el.complete && el.naturalWidth) {
        recordRatio(i, el.naturalWidth, el.naturalHeight);
      } else {
        el.addEventListener('load', () => recordRatio(i, el.naturalWidth, el.naturalHeight));
      }
    } else {
      el.addEventListener('loadedmetadata', () => recordRatio(i, el.videoWidth, el.videoHeight));
    }
  });

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    mediaEls.forEach((el, i) => {
      if (el.tagName === 'VIDEO' && i !== index) el.pause();
    });
    applyHeightForCurrentSlide();
  }

  function goTo(i) {
    index = (i + media.length) % media.length;
    render();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  window.addEventListener('resize', applyHeightForCurrentSlide);

  if (media.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    dotsEl.style.display = 'none';
  }

  render();
})();