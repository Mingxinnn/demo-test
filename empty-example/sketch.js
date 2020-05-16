/*eslint-env es6*/
 
// touchDetect
var xPos = [24, 141.56, 172.4, 103, 74.56, 19.11, 161, 139,
139, 105, 92, 45.23, 98, 112, 120.86, 116.58, 111.57, 83, 78.53, 66.88,
 59.85, 49.17, 26.44, 29.38, 57.62, 53.97, 46.46, 38.95, 27.61, 24.76, 37.55,
 97.92, 175.1, 162.3, 152.67, 163.78, 167.96, 141.5, 181.71, 155.95, 151.07, 172.4, 84.33,] ;

var yPos = [40.17, 35.32, 29.19, 43.34, 68.26, 20.24, 46, 63, 63,
 84.68, 89.31, 94.97, 102, 102, 108.03, 111.3, 124.43, 119, 128.25, 113.58,
 114.11, 115.26, 112.74, 108.4, 123.87, 134.15, 133.89, 131.83, 154.53, 169.62,
 163.12, 151.91, 102.33, 141.17, 136.86, 126.95, 127.51, 133.69, 141.43, 163.93,
 175.17, 182.11, 76.6,] ;

var radi = [32, 27.86, 11.32, 45.6, 119.84, 14.42, 14.42, 64.5,
 12.64, 32.66, 15.38, 8.12, 34.4, 53.82, 21.04, 6.14, 44.84, 37.74, 5.04, 5.58,
 7.02, 29.34, 43.48, 13.94, 29.16, 29.42, 30.12, 30.56, 10.12, 8.74, 19.9, 15.46,
 10.36, 71.56, 18.48, 7.54, 4.74, 21.82, 10.18, 9.22, 14.08, 11.38, 171.36, ];

var redOne = [238, 247, 226, 177, 10, 254, 246, 20, 17, 128, 63,
 12, 152, 196, 254, 19, 33, 131, 15, 183, 190, 198, 162, 67, 176, 99,
 179, 244, 233, 10, 11, 248, 3, 158, 91, 179, 11, 168, 201, 223, 183, 31, 4,];

var greenOne = [129, 217, 0, 95, 10, 228, 132, 66, 19, 214, 169, 14,
 126, 116, 66, 25, 135, 144, 14, 122, 35, 139, 140, 7, 55, 47, 0, 223, 93,
 12, 107, 159, 0, 171, 200, 0, 10, 139, 164, 200, 11, 100, 0,];

var blueOne = [199, 71, 35, 217, 11, 56, 0, 57, 23, 139, 193, 16,
 23, 0, 158, 30, 207, 201, 19, 199, 83, 0, 184, 9, 16, 23, 25, 1, 207,
 14, 201, 0, 211, 205, 218, 17, 13, 84, 25, 0, 44, 172, 198,];

const MOTION_BLUR_FACTOR = 15;  //lower = more blur


var interval;
var colorInterval;
var colorSelection = 0;

var img;
var clickedCircle = [];

var noteRecord = [];

function preload(){
  img = loadImage("data/several_circles02.jpg");

  for(let i = 0; i < xPos.length; i++){
    let a = hslToSound(redOne[i], greenOne[i], blueOne[i]);
    noteRecord.push(a);

    let b = new clickedCircles(xPos[i], yPos[i], radi[i], redOne[i], greenOne[i], blueOne[i], noteRecord[i]);
    clickedCircle.push(b);
  }
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(1584, 800);
  background(255);
  print('before', noteRecord);
  noteToTonality('A');  // change the musical scale
  print('after', noteRecord);

  button = createButton('change instru');
  button.position(19, 19);
  button.mousePressed(changeInstru);
}

function draw() {

  // image(img,150, 100);
  image(img,151, 100);
  noStroke();

  // fill(0, MOTION_BLUR_FACTOR);
  // rect(0, 0, width, height);
  fill(20, MOTION_BLUR_FACTOR);
  rect(744, 100, 588, 600);
  //
  // GenerateExplosion();
  // system.update();

  // stop note when move out
  for(let i = 0; i < clickedCircle.length; i++){
    clickedCircle[i].movedReleased(mouseX, mouseY);
    if(!playOn){break;}
  }

  Aiplayer();
}

