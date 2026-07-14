---
layout: single
title: Travel
permalink: /travel/
---

<div id="globeViz" style="height: 550px; width: 100%; background: #000; border-radius: 8px; overflow: hidden;"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {

    var today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to local midnight for day-granularity comparison

    // Parse a "YYYY-MM-DD" string as a local calendar date (avoids UTC offset shifting the day)
    function parseLocalDate(dateString) {
        var parts = dateString.split("-");
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }

    var COLORS = { past: '#e74c3c', current: '#2ecc71', future: '#3498db' };

    const pastList = document.getElementById('past-trips-list');
    const currentList = document.getElementById('current-trip-list');
    const futureList = document.getElementById('future-trips-list');

    // Build the list of locations from Jekyll data.
    // Visits at (nearly) the same coordinates are merged into a single globe pin,
    // so repeated trips to one city don't stack invisible pins on top of each other.
    var STATUS_PRIORITY = { current: 3, future: 2, past: 1 }; // pin color = "most notable" visit
    var groups = {}; // key -> merged pin
    var order = [];  // preserve first-seen ordering

    {% assign locations = site.data.travel_locations.locations %}
    {% for location in locations %}
    (function() {
        var lat = {{ location.lat }};
        var lng = {{ location.lng }};
        var city = "{{ location.city }}";
        var popupContent = `{{ location.popup_content | markdownify | strip_newlines }}`;

        var dateFrom = parseLocalDate("{{ location.date_from }}");
        var dateTo = parseLocalDate("{{ location.date_to }}");

        var status;
        var targetList;
        if (dateFrom <= today && dateTo >= today) {
            status = 'current'; targetList = currentList;
        } else if (dateFrom > today) {
            status = 'future'; targetList = futureList;
        } else {
            status = 'past'; targetList = pastList;
        }

        // Merge points within ~1 km of each other (2-decimal rounding of lat/lng)
        var key = lat.toFixed(2) + ',' + lng.toFixed(2);
        if (!groups[key]) {
            groups[key] = { lat: lat, lng: lng, status: status, color: COLORS[status], entries: [] };
            order.push(key);
        }
        var g = groups[key];
        g.entries.push({ city: city, popup: popupContent, status: status });
        // Upgrade the pin's color to the most notable status among merged visits
        if (STATUS_PRIORITY[status] > STATUS_PRIORITY[g.status]) {
            g.status = status;
            g.color = COLORS[status];
        }

        // Textual list below the globe (still one entry per visit)
        var listItem = document.createElement('li');
        var titleContent;
        if (status === 'past') {
            titleContent = '<span style="color: red;">' + city + '</span> ' + popupContent;
        } else if (status === 'current') {
            titleContent = '<span style="color: green; font-weight: bold;">' + city + '</span> ' + popupContent;
        } else {
            titleContent = '<span style="color: blue;">' + city + '</span> ' + popupContent;
        }
        listItem.innerHTML = titleContent;
        targetList.appendChild(listItem);
    })();
    {% endfor %}

    // Flatten merged groups into the array Globe.gl plots
    var points = order.map(function(key) {
        var g = groups[key];
        var label = g.entries.map(function(e) {
            return '<b style="color:' + COLORS[e.status] + '">' + e.city + '</b><br>' + e.popup;
        }).join('<hr style="border:none;border-top:1px solid #555;margin:6px 0;">');
        return {
            lat: g.lat,
            lng: g.lng,
            color: g.color,
            count: g.entries.length,
            radius: g.entries.length > 1 ? 0.55 : 0.35, // bigger dot when it holds multiple visits
            label: label
        };
    });

    // Initialize the 3D globe with satellite (blue-marble) imagery
    const globeEl = document.getElementById('globeViz');
    const world = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .pointsData(points)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointAltitude(0.02)
        .pointRadius('radius')
        .pointLabel(function(d) {
            return '<div style="background: rgba(0,0,0,0.8); color: #fff; padding: 6px 8px; '
                 + 'border-radius: 4px; max-width: 280px; font-size: 13px; line-height: 1.4;">'
                 + (d.count > 1 ? '<div style="font-size:11px;color:#aaa;margin-bottom:4px;">'
                                  + d.count + ' visits</div>' : '')
                 + d.label + '</div>';
        })
        (globeEl);

    // Fit the globe to the container width and keep it responsive
    function sizeGlobe() {
        world.width(globeEl.clientWidth).height(globeEl.clientHeight);
    }
    sizeGlobe();
    window.addEventListener('resize', sizeGlobe);

    // Gentle auto-rotation that stops for good the moment the user interacts
    var controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.addEventListener('start', function() {
        controls.autoRotate = false;
    });

    // Start centered roughly on the Korea/Pacific view
    world.pointOfView({ lat: 35.9078, lng: 127.7669, altitude: 2.2 }, 0);
});
</script>

<p>
The globe spins on its own until you touch it; drag to rotate, scroll to zoom, and hover a point for details (points with multiple visits list them all).
I <span style="color: red;">was</span>, <span style="color: green;">am</span>, and <span style="color: blue;">will be</span> at these places.
</p>

<div id="travel-list">
    <ul id="future-trips-list"></ul>

    <ul id="current-trip-list"></ul>

    <ul id="past-trips-list"></ul>
</div>
