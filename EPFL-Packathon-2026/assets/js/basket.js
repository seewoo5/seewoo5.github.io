// Checks what is typed on the lines of .basket. See README.md.
(function () {
  "use strict";

  var source = document.getElementById("basket-data");
  var inputs = Array.prototype.slice.call(document.querySelectorAll(".basket__input"));
  var done = document.querySelector(".basket__done");
  var subtle = window.crypto && window.crypto.subtle;
  if (!source || !inputs.length || !done || !subtle || !window.TextEncoder) return;
  var data = JSON.parse(source.textContent);
  if (!data.hashes.length) return;

  var KEY = "packathon-eggs";   // what was typed, kept in the visitor's browser
  var MAIL_SUBJECT = "Packathon eggs";

  // As tools/eggs.py reads a code: no spaces around it, in lower case.
  function normal(code) {
    return code.trim().toLowerCase();
  }

  function sha256(text) {
    return subtle.digest("SHA-256", new TextEncoder().encode(text));
  }

  function hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
      return (b < 16 ? "0" : "") + b.toString(16);
    }).join("");
  }

  // The final code, made from the codes as in tools/eggs.py.
  function unlock(codes) {
    var cipher = data.final.match(/../g).map(function (pair) { return parseInt(pair, 16); });
    var joined = codes.slice().sort().join("\n");
    var blocks = [];
    for (var i = 0; i * 32 < cipher.length; i++) blocks.push(sha256(joined + "#" + i));
    return Promise.all(blocks).then(function (hashes) {
      var bytes = new Uint8Array(cipher.length);
      for (var j = 0; j < bytes.length; j++) {
        bytes[j] = cipher[j] ^ new Uint8Array(hashes[j >> 5])[j & 31];
      }
      return new TextDecoder().decode(bytes);
    });
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function save(values) {
    try {
      localStorage.setItem(KEY, JSON.stringify(values));
    } catch (error) {
      // Private windows: the codes are kept until the page is closed.
    }
  }

  // Hashing takes a moment, so only the latest check counts.
  var latest = 0;

  function check() {
    var round = ++latest;
    var values = inputs.map(function (input) { return input.value; });
    save(values);
    var codes = values.map(normal);
    Promise.all(codes.map(function (code) {
      return code ? sha256(code).then(hex) : null;
    })).then(function (hashes) {
      if (round !== latest) return;
      var found = [];
      hashes.forEach(function (hash, i) {
        var ok = hash !== null && data.hashes.indexOf(hash) >= 0 && found.indexOf(codes[i]) < 0;
        inputs[i].parentNode.classList.toggle("is-found", ok);
        if (ok) found.push(codes[i]);
      });
      if (found.length < data.hashes.length) {
        done.hidden = true;
        return;
      }
      return unlock(found).then(function (final) {
        if (round !== latest) return;
        done.querySelector("code").textContent = final;
        var mail = done.querySelector(".basket__mail");
        if (mail) {
          mail.href = mail.href.split("?")[0] + "?subject=" + encodeURIComponent(MAIL_SUBJECT) +
                      "&body=" + encodeURIComponent(final);
        }
        done.hidden = false;
      });
    });
  }

  var saved = load();
  inputs.forEach(function (input, i) {
    if (typeof saved[i] === "string") input.value = saved[i];
    input.addEventListener("input", check);
    // Enter goes on to the next line.
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) && inputs[i + 1]) {
        event.preventDefault();
        inputs[i + 1].focus();
      }
    });
  });
  check();
})();
