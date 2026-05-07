// Endless Arena — Service Worker
  // Pre-caches all game assets so the app works fully offline after first load.
  const CACHE = 'endless-arena-v8';

  const PRECACHE = [
    '/endless-arena-survival-wave-replit/game/index.html',
    '/endless-arena-survival-wave-replit/game/config.js',
    '/endless-arena-survival-wave-replit/game/offline.js',
    '/endless-arena-survival-wave-replit/game/colyseus.js',
    '/endless-arena-survival-wave-replit/game/game.js',
    '/endless-arena-survival-wave-replit/game/heroes-dlc.js',
    '/endless-arena-survival-wave-replit/game/images/heroes/iruha.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/jaballas.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/jake.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/james.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/jazmine.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/jeb.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/jeff.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/jian.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/joross.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/joseph.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/joshua.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/justin.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/kagoya.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/kaitu.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/well.png',
  '/endless-arena-survival-wave-replit/game/images/heroes/yachiyu.png',
  '/endless-arena-survival-wave-replit/game/sounds/bgm_game.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/bgm_menu.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss1.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss10.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss11.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss2.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss3.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss4.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss5.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss6.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss7.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss8.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss9.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_black_hole.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_bullet_spiral.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_chain_lightning.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_clone_split.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_dash_strike.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_eclipse_finale.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_gravity_well.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_ground_spikes.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_homing_orbs.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_intro_roar.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_laser_sweep.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_meteor_rain.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_mirror_legion.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_nova_implosion.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_phantom_step.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_prismatic_burst.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_radial_collapse.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_reality_break.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_shadow_clones_assault.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_shockwave.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_shuriken_storm.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_summon_minions.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_telegraph_beam.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_teleport_strike.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_time_freeze_pulse.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_umbral_dash.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/boss_void_zone.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/collect.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/dash.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_iruha.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_jaballas.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_jake.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_james.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_jazmine.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_jeb.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_jeff.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_jian.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_joross.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_joseph.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_joshua.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_justin.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_kagoya.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_kaitu.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_well.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/fire_yachiyu.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/god.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/hit.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/hurt.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/leaderboard.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_iruha.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_jaballas.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_jake.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_james.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_jazmine.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_jeb.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_jeff.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_jian.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_joross.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_joseph.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_joshua.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_justin.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_kagoya.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_kaitu.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_well.mp3',
  '/endless-arena-survival-wave-replit/game/sounds/q_yachiyu.mp3',
  ];

  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
    );
  });

  self.addEventListener('activate', e => {
    e.waitUntil(
      caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
      ).then(() => self.clients.claim())
    );
  });

  self.addEventListener('fetch', e => {
    // Only cache GET requests for same-origin assets
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);
    // Don't cache API or WebSocket calls to the Replit backend
    if (url.hostname.includes('replit.app')) return;
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }))
    );
  });
  