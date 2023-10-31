/*
    SWR EXPERIMENTALSTUDIO 08/2023
    Maurice Oeser


    FLUCHT - Davor Vincze
    Soundfile Controler MSync
*/


/*
Debug Flag, wenn activ wird die DBG() Funktion ausgeführt, so kann man schnell global 
alle console.logs() aktivieren bzw. deaktivieren
*/
const bDBG = true;
const debugHeader = document.getElementById('debug'); // nur zum debuggen, TODO: Löschen



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


const MAX_ID = 1000; // Maximum expected users with a set voiceID


/*
    ==============================================================
    ======================= SOCKET.IO ============================
    ==============================================================
*/

const socket = io();

socket.on('connected', (state) => {
    loadSounds(state.voice)
});

socket.on('activation', (state) => {
    let isPlaying = state.isPlaying;
    let time = state.time;

    // TODO
});

socket.on('disconnect', (data) => {
    isConnected = false;
});   

socket.on('start', (sound) => {
   SOUNDS[sound].play();
});

socket.on('stop', () => {
    // TODO stop current soundfile
});

socket.on('color', (R,G,B) => {
    setColor(R,G,B);
});






/*
    Incoming MaxMSP Messages. Route them depending on the command sent from Max
*/
socket.on('max', (msg) => {

    let command = msg[0];
    
    switch(command)
    {
        case 'play':
            let soundToPlay = msg[1];
            let volume = msg[2] == undefined ? 1 : msg[2];
            playSound(soundToPlay, volume);
            flashFace();
            break;
        
        case 'stop':
            let soundToStop = msg[1];
            SOUNDS[soundToStop].stop();
            break;

        case 'stopall':
            for(let sound of SOUNDS)
            {
                sound.stop();
            }

        case 'loop':
            let soundToLoop = msg[1];
            let shouldLoop = msg[2] == 1 ? true : false;
            SOUNDS[soundToLoop].loop(shouldLoop);
            break;

        case 'volume':
            let soundToChangeVolume = msg[1];
            let newVolume = msg[2];
            SOUNDS[soundToChangeVolume].volume(newVolume);

        case 'go':
            playSound(voiceCounter, 1);
            flashFace();
    }
})


let isConnected = false;

















/*
    ==============================================================
    =========================== AUDIO ============================
    ==============================================================
*/

let SOUNDS = [];

function playSound(sound)
{
    SOUNDS[sound].play();
}



function loadSounds(voiceid)
{
    // TODO : sounds für die voice laden
}





document.getElementById('connect_btn').onclick = () =>
{
    if(isConnected)
        return;

    socket.emit("activate");
    document.getElementById('connect_btn').style.color = "green";
    document.getElementById('connect_btn').innerHTML = "&#10003";

    setTimeout(() => {
        document.getElementById('connect_btn').classList.add('grow');
        document.getElementById('logo').classList.add('grow');
    }, 250);

    isConnected = true;

    setTimeout(() => {
    document.getElementById('connect_btn').style.display = "none";
    document.getElementById('logo').style.display = "none";
    document.getElementById('content').style.visibility = "visible";
    }, 600)


    // Make sure you handle the scenario where the Wake Lock API is not available
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
        console.log(msg);
        debugHeader.textContent = msg;
    }
     
}


function setColor(R,G,B)
{
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B} )`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}










