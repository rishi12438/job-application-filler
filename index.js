document.addEventListener("DOMContentLoaded", init, false);
function init() {
  dragula([
    document.querySelector("#dragparent"),
    document.querySelector("#dragparent1"),
  ]);
}
