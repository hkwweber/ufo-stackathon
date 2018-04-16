# MULDER MAP

### Built in 3 days for a hackathon

Inspired by a fondness for The X-Files, this project is an interactive representation of UFO sighting data (from the National UFO Reporting Center) through visualization and sound. Using Tone.js to generate music in the browser, I assigned different geographical regions unique but harmonizing notes. Each measure of time represents one day of data, and the time intervals between notes are proportional to the actual intervals between reported UFO sightings. Each sequence of music is generated at runtime based on user choices of month and musical mood. As the sequence plays, markers appear in the exact location of the corresponding ufo sighting, with an additional feature of informational popups about each reported incident.

Technologies used: Node.js, JavaScript, Tone.js, D3.js, Mapbox

Deployed on Heroku: https://mulder-map.herokuapp.com/
