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

const createAllMarkers = (dataArr, map) => {
  for (let i = 0; i < dataArr.length; i++) {
    let coord = dataArr[i].coord;
    let description = dataArr[i].description;
    let date = dataArr[i].date;
    let mark = buildMarker(coord, i, description, date);
    mark.addTo(map);
  }
}

module.exports = {buildMarker, createAllMarkers};
