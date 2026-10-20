// Métricas com consentimento (LGPD): GA4 e pixel só carregam depois que a pessoa aceita.
(function () {
  var C = window.FS_CONFIG || {};
  var KEY = "fs_consent";

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadGA4() {
    if (!C.GA4_ID || window.gtag) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + C.GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", C.GA4_ID);
  }

  function loadPixel() {
    if (!C.META_PIXEL_ID || window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", C.META_PIXEL_ID);
    fbq("track", "PageView");
  }

  // Eventos disparados antes do aceite ficam guardados e só são enviados se a pessoa aceitar.
  var fila = [];

  function startTracking() {
    loadGA4(); loadPixel();
    fila.splice(0).forEach(function (ev) { fsTrack.apply(null, ev); });
  }

  // Evento único para GA4 e pixel. ga = nome no GA4, fb = nome padrão do pixel (opcional).
  // Parâmetros em window.FS_EVENT_PARAMS (ex.: a variante do teste A/B) vão junto em todo evento.
  window.fsTrack = function (ga, params, fb) {
    var p = {}, extra = window.FS_EVENT_PARAMS || {}, k;
    for (k in extra) p[k] = extra[k];
    for (k in params || {}) p[k] = params[k];
    if (!window.gtag && !window.fbq && getConsent() === null && (C.GA4_ID || C.META_PIXEL_ID)) {
      fila.push([ga, params, fb]);
      return;
    }
    if (window.gtag) gtag("event", ga, p);
    if (window.fbq && fb) fbq("track", fb);
    if (!C.GA4_ID && !C.META_PIXEL_ID) console.info("[demo] evento:", ga, p);
  };

  function showBanner() {
    var b = document.createElement("div");
    b.className = "cookie";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML =
      '<p>Usamos cookies de métricas (Google Analytics) para medir, de forma anônima, como as pessoas passam pelo funil. ' +
      '<a href="privacidade.html">Saiba mais</a></p>' +
      '<div class="cookie-btns"><button type="button" class="btn btn-ghost" data-v="recusado">Recusar</button>' +
      '<button type="button" class="btn" data-v="aceito">Aceitar</button></div>';
    b.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-v");
      if (!v) return;
      setConsent(v);
      b.remove();
      if (v === "aceito") startTracking();
    });
    document.body.appendChild(b);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var c = getConsent();
    if (c === "aceito") startTracking();
    else if (c !== "recusado" && (C.GA4_ID || C.META_PIXEL_ID)) showBanner();

    // Qualquer link com data-track dispara um evento ao clicar.
    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        fsTrack(el.getAttribute("data-track"), { link_url: el.href || "" }, el.getAttribute("data-fb") || undefined);
      });
    });

    // Links de WhatsApp montados a partir do número da configuração.
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.href = "https://wa.me/" + C.WHATSAPP + "?text=" + encodeURIComponent(el.getAttribute("data-wa"));
    });
  });
})();
