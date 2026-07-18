/* Foderami Castelli — main.js
   PLUMBING_V 1. Merceria: lun pomeriggio, mar-sab spezzato, dom chiuso.
   Gesto-firma: «si trova tutto» (ticker inventario CSS) + motivo bottone.
   GSAP SUBITO; reveal once; watchdog 1,5s. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'foderami-castelli',
    hours: {
      0: [],
      1: [['15:00', '19:00']],
      2: [['09:00', '13:00'], ['15:00', '19:00']],
      3: [['09:00', '13:00'], ['15:00', '19:00']],
      4: [['09:00', '13:00'], ['15:00', '19:00']],
      5: [['09:00', '13:00'], ['15:00', '19:00']],
      6: [['09:00', '13:00'], ['15:00', '19:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.tutto': 'Everything', 'nav.bottoni': 'Buttons', 'nav.filati': 'Yarns', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '126 reviews',
      'hero.kicker': 'The haberdashery of Piazza De Angeli, since 1965',
      'hero.sub': 'Jewel buttons, trimmings, lace, yarns and wool: the historic haberdashery where you <strong>find everything</strong> — for anyone who sews, embroiders and makes.',
      'hero.cta1': 'Call: 02 462730', 'hero.cta2': 'Find everything',
      'tutto.kicker': 'The haberdasher’s cave', 'tutto.t1': 'Here', 'tutto.t2': 'you find everything',
      'tutto.lead': 'Everyone who walks in says the same thing: it’s <strong>a paradise</strong>. Shelves to the ceiling, drawers that never end — for anyone who sews, embroiders, knits or loves to make things.',
      'tutto.l1': 'Buttons and jewel buttons', 'tutto.l2': 'Trimmings, lace and ribbons', 'tutto.l3': 'Yarns, wool and cotton',
      'tutto.l4': 'Needles, hooks and small parts', 'tutto.l5': 'Zips, elastics and tights', 'tutto.l6': 'Hand-woven bags and linens',
      'tutto.q': '«It really is a paradise: you find everything for anyone who loves cutting and sewing.»',
      'bot.kicker': 'The jewel in the crown', 'bot.t1': 'Jewel buttons,', 'bot.t2': 'trimmings, lace',
      'bot.p1': 'The selection of <strong>jewel buttons</strong> and ornamental pins is what earns the «top level». And then trimmings, ribbons and decorative chains to give a garment the detail that changes it.',
      'fil.kicker': 'Yarns, wool & crochet', 'fil.t1': 'Colour', 'fil.t2': 'in your hands',
      'fil.p1': 'Yarns and wool for knitting and crochet, cottons for embroidery, tassels and fringes to finish. A wall of colour to start your next project from — with the advice of someone who’s seen plenty.',
      'sto.kicker': 'Since 1965', 'sto.t1': 'Sixty years', 'sto.t2': 'in the heart of Piazza De Angeli',
      'sto.p1': 'Foderami Castelli is a historic haberdashery: <strong>generations running the shop</strong>, with Simona and Stefano behind the counter. Sixty years of experience in a trade made of details.',
      'sto.p2': 'That know-how is the real value: here you don’t just find the product, you find someone who can advise the right one for your work.',
      'gal.kicker': 'The haberdashery', 'gal.t1': 'A look', 'gal.t2': 'inside',
      'rec.kicker': 'What people say', 'rec.t2': 'from 126 Google reviews',
      'rec.r1': '«A top-level haberdashery, a selection of spectacular jewel buttons and ornamental pins. The jewel in the crown of this historic shop are Simona and Stefano, with real expertise.»',
      'rec.r2': '«This place is truly a paradise! You find everything for anyone who loves cutting and sewing: wool, needles and crochet hooks, and much more.»',
      'rec.r3': '«A very well-stocked haberdashery, you’ll certainly find what you’re looking for, together with the long experience of the owners, generous with advice.»',
      'rec.r4': '«A wonderful shop, stocked with everything you could need for DIY.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On the corner', 'dove.t2': 'of Piazza De Angeli',
      'dove.metro': 'Via Vittoria Colonna 53, on the corner of Piazza Ernesto De Angeli, 20146 Milan · above the M1 De Angeli.',
      'dove.chiama': 'Call 02 462730', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What do you sell?', 'faq.a1': 'Buttons and jewel buttons, trimmings, lace and ribbons, yarns and wool, crochet hooks and needles, zips, elastics and tights, hand-woven bags and linens. Everything for cutting, sewing, embroidery and DIY.',
      'faq.q2': 'Do you have unusual buttons?', 'faq.a2': 'Yes: from small parts to jewel buttons and ornamental pins. The selection is our jewel in the crown — it’s hard not to find what you’re after.',
      'faq.q3': 'How long have you been around?', 'faq.a3': 'Since 1965. Foderami Castelli is a historic haberdashery in the heart of Piazza De Angeli, with the know-how of generations running the shop.',
      'faq.q4': 'When are you open?', 'faq.a4': 'Monday 3–7pm; Tuesday to Saturday 9am–1pm and 3–7pm. Closed Sunday.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Vittoria Colonna 53, on the corner of Piazza Ernesto De Angeli in Milan. Phone 02 462730.',
      'foot.dove': 'Via Vittoria Colonna 53, corner of Piazza De Angeli, 20146 Milan · <a href="tel:+3902462730">02 462730</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero__kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero__title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero__sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.hero__cta', { opacity: 1, y: 0, duration: .6 }, .75);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 650); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = ((m % 1440) + 1440) % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<em>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
