// See README.md.
(function () {
  "use strict";

  var game = document.querySelector(".exit");
  var template = document.getElementById("passage-board");
  if (!game || !template || !template.content) return;

  var entry = document.querySelector(".exit-entry");
  var intro = document.querySelector(".exit-intro");
  var scene = game.querySelector(".exit__scene");
  var stage = game.querySelector(".exit__stage");
  var counter = game.querySelector(".exit__counter span");
  var status = game.querySelector(".exit__status span");
  var decisions = game.querySelector(".exit__decisions");
  var begin = game.querySelector(".exit__begin");
  var reference = game.querySelector(".exit__reference");
  var retry = game.querySelector(".exit__retry");
  var egg = game.querySelector(".exit__egg");
  var phase = "reference", reviewing = false, progress = 0;
  var route = [], current = null;

  var changes = [
    function (board) { board.querySelector(".notice__vectors").textContent = "241"; },
    function (board) { board.querySelector(".notice__dimension").textContent = "9"; },
    function (board) {
      board.querySelector(".notice__disc").setAttribute("cx", "27");
      board.querySelector(".notice__logo").setAttribute("aria-label", "Seven discs: one black disc overlaps the red disc");
    },
    function (board) { board.querySelector(".notice__title").textContent = "Watching groups"; },
    function (board) { board.querySelector(".notice__missing").textContent = "You have been found."; },
    function (board) {
      var arrow = board.querySelector(".notice__arrow");
      arrow.textContent = "←";
      arrow.setAttribute("aria-label", "Arrow pointing left");
    },
    function (board) {
      var dates = board.querySelector(".notice__dates");
      dates.textContent = dates.textContent.replace(/\d+/, function (day) { return Number(day) + 1; });
    },
    function (board) { board.querySelector(".notice__location").textContent = "EPFL · Lausane"; },
    function (board) {
      board.querySelector(".notice__center").setAttribute("fill", "currentColor");
      board.querySelector(".notice__logo").setAttribute("aria-label", "Seven separate black discs");
    }
  ];

  function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var item = items[i];
      items[i] = items[j];
      items[j] = item;
    }
    return items;
  }

  function draw(change) {
    var board = template.content.cloneNode(true);
    if (change !== null) changes[change](board);
    scene.replaceChildren(board);
  }

  function readout(text) {
    counter.textContent = "0" + progress;
    status.textContent = text;
  }

  function showRound() {
    current = route[progress];
    draw(current);
    stage.textContent = "Passage";
    decisions.hidden = false;
    reference.hidden = false;
    retry.hidden = true;
    readout("Exit " + progress + " of 8. Inspect the noticeboard, then choose your direction.");
  }

  function start() {
    phase = "round";
    reviewing = false;
    progress = 0;
    var candidates = changes.map(function (_change, index) { return index; });
    route = shuffle(shuffle(candidates).slice(0, 4).concat([null, null, null, null]));
    begin.hidden = true;
    reference.textContent = "View reference";
    showRound();
    decisions.querySelector("button").focus({ preventScroll: true });
    game.scrollIntoView({ block: "start", behavior: "instant" });
  }

  function choose(back) {
    if (phase !== "round" || reviewing) return;
    if (back !== (current !== null)) {
      phase = "failed";
      progress = 0;
      stage.textContent = "Wrong turn";
      decisions.hidden = true;
      retry.hidden = false;
      readout("Wrong turn. Back to exit 0. Check the reference, or try a new passage.");
      retry.focus({ preventScroll: true });
      return;
    }
    progress++;
    if (progress === 8) {
      phase = "won";
      stage.textContent = "Exit reached";
      scene.hidden = true;
      game.querySelector(".exit__rule").hidden = true;
      game.querySelector(".exit__tools").hidden = true;
      decisions.hidden = reference.hidden = true;
      readout("Exit 8 of 8. The passage ends here.");
      egg.hidden = false;
      egg.focus({ preventScroll: true });
      game.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
    showRound();
  }

  entry.querySelector("button").addEventListener("click", function () {
    entry.hidden = intro.hidden = true;
    game.hidden = false;
    draw(null);
    game.focus({ preventScroll: true });
    game.scrollIntoView({ block: "start", behavior: "instant" });
  });
  begin.addEventListener("click", start);
  retry.addEventListener("click", start);
  decisions.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (event.detail > 1) return;
      choose(button.getAttribute("data-choice") === "back");
    });
  });
  reference.addEventListener("click", function () {
    if (phase !== "round" && phase !== "failed") return;
    reviewing = !reviewing;
    draw(reviewing ? null : current);
    reference.textContent = reviewing ? "Return to passage" : "View reference";
    stage.textContent = reviewing ? "Reference" : phase === "failed" ? "Wrong turn" : "Passage";
    decisions.hidden = reviewing || phase !== "round";
    readout(reviewing ? "Reference noticeboard. Your progress is unchanged." :
      phase === "failed" ? "Wrong turn. Back to exit 0. Try a new passage." :
      "Exit " + progress + " of 8. Inspect the noticeboard, then choose your direction.");
  });

  entry.hidden = false;
})();
