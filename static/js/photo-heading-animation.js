// The "Photography" heading is position:fixed (hovers in place). It pops
// in once the person scrolls into the Photography section, then pops back
// out once they've scrolled past the first photo — reversible both ways.

(function () {
  const heading = document.querySelector('.photo-heading');
  if (!heading || typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.set(heading, { opacity: 0, scale: 0.7, transformOrigin: '50% 50%' });

  const popIn = gsap.to(heading, {
    opacity: 1,
    scale: 1,
    duration: 0.7,
    ease: 'back.out(1.7)',
    paused: true,
  });

  ScrollTrigger.create({
    trigger: '.photography-page',
    start: 'top 85%',
    onEnter: () => popIn.play(),
    onLeaveBack: () => popIn.reverse(),
  });

  const popOut = gsap.to(heading, {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: 'power2.in',
    paused: true,
  });

  // Each photo occupies exactly one viewport-height of scroll (set in
  // photography-fullscreen.js), so "after the first photo" = one
  // viewport-height past the start of that section.
  ScrollTrigger.create({
    trigger: '.photo-fullscreen-section',
    start: () => 'top+=' + window.innerHeight + ' top',
    onEnter: () => popOut.play(),
    onLeaveBack: () => popOut.reverse(),
  });
})();