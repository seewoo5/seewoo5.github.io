---
layout: single
title: Travel
permalink: /travel/
---

<div id="mapid" style="height: 500px; width: 100%;"></div>


<script>
document.addEventListener("DOMContentLoaded", function() {
    // 1. Initialize the map
    var mymap = L.map('mapid').setView([35.9078, 127.7669], 2); // Center of the world, zoom 2

    // 2. Add the base map tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var visitedIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', // Red for visited
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
    });

    var currentIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', // Green for current
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
    });

    var plannedIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', // Blue for planned
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
    });

    const pastList = document.getElementById('past-trips-list');
    const currentList = document.getElementById('current-trip-list');
    const futureList = document.getElementById('future-trips-list');

    var today = new Date();
    var markers = L.markerClusterGroup();

    // 4. Loop through Jekyll data and add markers
    {% assign locations = site.data.travel_locations.locations %}
    {% for location in locations %}
        var lat = {{ location.lat }};
        var lng = {{ location.lng }};
        var city = "{{ location.city }}";

        // --- Dynamic Status Detection Logic ---
        
        // Inject and convert dates from Liquid
        var dateFromString = "{{ location.date_from }}"; 
        var dateToString = "{{ location.date_to }}"; 
        
        var dateFrom = new Date(dateFromString);
        var dateTo = new Date(dateToString);
        
        var iconToUse = '';
        var targetList;
        
        // 1. CHECK FOR CURRENT TRIP (dateFrom <= today AND dateTo >= today)
        if (dateFrom <= today && dateTo >= today) {
            iconToUse = 'currentIcon'; 
            targetList = currentList;
        } 
        // 2. CHECK FOR PLANNED TRIP (dateFrom > today)
        else if (dateFrom > today) {
            iconToUse = 'plannedIcon'; 
            targetList = futureList;
        } 
        // 3. DEFAULT: VISITED TRIP (dateTo < today)
        else {
            iconToUse = 'visitedIcon'; 
            targetList = pastList
        }

        // Define the content for the popup (use Liquid to pull the rich text)
        var popupContent = `{{ location.popup_content | markdownify | strip_newlines }}`;

        var marker = L.marker([lat, lng], {icon: eval(iconToUse)})
          .bindPopup(popupContent, {maxWidth: 400});
        
        markers.addLayer(marker);

        var listItem = document.createElement('li');
        var titleContent = city + ' ' + '{{ location.popup_content | markdownify | strip_newlines}}';
        // listItem.innerHTML = `${city}, ${titleContent}`;
        listItem.innerHTML = `${titleContent}`;

        console.log("Generated HTML for list item:", listItem.innerHTML);
        console.log("targetList:", targetList);
        console.log("iconToUse:", iconToUse);
        targetList.appendChild(listItem);
        // if (targetList) {
        //     targetList.appendChild(listItem);
        // }
        // if (!targetList) {
        //     // targetList is null (because document.getElementById failed).
        //     // This logs a detailed error to the browser console.
        //     console.error("CRITICAL ERROR: List container not found for status in city:", city, "Check if list element IDs exist in your HTML.");
            
        //     // Skip the appending step for this location to avoid crashing the script
        //     // The loop will continue to the next location.
        //     // We already added a safety check in the previous response, but this is more informative:
        //     // targetList.appendChild(listItem); 
        // } else {
        //     // If targetList is found, proceed with appending
        //     targetList.appendChild(listItem);
        // }
    {% endfor %}

    mymap.addLayer(markers);
});
</script>

<p>
Zoom in/out to see more information.
I <span style="color: red;">was</span>, <span style="color: green;">am</span>, and <span style="color: blue;">will be</span> at these places.
</p>

<div id="travel-list">
    <h3 style="color: red;">Past Trips:</h3>
    <ul id="past-trips-list"></ul>

    <h3 style="color: green;">Current Trip:</h3>
    <ul id="current-trip-list"></ul>

    <h3 style="color: blue;">Future Trips:</h3>
    <ul id="future-trips-list"></ul>
</div>