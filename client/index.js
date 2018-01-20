const mapboxgl = require("mapbox-gl");
const api = require("./api");
const buildMarker = require("./marker.js");
const Tone = require('tone');
const {mapped} = require('./data-tests')
const d3 = require("d3");


/*
  * Instantiate the Map
  */

mapboxgl.accessToken = "pk.eyJ1IjoiaGt3d2ViZXIiLCJhIjoiY2phOXRuaHRmMGJycDJ3cXR5bG43ZnJ3OCJ9.9neIakt1D1GK-lPDN6sh5Q";

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-98.106611, 39.318815],
    zoom: 3.5
});

//MAPPING THE DATA INTO THE CORRECT KIND OF ARRAY
// let regionNotes = {
//   pacific: "C4",
//   mountain: "EB4",
//   westNC: "F4",
//   westSC: "G5",
//   eastNC: "B4",
//   eastSC: "A4",
//   newEng: "A5",
//   middleAtl: "G4",
//   southAtl: "C5",
//   unknown: "C7"
// };


// let regionNotes = {
//   pacific: "A#4",
//   mountain: "F4",
//   westNC: "D#4",
//   westSC: "F5",
//   eastNC: "G#4",
//   eastSC: "F3",
//   newEng: "A#6",
//   middleAtl: "D#3",
//   southAtl: "C4",
//   unknown: "C5"
// };

// let mapped = data.map((el, index) => {
//   let region;
//   let state = el.state.toLowerCase();

//   let pacific = ["or", "wa", "ca"];
//   let mountain = ["mt", "wy", "ut", "nv", "id", "co", "nm", "az"];
//   let westNC = ["nd", "sd", "ne", "ks", "ia", "mo", "mn"];
//   let westSC = ["tx", "la", "ok", "ar"];
//   let eastNC = ["wi", "il", "in", "mi", "oh"];
//   let eastSC = ["ms", "al", "tn", "ky"];
//   let newEng = ["me", "nh", "vt", "ct", "ma", "ri"];
//   let middleAtl = ["ny", "pa", "nj"];
//   let southAtl = ["wv", "va", "md", "de", "nc", "sc", "ga", "fl"];

//   if (pacific.indexOf(state) > -1) region = "pacific";
//   else if (mountain.indexOf(state) > -1) region = "mountain";
//   else if (westNC.indexOf(state) > -1) region = "westNC";
//   else if (westSC.indexOf(state) > -1) region = "westSC";
//   else if (eastNC.indexOf(state) > -1) region = "eastNC";
//   else if (eastSC.indexOf(state) > -1) region = "eastSC";
//   else if (newEng.indexOf(state) > -1) region = "newEng";
//   else if (middleAtl.indexOf(state) > -1) region = "middleAtl";
//   else if (southAtl.indexOf(state) > -1) region = "southAtl";
//   else region = "unknown";

//   let day = el.datetime.split(" ")[0].split("/")[1];
//   let timeB = el.datetime.split(" ")[1];
//   let timeC = timeB.slice(0, 2) + timeB.slice(3);
//   let time = Number(timeC);

//   let note = regionNotes[region];

//   let innerBatch;
//   if (time <= 400) innerBatch = 1;
//   else if (time <= 800) innerBatch = 2;
//   else if (time <= 1200) innerBatch = 3;
//   else if (time <= 1600) innerBatch = 4;
//   else if (time <= 2000) innerBatch = 5;
//   else if (time <= 2400) innerBatch = 6;

//   let absBatch = 6 * (Number(day) - 1) + innerBatch;

//   return { index, day, time, absBatch, note, latitude: Number(el.latitude), longitude: Number(el['longitude ']) };
// });

console.log("MAPPED!!!!!", mapped);

// let reduced = mapped.reduce((prev, curr) => {
//   if (prev[curr.day]) prev[curr.day].push(curr);
//   else prev[curr.day] = [curr];
//   return prev;
// }, {});

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



//actual DOM manipulation

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
  d3.select("#day-counter").text("");
  Tone.Transport.stop()
}

showButton.onclick = function() {
  d3.selectAll(".mapMarker").transition().style("opacity", "1");
}

hideButton.onclick = function() {
  d3.selectAll(".mapMarker").transition().style("opacity", "0");
}

//make all markers at beginning but hide them (opacity: 0)
for (let i = 0; i < mapped.length; i++) {
  let coord = [mapped[i].longitude, mapped[i].latitude]
  let description1 = mapped[i].comments
  let description = description1.replace(/&#44/gi, " ");
  console.log("DESCRIPTION", description)
  let date = mapped[i].date
      let mark = buildMarker(coord, i, description, date)
      mark.addTo(map)
}
