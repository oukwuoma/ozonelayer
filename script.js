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

  const dropdowns = document.querySelectorAll('.nav-dropdown');

  function closeNav() {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    dropdowns.forEach(dd => {
      dd.classList.remove('open');
      const t = dd.querySelector('.nav-dropdown-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.contains('open');
      dropdowns.forEach(other => {
        other.classList.remove('open');
        const t = other.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      dd.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  document.addEventListener('click', (e) => {
    dropdowns.forEach(dd => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        const t = dd.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
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
