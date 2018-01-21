const mapboxgl = require("mapbox-gl");
const api = require("./api");
const buildMarker = require("./marker.js");
const Tone = require('tone');
const {mapped} = require('./data-tests')
const {august} = require('./ufo-scrubbed-1999-august');
const d3 = require("d3");


//MAP STUFF

mapboxgl.accessToken = "pk.eyJ1IjoiaGt3d2ViZXIiLCJhIjoiY2phOXRuaHRmMGJycDJ3cXR5bG43ZnJ3OCJ9.9neIakt1D1GK-lPDN6sh5Q";

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-98.106611, 39.318815],
    zoom: 3.5
});

// const monthDataObj = {JULY: july, AUGUST: august };

// const state = {
//   month: 'JULY',
//   year: '1999',
//   data: july
// }




console.log("mapped!!!!!", mapped);
let selected = d3.select("#month-selector").node().value;
console.log("SELECTED!!!!!", selected);

// d3.select("#month-selector").on("change", change)
// function change() {
//   d3.selectAll(".mapMarker").remove();
//   let val = this.options[this.selectedIndex].vsalue
//     state.month = val;
//     mapped = monthDataObj[val];
// }



let reduced = mapped.reduce((prev, curr) => {
  if (prev[curr.day]) prev[curr.day].push(curr);
  else prev[curr.day] = [curr];
  return prev;
}, {});

let batches = {};

for (var day in reduced) {
  reduced[day].forEach(entry => {
    if (!batches[entry.absBatch]) {
      batches[entry.absBatch] = {}
      batches[entry.absBatch].notes = [entry.note];
      batches[entry.absBatch].ind = [entry.index];
      batches[entry.absBatch].day = entry.day
    }
    else {
      batches[entry.absBatch].notes.push(entry.note);
      batches[entry.absBatch].ind.push(entry.index);
    }
  });
}

let batchesArr = [];
let halvedTime = [];
for (var batch in batches) {
  let seconds = batch * 2;
  let time = "0:" + seconds;
  let halved = "0:" + batch/2;
  batchesArr.push({ time, notes: batches[batch].notes, ind: batches[batch].ind, day: batches[batch].day });
  halvedTime.push({ time: halved, notes: batches[batch].notes, ind: batches[batch].ind, day: batches[batch].day });
}

console.log("REDUCED", reduced);
console.log("BATCHES: ", batches);
console.log("BATCH ARRAY!!!!", batchesArr);


/////////TONE JS STUFF:

//ToneAMSynth was good

var freeverb = new Tone.Freeverb().toMaster();
// freeverb.dampening.value = 1000;
freeverb.roomSize.value = 0.8;

var phaser = new Tone.Phaser({
  "frequency" : 15,
  "octaves" : 5,
  "baseFrequency" : 1000,
  "stages": 5
}).toMaster();

var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var reverb = new Tone.JCReverb(0.4).connect(Tone.Master);
var delay = new Tone.FeedbackDelay(0.5);

// var synth = new Tone.PolySynth(13, Tone.AMSynth).chain(pingPong);

//my original one that was working
let poly = new Tone.PolySynth(13, Tone.AMSynth).toMaster();

let part = new Tone.Part(function(time, value) {
  poly.triggerAttackRelease(value.notes, "16n", time, value.velocity);
  //could just change the duration of some of them??

  Tone.Draw.schedule(function () {
    //longitude first
    let day = ' ' + value.day + ', '
    d3.select("#day-counter").text(day);
    console.log('DAY', value.day);
    value.ind.forEach(i => {
      let thisId = "#m" + i;
      d3.select(thisId).transition().style("opacity", "1").transition().style("opacity", "0");
    })
  })
}, halvedTime).start(0);



/////////////actual DOM manipulation

let startButton = document.getElementById("start-button");
let stopButton = document.getElementById("stop-button");
let showButton = document.getElementById("show-markers");
let hideButton = document.getElementById("hide-markers");

startButton.onclick = function() {
  d3.select("#month-counter").text("JULY ");
  d3.select("#year-counter").text(" 1999")
  Tone.Transport.start();
};

stopButton.onclick = function() {
  d3.selectAll("#day-counter, #month-counter, #year-counter").text("");
  Tone.Transport.stop()
}

showButton.onclick = function() {
  d3.selectAll(".mapMarker").transition().style("opacity", "1");
}

hideButton.onclick = function() {
  d3.selectAll(".mapMarker").transition().style("opacity", "0");
}

////////////make all markers at beginning but hide them (opacity: 0)
for (let i = 0; i < mapped.length; i++) {
  let coord = mapped[i].coord;
  let description = mapped[i].description;
  let date = mapped[i].date
      let mark = buildMarker(coord, i, description, date)
      mark.addTo(map)
}
