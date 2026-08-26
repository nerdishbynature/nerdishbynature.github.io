// The address is never present in the page source. Each half is stored
// ROT13'd and reversed, and only joined once a human clicks. Scrapers that
// do not run JavaScript — which is nearly all of them — find nothing.
(function () {
  "use strict";

  function decode(part) {
    return part
      .split("")
      .reverse()
      .join("")
      .replace(/[a-zA-Z]/g, function (c) {
        var base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      });
  }

  function address(el) {
    return decode(el.dataset.a) + String.fromCharCode(64) + decode(el.dataset.b);
  }

  function href(el) {
    var url = "mailto:" + address(el);
    return el.dataset.subject
      ? url + "?subject=" + encodeURIComponent(el.dataset.subject)
      : url;
  }

  document.querySelectorAll("[data-a][data-b]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();

      // Imprint: show the address in place so it can be read and copied.
      if (el.dataset.reveal !== undefined) {
        var link = document.createElement("a");
        link.href = href(el);
        link.textContent = address(el);
        el.replaceWith(link);
        return;
      }

      window.location.href = href(el);
    });
  });
})();
