// Smooth entrance animations for the Work page — the hero content slides
// in once the briefcase opens, and each project card slides in as it
// scrolls into view.

(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return; // only runs on the Work/homepage

  gsap.registerPlugin(ScrollTrigger);

  const heroTargets = [
    '.hero-text .name',
    '.hero-text .bio',
    '.hero-text .resume-list',
    '.hero-text .scroll-hint',
    '.photo-placeholder',
  ];

  // Start hidden/offset so there's no flash of fully-visible content
  // before the animation runs.
  gsap.set(heroTargets, { opacity: 0, y: 30 });

  function revealHero() {
    gsap.to(heroTargets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
    });
  }

  // Normal path: reveal right as the briefcase finishes opening.
  document.addEventListener('briefcase:opened', revealHero);

  // Fallback: if the page is somehow already in the "open" state when
  // this script runs (e.g. reloaded mid-session), reveal immediately
  // instead of leaving everything invisible.
  if (document.body.classList.contains('site-open')) {
    revealHero();
  }

  // Work project cards slide in one at a time as each scrolls into view.
  gsap.utils.toArray('.folder').forEach((card) => {
    gsap.set(card, { opacity: 0, y: 40 });
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
      },
    });
  });
})();