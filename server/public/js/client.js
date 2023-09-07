/*
    SWR EXPERIMENTALSTUDIO 08/2023
    Maurice Oeser
*/

// DEBUG FLAG => should we print debug statements?
const bDBG = true;
const debugHeader = document.getElementById('debug');

// EXAMPLE of url containing query parameters for voiceid
// http://localhost:3000/?voiceid=1


// TIME_SYNC object, handles synchronisation between server and clients. (https://github.com/enmasseio/timesync)
let TIME_SYNC = timesync.create({ server: '/timesync', interval: 200});
   
// Socket.IO connection to the server

const urlParams = new URLSearchParams(window.location.search);
const voiceid = urlParams.get('voiceid');

let voiceCounter = 0;

const socket = io({
    query: {
      voiceid: voiceid,
    }
});

socket.on('connected', (index) => {
    loadEvents(voiceid);
});

socket.on('disconnect', (data) => {
    isConnected = false;
});   

socket.on('starttime', (time) => {
   SERVER_START_TIME = time;
   scheduler.postMessage({id: 'starttime', data: SERVER_START_TIME});
});

socket.on('start', () => {
    startSyncing();
});

socket.on('stop', () => {
    clearInterval(SYNC_INTERVAL);
    scheduler.postMessage({id: "stop"});
    SOUNDS[0].stop();
});

socket.on('color', (R,G,B) => {
    setColor(R,G,B);
});


socket.on('playsound', () => {
    
    SOUNDS[getRandomInt(11, 15)].play();
    setColor(255, 255, 255);

    setTimeout(() => {
        setColor(0,0,0);
    }, 300);
});


const faceimg = document.getElementById('faceimg');

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

// the Date.now() position of the server when the /start message is received
let SERVER_START_TIME = 0;

// Variable to hold the setInterval for syncing later on
let SYNC_INTERVAL;

// Scheduler WebWorker, this handles the precise timing of events due to spinning. notifies mainthread then when an event should fire
const scheduler = new Worker('/js/Scheduler.js');

// List of events that will get triggered
let EVENTS;
















/*
    AUDIO
*/

let SOUNDS = [];

function playSound(sound, volume)
{
    SOUNDS[sound].volume(volume);
    SOUNDS[sound].play();
}

function loadEvents(voiceid)
{
    
    loadSounds(voiceid);

    let file = `./events_t${voiceid}.json`;
    
    fetch(file)
    .then((response) => response.json())
    .then((json) => 
    {        
        for(let event of json)
        {
            scheduler.postMessage({id: "addevent", event: event});
        }
    });
}

function loadSounds(voiceid)
{

    SOUNDS[0] = new Howl({
                src: [`Samples/EoT/EOTM_2.mp3`]
            });

    SOUNDS[1] = new Howl({
        src: [`Samples/EoT/EOTM_silence.mp3`]
    });
     

    // let numSounds = 9;

    // if(voiceid == 2)
    //     numSounds = 10;
    // else if(voiceid == 3)
    //     numSounds = 12;
    // else if(voiceid == 4)
    //     numSounds = 11;
    // else if(voiceid == 5)
    //     numSounds = 10;
    // else if(voiceid == 6)
    //     numSounds = 11;
    // else if(voiceid == 7)
    //     numSounds = 9;

    // for(let i = 0; i < numSounds; ++i)
    // {
    //     SOUNDS.push(new Howl({
    //         src: [`Samples/EoT/V${voiceid}/EOT_V${voiceid}_${i}.mp3`]
    //     }));
    // }
    

    // SOUNDS.push(new Howl({
    //     src: [`Samples/EoT/V${voiceid}/EOT_V${voiceid}_99.mp3`],
    // }));
}



/*
    Scheduler callbacks
*/

scheduler.onmessage = (event) => {

    switch(event.data.id)
    {
        case 'event':
            handleEvent(event.data.data);
            break;

        case 'done':
            document.getElementById('logo2').style.display = "block";

            setTimeout(() => {
                document.getElementById('logo2').style.opacity = 1;
            }, 100);
            

            break;
    }
};


