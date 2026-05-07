/* offline.js — Connection awareness for Neural Survival: Fracture Realm
   Loaded BEFORE game.js so the initial state is always correct.          */
(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────────── */
  function isOnline() { return navigator.onLine; }

  /* ── UI update ───────────────────────────────────────────────────── */
  function updateUI(online, isInitial) {
    window.__nsOnline = online;

    /* Connection pill */
    var pill = document.getElementById('connPill');
    if (pill) {
      pill.innerHTML = online
        ? '<span class="conn-dot"></span>ONLINE'
        : '<span class="conn-dot"></span>OFFLINE';
      pill.className = 'conn-pill ' + (online ? 'conn-online' : 'conn-offline');
      pill.title = online
        ? 'Connected — all features available'
        : 'No internet — singleplayer only';
    }

    /* Multiplayer buttons */
    ['btnMultiplayer', 'btnMulti', 'btnGodMulti'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.disabled = !online;
      el.style.opacity = online ? '' : '0.35';
      el.style.cursor  = online ? '' : 'not-allowed';
      el.title = online ? '' : 'Offline — multiplayer unavailable';
    });

    /* Login / Account button */
    var btnAccount = document.getElementById('btnAccount');
    if (btnAccount) {
      btnAccount.disabled = !online;
      btnAccount.style.opacity = online ? '' : '0.35';
      btnAccount.title = online ? '' : 'Offline — login unavailable';
    }

    /* Leaderboard button */
    var btnLeader = document.getElementById('btnLeader');
    if (btnLeader) {
      btnLeader.disabled = !online;
      btnLeader.style.opacity = online ? '' : '0.35';
      btnLeader.title = online ? '' : 'Offline — leaderboard unavailable';
    }

    /* SP offline note */
    var spNote = document.getElementById('spOfflineNote');
    if (spNote) spNote.style.display = online ? 'none' : 'inline';

    /* Dispatch event so game.js can react */
    try {
      window.dispatchEvent(new CustomEvent('nsConnectionChange', { detail: { online: online } }));
    } catch (_) {}

    /* Toast (skip on initial silent load) */
    if (!isInitial) showConnToast(online);
  }

  /* ── Toast notification ──────────────────────────────────────────── */
  function showConnToast(online) {
    var existing = document.getElementById('connToast');
    if (existing) { existing.remove(); }

    var toast = document.createElement('div');
    toast.id = 'connToast';
    toast.className = 'conn-toast ' + (online ? 'conn-toast-online' : 'conn-toast-offline');
    toast.innerHTML = online
      ? '<span style="color:#3dffb0;margin-right:7px">&#9679;</span>Back online &mdash; all features restored'
      : '<span style="color:#ff3d6a;margin-right:7px">&#9679;</span>Offline mode &mdash; singleplayer only';
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('conn-toast-show');
      setTimeout(function () {
        toast.classList.remove('conn-toast-show');
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 500);
      }, 3500);
    });
  }

  /* ── Event listeners ─────────────────────────────────────────────── */
  window.addEventListener('online',  function () { updateUI(true,  false); });
  window.addEventListener('offline', function () { updateUI(false, false); });

  /* ── Boot: run after DOM is ready ────────────────────────────────── */
  function init() { updateUI(isOnline(), true); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Service Worker registration ─────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(function (reg) {
          console.log('[SW] Registered, scope:', reg.scope);
        })
        .catch(function (err) {
          console.warn('[SW] Registration failed:', err);
        });
    });
  }

  /* ── Expose globally ─────────────────────────────────────────────── */
  window.__nsOnline  = isOnline();
  window.nsIsOnline  = isOnline;
})();
