(function () {
  const items = document.querySelectorAll(".reveal");

  function inView(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    return r.top < vh - 60 && r.bottom > 60;
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
    items.forEach((el) => inView(el) && onEnter(el));
  }

  window.addEventListener("load", check);
  window.addEventListener("scroll", check);
})();

function runCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur = 900;
  const from = 0;
  const start = Date.now();

  function step() {
    const p = Math.min(1, (Date.now() - start) / dur);
    el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

$(".filter-btn").on("click", function () {
  const f = $(this).data("filter");
  $(".project-item").hide();
  (f === "all" ? $(".project-item") : $(".project-item." + f)).fadeIn();
});

window.addEventListener("load", () => {
  const photo = document.querySelector(".profile-photo");
  if (photo) photo.classList.add("show");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      el.checkValidity();
      form.classList.add("was-validated");
    });
  });

  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    e.preventDefault();
    const status = document.getElementById("formStatus");
    if (status) status.classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
  });
});
