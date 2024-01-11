/*
    SWR EXPERIMENTALSTUDIO 08/2023
    Maurice Oeser

    FREEDOM COLLECTIVE - Davor Vincze
    Soundfile Controler MSync
    
    Client
*/



/*
Debug Flag, wenn activ wird die DBG() Funktion ausgeführt, so kann man schnell global 
alle console.logs() aktivieren bzw. deaktivieren
*/
const bDBG = false;

//const debugHeader = document.getElementById('debug'); // nur zum debuggen, TODO: Löschen
const progress = document.getElementById('progress');
const connectBtn = document.getElementById('connect_btn_container');
const incomingchat = document.getElementById('incomingchat');
const content = document.getElementById('content');
const chatcontent = document.getElementById('chatcontent');
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

const socket = io({
    reconnection: true,        
    reconnectionAttempts: Infinity, 
    reconnectionDelay: 1000,   
    reconnectionDelayMax: 5000,
    timeout: 20000,           });


socket.on('connected', (state) => {
    loadSounds(state.voice);
    setInterval(ping, 1000);
});


let pingTimeout;

function ping()
{
    socket.emit("ping");
    pingTimeout = setTimeout(pingFailed, 4000);
}

socket.on('pong', () => {
    clearTimeout(pingTimeout);
})

function pingFailed()
{
    // TODO what to do if ping failed
    DBG("PING FAILED! CONNECTION DISTURBED!");
    
}

socket.on('activation', (state) => {
    let isPlaying = state.playing;
    let time = state.time;
    let file = state.sound;

    if(isPlaying)
    {
        SOUNDS[file].currentTime = time;
        playSound(file);
        DBG(`jump to ${time}`);
    }
});

socket.on('disconnect', (data) => {
    isConnected = false;
    DBG("disconnected from server. please refresh the page");
});   

socket.on('start', (sound) => {
    
    if(sound == 2)
    {
        showIncomingChat();
    }

    else
    {
        hideChat();
    }

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
}

function stopSound()
{
    SOUNDS[currentSound].stop();

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


    SOUNDS[0] = loadSound(`Samples/vincze/FL_handy${voiceid+1}.mp3`);
    SOUNDS[1] = loadSound(`Samples/vincze/FL_${voiceid}.mp3`);
    SOUNDS[2] = loadSound(`Samples/vincze/notification MM_${voiceid}.mp3`);

    // DBG(`loading sounds for voice ${voiceid+1}`);

    // SOUNDS[0] = new Howl({
    //     src: [`Samples/vincze/FL_handy${voiceid+1}.mp3`],
    //     html5: true,
    //     onloaderror: (id, error) => {
    //         console.error(id, error);
    //         console.log("ERROR ON LOAD");
    //     },
    //     onload: function() {
    //        incrementSFLoaded();
    //       }
    //   }); 

    // SOUNDS[1] = new Howl({
    //     src: [`Samples/vincze/FL_${voiceid}.mp3`],
    //     html5: true,
    //     onloaderror: (id, error) => {
    //         console.error(id, error);
    //         console.log("ERROR ON LOAD");
    //     },
    //     onload: function() {
    //         incrementSFLoaded();
    //        }
    //   });

    // SOUNDS[2] = new Howl({
    //     src: [`Samples/vincze/notification MM_${voiceid}.mp3`],
    //     html5: true,
    //     onloaderror: (id, error) => {
    //         console.error(id, error);
    //         console.log("ERROR ON LOAD");
    //     },
    //     onload: function() {
    //         incrementSFLoaded();
    //        }
    //   });

}

const SoundfilesToLoad = 3;
let soundfilesLoaded = 0;

function incrementSFLoaded()
{
    soundfilesLoaded++;

    if(soundfilesLoaded === SoundfilesToLoad)
    {
        document.getElementById('loading_container').style.display = "none";
        connectBtn.style.display = "block";
    }
}



function loadSound(url, retryCount = 0) {
    const maxRetries = 3; // Set a max number of retries to avoid infinite loops
    const audio = new Audio(url);

    audio.addEventListener('error', () => {
        console.error(`Error loading sound file: ${url}`);

        if (retryCount < maxRetries) {
            console.log(`Attempting to reload sound file. Retry ${retryCount + 1}`);
            loadSound(url, retryCount + 1); // Retry loading the sound
        } else {
            console.error('Max retries reached. Could not load the sound file.');
            // Handle the failure, perhaps by notifying the user or disabling sound-related functionality
        }
    });

    audio.addEventListener('canplaythrough', () => {
        // The entire audio is likely to play without interruption
        incrementSFLoaded();
    });

    audio.load();
    return audio;
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
    }, 750);

    isConnected = true;

    setTimeout(() => {
    document.getElementById('startscreen').style.display = "none";
    document.getElementById('content').style.display = "flex";

    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    }

    }, 1000)

    // wakelock
    if ('wakeLock' in navigator) {
        requestWakeLock();
    } else {
        document.addEventListener('touchstart', enableNoSleep, false);
    }
}


function enableNoSleep()
{
    noSleep.enable();
}



/*
    Interaction 
*/

/*
    LOGIC Flags
*/

let IsInChat = false;


// document.getElementById('waitscreen').style.display = "none";
// document.getElementById('startscreen').style.display = "none";
// document.getElementById('content').style.display = "flex";
// document.getElementById('chatscreen').style.display = "flex";


function showIncomingChat()
{
    if(IsInChat)
        return;

    document.getElementById('waitscreen').style.display = "none";
    document.getElementById('incomingchat').style.display = "flex";
}


function hideChat()
{
    document.getElementById('chatscreen').style.display = "none";
    document.getElementById('waitscreen').style.display = "flex";
}

