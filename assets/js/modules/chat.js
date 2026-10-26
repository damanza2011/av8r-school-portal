/* ==========================================================================
   AV8R School · Chat Module (AV8R Guide)
   Asistente bilingüe: motor local de intenciones + conector API opcional
   ========================================================================== */

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const CONFIG = {
    email: 'hello@av8rschool.com',
    skool: 'https://www.skool.com/av8rschool',
    api: '/api/chat'
  };

  const getTranslation = (key, lang = 'es') => {
    if (window.I18N && window.I18N[lang] && window.I18N[lang][key]) {
      return window.I18N[lang][key];
    }
    if (window.I18N && window.I18N.es && window.I18N.es[key]) {
      return window.I18N.es[key];
    }
    return '';
  };

  const CHAT_DATA = {
    es: {
      quick: [
        { label: 'Ruta FAA', prompt: '¿Cuál es la ruta FAA A&P?' },
        { label: 'Cursos', prompt: '¿Qué cursos tienen?' },
        { label: 'Empleo', prompt: '¿Cómo funciona el apoyo de empleo?' },
        { label: 'Hablar con humano', prompt: 'Quiero hablar con una persona de AV8R.' }
      ],
      fallback: 'Puedo orientarte en ruta FAA, cursos, comunidad, empleo y el siguiente paso. Si tu pregunta es sobre visa, precio exacto o una situación personal, la revisa un asesor humano. ¿Quieres que empecemos por la ruta o por los cursos?',
      intents: [
        { keys: ['visa', 'work authorization', 'trabajar en eeuu', 'trabajo en usa', 'autorizacion', 'green card', 'h-1b', 'm-1', 'relocation'], reply: 'Importante: el certificado A&P no otorga visa ni autorización de trabajo en EE. UU. La visa y el empleo se gestionan por separado con un abogado de inmigración. AV8R puede orientarte sobre la ruta técnica, no sobre inmigración.\n\n¿Quieres que veamos la ruta A&P o prefieres hablar con un asesor?' },
        { keys: ['precio', 'costo', 'cuanto', 'price', 'cost', 'tuition', 'pagar', 'inversion'], reply: 'No publicamos precios que no estén confirmados: dependen del cohorte, el país y el alcance. La forma correcta es pedir una cotización con AV8R y revisar qué incluye (video, mentoría, práctica, testing).\n\n¿Quieres que te conecte con el equipo?' },
        { keys: ['faa', 'requisito', 'elegibilidad', 'requirement', 'a&p', 'ap certificate', 'part 147'], reply: 'La FAA pide: 18 años, inglés (leer, escribir, hablar y entender), 18 meses de experiencia por rating o 30 meses para A&P (o escuela Part 147), y aprobar written, oral y practical con un DME autorizado.\n\nAV8R prepara; la FAA certifica. ¿Quieres revisar tu elegibilidad?' },
        { keys: ['ruta', 'empezar', 'cero', 'principiante', 'path', 'start', 'desde cero'], reply: 'La ruta AV8R es:\n01 Diagnóstico + inglés\n02 A&P General\n03 Airframe + Powerplant\n04 Práctica + testing (PSI/DME)\n05 OEM + empleo\n\nNo es un curso suelto: cada etapa tiene un entregable. ¿Estás empezando o ya tienes experiencia?' },
        { keys: ['curso', 'programa', 'course', 'program'], reply: 'El portal organiza: A&P General, Airframe, Powerplant, Exam Sprint, Aviation English, Business Jet OEM, Avionics y Career Accelerator. La malla exacta y la disponibilidad se confirman con AV8R.\n\n¿Te interesa A&P, inglés, OEM o empleo?' },
        { keys: ['ingles', 'english', 'idioma'], reply: 'La FAA exige inglés para el certificado. Aviation English trabaja vocabulario técnico, lectura de manuales, entrevistas y comunicación de taller. Si tu inglés no está listo, se nivela antes de la teoría.\n\n¿Quieres evaluar tu nivel?' },
        { keys: ['empleo', 'trabajo', 'job', 'career', 'colocacion', 'placement'], reply: 'AV8R construye alianzas con Part 147, Part 145/MRO, OEMs, FBOs y empleadores. El apoyo incluye portafolio, entrevistas y job board. No prometemos empleo ni visa: se mide y se trabaja caso a caso.\n\n¿Buscas tu primer empleo o quieres especializarte?' },
        { keys: ['oem', 'aviacion ejecutiva', 'business aviation', 'gulfstream', 'bombardier', 'dassault', 'embraer', 'textron'], reply: 'La aviación ejecutiva es la especialización: Gulfstream, Bombardier, Dassault, Embraer y Textron, más aviónica, interiores y servicio. El A&P es la base; el OEM es el siguiente nivel.\n\n¿Ya tienes A&P o estás empezando?' },
        { keys: ['comunidad', 'skool', 'community', 'miembros'], reply: 'AV8R School tiene una comunidad privada en Skool con 391 miembros, 9 cursos y 23 módulos (snapshot público). Incluye estudio, mentoría, guías FAST TRACK EN/ES y beneficios OEM.\n\n¿Quieres entrar a la comunidad o primero ver la ruta?' },
        { keys: ['empleador', 'empresa', 'contratar', 'employer', 'hire', 'talento'], reply: 'Si eres empleador, podemos explorar alianzas, prácticas y un pipeline de talento bilingüe. No es un job board automático todavía: se revisa el perfil y el modelo.\n\n¿Qué tipo de técnicos buscas?' },
        { keys: ['online', 'video', 'virtual', 'presencial'], reply: 'La teoría y la mentoría son online; la práctica, el oral/practical y el testing requieren un partner o DME autorizado. El video no reemplaza la práctica.\n\n¿Quieres ver la ruta completa?' },
        { keys: ['humano', 'persona', 'asesor', 'nestor', 'contacto', 'hablar'], reply: 'Puedes hablar con AV8R en la comunidad de Skool: https://www.skool.com/av8rschool. También puedes escribir a hello@av8rschool.com.\n\n¿Quieres que te deje el enlace o prefieres seguir con la ruta?' },
        { keys: ['hola', 'hello', 'hi', 'buenas'], reply: 'Hola. Soy AV8R Guide. Puedo ayudarte con la ruta FAA, los cursos, la comunidad o el siguiente paso. ¿Dónde estás hoy: empezando, con experiencia o ya A&P?' }
      ]
    },
    en: {
      quick: [
        { label: 'FAA path', prompt: 'What is the FAA A&P path?' },
        { label: 'Courses', prompt: 'What courses do you offer?' },
        { label: 'Jobs', prompt: 'How does career support work?' },
        { label: 'Talk to a human', prompt: 'I want to talk to a person at AV8R.' }
      ],
      fallback: 'I can guide you on the FAA path, courses, community, jobs and next step. If your question is about a visa, exact price or a personal case, a human advisor should review it. Shall we start with the path or the courses?',
      intents: [
        { keys: ['visa', 'work authorization', 'work in the us', 'green card', 'h-1b', 'm-1', 'relocation'], reply: 'Important: an A&P certificate does not grant a visa or work authorization in the U.S. Visa and employment are handled separately with an immigration attorney. AV8R can guide the technical path, not immigration.\n\nWould you like to see the A&P path or talk to an advisor?' },
        { keys: ['price', 'cost', 'tuition', 'how much', 'pay'], reply: 'We do not publish unconfirmed prices: they depend on the cohort, country and scope. The right step is to request a quote from AV8R and review what is included (video, mentorship, practice, testing).\n\nWould you like me to connect you with the team?' },
        { keys: ['faa', 'requirement', 'eligibility', 'a&p', 'ap certificate', 'part 147'], reply: 'The FAA requires: 18 years old, English (read, write, speak and understand), 18 months of experience per rating or 30 months for A&P (or a Part 147 school), and passing written, oral and practical tests with an authorized DME.\n\nAV8R prepares; the FAA certifies. Would you like to check your eligibility?' },
        { keys: ['path', 'start', 'zero', 'beginner', 'from scratch'], reply: 'The AV8R path is:\n01 Diagnosis + English\n02 A&P General\n03 Airframe + Powerplant\n04 Practice + testing (PSI/DME)\n05 OEM + employment\n\nIt is not a loose course: each stage has a deliverable. Are you starting or do you already have experience?' },
        { keys: ['course', 'program'], reply: 'The portal organizes: A&P General, Airframe, Powerplant, Exam Sprint, Aviation English, Business Jet OEM, Avionics and Career Accelerator. The exact curriculum and availability are confirmed with AV8R.\n\nAre you interested in A&P, English, OEM or career?' },
        { keys: ['english', 'language'], reply: 'The FAA requires English for the certificate. Aviation English covers technical vocabulary, manual reading, interviews and shop communication. If your English is not ready, we level it before theory.\n\nWould you like to assess your level?' },
        { keys: ['job', 'career', 'placement', 'employment'], reply: 'AV8R builds alliances with Part 147, Part 145/MRO, OEMs, FBOs and employers. Support includes portfolio, interviews and a job board. We do not promise a job or a visa: it is worked case by case.\n\nAre you looking for a first job or a specialization?' },
        { keys: ['oem', 'business aviation', 'gulfstream', 'bombardier', 'dassault', 'embraer', 'textron'], reply: 'Business aviation is the specialization: Gulfstream, Bombardier, Dassault, Embraer and Textron, plus avionics, interiors and service. A&P is the base; OEM is the next level.\n\nDo you already have A&P or are you starting?' },
        { keys: ['community', 'skool', 'members'], reply: 'AV8R School has a private Skool community with 391 members, 9 courses and 23 modules (public snapshot). It includes study, mentorship, FAST TRACK guides EN/ES and OEM benefits.\n\nWould you like to join the community or see the path first?' },
        { keys: ['employer', 'company', 'hire', 'talent'], reply: 'If you are an employer, we can explore alliances, internships and a bilingual talent pipeline. It is not an automatic job board yet: we review the profile and model.\n\nWhat kind of technicians are you looking for?' },
        { keys: ['online', 'video', 'virtual', 'in person'], reply: 'Theory and mentorship are online; practice, oral/practical and testing require an authorized partner or DME. Video does not replace practice.\n\nWould you like to see the full path?' },
        { keys: ['human', 'person', 'advisor', 'nestor', 'contact', 'talk'], reply: 'You can talk to AV8R in the Skool community: https://www.skool.com/av8rschool. You can also email hello@av8rschool.com.\n\nWould you like the link or shall we continue with the path?' },
        { keys: ['hello', 'hi', 'hey'], reply: 'Hi. I am AV8R Guide. I can help with the FAA path, courses, community or next step. Where are you today: starting, experienced, or already A&P?' }
      ]
    }
  };

  const chatState = {
    lang: 'es',
    started: false,
    busy: false,
    history: []
  };

  const normalize = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const localReply = (text, lang) => {
    const data = CHAT_DATA[lang] || CHAT_DATA.es;
    const n = normalize(text);
    const pathIntent = data.intents.find(i => i.keys.includes('ruta') || i.keys.includes('path'));
    const wantsPath = ['ruta', 'path', 'empezar', 'start', 'cero', 'zero', 'principiante', 'beginner'].some(k => n.includes(normalize(k)));
    if (wantsPath && pathIntent) return pathIntent.reply;
    const hit = data.intents.find(i => i.keys.some(k => n.includes(normalize(k))));
    return hit ? hit.reply : data.fallback;
  };

  const apiReply = async (text) => {
    if (location.protocol === 'file:' || location.hostname.endsWith('github.io')) return null;
    try {
      const res = await fetch(CONFIG.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatState.history.slice(-8), lang: chatState.lang })
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data && data.reply ? data.reply : null;
    } catch (_) {
      return null;
    }
  };

  const chatPanel = $('#chatPanel');
  const chatFab = $('#chatFab');
  const chatMessages = $('#chatMessages');
  const chatQuick = $('#chatQuick');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');

  const isMobile = () => window.matchMedia('(max-width:760px)').matches;

  const syncFab = () => {
    if (!chatFab) return;
    const quiet = isMobile() && window.scrollY < 460;
    chatFab.classList.toggle('is-quiet', quiet && (!chatPanel || chatPanel.hidden));
  };

  const addMsg = (role, text) => {
    if (!chatMessages) return;
    const el = document.createElement('div');
    el.className = `chat-msg chat-msg--${role}`;
    el.textContent = text;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const setTyping = on => {
    const existing = $('#chatTyping');
    if (on && !existing) {
      const el = document.createElement('div');
      el.id = 'chatTyping';
      el.className = 'chat-msg chat-msg--bot chat-msg--typing';
      el.textContent = getTranslation('chat.typing', chatState.lang);
      chatMessages.appendChild(el);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!on && existing) {
      existing.remove();
    }
  };

  const renderQuick = () => {
    if (!chatQuick) return;
    const data = CHAT_DATA[chatState.lang] || CHAT_DATA.es;
    chatQuick.innerHTML = data.quick.map(q => `<button type="button" data-quick="${q.prompt.replace(/"/g, '&quot;')}">${q.label}</button>`).join('');
  };

  const updateChatLang = (lang, announce = true) => {
    chatState.lang = lang;
    $$('[data-chat-lang]').forEach(b => b.classList.toggle('is-active', b.dataset.chatLang === lang));
    if (chatInput) chatInput.placeholder = getTranslation('chat.placeholder', lang);
    const legal = $('.chat-legal');
    if (legal) legal.innerHTML = getTranslation('chat.legal', lang);
    renderQuick();
    if (announce && chatState.started) addMsg('bot', getTranslation('chat.langChanged', lang));
  };

  const openChat = async (prompt = '') => {
    if (!chatPanel) return;
    chatPanel.hidden = false;
    if (chatFab) {
      chatFab.hidden = true;
      chatFab.classList.remove('is-quiet');
    }
    document.body.classList.add('is-locked');
    updateChatLang(chatState.lang, false);

    if (!chatState.started) {
      chatState.started = true;
      const welcome = getTranslation('chat.welcome', chatState.lang);
      addMsg('bot', welcome);
      chatState.history.push({ role: 'assistant', content: welcome });
    }

    if (prompt) {
      await sleep(120);
      sendChat(prompt);
    } else if (chatInput) {
      chatInput.focus();
    }
  };

  const closeChat = () => {
    if (!chatPanel) return;
    chatPanel.hidden = true;
    if (chatFab) chatFab.hidden = false;
    document.body.classList.remove('is-locked');
    syncFab();
    if (chatFab && !chatFab.classList.contains('is-quiet')) chatFab.focus();
  };

  const sendChat = async (raw) => {
    const text = (raw || '').trim();
    if (!text || chatState.busy) return;
    chatState.busy = true;
    addMsg('user', text);
    chatState.history.push({ role: 'user', content: text });
    if (chatInput) chatInput.value = '';
    setTyping(true);
    const [api] = await Promise.all([apiReply(text), sleep(350)]);
    setTyping(false);
    const reply = api || localReply(text, chatState.lang);
    addMsg('bot', reply);
    chatState.history.push({ role: 'assistant', content: reply });
    chatState.busy = false;
    if (chatInput) chatInput.focus();
  };

  // Event Listeners
  if (chatFab) chatFab.addEventListener('click', () => openChat());
  const chatCloseBtn = $('#chatClose');
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', closeChat);
  if (chatForm) chatForm.addEventListener('submit', e => { e.preventDefault(); sendChat(chatInput ? chatInput.value : ''); });
  if (chatQuick) chatQuick.addEventListener('click', e => {
    const b = e.target.closest('[data-quick]');
    if (b) sendChat(b.dataset.quick);
  });
  $$('[data-chat-lang]').forEach(b => b.addEventListener('click', () => updateChatLang(b.dataset.chatLang)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatPanel && !chatPanel.hidden) closeChat();
  });

  // Dynamic Openers across the page
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open-chat]');
    if (opener) {
      e.preventDefault();
      openChat(opener.dataset.openChat || '');
      return;
    }
    const start = e.target.closest('[data-start]');
    if (start) {
      const isEn = chatState.lang === 'en';
      const prompts = isEn ? {
        beginner: 'I am starting from zero. What is my path?',
        experience: 'I have maintenance experience. How should I enter the A&P path?',
        ap: 'I am already A&P. How do I move into business aviation or OEM?',
        employer: 'I am an employer looking for bilingual technical talent.'
      } : {
        beginner: 'Estoy empezando desde cero. ¿Cuál es mi ruta?',
        experience: 'Tengo experiencia en mantenimiento. ¿Cómo me conviene entrar al A&P?',
        ap: 'Ya soy A&P. ¿Cómo paso a aviación ejecutiva u OEM?',
        employer: 'Soy empleador y busco talento técnico bilingüe.'
      };
      openChat(prompts[start.dataset.start] || (isEn ? 'I want information about AV8R.' : 'Quiero información sobre AV8R.'));
    }
  });

  syncFab();
  window.addEventListener('scroll', syncFab, { passive: true });
  window.addEventListener('resize', syncFab);

  // Expose global methods
  window.AV8RChat = {
    open: openChat,
    close: closeChat,
    send: sendChat,
    updateLang: updateChatLang
  };
})();
