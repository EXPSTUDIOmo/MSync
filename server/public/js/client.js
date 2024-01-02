/*
    SWR EXPERIMENTALSTUDIO 08/2023
    Maurice Oeser


    FLUCHT - Davor Vincze
    Soundfile Controler MSync
    

    Client side 
*/


/*
Debug Flag, wenn activ wird die DBG() Funktion ausgeführt, so kann man schnell global 
alle console.logs() aktivieren bzw. deaktivieren
*/
const bDBG = false;
//const debugHeader = document.getElementById('debug'); // nur zum debuggen, TODO: Löschen
const progress = document.getElementById('progress');
const connectBtn = document.getElementById('connect_btn');
const content = document.getElementById('content');
let pulses = document.getElementsByClassName('pulse');
let pulses_play = document.getElementsByClassName('pulse_play');

/*
    Prevent the user screen from turning off.
    Either by wakeLock API or if not supported (Firefox) by NoSleep.js => which might be buggy, have to check
*/
const noSleep = new NoSleep();
let wakeLock = null;

const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
}





/*
    ==============================================================
    ======================= SOCKET.IO ============================
    ==============================================================
*/

const socket = io();

socket.on('connected', (state) => {
    loadSounds(state.voice);
    setInterval(ping, 1000);
});

let pingTimeout;

function ping()
{
    socket.emit("ping");
    pingTimeout = setTimeout(pingFailed, 3000);
}

socket.on('pong', () => {
    DBG("ping :)");
    clearTimeout(pingTimeout);
})

function pingFailed()
{
    DBG("PING FAILED! CONNECTION DISTURBED!");
    setColor(255,0,0);
}

socket.on('activation', (state) => {
    let isPlaying = state.playing;
    let time = state.time;
    let file = state.sound;

    if(isPlaying)
    {
        playSound(file);
        SOUNDS[file].seek(time);
        DBG(`jump to ${time}`);
    }
});

socket.on('disconnect', (data) => {
    isConnected = false;
    DBG("disconnected from server. please refresh the page");
});   

socket.on('start', (sound) => {
   playSound(sound);
});

socket.on('stop', () => {
    stopSound();
});

socket.on('color', (R,G,B) => {
    setColor(R,G,B);
});


socket.on('mode', (mode) => {

    if(mode == "playback")
    {
        content.style.transition = "10s ease";
    }

    else if(mode == 'organ')
    {
        content.style.transition = "0.1s ease";
    }
})

socket.on('organ', (data) => {
    playOrgan(data.pitch, data.velocity);
})



















/*
    ==============================================================
    =========================== AUDIO ============================
    ==============================================================
*/

let SOUNDS = [];
let ORGANSOUNDS = [];
let currentSound = 0;

function playSound(sound)
{
    SOUNDS[sound].play();
    currentSound = sound;
    content.style.backgroundColor = "white";

    for(let playp of pulses_play)
    {
        playp.style.display = "block";
    }

    DBG(`playing sound ${sound}`);
}

function stopSound()
{
    SOUNDS[currentSound].stop();

    for(let playp of pulses_play)
    {
        playp.style.display = "none";
    }

    DBG(`stopping sound ${currentSound}`);
}

function playOrgan(pitch, velocity)
{
    if(velocity > 0)
    {
        ORGANSOUNDS[pitch].play();
        ORGANSOUNDS[pitch].volume(velocity);
        setColor(255,255,255);
    }

    else
    {
        ORGANSOUNDS[pitch].stop();
        setColor(0,0,0);
    }
}


function loadSounds(voiceid)
{
    DBG(`loading sounds for voice ${voiceid+1}`);

    SOUNDS[0] = new Howl({
        src: [`Samples/vincze/FL_handy${voiceid+1}.mp3`],
        html5: true,
        onload: function() {
           incrementSFLoaded();
          }
      }); 

    SOUNDS[1] = new Howl({
        src: [`Samples/vincze/FL_${voiceid}.mp3`],
        html5: true,
        onload: function() {
            incrementSFLoaded();
           }
      });

    SOUNDS[2] = new Howl({
        src: [`Samples/vincze/notification MM_${voiceid}.mp3`],
        html5: true,
        onload: function() {
            incrementSFLoaded();
           }
      });

}

let soundfilesLoaded = 0;
function incrementSFLoaded()
{
    soundfilesLoaded++;
    progress.setAttribute('value', soundfilesLoaded);

    if(soundfilesLoaded >= 2)
    {
        progress.style.display = "none";
        connectBtn.style.display = "block";
    }
}


/*
    Activation Funktion, wenn user connect button klickt.
    Browser muten Audio-Kontext bis der user eine Aktion auf der Webseite durchführt.
    Daher beginnt Audio-Logik erst nachdem user sich "activated" hat

*/
let isConnected = false;
connectBtn.onclick = () =>
{
    if(isConnected)
        return;

    socket.emit("activate");
    document.getElementById('connect_btn').style.color = "green";
    document.getElementById('connect_btn').innerHTML = "&#10003";
    pulses[0].style.animationIterationCount = "1";
    pulses[1].style.animationIterationCount = "1";

    setTimeout(() => {
        document.getElementById('connect_btn').classList.add('grow');
        document.getElementById('logo').classList.add('grow');
    }, 750);

    isConnected = true;

    setTimeout(() => {
    document.getElementById('connect_btn').style.display = "none";
    document.getElementById('logo').style.display = "none";
    document.getElementById('content').style.visibility = "visible";
    }, 1000)

    // wakelock
    if ('wakeLock' in navigator) {
        requestWakeLock();
    } else {
        noSleep.enable();
        DBG("WakeLock API not supported. Using NoSleep.js");
    }
}















/*
    UTILITY FUNCTIONS
*/

function DBG(msg)
{
    if(bDBG)
    {
        //console.log(msg);
        //debugHeader.textContent = msg;
    }
     
}


function setColor(R,G,B)
{
    content.style.backgroundColor = `rgb(${R}, ${G}, ${B} )`;

    for(let playp of pulses_play)
    {
        playp.style.borderColor = `rgb(${255 - R},${255 - G}, ${255 - B} )`;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}










