let mymap = L.map('map').setView([19.4194865, -99.1916445], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FucmV5MjU0IiwiYSI6ImNqa2s0ZjhsdzBlaXYzcHBqdmQ2eXdjOWcifQ.82D_7oPbwvYFF2IQq1-_NQ', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoic2FucmV5MjU0IiwiYSI6ImNqa2s0ZjhsdzBlaXYzcHBqdmQ2eXdjOWcifQ.82D_7oPbwvYFF2IQq1-_NQ'
}).addTo(mymap);

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [30, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  }
});

const mapMarker = new LeafIcon({ iconUrl: '../images/mapMarker.png' });

setMapMarkers();