// Map on the Venue page. The pins come from _data/places.yml and
// _data/history.yml; see README.md.
(function () {
  var el = document.getElementById("map");
  var data = document.getElementById("places-data");
  if (!el || !data || !window.L) return;

  var places = JSON.parse(data.textContent);
  if (!places.length) return;

  var HISTORY_ZOOM = 7;

  function escape(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var map = L.map(el, {
    scrollWheelZoom: false,
    // On phones, one finger scrolls the page instead of dragging the map.
    dragging: !L.Browser.mobile
  });

  var bounds = L.latLngBounds(places.map(function (p) { return [p.lat, p.lng]; }));
  if (places.length > 1) {
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 17 });
  } else {
    map.setView(bounds.getCenter(), 16);
  }

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var middle = map.getSize().x / 2;

  places.forEach(function (place) {
    // Put the label on whichever side of the pin has more room.
    var onLeft = map.latLngToContainerPoint([place.lat, place.lng]).x > middle;
    L.marker([place.lat, place.lng], {
      title: place.name,
      alt: place.name,
      riseOnHover: true,
      icon: L.divIcon({
        className: "pin pin--place" + (place.accent ? " pin--accent" : "") + (onLeft ? " pin--left" : ""),
        html: '<span class="pin__dot"></span><span class="pin__label">' +
              escape(place.label || place.name) + "</span>",
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      })
    }).addTo(map);
  });

  // History --------------------------------------------------------------

  var source = document.getElementById("history-data");
  var milestones = source ? JSON.parse(source.textContent) : [];
  var venue = places.filter(function (place) { return place.accent; })[0] || places[0];
  var pins = [];        // made once, then kept
  var now = null;       // the pin of the entry without coordinates
  var EGG = '<span class="egg" data-egg="2" aria-hidden="true">🥚</span>';

  // The pin for one entry. The entry without coordinates goes on the venue,
  // in red, in place of the venue's own pin (see .map--history in site.css).
  function pin(entry) {
    var here = !(entry.lat && entry.lng);
    var marker = L.marker(here ? [venue.lat, venue.lng] : [entry.lat, entry.lng], {
      title: entry.year + " " + entry.name + ", " + entry.place,
      riseOnHover: true,
      zIndexOffset: here ? 1000 : 0,
      icon: L.divIcon({
        className: "pin " + (here ? "pin--accent pin--now" : "pin--history"),
        html: '<span class="pin__dot"></span><span class="pin__label"><span class="pin__year">' +
              escape(entry.year) + "</span> " + escape(entry.name) + "</span>",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        popupAnchor: [0, here ? -9 : -7]
      })
    });
    marker.bindPopup(
      '<p class="history__when">' + escape(entry.year) + " \u00b7 " + escape(entry.place) + "</p>" +
      "<p>" + escape(entry.text) + (here ? " " + EGG : "") + "</p>",
      { maxWidth: 260 }
    );
    // Labels point away from Lausanne, so that they spread out.
    marker.west = !here && entry.lng < venue.lng;
    if (here) now = marker;
    return marker;
  }

  // Put each label on its own side of the pin, or on the other side if that
  // one is taken. If both are, the label only shows on hover or focus. The
  // latest entries go first, so they keep their labels.
  function arrange() {
    var GAP = 3;   // pixels between labels
    var shown = pins.filter(function (marker) {
      return marker.getElement().offsetParent !== null;
    });
    // No label may cover a pin, or another label.
    var taken = shown.map(function (marker) {
      return marker.getElement().querySelector(".pin__dot").getBoundingClientRect();
    });

    function free(rect) {
      return taken.every(function (other) {
        return rect.right + GAP < other.left || rect.left > other.right + GAP ||
               rect.bottom + GAP < other.top || rect.top > other.bottom + GAP;
      });
    }

    shown.reverse().forEach(function (marker) {
      var icon = marker.getElement();
      var label = icon.querySelector(".pin__label");
      icon.classList.remove("pin--quiet");
      for (var side = 0; side < 2; side++) {
        icon.classList.toggle("pin--left", marker.west !== (side === 1));
        var rect = label.getBoundingClientRect();
        if (free(rect)) {
          taken.push(rect);
          return;
        }
      }
      icon.classList.toggle("pin--left", marker.west);
      icon.classList.add("pin--quiet");
    });
  }

  function update() {
    var zoomedOut = map.getZoom() <= HISTORY_ZOOM;
    if (zoomedOut && !pins.length && milestones.length) {
      pins = milestones.map(pin);
      pins.forEach(function (marker) { marker.addTo(map); });
    }
    el.classList.toggle("map--history", zoomedOut);
    if (!zoomedOut && now) now.closePopup();
    if (pins.length) arrange();
  }

  map.on("zoomend", update);
  update();
})();
