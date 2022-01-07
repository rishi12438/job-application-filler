document.addEventListener("DOMContentLoaded", init, false);
function init() {
  dragula([
    document.querySelector("#dragparent"),
    document.querySelector("#dragparent1"),
  ]);
}

document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide(".splide");
  splide.mount();
});
