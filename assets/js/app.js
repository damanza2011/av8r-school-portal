/* ==========================================================================
   AV8R School · Main Application Entry Point
   Orquestador principal: navegación, animaciones, formulario e inicio
   ========================================================================== */

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const CONFIG = {
    email: 'hello@av8rschool.com',
    skool: 'https://www.skool.com/av8rschool'
  };

  /* ------------------------------------------------------------------
     Header & Mobile Navigation
     ------------------------------------------------------------------ */
  const header = $('#header');
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');

  const closeMenu = () => {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    document.body.classList.remove('is-locked');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      const use = menuBtn.querySelector('use');
      if (use) use.setAttribute('href', '#i-menu');
    }
  };

  const openMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    document.body.classList.add('is-locked');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'true');
      const use = menuBtn.querySelector('use');
      if (use) use.setAttribute('href', '#i-close');
    }
  };

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.hidden ? openMenu() : closeMenu();
    });
    $$('a', mobileMenu).forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Header scroll detection
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Scroll Reveal Animation (Intersection Observer)
     ------------------------------------------------------------------ */
  const revealTargets = $$(
    '.section__head, .start-card, .route-step, .program, .stat, .alliance, .faq, .community__card, .apply__form, .flight-card, .assistant__preview'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    document.body.classList.add('reveal-ready');
    revealTargets.forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 55}ms`;
    });

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(el => io.observe(el));
  }

  /* ------------------------------------------------------------------
     Lead Application Form
     ------------------------------------------------------------------ */
  const form = $('#applyForm');
  const status = $('#formStatus');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = ($('#name') ? $('#name').value : '').trim();
      const email = ($('#email') ? $('#email').value : '').trim();
      const country = ($('#country') ? $('#country').value : '').trim();
      const goal = $('#goal') ? $('#goal').value : '';
      const message = ($('#message') ? $('#message').value : '').trim();
      const consent = $('#consent') ? $('#consent').checked : false;

      const t = (key) => (window.AV8RI18n && window.AV8RI18n.t ? window.AV8RI18n.t(key) : '');

      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !consent) {
        if (status) {
          status.textContent = t('form.error') || 'Revisa nombre, correo y consentimiento.';
          status.className = 'form-status is-error';
        }
        return;
      }

      const subject = `AV8R application · ${goal} · ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nCountry: ${country}\nGoal: ${goal}\nMessage: ${message}\n\nConsent: yes\nSent from av8r-web portal.`;

      if (status) {
        status.textContent = t('form.sending') || 'Abriendo tu correo con la solicitud…';
        status.className = 'form-status is-ok';
      }

      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setTimeout(() => {
        if (status) {
          status.textContent = t('form.ok') || 'Solicitud preparada. Completa el envío en tu correo.';
        }
      }, 600);
    });
  }

  /* ------------------------------------------------------------------
     Initialization
     ------------------------------------------------------------------ */
  const init = () => {
    // Current year in footer
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    // Restore saved language or default to Spanish
    let savedLang = 'es';
    try {
      savedLang = localStorage.getItem('av8r.lang') || 'es';
    } catch (_) {}

    if (window.AV8RI18n && window.AV8RI18n.applyLang) {
      window.AV8RI18n.applyLang(savedLang === 'en' ? 'en' : 'es');
    }

    console.info('[AV8R] Portal inicializado con arquitectura modular.');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
