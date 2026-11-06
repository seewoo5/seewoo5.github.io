// Count down to the application deadline (application_deadline_iso in
// _config.yml) in every .countdown on the page, and say that applications
// are closed once it has passed. To preview, add ?now=2026-10-30T23:58 to
// the address (read in the deadline's time zone).
(function () {
  // In minutes.
  var DAY = 1440, HOUR = 60;
  var MINUTE_MS = 60000;

  var clocks = [];
  document.querySelectorAll(".countdown[data-deadline]").forEach(function (el) {
    var iso = el.getAttribute("data-deadline");
    var deadline = Date.parse(iso);
    if (isNaN(deadline)) return;
    var nums = {};
    el.querySelectorAll("[data-unit]").forEach(function (n) { nums[n.getAttribute("data-unit")] = n; });
    clocks.push({ el: el, iso: iso, deadline: deadline, nums: nums });
  });
  if (!clocks.length) return;

  // With ?now=, run the clock from that moment instead of the real one.
  var shift = 0;
  var override = /[?&]now=(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?)/.exec(location.search);
  if (override) {
    var zone = /(Z|[+-]\d{2}:\d{2})$/.exec(clocks[0].iso);
    var then = Date.parse(override[1] + (zone ? zone[1] : ""));
    if (!isNaN(then)) shift = then - Date.now();
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick() {
    var now = Date.now() + shift;
    var next = Infinity;

    clocks.forEach(function (c) {
      // Minutes left, rounded up, so that it reads 00 00 00 only once
      // applications are closed.
      var ms = c.deadline - now;
      var left = Math.ceil(ms / MINUTE_MS);
      var open = left > 0;

      c.el.querySelector(".countdown__clock").hidden = !open;
      c.el.querySelector(".countdown__closed").hidden = open;
      // Red for the last day, like the session in progress on the schedule.
      c.el.classList.toggle("is-soon", open && left < DAY);
      c.el.hidden = false;
      if (!open) return;

      c.nums.days.textContent = pad(Math.floor(left / DAY));
      c.nums.hours.textContent = pad(Math.floor(left % DAY / HOUR));
      c.nums.minutes.textContent = pad(left % HOUR);
      next = Math.min(next, ms % MINUTE_MS || MINUTE_MS);
    });

    // Wake up when the next minute changes.
    if (next < Infinity) setTimeout(tick, next);
  }

  tick();
})();
