// During the workshop, mark today's column and the session in progress.
// Uses Lausanne time whatever the visitor's time zone. To preview, add
// ?now=2026-11-25T10:15 to the address.
(function () {
  var override = /[?&]now=(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(location.search);
  var date, time;

  if (override) {
    date = override[1];
    time = override[2];
  } else {
    var parts = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Zurich",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    date = parts.year + "-" + parts.month + "-" + parts.day;
    time = parts.hour + ":" + parts.minute;
  }

  var day = document.querySelector('.day[data-date="' + date + '"]');
  if (!day) return;
  day.classList.add("is-today");

  // The current slot is the last one that has started, unless it has an end
  // time that has already passed.
  var current = null;
  day.querySelectorAll(".slot[data-start]").forEach(function (slot) {
    if (slot.getAttribute("data-start") <= time) current = slot;
  });
  if (current) {
    var end = current.getAttribute("data-end");
    if (!end || time < end) current.classList.add("is-now");
  }

  // On a phone the days are stacked: jump to today unless it is already in view.
  if (!location.hash && day.getBoundingClientRect().top > window.innerHeight * 0.6) {
    day.scrollIntoView({ block: "start" });
  }
})();
