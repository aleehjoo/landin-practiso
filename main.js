/* =========================================================
   Get Found — interactions
   Scroll reveals · nav elevation · the "40-second" chat ·
   before/after phone · count-ups · rent-tick drip.
   All motion respects prefers-reduced-motion and degrades
   gracefully without JS.
   ========================================================= */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONFIG — the only two things you need to make this yours.
     Set your brand name and the link your "Book" buttons open
     (Messenger, WhatsApp, a Calendly URL, tel:, mailto:, …).
     ---------------------------------------------------------- */
  var CONFIG = {
    brandName: 'studio',
    bookingUrl: 'https://m.me/yourpage',
    founderName: '' // e.g. 'Alejandro'. Leave '' to keep the placeholder.
  };

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  function show(el, delay) {
    if (!el) return;
    if (delay) setTimeout(function () { el.classList.add('is-visible'); }, delay);
    else el.classList.add('is-visible');
  }

  ready(function () {
    applyConfig();
    initNav();
    initReveals();
    initChat();
    initSignature();
    initCountups();
    initRentStream();
  });

  /* ---- config into the DOM ---- */
  function applyConfig() {
    document.querySelectorAll('[data-brand]').forEach(function (el) {
      el.textContent = CONFIG.brandName;
    });
    document.querySelectorAll('a[data-book]').forEach(function (a) {
      a.setAttribute('href', CONFIG.bookingUrl);
    });
    if (CONFIG.founderName) {
      var f = document.querySelector('[data-founder]');
      if (f) f.textContent = '— ' + CONFIG.founderName;
    }
  }

  /* ---- nav: subtle elevation once you scroll ---- */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 10); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- generic scroll reveals (everything except the chat) ---- */
  function initReveals() {
    var els = Array.prototype.slice
      .call(document.querySelectorAll('[data-reveal]'))
      .filter(function (el) { return !el.closest('#chat'); });

    if (reduce || !hasIO) { els.forEach(function (el) { show(el); }); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        show(el, parseInt(el.getAttribute('data-reveal-delay') || '0', 10));
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- the signature moment: a text thread that turns on you ---- */
  function initChat() {
    var chat = document.getElementById('chat');
    if (!chat) return;

    var friend = chat.querySelector('.chat__bubble--in');
    var outs = Array.prototype.slice.call(chat.querySelectorAll('.chat__bubble--out'));
    var reply = outs.filter(function (b) { return !b.hasAttribute('data-doubt'); })[0];
    var found = chat.querySelector('.chat__found');
    var doubt = chat.querySelector('[data-doubt]');
    var seen = chat.querySelector('.chat__seen');

    if (reduce || !hasIO) {
      [friend, reply, found, doubt, seen].forEach(function (el) { show(el); });
      return;
    }

    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || started) return;
        started = true;
        io.disconnect();
        runChat();
      });
    }, { threshold: 0.3 });
    io.observe(chat);

    function runChat() {
      show(friend, 0);
      show(reply, 550);
      show(found, 1200);
      // pause… then they start typing… then they doubt you.
      setTimeout(function () {
        var typing = document.createElement('div');
        typing.className = 'chat__typing';
        typing.setAttribute('aria-hidden', 'true');
        typing.innerHTML = '<span></span><span></span><span></span>';
        doubt.parentNode.insertBefore(typing, doubt);
        setTimeout(function () {
          typing.remove();
          show(doubt, 0);
          show(seen, 260);
        }, 1300);
      }, 2050);
    }
  }

  /* ---- before / after phone ---- */
  function initSignature() {
    var phone = document.getElementById('signature-phone');
    if (!phone) return;

    var btns = Array.prototype.slice.call(document.querySelectorAll('[data-toggle]'));
    var dead = phone.querySelector('[data-phone-dead]');
    var alive = phone.querySelector('[data-phone-alive]');

    function setState(after) {
      phone.classList.toggle('is-after', after);
      btns.forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-toggle') === (after ? 'after' : 'before'));
      });
      if (dead) dead.setAttribute('aria-hidden', after ? 'true' : 'false');
      if (alive) alive.setAttribute('aria-hidden', after ? 'false' : 'true');
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        setState(b.getAttribute('data-toggle') === 'after');
      });
    });

    if (reduce || !hasIO) { setState(true); return; }

    var auto = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || auto) return;
        auto = true;
        io.disconnect();
        setTimeout(function () { setState(true); }, 900);
      });
    }, { threshold: 0.55 });
    io.observe(phone);
  }

  /* ---- count-ups (₱72,000 …and counting / ₱30,500 — done) ---- */
  function initCountups() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-countup]'));
    if (!els.length) return;

    var settle = function (el) {
      var t = parseInt(el.getAttribute('data-countup'), 10);
      el.textContent = (el.getAttribute('data-prefix') || '') + t.toLocaleString('en-PH');
    };
    if (reduce || !hasIO) { els.forEach(settle); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var target = parseInt(el.getAttribute('data-countup'), 10);
        var prefix = el.getAttribute('data-prefix') || '';
        var t0 = performance.now(), dur = 1400;
        (function tick(t) {
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased).toLocaleString('en-PH');
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- renting stream: ₱2,000 dripping away, one tick at a time ---- */
  function initRentStream() {
    var stream = document.querySelector('[data-stream]');
    if (!stream) return;

    var ticks = [];
    for (var i = 0; i < 36; i++) {
      var s = document.createElement('span');
      s.className = 'stream__tick';
      stream.appendChild(s);
      ticks.push(s);
    }
    var forever = document.createElement('span');
    forever.className = 'stream__forever';
    forever.textContent = 'forever →';
    stream.appendChild(forever);

    if (reduce || !hasIO) return; // ticks already visible

    ticks.forEach(function (k) { k.style.opacity = '0'; k.style.transition = 'opacity .3s ease'; });
    var done = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || done) return;
        done = true;
        io.disconnect();
        ticks.forEach(function (k, idx) { setTimeout(function () { k.style.opacity = '1'; }, 200 + idx * 40); });
      });
    }, { threshold: 0.5 });
    io.observe(stream);
  }

})();
