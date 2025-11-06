(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    items.forEach((el) => el.classList.add("show"));
    document.querySelectorAll(".counter").forEach((c) => {
      if (!c.dataset.started) {
        c.dataset.started = "1";
        runCounter(c);
      }
    });
    return;
  }

  function inView(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const threshold = Math.min(0.4 * r.height, 60);
    return r.top < vh - threshold && r.bottom > threshold;
  }

  function onEnter(el) {
    if (el.classList.contains("show")) return;
    el.classList.add("show");
    const c = el.querySelector(".counter");
    if (c && !c.dataset.started) {
      c.dataset.started = "1";
      runCounter(c);
    }
  }

  function check() {
    items.forEach((el) => {
      if (!el.classList.contains("show") && inView(el)) onEnter(el);
    });
  }

  window.addEventListener("load", check);
  window.addEventListener("scroll", check);
  window.addEventListener("resize", check);
})();

function runCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10) || 0;
  const dur = 900;
  const from = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0;

  let start = Date.now();
  let timer = setInterval(() => {
    const p = Math.min(1, (Date.now() - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.floor(from + (target - from) * eased);
    el.textContent = val.toLocaleString();
    if (p >= 1) clearInterval(timer);
  }, 16);
}

window.addEventListener("load", () => {
  document.querySelectorAll(".counter").forEach((c) => {
    const box = c.getBoundingClientRect();
    const inView = box.top < window.innerHeight && box.bottom > 0;
    if (inView && !c.dataset.started) {
      c.dataset.started = "1";
      runCounter(c);
    }
  });
});

$(function () {
  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");
    if (filter === "all") {
      $(".project-item").fadeIn();
    } else {
      $(".project-item").hide();
      $(".project-item." + filter).fadeIn();
    }
  });

  const form = $("#contactForm");
  form.on("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      $("#formStatus").removeClass("d-none");
      this.reset();
    }
    $(this).addClass("was-validated");
  });
});

window.addEventListener("load", function () {
  const photo = document.querySelector(".profile-photo");
  if (photo) photo.classList.add("show");
});
