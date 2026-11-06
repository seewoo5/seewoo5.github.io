// Falling discs. See "Falling discs" in README.md.
(function () {
  "use strict";

  var canvasSupported = document.createElement("canvas").getContext;
  if (!window.requestAnimationFrame || !canvasSupported) return;

  var INK = "#15171a";
  var RED = "#d52b1e";
  var STEP = 1 / 60;        // seconds of physics per step
  // Short substeps: the weight of the pile squeezes the discs together by
  // an amount that grows with the square of the substep, and squeezed rows
  // let in discs that do not fit.
  var SUBSTEPS = 8;
  var ITERATIONS = 3;       // collision passes per substep
  var DAMPING = 0.996;      // per substep
  var POUR = 1.6;           // seconds to pour them all

  // Hashes of what to type (data-keys on this script, from _data/eggs.yml).
  var KEYS = [];
  try {
    KEYS = JSON.parse(document.currentScript.getAttribute("data-keys")) || [];
  } catch (error) {
    // Nothing to type.
  }
  var LONGEST = 20;         // keys
  var typed = [];           // the last keys pressed

  var canvas = null, ctx = null, label = null;
  var spot = null;          // over the red disc once it is still, with the egg
  var W = 0, H = 0;         // the window, in CSS pixels
  var R = 0;                // radius of a disc
  var G = 0;                // gravity, in pixels per second squared
  var count = 0;            // discs to pour

  // The discs: where they are, where they were a substep ago (their velocity
  // is the difference), and which one is red.
  var x = [], y = [], px = [], py = [], red = [];
  var n = 0;
  var toPour = 0, redAt = -1;
  var floor = true;         // false while the discs fall out of the window
  var running = false, last = 0, carry = 0, idle = 0;
  var before = null;        // where the discs were at the last look

  // A grid of square cells, two radii wide, so that each disc only looks at
  // the discs in the cells around its own.
  var CELL = 0, cols = 0, rows = 0, TOP = 0;
  var head = null, next = null, cellOf = null;

  function size() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * ratio);
    canvas.height = Math.round(H * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    CELL = 2 * R;
    TOP = 8 * R;            // new discs start above the window
    cols = Math.max(1, Math.ceil(W / CELL));
    rows = Math.max(1, Math.ceil((H + TOP + 2 * R) / CELL));
    head = new Int32Array(cols * rows);
  }

  function create() {
    canvas = document.createElement("canvas");
    canvas.className = "discs";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    // The width is an odd number of radii, so that the rows of a hexagonal
    // packing fit between the sides with half a disc to spare: squeezing in
    // one more would take half a disc of overlap.
    var wide = canvas.clientWidth;
    var k = Math.max(1, Math.round(wide / (2 * Math.max(7, Math.min(14, wide / 90))) - 0.5));
    R = wide / (2 * k + 1);
    size();
    G = 3 * H;              // about 0.8 seconds to fall the height of the window
    // Enough discs to fill about a third of the window.
    count = Math.floor(0.3 * W * H * 0.85 / (Math.PI * R * R));
  }

  function remove() {
    running = false;
    canvas.parentNode.removeChild(canvas);
    if (label) label.parentNode.removeChild(label);
    if (spot) spot.parentNode.removeChild(spot);
    canvas = ctx = label = spot = null;
    x = []; y = []; px = []; py = []; red = [];
    n = toPour = 0;
    floor = true;
  }

  // Physics ---------------------------------------------------------------

  function spawn(count) {
    for (var k = 0; k < count; k++) {
      var sx = R + Math.random() * (W - 2 * R);
      var sy = -R - Math.random() * 6 * R;
      x.push(sx); px.push(sx);
      y.push(sy); py.push(sy - 2);
      red.push(n === redAt);
      n++;
    }
    next = new Int32Array(n);
    cellOf = new Int32Array(n);
  }

  function rebuild() {
    head.fill(-1);
    for (var i = 0; i < n; i++) {
      var cx = Math.floor(x[i] / CELL), cy = Math.floor((y[i] + TOP) / CELL);
      cx = cx < 0 ? 0 : cx >= cols ? cols - 1 : cx;
      cy = cy < 0 ? 0 : cy >= rows ? rows - 1 : cy;
      var c = cy * cols + cx;
      cellOf[i] = c;
      next[i] = head[c];
      head[c] = i;
    }
  }

  // Push apart every two discs that overlap, half each way. Returns the
  // largest overlap it found.
  function collide() {
    var D = 2 * R, D2 = D * D, worst = 0;
    for (var i = 0; i < n; i++) {
      var cx = cellOf[i] % cols, cy = (cellOf[i] - cx) / cols;
      for (var ry = Math.max(cy - 1, 0); ry <= Math.min(cy + 1, rows - 1); ry++) {
        for (var rx = Math.max(cx - 1, 0); rx <= Math.min(cx + 1, cols - 1); rx++) {
          for (var j = head[ry * cols + rx]; j !== -1; j = next[j]) {
            if (j <= i) continue;
            var dx = x[j] - x[i], dy = y[j] - y[i], d2 = dx * dx + dy * dy;
            if (d2 >= D2 || d2 === 0) continue;
            var d = Math.sqrt(d2), push = (D - d) / d / 2;
            if (D - d > worst) worst = D - d;
            // One exactly on top of the other, as against a side: tip the push
            // a little, or they stay stacked like a column.
            if (Math.abs(dx) < 0.001 * R) dx = (Math.random() < 0.5 ? -0.01 : 0.01) * R;
            x[i] -= dx * push; y[i] -= dy * push;
            x[j] += dx * push; y[j] += dy * push;
          }
        }
      }
    }
    return worst;
  }

  function bound() {
    for (var i = 0; i < n; i++) {
      if (x[i] < R) x[i] = R;
      else if (x[i] > W - R) x[i] = W - R;
      if (floor && y[i] > H - R) y[i] = H - R;
    }
  }

  function step() {
    var h = STEP / SUBSTEPS, fall = G * h * h, fastest = 0.9 * R;
    for (var s = 0; s < SUBSTEPS; s++) {
      for (var i = 0; i < n; i++) {
        var vx = (x[i] - px[i]) * DAMPING, vy = (y[i] - py[i]) * DAMPING;
        if (floor && y[i] >= H - R - 0.5) vx *= 0.9;   // friction on the floor
        var v = Math.sqrt(vx * vx + vy * vy);
        if (v > fastest) {
          vx *= fastest / v;
          vy *= fastest / v;
        }
        px[i] = x[i]; py[i] = y[i];
        x[i] += vx; y[i] += vy + fall;
      }
      rebuild();
      for (var k = 0; k < ITERATIONS; k++) {
        collide();
        bound();
      }
    }
  }

  // Whether any disc has moved more than half a pixel since `before`. In a
  // tight pile the solver leaves a jitter, but it goes back and forth.
  function still(before) {
    if (!before || before.x.length !== n) return false;
    for (var i = 0; i < n; i++) {
      if (Math.abs(x[i] - before.x[i]) + Math.abs(y[i] - before.y[i]) > 0.5) return false;
    }
    return true;
  }

  // Density ---------------------------------------------------------------
  //
  // The Voronoi cell of a disc is the part of the plane closer to its centre
  // than to any other. In a packing of equal discs each cell is at least as
  // large as the regular hexagon around its disc, so the density measured
  // over whole cells is at most pi/sqrt(12), the density of the hexagonal
  // packing (Thue; Fejes Toth). Here it is measured over every cell that the
  // discs around close (not the ones at the walls, the floor or the top),
  // leaving out the places where discs still overlap: around them, the discs
  // of radius R - SLACK / 2 are a packing, and the density is theirs.

  var SLACK = 0.002;        // overlap allowed, in radii

  function density() {
    var slack = SLACK * R;
    var tight = new Uint8Array(n);        // overlaps another disc
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        if (distance(i, j) < 2 * R - slack) tight[i] = tight[j] = 1;
      }
    }
    rebuild();
    var count = 0, area = 0;
    for (i = 0; i < n; i++) {
      var clear = true;
      for (j = 0; j < n && clear; j++) clear = !tight[j] || distance(i, j) >= 4 * R;
      var a = clear ? cellArea(i) : 0;
      if (!a) continue;
      count++;
      area += a;
    }
    var r = R - slack / 2;
    return count < 20 ? null : count * Math.PI * r * r / area;
  }

  function distance(i, j) {
    return Math.sqrt((x[j] - x[i]) * (x[j] - x[i]) + (y[j] - y[i]) * (y[j] - y[i]));
  }

  // The area of the cell of disc i: a square around it, cut by the
  // perpendicular bisector with each disc nearby. The discs looked at are all
  // those within 6 radii, so the cell is exact if it lies within 3 radii of
  // the centre; otherwise it is not closed, and the area is 0.
  function cellArea(i) {
    var S = 3 * R, cell = [[-S, -S], [S, -S], [S, S], [-S, S]];
    var cx = cellOf[i] % cols, cy = (cellOf[i] - cx) / cols;
    for (var ry = Math.max(cy - 3, 0); ry <= Math.min(cy + 3, rows - 1); ry++) {
      for (var rx = Math.max(cx - 3, 0); rx <= Math.min(cx + 3, cols - 1); rx++) {
        for (var j = head[ry * cols + rx]; j !== -1; j = next[j]) {
          if (j !== i) cell = cut(cell, x[j] - x[i], y[j] - y[i]);
        }
      }
    }
    var area = 0;
    for (var k = 0; k < cell.length; k++) {
      var a = cell[k], b = cell[(k + 1) % cell.length];
      if (a[0] * a[0] + a[1] * a[1] >= S * S) return 0;
      area += a[0] * b[1] - b[0] * a[1];
    }
    return area / 2;
  }

  // The part of the polygon closer to the origin than to (dx, dy).
  function cut(polygon, dx, dy) {
    var limit = (dx * dx + dy * dy) / 2, kept = [];
    for (var k = 0; k < polygon.length; k++) {
      var a = polygon[k], b = polygon[(k + 1) % polygon.length];
      var fa = a[0] * dx + a[1] * dy - limit, fb = b[0] * dx + b[1] * dy - limit;
      if (fa <= 0) kept.push(a);
      if (fa * fb < 0) {
        var t = fa / (fa - fb);
        kept.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
      }
    }
    return kept;
  }

  // From the bottom up, move each disc clear of the discs already placed.
  // Nothing above holds it down, so this takes out the overlaps that the
  // weight of the pile made, which pushing pairs apart only does slowly.
  function lift() {
    var D = 2 * R, order = [], placed = new Uint8Array(n);
    for (var i = 0; i < n; i++) order.push(i);
    order.sort(function (a, b) { return y[b] - y[a]; });
    rebuild();
    order.forEach(function (i) {
      var cx = cellOf[i] % cols, cy = (cellOf[i] - cx) / cols, moved = true;
      for (var pass = 0; pass < 8 && moved; pass++) {
        moved = false;
        for (var ry = Math.max(cy - 1, 0); ry <= Math.min(cy + 1, rows - 1); ry++) {
          for (var rx = Math.max(cx - 1, 0); rx <= Math.min(cx + 1, cols - 1); rx++) {
            for (var j = head[ry * cols + rx]; j !== -1; j = next[j]) {
              if (!placed[j]) continue;
              var dx = x[i] - x[j], dy = y[i] - y[j], d2 = dx * dx + dy * dy;
              if (d2 >= D * D || d2 === 0) continue;
              var d = Math.sqrt(d2), push = (D - d) / d;
              x[i] += dx * push;
              y[i] += dy * push;
              moved = true;
            }
          }
        }
        x[i] = Math.min(Math.max(x[i], R), W - R);
        y[i] = Math.min(y[i], H - R);
      }
      placed[i] = 1;
    });
  }

  // Once the pile is still: take out the overlaps, then measure it.
  function settle() {
    running = false;
    lift();
    var worst = Infinity;
    for (var k = 0; k < 50 && worst > SLACK * R; k++) {
      rebuild();
      worst = collide();
      bound();
    }
    for (var i = 0; i < n; i++) {
      px[i] = x[i];
      py[i] = y[i];
    }
    draw();
    placeSpot();

    var value = density();
    if (value === null) return;
    if (!label) {
      label = document.createElement("p");
      label.className = "discs__density";
      label.setAttribute("role", "status");
      document.body.appendChild(label);
    }
    var top = H;
    for (i = 0; i < n; i++) top = Math.min(top, y[i] - R);
    label.textContent = "density " + value.toFixed(3) + " ≤ π/√12 ≈ 0.907";
    label.style.bottom = Math.round(H - top + 10) + "px";
    label.hidden = false;
  }

  // The canvas lets the pointer through, so the red disc gets a round element
  // of its own, on top of it. The egg in it shows while the pointer is on the
  // disc (site.css), and assets/js/egg.js shows its code.
  function placeSpot() {
    var i = red.indexOf(true);
    if (i < 0) return;
    if (!spot) {
      spot = document.createElement("div");
      spot.className = "discs__red";
      spot.setAttribute("aria-hidden", "true");
      var egg = document.createElement("span");
      egg.className = "egg";
      egg.setAttribute("data-egg", "4");
      egg.textContent = "🥚";
      spot.appendChild(egg);
      document.body.appendChild(spot);
    }
    spot.style.left = x[i] - R + "px";
    spot.style.top = y[i] - R + "px";
    spot.style.width = spot.style.height = 2 * R + "px";
    spot.style.fontSize = 1.2 * R + "px";
    spot.hidden = false;
  }

  // Drawing and timing ----------------------------------------------------

  function draw() {
    ctx.clearRect(0, 0, W, H);
    [INK, RED].forEach(function (color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        if (red[i] !== (color === RED) || y[i] < -R || y[i] > H + R) continue;
        ctx.moveTo(x[i] + R, y[i]);
        ctx.arc(x[i], y[i], R, 0, 2 * Math.PI);
      }
      ctx.fill();
    });
  }

  function wake() {
    if (running) return;
    running = true;
    if (spot) spot.hidden = true;
    last = idle = 0;
    before = null;
    requestAnimationFrame(frame);
  }

  function frame(now) {
    if (!running) return;
    carry += last ? Math.min((now - last) / 1000, 0.05) : STEP;
    last = now;
    while (carry >= STEP) {
      if (toPour > 0) {
        var some = Math.min(toPour, Math.ceil(count / (POUR / STEP)));
        spawn(some);
        toPour -= some;
      }
      step();
      carry -= STEP;
    }
    draw();

    if (!floor) {
      var gone = true;
      for (var i = 0; i < n && gone; i++) gone = y[i] - R > H;
      if (gone) return remove();
    } else if (toPour === 0 && ++idle % 30 === 0) {
      // Every half second: stop once nothing has moved since the last look.
      if (still(before) || idle >= 900) return settle();
      before = { x: x.slice(), y: y.slice() };
    }
    requestAnimationFrame(frame);
  }

  // What starts and ends it -----------------------------------------------

  // One pile at a time: once it has fallen out of the window, another.
  function pour() {
    if (canvas) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    create();
    redAt = Math.floor(Math.random() * count);
    toPour = count;
    wake();
  }

  function drop() {
    if (!canvas || !floor) return;
    floor = false;
    if (label) label.hidden = true;
    wake();
  }

  function hit(cx, cy) {
    for (var i = 0; i < n; i++) {
      var dx = x[i] - cx, dy = y[i] - cy;
      if (dx * dx + dy * dy < R * R) return true;
    }
    return false;
  }

  // FNV-1a, 32 bits.
  function hash(text) {
    var h = 0x811c9dc5;
    for (var i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") return drop();
    if (event.ctrlKey || event.metaKey || event.altKey || !event.key) return;
    var target = event.target;
    if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    typed.push(event.key.toLowerCase());
    if (typed.length > LONGEST) typed.shift();
    // Each ending of what was typed: the last key, the last two, and so on.
    for (var k = 1; k <= typed.length; k++) {
      if (KEYS.indexOf(hash(typed.slice(-k).join(" "))) >= 0) {
        typed = [];
        pour();
        return;
      }
    }
  });

  // A click on a disc lets them all fall, instead of reaching the page under it.
  // Not the red one: a tap there is how to get to its egg without a mouse.
  document.addEventListener("click", function (event) {
    if (spot && !spot.hidden && spot.contains(event.target)) return;
    if (canvas && floor && hit(event.clientX, event.clientY)) {
      event.preventDefault();
      event.stopPropagation();
      drop();
    }
  }, true);

  window.addEventListener("resize", function () {
    if (!canvas) return;
    size();
    if (label) label.hidden = true;
    wake();
  });
})();
