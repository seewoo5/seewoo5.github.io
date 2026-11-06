// The infoview panel. See "The infoview" in README.md.
(function () {
  "use strict";

  var script = document.currentScript;
  if (!script || !window.Intl || !document.documentElement.classList) return;
  var data = script.dataset;   // set in _layouts/default.html

  var MINUTE = 60000, HOUR = 60 * MINUTE, DAY = 24 * HOUR;
  var OPEN = "infoview";               // sessionStorage: open on this visit
  var FORM = "infoview:form-opened";   // localStorage: has opened the form

  // Storage can be missing or blocked. The infoview works without it.
  function load(storage, key) {
    try {
      return window[storage].getItem(key);
    } catch (error) {
      return null;
    }
  }

  function save(storage, key, value) {
    try {
      if (value === null) window[storage].removeItem(key);
      else window[storage].setItem(key, value);
    } catch (error) {
      // Not remembered, then.
    }
  }

  // With ?now=, the clock runs from that moment, read in the deadline's time
  // zone (the same as the workshop's).
  var zone = (/(Z|[+-]\d{2}:\d{2})$/.exec(data.deadline) || ["", ""])[1];
  var shift = 0;
  var override = /[?&]now=(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?)/.exec(location.search);
  if (override) {
    var then = Date.parse(override[1] + zone);
    if (!isNaN(then)) shift = then - Date.now();
  }

  var deadline = Date.parse(data.deadline);
  var start = Date.parse(data.start + "T00:00:00" + zone);
  var end = Date.parse(data.end + "T23:59:59" + zone);

  // "14 days", "5 hours", "1 minute": the largest unit that fits.
  function span(ms) {
    var n = ms >= DAY ? Math.floor(ms / DAY) : ms >= HOUR ? Math.floor(ms / HOUR) : Math.max(1, Math.ceil(ms / MINUTE));
    var unit = ms >= DAY ? "day" : ms >= HOUR ? "hour" : "minute";
    return n + " " + unit + (n === 1 ? "" : "s");
  }

  function count(selector) {
    return document.querySelectorAll(selector).length;
  }

  // Tactic states ---------------------------------------------------------
  //
  // One per page, keyed by page.url. A hypothesis is [name, type] or
  // [name, type, comment]; a state without a goal says "No goals".

  var you = ["you", "Visitor"];

  function beforeDeadline(now, name) {
    return now < deadline
      ? [name, "now < deadline", span(deadline - now) + " left"]
      : [name, "deadline < now"];
  }

  var states = {
    "/": function () {
      return {
        file: "MainTheorem.lean:16:2",
        hyps: [],
        goal: "SpherePackingConstant 8 = E8Packing.density",
        messages: [["MainTheorem.lean:15:8", "declaration uses `sorry`"]]
      };
    },

    "/participants/": function (now) {
      return {
        file: "Participants.lean:1:0",
        hyps: [you, ["h₁", "participants.card = " + count(".people .person")], beforeDeadline(now, "h₂")],
        goal: "you ∈ participants"
      };
    },

    "/groups/": function () {
      return {
        file: "Groups.lean:1:0",
        hyps: [you, ["groups", "Finset Group"], ["h", "groups.card = " + count(".topics tbody tr")]],
        goal: "∃ g ∈ groups, you ∈ g"
      };
    },

    "/schedule/": function (now) {
      var file = "Schedule.lean:1:0";
      var wait = now < start ? [["h", "now < start", span(start - now) + " to go"]] : [];
      if (document.querySelector(".tba")) {
        return { file: file, hyps: wait, goal: "program.Fixed" };
      }
      if (now < start) return { file: file, hyps: [you].concat(wait), goal: "Attends you packathon" };
      // During the week, the session in progress (marked by schedule.js).
      // innerText leaves out what words.js hides in the title.
      var session = document.querySelector(".slot.is-now .slot__title");
      if (now > end || !session) return { file: file, hyps: [], goal: null };
      return {
        file: file,
        hyps: [["you", "Participant"], ["session", 'Session := "' + session.innerText.trim() + '"']],
        goal: "Attends you session"
      };
    },

    "/venue/": function () {
      var where = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return {
        file: "Venue.lean:1:0",
        hyps: [you].concat(where ? [["h₁", 'you.timeZone = "' + where + '"']] : [],
                           [["h₂", "∀ train : SBB, train.OnTime"]]),
        goal: "Reachable you bernoulliCenter"
      };
    },

    "/application/": function (now) {
      var file = "Application.lean:1:0";
      if (load("localStorage", FORM)) return { file: file, hyps: [], goal: null };
      if (now >= deadline) return { file: file, hyps: [beforeDeadline(now, "h")], goal: "False" };
      return { file: file, hyps: [you, beforeDeadline(now, "h")], goal: "you ∈ applicants" };
    },

    "/404.html": function () {
      var path = location.pathname.slice((data.base || "").length) || "/";
      return { file: "404.lean:1:0", hyps: [["h", '"' + path + '" ∉ pages']], goal: "False" };
    }
  };

  function fallback(now) {
    return { file: "Packathon.lean:1:0", hyps: [you, beforeDeadline(now, "h")], goal: "you ∈ participants" };
  }

  // The panel -------------------------------------------------------------

  var panel = null, body = null, returnTo = null;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // A section that opens and closes, as in the infoview.
  function section(title, className) {
    var details = el("details", className);
    details.open = true;
    details.appendChild(el("summary", "", title));
    return details;
  }

  function render() {
    var state = (states[data.page] || fallback)(Date.now() + shift);
    var messages = state.messages || [];
    body.textContent = "";

    var tactic = section("Tactic state", "infoview__state");
    if (state.goal) {
      tactic.appendChild(el("p", "infoview__count", "1 goal"));
      var goal = el("pre", "infoview__goal");
      state.hyps.forEach(function (hyp) {
        goal.appendChild(el("span", "infoview__name", hyp[0]));
        goal.appendChild(document.createTextNode(" : " + hyp[1]));
        if (hyp[2]) goal.appendChild(el("span", "infoview__comment", "  -- " + hyp[2]));
        goal.appendChild(document.createTextNode("\n"));
      });
      var target = el("span", "infoview__target", " " + state.goal);
      target.insertBefore(el("span", "infoview__vdash", "⊢"), target.firstChild);
      goal.appendChild(target);
      tactic.appendChild(goal);
    } else {
      tactic.appendChild(el("p", "infoview__count", "No goals"));
    }
    var here = section(state.file, "infoview__file");
    here.appendChild(tactic);
    body.appendChild(here);

    var all = section("All Messages (" + messages.length + ")", "infoview__messages");
    messages.forEach(function (message) {
      var one = section(message[0], "infoview__file");
      one.appendChild(el("p", "infoview__message", message[1]));
      all.appendChild(one);
    });
    body.appendChild(all);
  }

  function create() {
    panel = el("aside", "infoview");
    panel.setAttribute("aria-label", "Lean infoview");
    panel.tabIndex = -1;
    var close = el("button", "infoview__close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Close the infoview");
    close.addEventListener("click", hide);
    body = el("div");
    var egg = el("span", "egg", "🥚");
    egg.setAttribute("data-egg", "3");
    egg.setAttribute("aria-hidden", "true");
    var end = el("p", "infoview__egg");
    end.appendChild(egg);
    panel.appendChild(close);
    panel.appendChild(body);
    panel.appendChild(end);
    document.body.appendChild(panel);
  }

  function isOpen() {
    return panel !== null && !panel.hidden;
  }

  // On very wide windows the page makes room for the panel (see .has-infoview
  // in site.css). The map on the Venue page only notices on a resize.
  function reflow() {
    try {
      window.dispatchEvent(new Event("resize"));
    } catch (error) {
      // Old browsers: the map keeps its size until the window changes.
    }
  }

  function show(focus) {
    if (!panel) create();
    render();
    panel.hidden = false;
    document.documentElement.classList.add("has-infoview");
    save("sessionStorage", OPEN, "open");
    reflow();
    if (focus) {
      returnTo = document.activeElement;
      panel.focus({ preventScroll: true });
    }
  }

  function hide() {
    if (!isOpen()) return;
    panel.hidden = true;
    document.documentElement.classList.remove("has-infoview");
    save("sessionStorage", OPEN, null);
    reflow();
    if (returnTo && document.body.contains(returnTo)) returnTo.focus({ preventScroll: true });
    returnTo = null;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.shiftKey && (event.ctrlKey || event.metaKey) && !event.altKey) {
      event.preventDefault();
      if (isOpen()) hide();
      else show(true);
    } else if (event.key === "Escape" && isOpen()) {
      hide();
    }
  });

  // Remember that the application form was opened, for the Application page.
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");
    if (link && link.getAttribute("href") === data.form) save("localStorage", FORM, "yes");
  });

  // Back from another page or tab: the state may have changed.
  window.addEventListener("pageshow", function () {
    if (isOpen()) render();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && isOpen()) render();
  });

  if (load("sessionStorage", OPEN)) show(false);
})();
