// Teste A/B da página de doação.
// A = valores em reais. B = o que a doação vira (marmitas, almoços, família).
// Cada pessoa cai numa versão por sorteio e vê sempre a mesma (o navegador guarda só a letra).
// Para abrir uma versão de propósito, use doar.html?v=a ou doar.html?v=b.
(function () {
  var KEY = "fs_ab";
  var v = (new URLSearchParams(location.search).get("v") || "").toLowerCase();
  if (v !== "a" && v !== "b") { try { v = localStorage.getItem(KEY); } catch (e) {} }
  if (v !== "a" && v !== "b") v = Math.random() < 0.5 ? "a" : "b";
  try { localStorage.setItem(KEY, v); } catch (e) {}

  window.FS_AB = v;
  document.documentElement.setAttribute("data-ab", v);
  // Todo evento medido nestas páginas leva a versão junto.
  window.FS_EVENT_PARAMS = window.FS_EVENT_PARAMS || {};
  window.FS_EVENT_PARAMS.variante = v;
})();
