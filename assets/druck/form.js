// Quote form handling.
//
// No form service involved: on submit the form opens the visitor's mail app
// with a pre-filled message. Because a page can't tell whether a mail app
// actually opened, a box with the finished message and copy buttons is shown
// as well, so people using webmail can paste it in themselves.
var EMAIL = ["piet", "nerdishbynature.com"].join("@"); // split so scrapers miss it
var WHATSAPP = ["49", "171", "775", "7552"].join(""); // same idea for the number

// Contact links are only assembled here, so neither the address nor the number
// appears in the HTML. [data-email] gets the address as link and text,
// [data-whatsapp] a chat link. Elements that make no sense without these links
// carry `hidden` in the HTML and are revealed here.
(function () {
  document.querySelectorAll("[data-email]").forEach(function (link) {
    link.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Anfrage 3D-Druck");
    link.textContent = EMAIL;
  });
  var whatsappLinks = document.querySelectorAll("[data-whatsapp]");
  var form = document.getElementById("quote-form");

  // Once someone has started the quote form, the chat starts with what they
  // entered, so switching to WhatsApp halfway doesn't mean typing it again.
  // Selects only count when changed from their first option, which is the
  // default rather than an answer.
  function whatsappText() {
    var greeting = "Hallo, ich habe eine Anfrage zum 3D-Druck:";
    if (!form) return greeting + " ";
    var labels = {
      anliegen: "Anliegen", name: "Name", firma: "Firma", email: "E-Mail",
      telefon: "Telefon", stueckzahl: "Stückzahl", material: "Material / Farbe",
      zeitrahmen: "Liefertermin", budget: "Budgetrahmen"
    };
    var lines = [];
    var typed = false;
    Object.keys(labels).forEach(function (key) {
      var field = form.elements[key];
      var value = field.value.trim();
      if (field.tagName === "SELECT") {
        if (key !== "anliegen" && field.selectedIndex === 0) return;
      } else if (value) {
        typed = true;
      } else {
        return;
      }
      lines.push(labels[key] + ": " + value);
    });
    var projekt = form.elements.projekt.value.trim();
    if (projekt) typed = true;
    if (!typed) return greeting + " ";
    return [greeting, ""].concat(lines, projekt ? ["", projekt] : []).join("\n");
  }

  function updateWhatsapp() {
    var href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(whatsappText());
    whatsappLinks.forEach(function (link) { link.href = href; });
  }

  updateWhatsapp();
  whatsappLinks.forEach(function (link) { link.hidden = false; });
  if (form) {
    form.addEventListener("input", updateWhatsapp);
    form.addEventListener("change", updateWhatsapp);
  }

  document.querySelectorAll("[data-needs-js]").forEach(function (el) {
    el.hidden = false;
  });
})();

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
    var subject = "Angebotsanfrage 3D-Druck: " + data.get("anliegen") + " – " + data.get("firma");
    var body = [
      "Anliegen: " + data.get("anliegen"),
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

  // Links like the Prototyp-Express button preselect the request type.
  document.querySelectorAll("[data-anliegen]").forEach(function (link) {
    link.addEventListener("click", function () {
      form.elements.anliegen.value = link.dataset.anliegen;
    });
  });

  document.getElementById("copy-text").addEventListener("click", function () {
    copy(message.value, this);
  });
  document.getElementById("copy-address").addEventListener("click", function () {
    copy(EMAIL, this);
  });
})();
