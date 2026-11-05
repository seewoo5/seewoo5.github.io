// Makes the E8 picture on the home page draggable.
//
// Pressing grabs the nearest of the 240 points. Dragging rotates the whole
// root system in R^8 so that this point follows the pointer, and the picture
// shows the projection onto the new plane. The first frame is the Coxeter
// plane, drawn the same way as assets/img/e8.svg (see tools/e8.py), which
// stays in the page for browsers without JavaScript.
(function () {
  "use strict";

  var figure = document.querySelector(".hero__figure");
  var img = figure && figure.querySelector("img");
  var caption = figure && figure.querySelector("figcaption");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext && canvas.getContext("2d");
  if (!img || !ctx || !window.requestAnimationFrame) return;

  // Drawing constants, as in tools/e8.py.
  var INK = "#15171a";
  var RED = "#d52b1e";
  var SIZE = 1000;          // the drawing is SIZE x SIZE units
  var RADIUS = 480;         // radius of the outer ring in the Coxeter plane
  var STROKE = 0.5;
  var DOT = 2.4;
  var DARKEST = 0.6;        // opacity of the shortest lines ...
  var LIGHTEST = 0.07;      // ... and of the longest

  // Orthonormal basis of a Coxeter plane: the real and imaginary parts of an
  // eigenvector of a Coxeter element for exp(2 pi i / 30), from tools/e8.py.
  var A = [0, 0.11911770226439808, 0.1927364909255864, 0.2176388716569293,
    0.19273649092558653, 0.1191177022643981, 0, 0.9219330548851048];
  var B = [0.09689906869984788, 0.4635056599451293, 0.23693032605580572, 0,
    -0.2369303260558058, -0.4635056599451293, -0.6698235723479292, 0];

  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function dot(u, v) {
    var s = 0;
    for (var k = 0; k < 8; k++) s += u[k] * v[k];
    return s;
  }

  function normalize(v) {
    var n = Math.sqrt(dot(v, v));
    for (var k = 0; k < 8; k++) v[k] /= n;
    return v;
  }

  // The 240 roots: (±1, ±1, 0, 0, 0, 0, 0, 0) in all positions, and
  // (±1/2, ..., ±1/2) with an even number of minus signs.
  var roots = [];
  var i, j, k;
  for (i = 0; i < 8; i++) {
    for (j = i + 1; j < 8; j++) {
      for (var signs = 0; signs < 4; signs++) {
        var v = [0, 0, 0, 0, 0, 0, 0, 0];
        v[i] = signs & 1 ? -1 : 1;
        v[j] = signs & 2 ? -1 : 1;
        roots.push(v);
      }
    }
  }
  for (var bits = 0; bits < 256; bits++) {
    var w = [], minus = 0;
    for (k = 0; k < 8; k++) {
      minus += (bits >> k) & 1;
      w.push((bits >> k) & 1 ? -0.5 : 0.5);
    }
    if (minus % 2 === 0) roots.push(w);
  }
  var N = roots.length;

  // Lines join roots at minimal distance, i.e. with inner product 1.
  var ends1 = [], ends2 = [], lines = [];
  for (i = 0; i < N; i++) lines.push([]);
  for (i = 0; i < N; i++) {
    for (j = i + 1; j < N; j++) {
      if (dot(roots[i], roots[j]) === 1) {
        lines[i].push(ends1.length);
        lines[j].push(ends1.length);
        ends1.push(i);
        ends2.push(j);
      }
    }
  }
  var E = ends1.length;

  // State: the projection plane (orthonormal q1, q2) and what it gives.
  var q1 = A.slice();
  var q2 = B.slice();
  var X = new Float64Array(N), Y = new Float64Array(N);    // coordinates in the plane
  var PX = new Float64Array(N), PY = new Float64Array(N);  // positions in the drawing
  var scale = 0;

  function project() {
    var most = 0;
    for (var i = 0; i < N; i++) {
      var x = dot(q1, roots[i]), y = dot(q2, roots[i]);
      X[i] = x;
      Y[i] = y;
      most = Math.max(most, x * x + y * y);
    }
    return Math.sqrt(most);
  }

  // In the Coxeter plane the outer ring has radius RADIUS. Other projections
  // can reach further out (up to sqrt 2 instead of 1.14), so zoom out then.
  var R0 = project();
  var S0 = RADIUS / R0;

  function place() {
    scale = S0 * Math.min(1, R0 / project());
    for (var i = 0; i < N; i++) {
      PX[i] = SIZE / 2 + X[i] * scale;
      PY[i] = SIZE / 2 - Y[i] * scale;
    }
  }

  // Shorter lines are darker. The scale is fixed by the shortest and longest
  // lines in the Coxeter plane, measured as in tools/e8.py.
  function lengthOf(e) {
    return Math.round(S0 * Math.hypot(X[ends1[e]] - X[ends2[e]], Y[ends1[e]] - Y[ends2[e]]));
  }
  var LO = Infinity, HI = 0;
  for (var e = 0; e < E; e++) {
    LO = Math.min(LO, lengthOf(e));
    HI = Math.max(HI, lengthOf(e));
  }

  // Drawing --------------------------------------------------------------

  var active = -1;    // the point being dragged, or under the mouse

  // Lines are stroked in batches of equal opacity. Where lines from different
  // batches cross they darken each other, as the 30 rotated copies do in the
  // SVG, so each opacity is split into GROUPS interleaved batches.
  var GROUPS = 30;
  var KEYS = 101 * GROUPS;
  var keys = new Uint16Array(E), order = new Uint16Array(E);
  var starts = new Uint32Array(KEYS + 1), fill = new Uint32Array(KEYS);

  function draw() {
    var unit = canvas.width / SIZE;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(unit, 0, 0, unit, 0, 0);

    var e, i, n, list, key;
    starts.fill(0);
    for (e = 0; e < E; e++) {
      var t = Math.min(1, Math.max(0, (lengthOf(e) - LO) / (HI - LO)));
      var level = Math.round(100 * (DARKEST + (LIGHTEST - DARKEST) * Math.pow(t, 0.6)));
      keys[e] = level * GROUPS + e % GROUPS;
      starts[keys[e] + 1]++;
    }
    for (key = 0; key < KEYS; key++) {
      starts[key + 1] += starts[key];
      fill[key] = starts[key];
    }
    for (e = 0; e < E; e++) order[fill[keys[e]]++] = e;

    ctx.lineWidth = STROKE;
    ctx.strokeStyle = INK;
    for (key = 0; key < KEYS; key++) {
      if (starts[key] === starts[key + 1]) continue;
      ctx.globalAlpha = Math.floor(key / GROUPS) / 100;
      ctx.beginPath();
      for (n = starts[key]; n < starts[key + 1]; n++) {
        e = order[n];
        ctx.moveTo(PX[ends1[e]], PY[ends1[e]]);
        ctx.lineTo(PX[ends2[e]], PY[ends2[e]]);
      }
      ctx.stroke();
    }

    if (active >= 0) {
      // The 56 neighbours of the highlighted point.
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1;
      ctx.beginPath();
      list = lines[active];
      for (n = 0; n < list.length; n++) {
        e = list[n];
        ctx.moveTo(PX[ends1[e]], PY[ends1[e]]);
        ctx.lineTo(PX[ends2[e]], PY[ends2[e]]);
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = INK;
    ctx.beginPath();
    for (i = 0; i < N; i++) {
      ctx.moveTo(PX[i] + DOT, PY[i]);
      ctx.arc(PX[i], PY[i], DOT, 0, 2 * Math.PI);
    }
    ctx.fill();

    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, 6, 0, 2 * Math.PI);
    if (active >= 0) {
      ctx.moveTo(PX[active] + 5, PY[active]);
      ctx.arc(PX[active], PY[active], 5, 0, 2 * Math.PI);
    }
    ctx.fill();
  }

  // Rotations ------------------------------------------------------------

  var moved = false;

  // Rotate the roots by `angle` in the plane of the orthonormal vectors e1, e2
  // (turning e1 towards e2). Turning the roots by a rotation G is the same as
  // turning the projection plane by G^-1, which is what is stored.
  function rotate(e1, e2, angle) {
    var c = Math.cos(angle) - 1, s = Math.sin(angle);
    [q1, q2].forEach(function (q) {
      var a1 = dot(q, e1), a2 = dot(q, e2);
      for (var k = 0; k < 8; k++) q[k] += c * (a1 * e1[k] + a2 * e2[k]) + s * (a2 * e1[k] - a1 * e2[k]);
    });
    normalize(q1);
    var d = dot(q1, q2);
    for (var k = 0; k < 8; k++) q2[k] -= d * q1[k];
    normalize(q2);
    moved = true;
    place();
  }

  // A unit vector orthogonal to the projection plane.
  function outOfPlane() {
    var best, most = 0;
    for (var k = 0; k < 8; k++) {
      var v = [];
      for (var m = 0; m < 8; m++) v.push((m === k ? 1 : 0) - q1[k] * q1[m] - q2[k] * q2[m]);
      var size = dot(v, v);
      if (size > most) {
        most = size;
        best = v;
      }
    }
    return normalize(best);
  }

  // Turn the roots so that root i projects to (x, y): keep the direction in
  // which it sticks out of the plane, and rotate it along a great circle.
  function moveRoot(i, x, y) {
    var r = roots[i];
    var len = Math.hypot(x, y), most = Math.SQRT2 - 1e-9;
    if (len > most) {
      x *= most / len;
      y *= most / len;
      len = most;
    }
    var out = [], depth = 0, k;
    for (k = 0; k < 8; k++) {
      out.push(r[k] - X[i] * q1[k] - Y[i] * q2[k]);
      depth += out[k] * out[k];
    }
    if (depth < 1e-18) out = outOfPlane();
    else normalize(out);

    var height = Math.sqrt(2 - len * len);
    var e1 = [], e2 = [];
    for (k = 0; k < 8; k++) {
      e1.push(r[k] / Math.SQRT2);
      e2.push((x * q1[k] + y * q2[k] + height * out[k]) / Math.SQRT2);
    }
    var cos = dot(e1, e2);
    for (k = 0; k < 8; k++) e2[k] -= cos * e1[k];
    var sin = Math.sqrt(dot(e2, e2));
    if (sin < 1e-9) return null;
    for (k = 0; k < 8; k++) e2[k] /= sin;

    var angle = Math.atan2(sin, cos);
    rotate(e1, e2, angle);
    return { e1: e1, e2: e2, angle: angle };
  }

  // Animation ------------------------------------------------------------

  var spin = null;      // keeps turning after a flick: { e1, e2, rate }
  var back = null;      // animation back to the Coxeter plane
  var frame = 0, last = 0;

  function redraw() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function tick(now) {
    frame = 0;
    var dt = last ? Math.min(now - last, 50) : 16;
    last = now;
    if (spin) {
      rotate(spin.e1, spin.e2, spin.rate * dt);
      spin.rate *= Math.pow(0.995, dt);
      if (spin.rate < 4e-5) spin = null;
    }
    if (back) stepBack(now);
    draw();
    again.hidden = !moved || !!back;
    if (spin || back) redraw();
    else last = 0;
  }

  // Go back to the starting picture. It looks the same after a rotation by a
  // multiple of 12 degrees or a reflection, so head for the closest copy.
  function goBack() {
    spin = null;
    var best = -Infinity, to1, to2;
    for (var flip = -1; flip <= 1; flip += 2) {
      for (var n = 0; n < 30; n++) {
        var c = Math.cos(n * Math.PI / 15), s = Math.sin(n * Math.PI / 15), u = [], v = [];
        for (var k = 0; k < 8; k++) {
          u.push(c * A[k] - s * B[k]);
          v.push(flip * (s * A[k] + c * B[k]));
        }
        var score = dot(q1, u) + dot(q2, v);
        if (score > best) {
          best = score;
          to1 = u;
          to2 = v;
        }
      }
    }
    back = { from1: q1.slice(), from2: q2.slice(), to1: to1, to2: to2, start: performance.now() };
    if (reduceMotion) back.start -= 1e4;
    redraw();
  }

  function stepBack(now) {
    var p = Math.min(1, (now - back.start) / 700);
    var t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(2 - 2 * p, 3) / 2;
    for (var k = 0; k < 8; k++) {
      q1[k] = back.from1[k] + (back.to1[k] - back.from1[k]) * t;
      q2[k] = back.from2[k] + (back.to2[k] - back.from2[k]) * t;
    }
    if (p === 1 || dot(q1, q1) < 0.04 || dot(q2, q2) < 0.04) {
      q1 = back.to1;
      q2 = back.to2;
      back = null;
      moved = false;
      place();
      return;
    }
    normalize(q1);
    var d = dot(q1, q2);
    for (k = 0; k < 8; k++) q2[k] -= d * q1[k];
    normalize(q2);
    place();
  }

  // Pointer input --------------------------------------------------------

  var dragging = false, offsetX = 0, offsetY = 0, velocity = null, lastMove = 0;

  function toDrawing(event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * SIZE / rect.width,
      y: (event.clientY - rect.top) * SIZE / rect.height
    };
  }

  function nearest(p, within) {
    var best = -1, closest = within * within;
    for (var i = 0; i < N; i++) {
      var d = (PX[i] - p.x) * (PX[i] - p.x) + (PY[i] - p.y) * (PY[i] - p.y);
      if (d < closest) {
        closest = d;
        best = i;
      }
    }
    return best;
  }

  canvas.addEventListener("pointerdown", function (event) {
    if (event.button !== 0) return;
    spin = null;
    back = null;
    var p = toDrawing(event);
    active = nearest(p, Infinity);
    offsetX = PX[active] - p.x;
    offsetY = PY[active] - p.y;
    dragging = true;
    velocity = null;
    lastMove = event.timeStamp;
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch (error) {
      // Not an active pointer; dragging still works while over the picture.
    }
    canvas.classList.add("is-dragging");
    redraw();
  });

  canvas.addEventListener("pointermove", function (event) {
    var p = toDrawing(event);
    if (!dragging) {
      if (event.pointerType === "mouse") {
        var hover = nearest(p, 30);
        if (hover !== active) {
          active = hover;
          redraw();
        }
      }
      return;
    }
    var step = moveRoot(active,
      (p.x + offsetX - SIZE / 2) / scale,
      (SIZE / 2 - p.y - offsetY) / scale);
    if (step) {
      var rate = step.angle / Math.max(event.timeStamp - lastMove, 1);
      if (velocity) rate = 0.3 * velocity.rate + 0.7 * rate;
      velocity = { e1: step.e1, e2: step.e2, rate: Math.min(rate, 0.004), time: event.timeStamp };
    }
    lastMove = event.timeStamp;
    redraw();
  });

  function release(event) {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove("is-dragging");
    if (event.type === "pointerup" && !reduceMotion && velocity &&
        event.timeStamp - velocity.time < 60 && velocity.rate > 3e-4) {
      spin = velocity;
    }
    velocity = null;
    if (event.pointerType !== "mouse") active = -1;
    redraw();
  }

  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("pointerleave", function () {
    if (!dragging && active >= 0) {
      active = -1;
      redraw();
    }
  });
  canvas.addEventListener("dblclick", goBack);

  // Setup ----------------------------------------------------------------

  // Shown under the caption once the picture has been turned.
  var again = document.createElement("p");
  again.className = "e8-again";
  again.hidden = true;
  var button = document.createElement("button");
  button.type = "button";
  button.className = "e8-reset";
  button.textContent = "Back to the Coxeter plane";
  button.addEventListener("click", goBack);
  var egg = document.createElement("span");
  egg.className = "egg";
  egg.setAttribute("data-egg", "1");
  egg.setAttribute("aria-hidden", "true");
  egg.textContent = "🥚";
  again.appendChild(button);
  again.appendChild(document.createTextNode(" "));
  again.appendChild(egg);
  if (caption) caption.appendChild(again);

  canvas.className = "e8";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", img.alt);
  img.parentNode.insertBefore(canvas, img);
  img.style.display = "none";

  function resize() {
    var pixels = Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 3));
    if (pixels && canvas.width !== pixels) {
      canvas.width = canvas.height = pixels;
      draw();
    }
  }

  place();
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
})();