incomingchat.addEventListener('click', () => {
    document.getElementById('incomingchat').style.display = "none";
    document.getElementById('chatscreen').style.display = "block";
    displayChat();
    IsInChat = true;
});


function createChatMessage(side, repost, msg)
{
    let chatmsg = document.createElement('div');
    chatmsg.classList.add('chatmessage');


    if(!repost)
    {
        let header = document.createElement('h1');
        header.classList.add('text-white');
        header.classList.add('text-2xl');
        header.classList.add('ml-2');
        header.textContent = side == 'left' ? 'ZSZUSI' : 'KARL';
        chatmsg.appendChild(header);
    }

    let chatbubble = document.createElement('div');
    chatbubble.classList.add('bg-white'); 

   
    let text = document.createElement('p');
    text.innerHTML = msg;
    text.classList.add('text-black');
    text.classList.add('text-3xl');
    
    if(side === 'left')
    {
        chatmsg.classList.add('mb-3');
        chatbubble.classList.add('chatbubble_a');
    }
    
    else
    {
        chatmsg.classList.add('mr-2');
        chatmsg.classList.add('ml-auto');
        chatbubble.classList.add('chatbubble_b');
        
    }

    chatbubble.appendChild(text);


    chatmsg.appendChild(chatbubble);

    return chatmsg;
}

function postChatMessage(msg)
{
    chatcontent.appendChild(msg);
    chatcontent.scrollTop = chatcontent.scrollHeight;
}

let waitTime = 0;
let lastMessage;

function displayChat()
{
    scheduleChatMessage(0, 'new', 'left', false, 'Miss you babe 😘');
    scheduleChatMessage(4, 'new', 'right', false, 'Zsuzsi?');
    scheduleChatMessage(2, 'new', 'left', false, '<div class="dots"></div>');
    scheduleChatMessage(4, 'update', 'left', false, 'Last night was so 🐽 💦 😹 😻 ❤️‍🔥');
    scheduleChatMessage(4, 'new', 'right', false, '<div class="dots"></div>');
    scheduleChatMessage(3, 'update', 'right', false, 'Ermmm…');
    scheduleChatMessage(2, 'new', 'left', false, '<div class="dots"></div>');
    scheduleChatMessage(2, 'update','left', false, 'Why so cold?');
    scheduleChatMessage(3, 'new', 'left', true, ' r u w her?');
    scheduleChatMessage(3, 'new', 'right', false, '<div class="dots"></div>');
    scheduleChatMessage(1, 'update', 'right', false, 'Yes');
    scheduleChatMessage(3, 'new', 'left', false, '<div class="dots"></div>');
    scheduleChatMessage(2, 'update', 'left', false, 'Love you babe ❤️');
    scheduleChatMessage(3, 'new', 'right', false, '<div class="dots"></div>');
    scheduleChatMessage(7, 'update', 'right', false, 'Can’t wait to see you!');
    scheduleChatMessage(5, 'new', 'left', false, '<div class="dots"></div>');
    scheduleChatMessage(3, 'update', 'left', false, 'Get rid of her and come here at once 🧜🏻‍♂️ 🧜🏻‍♂️ 🧜🏻‍♂️');
    scheduleChatMessage(5, 'new', 'right', false, '<div class="dots"></div>');
    scheduleChatMessage(7, 'update', 'right', false, 'According to the scientific research, people using emoticons are emotionally unbalanced');
    scheduleChatMessage(4, 'new', 'left', false, 'Wtf!!');
    scheduleChatMessage(5, 'new', 'right', false, '<div class="dots"></div>');
    scheduleChatMessage(4, 'update', 'right', false, 'This is Fan, by the way. Karl forgot his phone 😾');
    scheduleChatMessage(5, 'new', 'left', false, '<div class="dots"></div>');
    scheduleChatMessage(6, 'update', 'left', false, '&nbsp');
    scheduleChatMessage(3, 'new', 'left', true,  '&nbsp;&nbsp;&nbsp;&nbsp;');
    scheduleChatMessage(1, 'new', 'left', true,  '&nbsp;&nbsp;&nbsp;&nbsp;');
    scheduleChatMessage(2, 'new', 'left', true, '<div class="dots"></div>');
    scheduleChatMessage(5, 'update', 'left', true, 'Oh');
    scheduleChatMessage(4, 'new', 'left', true, 'Damn');
    scheduleChatMessage(2, 'new', 'left', true, '<div class="dots"></div>');
    scheduleChatMessage(4, 'update', 'left', true, 'I thought I was typing Alex…');
    scheduleChatMessage(5, 'new', 'right', false, '🖕🏻!!!');
}




function scheduleChatMessage(time, type, side, report, msg)
{
    waitTime += time;

    if(type == 'new')
    {
        let newMsg = createChatMessage(side, report, msg);

        setTimeout(() => {
            postChatMessage(newMsg);
        }, waitTime * 1000);

        lastMessage = newMsg;
        
    }

    else
    {
        setTimeout(() => { 
            let lastDiv = document.querySelector('#chatcontent > div:last-child');
            let p = lastDiv.querySelector('p');
            p.innerHTML = msg;
            chatcontent.scrollTop = chatcontent.scrollHeight;
        }, waitTime * 1000);
    
    }

    
}



/*
<div class="chatmessage mr-2 ml-auto">
            <h1 class="text-white text-2xl ml-2 text-right">KARL</h1>
            <div class="chatbubble_b bg-white">
              <p class="text-black text-3xl from-me"> Zsuzsi?</p>
            </div>
          </div>
*/

/*
    <div class="chatmessage mb-3">
            <h1 class="text-white text-2xl ml-2">SZUSI</h1>
            <div class="chatbubble_a bg-white">
              <p class="text-black text-3xl">Miss you babe 😘</p>
            </div>
          </div>
*/







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










