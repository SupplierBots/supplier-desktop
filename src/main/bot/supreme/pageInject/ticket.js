(() => {
  return new Promise((resolve, reject) => {
    (function _tic() {
      const cookies = {};
      document.cookie.split(';').forEach(c => {
        const [name, value] = c.split('=');
        if (!c.includes('=')) return;
        cookies[name.trim()] = value.trim();
      });

      if (!cookies['ticket'] || !cookies['_ticket']) resolve();

      const _ticketTimestamp = parseInt(cookies['_ticket'].substr(cookies['_ticket'].length - 10));
      const ticketTimestamp = parseInt(cookies['ticket'].substr(cookies['ticket'].length - 10));

      if (_ticketTimestamp <= ticketTimestamp) {
        setTimeout(_tic, 100);
        return;
      }

      try {
        document.querySelector('#mobile_checkout_form').setAttribute('data-credit_verified', 1);
      } catch {}
      resolve();
    })();
  });
})();
