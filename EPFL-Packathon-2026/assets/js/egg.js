// Shows the code of an .egg next to it. See README.md.
(function () {
  "use strict";

  // The codes by the data-egg of their eggs, in data-codes on this script
  // (from _data/eggs.yml), scrambled with KEY.
  var KEY = "GwQb3DUBly0MYPgdDFWWANgLU7ICp0dS";
  var codes = {};
  try {
    codes = JSON.parse(document.currentScript.getAttribute("data-codes")) || {};
  } catch (error) {
    // No codes: the eggs show nothing.
  }

  function code(egg) {
    var text = "";
    try {
      text = window.atob(codes[egg.getAttribute("data-egg")] || "");
    } catch (error) {
      return "";
    }
    var out = "";
    for (var i = 0; i < text.length; i++) {
      out += String.fromCharCode(text.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length));
    }
    return out;
  }

  var tip = null, current = null;

  // Above the egg if there is room, otherwise below it, inside the window.
  function show(egg) {
    if (!tip) {
      tip = document.createElement("span");
      tip.className = "egg-code";
      document.body.appendChild(tip);
    }
    tip.textContent = code(egg);
    tip.hidden = false;
    var box = egg.getBoundingClientRect(), GAP = 6, EDGE = 8;
    var left = box.left + box.width / 2 - tip.offsetWidth / 2;
    left = Math.min(left, document.documentElement.clientWidth - tip.offsetWidth - EDGE);
    var top = box.top - GAP - tip.offsetHeight;
    if (top < EDGE) top = box.bottom + GAP;
    tip.style.left = Math.round(Math.max(left, EDGE)) + "px";
    tip.style.top = Math.round(top) + "px";
    current = egg;
  }

  // The code is only in the page while it is shown.
  function hide() {
    if (tip) {
      tip.hidden = true;
      tip.textContent = "";
    }
    current = null;
  }

  function eggOf(event) {
    return event.target.closest ? event.target.closest(".egg") : null;
  }

  // An egg can also go away under the pointer (a popup or a panel closes),
  // so anything else the pointer comes to hides the code.
  document.addEventListener("mouseover", function (event) {
    var egg = eggOf(event);
    if (!egg) hide();
    else if (egg !== current) show(egg);
  });

  document.addEventListener("mouseout", function (event) {
    var egg = eggOf(event);
    if (egg && !(event.relatedTarget && egg.contains(event.relatedTarget))) hide();
  });

  // The code stays where it was shown, so it goes when anything scrolls,
  // and with a key, which may close what the egg is in.
  window.addEventListener("scroll", hide, true);
  document.addEventListener("keydown", hide);

  // Without a mouse: a tap shows the code, a tap anywhere else hides it.
  // A tap on an egg in a link shows the code instead of following the link.
  document.addEventListener("click", function (event) {
    var egg = eggOf(event);
    if (!egg) return hide();
    event.preventDefault();
    show(egg);
  }, true);
})();
