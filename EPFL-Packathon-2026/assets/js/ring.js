// See README.md.
(function () {
  "use strict";

  var footer = document.querySelector(".footer");
  if (!footer) return;

  var AWAY = 2 * 60 * 1000;
  var STAY = 20000;
  var FADE = 1600;
  var left = document.hidden ? Date.now() : null;
  var fading = 0, hiding = 0, hovered = false;
  var mark = document.createElement("div");
  mark.className = "ring";
  mark.hidden = true;
  mark.innerHTML =
    '<svg class="ring__stain" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' +
      '<path class="ring__wash" d="M93 23C111 40 112 73 97 91S51 113 29 98S10 52 23 31S70 7 93 23Z"/>' +
      '<path class="ring__edge" d="M90 21C106 34 113 60 103 81M99 89C86 107 57 111 36 101S10 71 16 49M20 37C31 16 61 9 80 16"/>' +
      '<path class="ring__trace" d="M92 29C107 46 104 75 89 90S51 102 33 89S17 51 31 33S74 14 92 29Z"/>' +
      '<path class="ring__smudge" d="M29 99Q56 116 83 103M14 65Q12 83 24 94"/>' +
      '<circle class="ring__drop" cx="106" cy="99" r="2.4"/>' +
      '<circle class="ring__drop" cx="111" cy="91" r="1.2"/>' +
    '</svg>' +
    '<p class="ring__note">Someone used<br>your workspace. ' +
      '<button class="ring__egg egg" type="button" data-egg="7" aria-label="Show egg code">🥚</button></p>';
  footer.appendChild(mark);

  function pause() {
    clearTimeout(fading);
    clearTimeout(hiding);
    fading = hiding = 0;
    mark.classList.remove("is-fading");
  }

  function hide() {
    pause();
    mark.hidden = true;
  }

  function watch() {
    if (mark.hidden) return;
    var box = mark.getBoundingClientRect();
    if (document.hidden || box.top < 0 || box.bottom > window.innerHeight ||
        hovered || mark.contains(document.activeElement)) {
      pause();
      return;
    }
    if (fading || hiding) return;
    fading = setTimeout(function () {
      fading = 0;
      mark.classList.add("is-fading");
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      hiding = setTimeout(hide, reduced ? 0 : FADE);
    }, STAY);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      left = Date.now();
      pause();
      return;
    }
    if (left !== null && Date.now() - left >= AWAY) {
      pause();
      mark.hidden = false;
    }
    left = null;
    watch();
  });

  mark.addEventListener("pointerenter", function (event) {
    if (event.pointerType === "mouse" || event.pointerType === "pen") {
      hovered = true;
      pause();
    }
  });
  mark.addEventListener("pointerleave", function () {
    hovered = false;
    watch();
  });
  mark.addEventListener("focusin", pause);
  mark.addEventListener("focusout", function () { setTimeout(watch, 0); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") hide();
  });
  window.addEventListener("scroll", watch, { passive: true });
  window.addEventListener("resize", watch);
})();
