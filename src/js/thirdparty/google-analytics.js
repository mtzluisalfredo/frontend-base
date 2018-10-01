(function (w, d) {
  const script = d.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GOOGLE_CODE_ID';

  w.syncWidget = {};
  d.getElementsByTagName('head')[0].appendChild(script);

  w.dataLayer = w.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'GOOGLE_CODE_ID');

  window.gtag = gtag;
}(window, document));