function mousePressed(ev){

  flagPrs = false;
  for(let i = 0; i < clickedCircle.length; i++){
    clickedCircle[i].pressed(mouseX, mouseY);
    beginTime = int(ev.timeStamp) / 1000;

    if(flagPrs){
      currentNoteTemp.push(noteRecord[i]);
      beginTimeTemp.push(beginTime);
      // print( 'BeginTime is: ', beginTimeTemp );
      break;
    }
  }
}

function mouseReleased(ev){
  if(currentNoteArray = []){
    flagRls = false;
    for(let i = 0; i < clickedCircle.length; i++){
      clickedCircle[i].released(mouseX, mouseY);
      time = int(ev.timeStamp - beginTime)/1000;
      endTime = int(ev.timeStamp)/1000;

      if(flagRls){
        endTimeTemp.push(endTime);
        // print('EndTime is:', endTimeTemp);
        break;
      }
    }
  }
}

// set toanlity and notes
function noteToTonality(tonal) {
  let sortNum = (a,b) => {return a-b};
  let major = {
    C : ['C','D','E','F','G','A','B'],
    D : ['D','E','F#','G','A','B','C#'],
    G : ['G,','A','B','C','D','E','F#'],
    A : ['A','B','C#','D','E','F#','G#'],
    F : ['F','G','A','A#','C','D','E'],
    Bb : ['Bb','C','D','Eb','F','G','A'],
    Eb : ['Eb','F','G','Ab','Bb','C','D'],
  };

  let scale = {'C':major.C, 'D':major.D, 'G':major.G, 'A':major.A,
              'F':major.F, 'Bb':major.Bb, 'Eb':major.Eb}[tonal];

  let b = setTonality();

  for(let i = 0; i < noteRecord.length; i++){
    let values = 100;
    let temp = noteRecord[i];
    for(let j = 0; j < b.length ; j++){
      if(values > abs(temp - b[j])){
        values = abs(noteRecord[i] - b[j]);
        noteRecord[i] = b[j];
      }
    }
  }
  // noteRecord.sort(sortNum);

  function setTonality(){
    let arr = [];
    for(let i = 0; i < scale.length; i++){
      for(let j = 1; j < 7; j++){
        let a = Tonal.Note.midi(scale[i] + j.toString());
        arr.push(a);
      }
    }
    // arr.sort(sortNum);
    return arr;
  }
}

//播放事件
myAudio = new MyAudio();
//
// var selectedPreset = '_tone_0250_SoundBlasterOld_sf2';
var selectedPreset = '_tone_0040_FluidR3_GM_sf2_file';
var clickOn = false, playOn = false;
var flagPrs, flagRls;


function changeInstru(){
    // selectedPreset = '_tone_0002_GeneralUserGS_sf2_file';
      selectedPreset = '_tone_0002_0000_JCLive_sf2_file';
}

function MyAudio() {
  var currentPlay = new Array();
  var AudioContextFunc = window.AudioContext || window.webkitAudioContext,
  audioContext = new AudioContextFunc(),
  player = new WebAudioFontPlayer();
  player.loader.decodeAfterLoading(audioContext, selectedPreset);

  this.startNote = function(note) { //播放音符
    if (note && !currentPlay[note]) {
      currentPlay[note] = player.queueWaveTable(audioContext, audioContext.destination,
        window[selectedPreset]  /* timbre */, 0/*currentTime*/,
        note , 999 , 0.5);
    }
  }

  this.stopNote = function(note) { //停止音符
    if (currentPlay[note]) {
      currentPlay[note].cancel();
    }
    currentPlay[note] = 0;
  }
}


var beginTime = 0,
    endTime = 0,
    time = 0,
    beginTimeTemp = [],
    endTimeTemp = [],
    beginTimeArray = [],
    endTimeArray = [],
    currentNoteTemp = [],
    currentNoteArray = [],
    noteSequenceArray = {},
    noteSequence;



