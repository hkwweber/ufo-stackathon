const { januaryData } = require("./1999-data/january");
const { februaryData } = require("./1999-data/february");
const { marchData } = require("./1999-data/march");
const { aprilData } = require("./1999-data/april");
const { mayData } = require("./1999-data/may");
const { juneData } = require("./1999-data/june");
const { julyData } = require("./1999-data/july");
const {augustData} = require("./1999-data/august");
const {septemberData} = require("./1999-data/september");
const {octoberData} = require("./1999-data/october");
const {novemberData} = require("./1999-data/november");
const {decemberData} = require("./1999-data/december");

function scrub(data) {
  let result = data.map((el, index) => {
    let region;
    let state = el.state.toLowerCase();

    let pacific = ["or", "wa", "ca"];
    let mountain = ["mt", "wy", "ut", "nv", "id", "co", "nm", "az"];
    let westNC = ["nd", "sd", "ne", "ks", "ia", "mo", "mn"];
    let westSC = ["tx", "la", "ok", "ar"];
    let eastNC = ["wi", "il", "in", "mi", "oh"];
    let eastSC = ["ms", "al", "tn", "ky"];
    let newEng = ["me", "nh", "vt", "ct", "ma", "ri"];
    let middleAtl = ["ny", "pa", "nj"];
    let southAtl = ["wv", "va", "md", "de", "nc", "sc", "ga", "fl"];

    if (pacific.indexOf(state) > -1) region = "pacific";
    else if (mountain.indexOf(state) > -1) region = "mountain";
    else if (westNC.indexOf(state) > -1) region = "westNC";
    else if (westSC.indexOf(state) > -1) region = "westSC";
    else if (eastNC.indexOf(state) > -1) region = "eastNC";
    else if (eastSC.indexOf(state) > -1) region = "eastSC";
    else if (newEng.indexOf(state) > -1) region = "newEng";
    else if (middleAtl.indexOf(state) > -1) region = "middleAtl";
    else if (southAtl.indexOf(state) > -1) region = "southAtl";
    else region = "unknown";

    let day = el.datetime.split(" ")[0].split("/")[1];
    let timeB = el.datetime.split(" ")[1];
    let timeC = timeB.slice(0, 2) + timeB.slice(3);
    let time = Number(timeC);

    // let note = regionNotes[region];

    // let innerBatch = Number(timeC.slice(0,2))
    let innerBatch;
    if (time <= 400) innerBatch = 1;
    else if (time <= 800) innerBatch = 2;
    else if (time <= 1200) innerBatch = 3;
    else if (time <= 1600) innerBatch = 4;
    else if (time <= 2000) innerBatch = 5;
    else if (time <= 2400) innerBatch = 6;

    let absBatch = 6 * (Number(day) - 1) + innerBatch;

    let coord = [Number(el["longitude "]), Number(el.latitude)];

    let description = el.comments;
    description = description.replace(/&#44/gi, " ");
    description = description.replace(/&amp;/gi, "and");
    description = description.replace(/&#39/gi, "'");
    description = description.replace(/&quot;/gi, '"');

    return {
      index,
      day,
      time,
      innerBatch,
      absBatch,
      region,
      description,
      coord,
      date: el.datetime.split(" ")[0]
    };
  });
  return result;
}
const JANUARY = scrub(januaryData);
const FEBRUARY = scrub(februaryData);
const MARCH = scrub(marchData);
const APRIL = scrub(aprilData);
const MAY = scrub(mayData);
const JUNE = scrub(juneData);
const JULY = scrub(julyData);
const AUGUST = scrub(augustData);
const SEPTEMBER = scrub(septemberData);
const OCTOBER = scrub(octoberData);
const NOVEMBER = scrub(novemberData);
const DECEMBER = scrub(decemberData);

module.exports = { JANUARY,
  FEBRUARY,
  MARCH,
  APRIL,
  MAY,
  JUNE,
  JULY,
  AUGUST,
  SEPTEMBER,
  OCTOBER,
  NOVEMBER,
  DECEMBER
};
