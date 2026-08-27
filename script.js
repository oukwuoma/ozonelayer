  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function closeNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  const billingToggle = document.getElementById('billingToggle');
  if (billingToggle) {
    const billingOptions = billingToggle.querySelectorAll('.billing-option');
    const priceEls = document.querySelectorAll('.service-price[data-monthly]');

    billingOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        const period = btn.dataset.period;
        billingOptions.forEach(b => b.classList.toggle('active', b === btn));
        priceEls.forEach(el => {
          el.textContent = period === 'yearly' ? el.dataset.yearly : el.dataset.monthly;
        });
      });
    });
  }
