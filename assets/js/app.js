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

  const onEnter = (el) => {
    el.classList.add("show");
    const c = el.querySelector(".counter");
    if (c && !c.dataset.started) {
      c.dataset.started = "1";
      runCounter(c);
    }
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          onEnter(e.target);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => io.observe(el));
})();

function runCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10) || 0;
  const dur = 900;
  const start = performance.now();
  const from = parseInt(el.textContent.replace(/\D/g, ""), 10) || 0;

  const step = (t) => {
    const p = Math.min(1, (t - start) / dur);
    const val = Math.floor(from + (target - from) * (1 - Math.pow(1 - p, 3))); // easeOutCubic
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
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
