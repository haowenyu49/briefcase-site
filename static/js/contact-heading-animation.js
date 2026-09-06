// The "Contact" heading is position:fixed (always hovering in place), but
// starts hidden/small and pops in with a bouncy scale-up once the person
// actually scrolls a bit — reverses if they scroll back to the very top.

(function () {
  const heading = document.querySelector('.contact-heading');
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
})();