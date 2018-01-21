const mapboxgl = require("mapbox-gl");
const d3 = require("d3");
const Tone = require("tone");
const api = require("./api");
const { createAllMarkers } = require("./marker.js");
const { JULY, AUGUST } = require("./data-clean");
const { standardNotes, minorNotes } = require("./regionsToNotes");
const { batcher, mapDataToNotes } = require("./utility-funcs");


const monthObj = {
  JULY: JULY,
  AUGUST: AUGUST
};

const state = {
  month: "JULY",
  year: "1999",
  rawData: JULY,
  noteSet: standardNotes
};

//CREATE MAP
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGt3d2ViZXIiLCJhIjoiY2phOXRuaHRmMGJycDJ3cXR5bG43ZnJ3OCJ9.9neIakt1D1GK-lPDN6sh5Q";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v9",
  center: [-98.106611, 39.318815],
  zoom: 3.5
});

//INITIAL SETUP
const mappedWithNotes = mapDataToNotes(state.rawData, state.noteSet);

createAllMarkers(mappedWithNotes, map);

//ON MONTH CHANGE
d3.select("#month-selector").on("change", onMonthChange);
function onMonthChange() {
  // Tone.context.close()
  d3.selectAll(".mapMarker").remove();
  let newMonth = this.options[this.selectedIndex].value;
  state.month = newMonth;
  console.log("STATE MONTH", state.month);
  state.rawData = monthObj[newMonth];
  console.log("STATE: ", state);
  createAllMarkers(mapDataToNotes(state.rawData, state.noteSet), map);
}

/////////////actual DOM manipulation
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const showButton = document.getElementById("show-markers");
const hideButton = document.getElementById("hide-markers");

startButton.onclick = function() {
  d3.select("#month-counter").text(`${state.month} `);
  d3.select("#year-counter").text(" 1999");
  d3.select("#month-selector-container").style("visibility", "hidden");

  const mappedWithNotes = mapDataToNotes(state.rawData, state.noteSet);
  const batchesForTone = batcher(mappedWithNotes);
  Tone.context = new AudioContext()
  const poly = new Tone.PolySynth(13, Tone.AMSynth).toMaster();

  const part = new Tone.Part(function(time, value) {
    poly.triggerAttackRelease(value.notes, "16n", time, value.velocity);

    Tone.Draw.schedule(function() {
      //longitude first
      let day = " " + value.day + ", ";
      d3.select("#day-counter").text(day);

      value.ind.forEach(i => {
        let thisId = "#m" + i;
        d3
          .select(thisId)
          .transition()
          .style("opacity", "1")
          .transition()
          .style("opacity", "0");
      });
    });
  }, batchesForTone).start(0);

  Tone.Transport.start();

};

stopButton.onclick = function() {
  d3.selectAll("#day-counter, #month-counter, #year-counter").text("");
  d3.select("#month-selector-container").style("visibility", "visible");
  Tone.Transport.stop();
  Tone.context.close()

};

showButton.onclick = function() {
  d3
    .selectAll(".mapMarker")
    .transition()
    .style("opacity", "1");
};

hideButton.onclick = function() {
  d3
    .selectAll(".mapMarker")
    .transition()
    .style("opacity", "0");
};

///////MESSING AROUND WITH DIFFERENT SOUNDS:
// var freeverb = new Tone.Freeverb().toMaster();
// // freeverb.dampening.value = 1000;
// freeverb.roomSize.value = 0.8;

// var phaser = new Tone.Phaser({
//   "frequency" : 15,
//   "octaves" : 5,
//   "baseFrequency" : 1000,
//   "stages": 5
// }).toMaster();

// var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
// var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
// var delay = new Tone.FeedbackDelay(0.5);
// var synth = new Tone.PolySynth(13, Tone.AMSynth).chain(pingPong);
