/* AI chat widget embed. Usage on any website:
   <script src="https://YOUR-SITE/embed.js" data-bot="oak-ember" async></script> */
(function () {
  var s = document.currentScript;
  var origin = new URL(s.src).origin;
  var bot = s.getAttribute("data-bot") || "";
  var f = document.createElement("iframe");
  f.src = origin + "/widget?bot=" + encodeURIComponent(bot);
  f.title = "Chat";
  f.allow = "clipboard-write";
  var closed = "position:fixed;bottom:12px;right:12px;width:84px;height:84px;border:0;z-index:2147483647;background:transparent;color-scheme:normal";
  var opened = "position:fixed;bottom:12px;right:12px;width:min(420px,calc(100vw - 24px));height:min(640px,calc(100vh - 24px));border:0;z-index:2147483647;background:transparent;color-scheme:normal";
  f.style.cssText = closed;
  window.addEventListener("message", function (e) {
    if (e.origin !== origin || !e.data || e.data.type !== "bubaa-chat") return;
    f.style.cssText = e.data.open ? opened : closed;
  });
  (document.body || document.documentElement).appendChild(f);
})();
