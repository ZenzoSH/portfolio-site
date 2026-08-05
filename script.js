document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-triggered reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  // 2. Active navigation link tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.includes(`#${currentId}`)) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach((section) => navObserver.observe(section));

  // 3. Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksList = document.getElementById('nav-links');

  if (menuToggle && navLinksList) {
    const closeMenu = () => {
      menuToggle.classList.remove('active');
      navLinksList.classList.remove('active');
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });

    const mobileNavLinks = navLinksList.querySelectorAll('.nav-link');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinksList.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // 4. Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 5. Footer year auto-update
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
