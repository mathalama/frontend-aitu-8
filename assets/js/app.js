// jQuery ready
$(function () {
  // filter projects
  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");
    if (filter === "all") {
      $(".project-item").fadeIn();
    } else {
      $(".project-item").hide();
      $(".project-item." + filter).fadeIn();
    }
  });

  // form validation
  const form = $("#contactForm");
  form.on("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault(); // demo
      $("#formStatus").removeClass("d-none");
      this.reset();
    }
    $(this).addClass("was-validated");
  });
});
