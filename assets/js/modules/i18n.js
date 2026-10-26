/* ==========================================================================
   AV8R School · i18n & Content Rendering Module
   Manejo de bilingüismo (ES/EN) y renderizado dinámico de Ruta, Cursos y FAQ
   ========================================================================== */

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const state = {
    lang: 'es',
    filter: 'all'
  };

  const t = (key, lang = state.lang) => {
    const dict = window.I18N || {};
    return (dict[lang] && dict[lang][key]) || (dict.es && dict.es[key]) || '';
  };

  /* ------------------------------------------------------------------
     Renderers
     ------------------------------------------------------------------ */
  const renderRoute = () => {
    const wrap = $('#routeSteps');
    if (!wrap || !window.ROUTE) return;
    wrap.innerHTML = window.ROUTE.map(s => {
      const copy = s[state.lang] || s.es;
      return `
        <article class="route-step">
          <span class="route-step__num">${s.n}</span>
          <h3>${copy[0]}</h3>
          <p>${copy[1]}</p>
          <span class="route-step__out">${s.out[state.lang] || s.out.es}</span>
        </article>`;
    }).join('');
  };

  const renderPrograms = () => {
    const grid = $('#programGrid');
    if (!grid || !window.PROGRAMS) return;
    const list = state.filter === 'all'
      ? window.PROGRAMS
      : window.PROGRAMS.filter(p => p.cat === state.filter);

    grid.innerHTML = list.map(p => `
      <article class="program">
        <span class="program__tag">${p.tag[state.lang] || p.tag.es}</span>
        <h3>${p.title[state.lang] || p.title.es}</h3>
        <p>${p.desc[state.lang] || p.desc.es}</p>
        <span class="program__meta">${p.meta[state.lang] || p.meta.es}</span>
        <button class="program__link" type="button" data-open-chat="${state.lang === 'es' ? 'Quiero información sobre ' : 'I want information about '}${p.title[state.lang] || p.title.es}.">
          ${state.lang === 'es' ? 'Consultar ruta' : 'Ask about this path'} 
          <svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg>
        </button>
      </article>`).join('');
  };

  const renderFaq = () => {
    const list = $('#faqList');
    if (!list || !window.FAQ) return;
    list.innerHTML = window.FAQ.map((f, i) => `
      <details class="faq"${i === 0 ? ' open' : ''}>
        <summary>${f.q[state.lang] || f.q.es}<span class="faq__plus" aria-hidden="true"></span></summary>
        <p>${f.a[state.lang] || f.a.es}</p>
      </details>`).join('');
  };

  /* ------------------------------------------------------------------
     Apply Language
     ------------------------------------------------------------------ */
  const applyLang = (lang) => {
    state.lang = lang;
    document.documentElement.lang = lang;

    // Toggle active state on language buttons
    $$('[data-lang]').forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    // Translate DOM elements
    $$('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n, lang);
      if (v) el.textContent = v;
    });

    $$('[data-i18n-html]').forEach(el => {
      const v = t(el.dataset.i18nHtml, lang);
      if (v) el.innerHTML = v;
    });

    $$('[data-i18n-placeholder]').forEach(el => {
      const v = t(el.dataset.i18nPlaceholder, lang);
      if (v) el.placeholder = v;
    });

    // Update dynamic sections
    renderRoute();
    renderPrograms();
    renderFaq();

    // Notify Chat module if available
    if (window.AV8RChat && window.AV8RChat.updateLang) {
      window.AV8RChat.updateLang(lang, false);
    }

    try {
      localStorage.setItem('av8r.lang', lang);
    } catch (_) {}
  };

  /* ------------------------------------------------------------------
     Filter Buttons
     ------------------------------------------------------------------ */
  $$('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      $$('.filter').forEach(b => b.classList.toggle('is-active', b === btn));
      renderPrograms();
    });
  });

  // Language buttons
  $$('[data-lang]').forEach(b => {
    b.addEventListener('click', () => applyLang(b.dataset.lang));
  });

  // Expose to global scope
  window.AV8RI18n = {
    state,
    t,
    applyLang,
    renderRoute,
    renderPrograms,
    renderFaq
  };
})();
