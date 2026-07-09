/* =========================================================
   Get Found — interactions
   Scroll reveals · nav elevation · the "40-second" chat ·
   before/after phone · count-ups · rent-tick drip.

   Triggers use a lightweight rAF-throttled scroll check rather
   than IntersectionObserver, so they fire reliably in every
   browser (and in embedded preview renderers) and never leave
   content hidden. Motion still respects prefers-reduced-motion:
   large/spatial motion is switched off in CSS, gentle fades and
   the storytelling beats remain.
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

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  function show(el, delay) {
    if (!el) return;
    if (delay) setTimeout(function () { el.classList.add('is-visible'); }, delay);
    else el.classList.add('is-visible');
  }

  /* ---- "in view" trigger: fires cb once when el scrolls in ---- */
  var watchers = [];
  function onView(el, cb, offset) {
    if (!el) return;
    watchers.push({ el: el, cb: cb, offset: (offset == null ? 0.1 : offset), done: false });
  }
  function pump() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < watchers.length; i++) {
      var w = watchers[i];
      if (w.done) continue;
      if (w.el.getBoundingClientRect().top < vh * (1 - w.offset)) {
        w.done = true;
        try { w.cb(); } catch (e) { /* keep the loop alive */ }
      }
    }
  }
  ready(function () {
    applyConfig();
    initNav();
    initReveals();
    initChat();
    initSignature();
    initCountups();
    initRentStream();

    // Call pump directly on scroll (scroll events are already frame-throttled by
    // the browser) so reveals fire even where requestAnimationFrame is throttled.
    window.addEventListener('scroll', pump, { passive: true });
    window.addEventListener('resize', pump, { passive: true });
    pump();                   // reveal whatever is already in view
    setTimeout(pump, 60);     // ...and again once layout settles
    setTimeout(pump, 400);
    window.addEventListener('load', pump);
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
    Array.prototype.slice
      .call(document.querySelectorAll('[data-reveal]'))
      .filter(function (el) { return !el.closest('#chat'); })
      .forEach(function (el) {
        onView(el, function () {
          show(el, parseInt(el.getAttribute('data-reveal-delay') || '0', 10));
        }, 0.08);
      });
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

    onView(chat, function () {
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
    }, 0.28);
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

    var auto = false;
    onView(phone, function () {
      if (auto) return;
      auto = true;
      setTimeout(function () { setState(true); }, 900);
    }, 0.35);
  }

  /* ---- count-ups (₱72,000 …and counting / ₱30,500 — done) ---- */
  function initCountups() {
    Array.prototype.slice.call(document.querySelectorAll('[data-countup]')).forEach(function (el) {
      onView(el, function () {
        var target = parseInt(el.getAttribute('data-countup'), 10);
        var prefix = el.getAttribute('data-prefix') || '';
        var steps = 44, i = 0, dur = 1400;
        var settle = function () { el.textContent = prefix + target.toLocaleString('en-PH'); };
        var timer = setInterval(function () {
          i++;
          var p = i / steps;
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased).toLocaleString('en-PH');
          if (i >= steps) { clearInterval(timer); settle(); }
        }, dur / steps);
        // Safety: guarantee the final value even if timers are throttled (e.g. a
        // backgrounded/throttled tab), so it never sticks on a partial number.
        setTimeout(function () { clearInterval(timer); settle(); }, dur + 250);
      }, 0.2);
    });
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

    ticks.forEach(function (k) { k.style.opacity = '0'; k.style.transition = 'opacity .3s ease'; });
    onView(stream, function () {
      ticks.forEach(function (k, idx) { setTimeout(function () { k.style.opacity = '1'; }, 200 + idx * 40); });
    }, 0.25);
  }

})();
