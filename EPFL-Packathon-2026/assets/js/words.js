// Marks some words in the text of every page. See README.md.
(function () {
  "use strict";

  if (!document.createTreeWalker) return;

  var WORDS = /\b(Lean|Bernoulli)\b/;
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|PRE|CODE)$/;

  // Collect the text first: changing it while walking would lose the place.
  var found = [];
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      for (var el = node.parentNode; el && el !== document.body; el = el.parentNode) {
        if (SKIP.test(el.nodeName)) return NodeFilter.FILTER_REJECT;
      }
      return WORDS.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) found.push(walker.currentNode);

  // For assets/js/egg.js.
  function egg(number) {
    return '<span class="egg" data-egg="' + number + '" aria-hidden="true">🥚</span>';
  }

  found.forEach(function (node) {
    // Splitting on a group keeps the matches, at the odd places.
    var parts = node.nodeValue.split(WORDS);
    var replacement = document.createDocumentFragment();
    parts.forEach(function (part, i) {
      if (i % 2) {
        var word = document.createElement("span");
        word.className = part.toLowerCase();
        word.textContent = part;
        // Comes out when the word leans (.lean > .egg in site.css).
        if (part === "Lean") word.insertAdjacentHTML("beforeend", egg(5));
        replacement.appendChild(word);
      } else if (part) {
        replacement.appendChild(document.createTextNode(part));
      }
    });
    node.parentNode.replaceChild(replacement, node);
  });

  // The card for .bernoulli -------------------------------------------------

  var NUMBERS =
    '<p class="numbers__label">Bernoulli numbers ' + egg(6) + "</p>" +
    '<p class="numbers__table">' +
      "<span>B<sub>2</sub> = 1/6</span><span>E<sub>2</sub> = 1 − 24q − ⋯</span>" +
      "<span>B<sub>4</sub> = −1/30</span><span>E<sub>4</sub> = 1 + 240q + ⋯</span>" +
      "<span>B<sub>6</sub> = 1/42</span><span>E<sub>6</sub> = 1 − 504q − ⋯</span>" +
      "<span>B<sub>12</sub> = −691/2730</span><span>τ(n) ≡ σ<sub>11</sub>(n) mod 691</span>" +
    "</p>" +
    '<p class="numbers__note">E<sub>k</sub> = 1 − (2k/B<sub>k</sub>) ∑ σ<sub>k−1</sub>(n) q<sup>n</sup>. ' +
      "E<sub>4</sub> is the theta series of E<sub>8</sub>.</p>";

  var card = null;

  // Above the word if there is room, otherwise below it, and inside the window.
  function show(word) {
    if (!card) {
      card = document.createElement("div");
      card.className = "numbers";
      card.setAttribute("aria-hidden", "true");
      card.innerHTML = NUMBERS;
      card.addEventListener("mouseenter", stay);
      card.addEventListener("mouseleave", leave);
      document.body.appendChild(card);
    }
    card.hidden = false;
    var box = word.getBoundingClientRect(), GAP = 8, EDGE = 8;
    var left = Math.min(box.left, document.documentElement.clientWidth - card.offsetWidth - EDGE);
    var top = box.top - GAP - card.offsetHeight;
    if (top < EDGE) top = box.bottom + GAP;
    card.style.left = Math.round(Math.max(left, EDGE) + window.pageXOffset) + "px";
    card.style.top = Math.round(top + window.pageYOffset) + "px";
  }

  function hide() {
    if (card) card.hidden = true;
  }

  // Only for a pointer that rests on the word: WAIT milliseconds without
  // moving more than STILL pixels. Once shown, the card stays while the
  // pointer is on the word or on the card, with LEAVE milliseconds to go
  // from one to the other.
  var WAIT = 12000;
  var STILL = 3;
  var LEAVE = 400;
  var leaving = 0;

  function stay() {
    clearTimeout(leaving);
  }

  function leave() {
    clearTimeout(leaving);
    leaving = setTimeout(hide, LEAVE);
  }

  document.querySelectorAll(".bernoulli").forEach(function (word) {
    var timer = 0, fromX = 0, fromY = 0;

    function wait(event) {
      clearTimeout(timer);
      fromX = event.clientX;
      fromY = event.clientY;
      timer = setTimeout(function () { show(word); }, WAIT);
    }

    word.addEventListener("mouseenter", function (event) {
      stay();
      if (!card || card.hidden) wait(event);
    });
    word.addEventListener("mousemove", function (event) {
      if (card && !card.hidden) return;
      if (Math.abs(event.clientX - fromX) > STILL || Math.abs(event.clientY - fromY) > STILL) wait(event);
    });
    word.addEventListener("mouseleave", function () {
      clearTimeout(timer);
      leave();
    });
  });
})();
