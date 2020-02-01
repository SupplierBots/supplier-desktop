!(function(e) {
  var n = {};
  function t(o) {
    if (n[o]) return n[o].exports;
    var r = (n[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
  }
  (t.m = e),
    (t.c = n),
    (t.d = function(e, n, o) {
      t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o });
    }),
    (t.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (t.t = function(e, n) {
      if ((1 & n && (e = t(e)), 8 & n)) return e;
      if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (t.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & n && 'string' != typeof e)
      )
        for (var r in e)
          t.d(
            o,
            r,
            function(n) {
              return e[n];
            }.bind(null, r),
          );
      return o;
    }),
    (t.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(n, 'a', n), n;
    }),
    (t.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (t.p = ''),
    t((t.s = 87));
})({
  87: function(e, n) {
    var t = {},
      o = navigator.userAgent.indexOf('Firefox') >= 0;
    function r(e, n) {
      chrome.browserAction.setIcon({
        tabId: n,
        path: {
          16: 'icons/16-' + e + '.png',
          32: 'icons/32-' + e + '.png',
          48: 'icons/48-' + e + '.png',
          128: 'icons/128-' + e + '.png',
        },
      }),
        chrome.browserAction.setPopup({ tabId: n, popup: 'popups/' + e + '.html' });
    }
    chrome.runtime.onConnect.addListener(function(e) {
      var n,
        o,
        r = null,
        i = null;
      +(o = e.name) + '' === o
        ? ((r = e.name),
          (i = 'devtools'),
          (n = +e.name),
          chrome.tabs.executeScript(n, { file: '/build/contentScript.js' }, function() {}))
        : ((r = e.sender.tab.id), (i = 'content-script')),
        t[r] || (t[r] = { devtools: null, 'content-script': null }),
        (t[r][i] = e),
        t[r].devtools &&
          t[r]['content-script'] &&
          (function(e, n) {
            function t(e) {
              n.postMessage(e);
            }
            function o(n) {
              e.postMessage(n);
            }
            function r() {
              e.onMessage.removeListener(t),
                n.onMessage.removeListener(o),
                e.disconnect(),
                n.disconnect();
            }
            e.onMessage.addListener(t),
              n.onMessage.addListener(o),
              e.onDisconnect.addListener(r),
              n.onDisconnect.addListener(r);
          })(t[r].devtools, t[r]['content-script']);
    }),
      o &&
        chrome.tabs.onUpdated.addListener(function(e, n, t) {
          t.active && 'loading' === n.status && r('disabled', e);
        }),
      chrome.runtime.onMessage.addListener(function(e, n) {
        if (n.tab && e.hasDetectedReact) {
          var t = e.reactBuildType;
          -1 !== n.url.indexOf('facebook.github.io/react') && (t = 'production'), r(t, n.tab.id);
        }
      });
  },
});
