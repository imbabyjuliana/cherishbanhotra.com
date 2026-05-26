document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-loaded');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  const closeNav = () => {
    if (!navbar || !navToggle) {
      return;
    }

    navbar.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  if (navbar && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (!window.matchMedia('(max-width: 768px)').matches) {
        closeNav();
      }
    });
  }


  const revealItems = document.querySelectorAll(
    '.content-section, .section-title, .about-panel, .gallery-card, .path-card, .release-card, .follow-card'
  );

  revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${Math.min(index % 8, 5) * 70}ms`;
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealItems.forEach((item) => observer.observe(item));
});
