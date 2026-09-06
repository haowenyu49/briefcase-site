// The "Art" heading is position:fixed (hovers in place like the Contact
// heading), pops in once the person starts scrolling, stays in view
// through the whole scroll-video + sketchbook journey, then pops back
// out once they've reached the Photography section — reversible both
// ways.

(function () {
  const heading = document.querySelector('.art-heading');
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
    start: 80, // pixels scrolled from the very top of the page
    onEnter: () => popIn.play(),
    onLeaveBack: () => popIn.reverse(),
  });

  const popOut = gsap.to(heading, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power2.in',
    paused: true,
  });

  ScrollTrigger.create({
    trigger: '.photography-page',
    start: 'top 85%',
    onEnter: () => popOut.play(),
    onLeaveBack: () => popOut.reverse(),
  });
})();