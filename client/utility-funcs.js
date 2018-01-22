const batcher = mappedArr => {

  let reduced = mappedArr.reduce((prev, curr) => {
    if (prev[curr.day]) prev[curr.day].push(curr);
    else prev[curr.day] = [curr];
    return prev;
  }, {});

  let batches = {};

  for (var day in reduced) {
    reduced[day].forEach(entry => {
      if (!batches[entry.absBatch]) {
        batches[entry.absBatch] = {};
        batches[entry.absBatch].notes = [entry.note];
        batches[entry.absBatch].ind = [entry.index];
        batches[entry.absBatch].day = entry.day;
      } else {
        batches[entry.absBatch].notes.push(entry.note);
        batches[entry.absBatch].ind.push(entry.index);
      }
    });
  }

  let batchedArr = [];
  for (var batch in batches) {
    let time = "0:" + batch / 2; //time in time transport that we want this set of notes to play
    batchedArr.push({
      time,
      notes: batches[batch].notes,
      ind: batches[batch].ind,
      day: batches[batch].day
    });
  }
  return batchedArr;
};

const mapDataToNotes = (monthArr, notesObj) => {
  return monthArr.map(el => {
    return Object.assign(el, { note: notesObj[el.region] });
  });
}

const monthTotals = {
  JANUARY: "133",
  FEBRUARY: "159",
  MARCH: "144",
  APRIL: "144",
  MAY: "162",
  JUNE: "254",
  JULY: "268",
  AUGUST: "289",
  SEPTEMBER: "362",
  OCTOBER: "290",
  NOVEMBER: "401",
  DECEMBER: "199"
};



module.exports = { batcher, mapDataToNotes, monthTotals };
