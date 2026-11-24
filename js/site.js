(function () {
  var hamburger = document.querySelector(".navbar_hamburger-wrap");
  var menu = document.querySelector(".navbar_links");

  function setOpen(open) {
    if (!menu || !hamburger) return;
    var nav = document.querySelector(".navbar");
    if (open && nav) {
      var bottom = Math.max(0, Math.round(nav.getBoundingClientRect().bottom));
      document.documentElement.style.setProperty("--site-nav-top", bottom + "px");
    }
    menu.classList.toggle("is-open", open);
    hamburger.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
  }

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });
    hamburger.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(!menu.classList.contains("is-open"));
      }
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (typeof form.reportValidity === "function" && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var to = form.getAttribute("data-mailto");
      var subject = form.getAttribute("data-subject") || "Estimate request";
      var lines = [];
      new FormData(form).forEach(function (value, key) {
        var text = String(value).trim();
        if (!text) return;
        lines.push(key + ": " + text);
      });
      lines.push("");
      lines.push("Sent from " + window.location.href);
      var href =
        "mailto:" +
        to +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      var status = form.querySelector(".form-mailto-status");
      if (status) status.hidden = false;
      window.location.href = href;
    });
  });
})();
