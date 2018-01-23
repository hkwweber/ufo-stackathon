// /////old HTML:


        //this is the original one - v solid
    // const poly = new Tone.PolySynth(13, Tone.AMSynth).toMaster();

    //this is very cool - kind of flutey?
    //   const poly = new Tone.PolySynth(6, Tone.Synth, {
    //   "portamento" : 0.0,
    //   "oscillator": {
    //       "type": "square4"
    //   },
    //   "envelope": {
    //       "attack": 2,
    //       "decay": 1,
    //       "sustain": 0.2,
    //       "release": 2
    //   }
    // }).toMaster();

    //weird tom sounding thing idk - LASERS?? //works best with laserNotes notes so far
    // const poly = new Tone.PolySynth(4, Tone.MembraneSynth, {
    //     "pitchDecay"  : 0.2 ,
    //   "octaves"  : 1.2 ,
    //   "oscillator"  : {
    //     "type"  : "triangle8"
    // }  ,
    //   "envelope"  : {
    //     "attack"  : 0.2 ,
    //     "decay"  : 0.8 ,
    //     "sustain"  : 0.01 ,
    //     "release"  : 0.5 ,
    //     "attackCurve"  : "exponential"
    //   }
    //   }).toMaster();


    //saw tooth thing, hard to get working
    // const poly = new Tone.PolySynth(1, Tone.Synth, {
    //     "oscillator" : {
    //     "type" : "fatsawtooth",
    //     "count" : 3,
    //     "spread" : 15
    // },
    // "envelope": {
    //     "attack": 0.2,
    //     "decay": 0.1,
    //     "sustain": 0.9,
    //     "release": 0.4,
    //     "attackCurve" : "exponential"
    // }
    //   }).toMaster();

    //////this one was fine i guess
    // const poly = new Tone.PolySynth(6, Tone.AMSynth, {
    //   "harmonicity": 2,
    //     "oscillator": {
    //         "type": "amsine2",
    //         "modulationType" : "sine",
    //        "harmonicity": 1.01
    //     },
    //     "envelope": {
    //         "attack": 0.006,
    //         "decay": 4,
    //         "sustain": 0.04,
    //         "release": 1.2
    //     },
    //     "modulation" : {
    //         "volume" : 13,
    //         "type": "amsine2",
    //         "modulationType" : "sine",
    //        "harmonicity": 12
    //     },
    //     "modulationEnvelope" : {
    //         "attack": 0.006,
    //         "decay": 0.2,
    //         "sustain": 0.2,
    //         "release": 0.4
    //     }
    // }).toMaster()




    ////////////this was the middle one that worked pretty well:
    // const poly = new Tone.PolySynth(4, Tone.Synth, {
    //     "volume" : -8,
    //     "oscillator" : {
    //         "partials" : [1, 2, 5],
    //     },
    //     "portamento" : 0.005
    // }).toMaster()