function handleEvent(schedulerEvent)
{

    if(schedulerEvent.sound < 0)
    {
        document.body.style.transition = '0.0s';
        setColor(0, 0, 0);

        if(schedulerEvent.sound == -2)
        {
            SOUNDS[1].play();
            SOUNDS[1].volume(0);
            SOUNDS[0].volume(0);
        }

        else if(schedulerEvent.sound == -1)
        {
            SOUNDS[0].fade(1,0,100);
        }

    }

    else
    {
        let sound = schedulerEvent.sound; // for now its just an integer number
       
        if(schedulerEvent.fade)
        {
            document.body.style.transition = `2.25s ease-in`;
        }

        else
        {
            document.body.style.transition = '0.0s';
        }


        if(sound == 99)
        {
            SOUNDS[0].play();
            SOUNDS[0].volume(0);
        }
        
        else if(sound == 100)
        {
            SOUNDS[0].play();
            SOUNDS[0].volume(1);
            setColor(255,255,255);
        }

        else
        {
            SOUNDS[0].fade(0,1, 8);
            setColor(255,255,255);
        }
    
        //logTimeBetweenEvents();

    }
    
    

    // document.body.style.backgroundColor = schedulerEvent.color;
}


function velocityToColour(velocity)
{
    let R = G = B = 0;

    switch(velocity)
    {
        case 65:
            R = G = B = 255;
            break;
        case 66:
            R = 255;
            G = 0;
            B = 0;
            break;
        case 67:
            R = 0;
            G = 255;
            B = 0;
            break;
        case 68:
            R = 0;
            G = 0;
            B = 255;
            break;
        case 69: 
            R = 255;
            G = 0;
            B = 255;
            break;
        case 70:
            R = 0;
            G = 255;
            B = 255;
            break;
        case 71:
            R = 255;
            G = 255;
            B = 0;
            break;
        case 72:
            R = 154;
            G = 255;
            B = 22;
            break;
        case 73: 
            R = 255;
            G = 155;
            B = 0;
            break;
        case 74: 
            R = 0;
            G = 200;
            B = 255;
            break;
        case 75:
            R = 200;
            G = 220;
            B = 250;
            break;
        case 76: 
            R = 255;
            G = 255;
            B = 255;
            break;
        default:
            R = 255;
            G = 255;
            B = 255;
            break;
    }
    

    setColor(R, G, B);
}

let lastEventTime = 0;
function logTimeBetweenEvents()
{
  let now = performance.now();
  let diff = now - lastEventTime;
  lastEventTime = now;
  DBG("time between events " + diff);
}





/*

*/

// this function doesn't do anything right now (since we moved socket.io connection to pageload),
// besides letting us activate the audio context through user action
function connect()
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



}


function startSyncing()
{
    sync();
    SYNC_INTERVAL = setInterval(sync, 100);

    document.getElementById('logo2').style.display = "none";
    document.getElementById('logo2').style.opacity = 0;
}


function sync()
{
    let time = TIME_SYNC.now();
    let elapsedTime = time - SERVER_START_TIME;
    scheduler.postMessage({id: 'sync', elapsedTime: elapsedTime, timePoint: Date.now()});
}



/*
    DEBUG Function, so we can easily turn on/off global debug logging
*/
function DBG(msg)
{
    if(bDBG)
    {
        console.log(msg);
        debugHeader.textContent = msg;
    }
     
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
    UTILS
*/


function setColor(R,G,B)
{
    document.body.style.backgroundColor = `rgb(${R}, ${G}, ${B} )`
}



/*
    MATRIX
*/

// const canvas = document.getElementById('matrixcanvas');
// const ctx = canvas.getContext('2d');
// const bgcanvas = document.getElementById('bgcanvas');
// const bgctx = bgcanvas.getContext('2d');

// const w = canvas.width = document.body.offsetWidth;
// const h = canvas.height = document.body.offsetHeight;
// const cols = Math.floor(w / 20) + 1;
// const ypos = Array(cols).fill(0);



// ctx.fillStyle = '#0000';
// ctx.fillRect(0, 0, w, h);

// const imgAspect = 900 / 546;

// const expText = "EXPERIMENTALSTUDIO";
// let expIndex = 0;
// let expActive = false;

// function matrix () {
//     ctx.fillStyle = '#0001';
//     ctx.fillRect(0, 0, w, h);

//     //bgctx.clearRect(0,0,w,h);
//     //bgctx.drawImage(bgImage, 0, 0, bgcanvas.width, bgImage.width / imgAspect);

//     // Everything else remains the same
//     ctx.fillStyle = '#fff';
//     ctx.font = '20pt monospace';

//     ypos.forEach((y, ind) => {
//         let text = String.fromCharCode(Math.random() * 128);

//         if(Math.random() > 0.998 )
//         {
//             if(Math.random () > 0.5)
//                 text = "EXPERIMENTAL";
//             else
//                 text = "STUDIO"
//         }
            
       

//         const x = ind * 20;
//         ctx.fillText(text, x, y);
//         if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
//         else ypos[ind] = y + 20;
//     });
// }