function Aiplayer() {
    let aiPlayer = {};
    aiPlayer = createNewPiece();
    if (aiPlayer != 0){
        print(aiPlayer);
        playPiece(aiPlayer);
        aiPlayer = {};
        //initialize array
        beginTimeTemp = [];
        endTimeTemp = [];
        currentNoteTemp = [];
    }

    function createNewPiece(){
        let interval = endTimeTemp[endTimeTemp.length-1] - beginTimeTemp[0];

        if(interval > 3){
          beginTimeArray = [].concat(beginTimeTemp);
          endTimeArray = [].concat(endTimeTemp);
          currentNoteArray = [].concat(currentNoteTemp);
          noteSequenceArray = createNoteSequence(currentNoteArray, beginTimeArray, endTimeArray);
          return(noteSequenceArray);
          // return test;
        }else if(interval > 10) {
          beginTimeTemp = [];
          endTimeTemp = [];
          currentNoteTemp = [];
          return 0;
        }else{
          return 0;
        }
    }

    function createNoteSequence(pitch, beginTime , endTime){
      let note_sequence = {};
      note_sequence.notes = [];
      for(let i=0; i<pitch.length; i++){
        let temp = {};
        temp.pitch = Number(pitch[i])
        temp.startTime = beginTime[i];
        temp.endTime = endTime[i];
        note_sequence.notes.push(temp);
      }
      note_sequence.tempos = [];
      let obj ={};
      obj.time = 0;
      obj.qpm = 120;
      note_sequence.tempos.push(obj);
      note_sequence.tempos.length = 1;

      note_sequence.totalTime = int(endTime[pitch.length -1 ] - beginTime[0]);
      return note_sequence;
    }

    function playPiece(sampleSequences){
        let rnn_steps = 15;
        let rnn_temperature = 1.5;
        // Initialize the model.
        music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
        music_rnn.initialize();
        // Create a player to play the sequence we'll get from the model.
        rnnPlayer = new mm.Player();
       // The model expects a quantized sequence, and ours was unquantized:
       if(sampleSequences){
         let qns = mm.sequences.quantizeNoteSequence(sampleSequences, 2);
         music_rnn
         .continueSequence(qns, rnn_steps, rnn_temperature)
         .then((sample) => rnnPlayer.start(sample));
       }
    }
}



class clickedCircles {
  constructor(x, y, r, red, green, blue, noteRecord){
    this.x = x;
    this.y = y;
    this.r = r;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.note = noteRecord;
  }

  pressed(mx,my){
    let d = dist(this.x*3+151, this.y*3+100, mx, my);
    if(d < this.r * 0.85){
      fill(this.red, this.green, this.blue, 100);
      noStroke();
      ellipse(this.x*3+744, this.y*3+100, this.r*1.5, this.r*1.5);

      flagPrs = true;
      if(this.note) {
        clickOn = true;
        myAudio.startNote(this.note);
      }
    }
  }

  released(mx,my){
    let d = dist(this.x*3+151, this.y*3+100, mx, my);
    if(d < this.r * 0.85){
      myAudio.stopNote(this.note);
      clickOn = false;
      flagRls = true;
      playOn = true;
    }
  }

  movedReleased(mx, my){
    let d = dist(this.x*3+151, this.y*3+100, mx, my);
      if(d > this.r * 0.85 ){playOn = true;}
      if(playOn){
          myAudio.stopNote(this.note);
          playOn = false;
        }
      }
}

var hslColor;
const HIGHEST_NOTE = 108 - 32;
const LOWEST_NOTE = 21 + 32;

function hslToSound(r, g, b){
    let a= rgbToHsl(r, g, b);
    let weight1 = 0.4 * 100;
    let weight2 = 0.6 * 100;
    let satuAndLight = weight1 * a[1] +  weight2 * a[2];
    let note = int(map(satuAndLight, 0, 100, LOWEST_NOTE, HIGHEST_NOTE));
    return note;

    function rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [ h, s, l ];
    }
}
