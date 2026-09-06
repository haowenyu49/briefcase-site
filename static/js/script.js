if (document.body.classList.contains('nav-autohide')) {
  let hideTimer;

  function showNav() {
    document.body.classList.add('nav-visible');
    clearTimeout(hideTimer);
  }
  function scheduleHideNav() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => document.body.classList.remove('nav-visible'), 500);
  }

  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 70) {
      showNav();
    } else {
      scheduleHideNav();
    }
  });

  function revealThenAutoHide() {
    showNav();
    setTimeout(() => document.body.classList.remove('nav-visible'), 1400);
  }

  if (document.getElementById('landing')) {
    // Homepage: the nav isn't meaningfully visible until the briefcase
    // opens (it's hidden behind the closed-case overlay until then), so
    // wait for that instead of running the reveal cycle at page load.
    document.addEventListener('briefcase:opened', revealThenAutoHide);
  } else {
    // Play/Contact: show briefly on arrival so the person knows it's there.
    revealThenAutoHide();
  }
}
