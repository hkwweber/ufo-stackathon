const { Marker, Popup } = require("mapbox-gl");

const url = "https://i.imgur.com/GpdwVEr.png";


const buildMarker = (coords, id, description, date) => {

  let thisId = 'm' + id;
  const markerEl = document.createElement("div");
  markerEl.setAttribute("id", thisId);
  markerEl.setAttribute("class", "mapMarker");
  markerEl.style.backgroundSize = "contain";
  markerEl.style.width = "23px";
  markerEl.style.height = "23px";
  markerEl.style.opacity = "0";
  markerEl.style.backgroundImage = `url(${url})`;



  let popup = new Popup()

  popup.setText(`${date}: ${description}`)


  return new Marker(markerEl).setLngLat(coords).setPopup(popup);
};



// // create the popup
// var popup = new mapboxgl.Popup()
//     .setText('Construction on the Washington Monument began in 1848.');

// // create DOM element for the marker
// var el = document.createElement('div');
// el.id = 'marker';

// // create the marker
// new mapboxgl.Marker(el)
//     .setLngLat(monument)
//     .setPopup(popup) // sets a popup on this marker
//     .addTo(map);




module.exports = buildMarker;
