// Quote form handling.
//
// No form service involved: on submit the form opens the visitor's mail app
// with a pre-filled message. Because a page can't tell whether a mail app
// actually opened, a box with the finished message and copy buttons is shown
// as well, so people using webmail can paste it in themselves.
var EMAIL = ["piet", "nerdishbynature.com"].join("@"); // split so scrapers miss it

(function () {
  var form = document.getElementById("quote-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var fallback = document.getElementById("mail-fallback");
  var message = document.getElementById("mail-text");
  var addressLink = document.getElementById("mail-address");

  function setStatus(text, kind) {
    status.textContent = text;
    status.className = "status" + (kind ? " " + kind : "");
  }

  function compose(data) {
    var subject = "Angebotsanfrage 3D-Druck – " + data.get("firma");
    var body = [
      "Name: " + data.get("name"),
      "Firma: " + data.get("firma"),
      "E-Mail: " + data.get("email"),
      "Telefon: " + (data.get("telefon") || "–"),
      "Stückzahl: " + (data.get("stueckzahl") || "–"),
      "Material / Farbe: " + (data.get("material") || "–"),
      "Liefertermin: " + (data.get("zeitrahmen") || "–"),
      "Budgetrahmen: " + (data.get("budget") || "–"),
      "",
      data.get("projekt")
    ].join("\n");
    return { subject: subject, body: body };
  }

  function legacyCopy(text) {
    var tmp = document.createElement("textarea");
    tmp.value = text;
    tmp.setAttribute("readonly", "");
    tmp.style.position = "absolute";
    tmp.style.left = "-9999px";
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();
  }

  function copy(text, button) {
    var label = button.textContent;
    var done = function () {
      button.textContent = "Kopiert ✓";
      setTimeout(function () { button.textContent = label; }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
    } else {
      legacyCopy(text);
      done();
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot filled → bot

    var mail = compose(data);
    var href = "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(mail.subject) +
      "&body=" + encodeURIComponent(mail.body);

    message.value = "Betreff: " + mail.subject + "\n\n" + mail.body;
    addressLink.href = href;
    addressLink.textContent = EMAIL;
    fallback.hidden = false;

    setStatus("Ihr E-Mail-Programm sollte sich jetzt mit der fertigen Nachricht öffnen. Sie müssen sie nur noch absenden.", "ok");
    window.location.href = href;
  });

  document.getElementById("copy-text").addEventListener("click", function () {
    copy(message.value, this);
  });
  document.getElementById("copy-address").addEventListener("click", function () {
    copy(EMAIL, this);
  });
})();
