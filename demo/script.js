/* Kinetiq — Egghead Labs demo (eggheadlabs.net/demo)
   Small vanilla-JS interactions. No dependencies. */

(function () {
  'use strict';

  /* --- Nav shadow on scroll --- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Kinetic click demo ---
     Every button press "harvests" a little charge: fills the meter,
     flashes a pulse ring, and increments a self-powered click counter. */
  var device      = document.getElementById('device');
  var pulse       = document.getElementById('pulse');
  var meterFill   = document.getElementById('meterFill');
  var chargeLabel = document.getElementById('chargeLabel');
  var clickCount  = document.getElementById('clickCount');

  var count = 0;

  function harvest(label) {
    count += 1;
    if (clickCount) clickCount.textContent = count.toLocaleString();

    // Momentary charge visualisation — energy comes in, then bleeds off.
    if (meterFill) {
      meterFill.style.width = '100%';
      window.setTimeout(function () { meterFill.style.width = '0%'; }, 260);
    }
    if (chargeLabel) {
      chargeLabel.textContent = label === 'prev' ? '◂ Back' : '▸ Next';
      window.setTimeout(function () { chargeLabel.textContent = 'Charged ⚡'; }, 120);
    }
    if (pulse) {
      pulse.classList.remove('go');
      // Force reflow so the animation can retrigger on rapid clicks.
      void pulse.offsetWidth;
      pulse.classList.add('go');
    }
  }

  // Delegate clicks from the two on-device buttons.
  var buttons = document.querySelectorAll('.device__btn');
  Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      harvest(b.getAttribute('data-key'));
    });
  });

  // Clicking/keyboarding anywhere on the device also fires a "next".
  if (device) {
    device.addEventListener('click', function () { harvest('next'); });
    device.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        harvest(e.shiftKey ? 'prev' : 'next');
      }
    });
  }

  /* --- Pre-order form (demo only, nothing is sent) --- */
  var form = document.getElementById('preorderForm');
  var email = document.getElementById('email');
  var msg = document.getElementById('formMsg');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!msg || !email) return;
      var val = email.value.trim();
      if (!EMAIL_RE.test(val)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'form__msg err';
        email.focus();
        return;
      }
      msg.textContent = '⚡ Reserved! We’ll email ' + val + ' when the founding batch ships.';
      msg.className = 'form__msg ok';
      form.reset();
    });
  }
})();
