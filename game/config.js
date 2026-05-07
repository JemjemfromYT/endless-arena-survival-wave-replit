// Endless Arena — Backend configuration
// -----------------------------------------------
// When hosting FRONTEND on GitHub Pages and BACKEND on Replit,
// set BACKEND_URL to your Replit deployed URL, e.g.:
//   window.BACKEND_URL = 'https://endless-arena.replit.app';
//
// Leave empty ('') when everything is hosted on Replit.
// -----------------------------------------------
window.BACKEND_URL = 'https://arena-survival--JemjemfromYT.replit.app';

// When BACKEND_URL is set, intercept Image and Audio creation
// so /game/images/ and /game/sounds/ paths resolve to the backend.
// This is a no-op when BACKEND_URL is empty (Replit hosting).
(function () {
  if (!window.BACKEND_URL) return;

  // Patch HTMLImageElement.prototype.src — catches all new Image() calls
  var _imgDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    configurable: true,
    get: _imgDesc.get,
    set: function (val) {
      _imgDesc.set.call(
        this,
        (typeof val === 'string' && val.startsWith('/game/'))
          ? window.BACKEND_URL + val
          : val
      );
    }
  });

  // Patch Audio constructor — catches all new Audio(src) calls
  var _OrigAudio = window.Audio;
  window.Audio = function (src) {
    return new _OrigAudio(
      (typeof src === 'string' && src.startsWith('/game/'))
        ? window.BACKEND_URL + src
        : src
    );
  };
  window.Audio.prototype = _OrigAudio.prototype;
})();
