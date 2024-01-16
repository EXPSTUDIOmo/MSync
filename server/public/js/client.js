/*
    SWR EXPERIMENTALSTUDIO 08/2023
    Maurice Oeser

    FREEDOM COLLECTIVE - Davor Vincze
    Soundfile Controler MSync
    
    Client
*/

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index lower than the current element
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomTransform() {
    const randomX = Math.floor(Math.random() * 200) - 100; // Random X translation
    const randomY = Math.floor(Math.random() * 200) - 100; // Random Y translation
    const randomRotation = Math.floor(Math.random() * 180) -90; // Random rotation

    const transformStyle = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    document.getElementById('wait_text').style.transform = transformStyle;
}

setInterval(() => {
    shuffleArray(letterDelays);
}, 6000);

setInterval(() => {
    randomTransform();
}, 4000);
/*
    CSS PRECALCS
*/
let letterDelays = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8];
shuffleArray(letterDelays);

document.querySelectorAll('.wait_text span').forEach((span, idx) => {

    span.style.animationDelay = `${letterDelays[idx]}s`;
});

/*
Debug Flag, wenn activ wird die DBG() Funktion ausgeführt, so kann man schnell global 
alle console.logs() aktivieren bzw. deaktivieren
*/
const bDBG = true;

//const debugHeader = document.getElementById('debug'); // nur zum debuggen, TODO: Löschen
const progress = document.getElementById('progress');
const connectBtn = document.getElementById('connect_btn_container');
const incomingchat = document.getElementById('incomingchat');
const content = document.getElementById('content');
const chatcontent = document.getElementById('chatcontent');
const chatscreen = document.getElementById('chatscreen');
const videoscreen = document.getElementById('videoscreen');
const waitscreen = document.getElementById('waitscreen');
const pulses = document.getElementsByClassName('pulse');
const pulses_play = document.getElementsByClassName('pulse_play');

const video_1 = document.getElementById('video_1');
const video_2 = document.getElementById('video_2');

const VIDEO_SOURCES_POSES = 
[
    'scaled_Alle_Dach_video.mp4',
    'scaled_Andrei_1_video.mp4',
    'scaled_Andrei_2_video.mp4',
    'scaled_Andrei_Foyer_Nebel_video.mp4',
    'scaled_Andrei_Zwischendach_1_video.mp4',
    'scaled_Andrei_Zwischendach_2_video.mp4',
    'scaled_Fan_1_video.mp4',
    'scaled_Fan_2_video.mp4',
    'scaled_Karl_1_video.mp4',
    'scaled_Karl_2_video.mp4',
    'scaled_Opponent_Markus_1_video.mp4',
    'scaled_Opponent_Martin_1_video.mp4',
    'scaled_Opponent_Martin_2_video.mp4',
    'scaled_Secretary_1_video.mp4',
    'scaled_Secretary_2_video.mp4',
    'scaled_Secretary_3_video.mp4',
    'scaled_Zsuzsi_1_video.mp4',
    'scaled_Zsuzsi_4_video.mp4'
];


const VIDEO_SOURCES_DACH = 
[
    'scaled_Dach_1_video.mp4',
    'scaled_Dach_3_video.mp4',
    'scaled_Dach_4_video.mp4',
]



let numVideosInScene = VIDEO_SOURCES_POSES.length;

videoscreen.addEventListener('click', () => {
    playVideo();
})











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
    currentScene = state.scene;
    preloadVideo(currentScene);

    if(isPlaying)
    {
        let sound = currentScene - 1;
        loadScene(currentScene);
        SOUNDS[sound].currentTime = time;
        DBG(`jump to ${time} on sound ${sound}`);
    }
});

socket.on('disconnect', (data) => {
    isConnected = false;
    DBG("disconnected from server. please refresh the page");
});   

socket.on('start', (scene) => {
    
    loadScene(scene);
});


function loadScene(scene)
{
    currentScene = scene;
    stopAllSound();
    stopVideos();

    switch(scene)
    {
        case 0:
            showWaitScreen();
            stopAllSound();
            numVideosInScene = VIDEO_SOURCES_POSES.length;
            stopVideos();
            break;
        case 1:
            waitscreen.style.display = "none";
            chatscreen.style.display = "none";
            incomingchat.style.display = "none";
            videoscreen.style.display = "block";
            playVideo();
            playSound(0);
            break;
        case 2:
            waitscreen.style.display = "none";
            videoscreen.style.display = "none";
            chatscreen.style.display = "none";
            preloadVideo(3);
            showIncomingChat();
            playSound(1);
            break;
        case 3:
            waitscreen.style.display = "none";
            chatscreen.style.display = "none";
            incomingchat.style.display = "none";
            videoscreen.style.display = "block";
            numVideosInScene = VIDEO_SOURCES_DACH.length;
            playSound(2);
            playVideo();
            break;
        default:
            break;
    }
}

function showWaitScreen()
{
    videoscreen.style.display = "none";
    incomingchat.style.display = "none";
    chatscreen.style.display = "none";
    waitscreen.style.display = "flex";
}


socket.on('stop', () => {
    showWaitScreen();
    stopAllSound();
    stopVideos();
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
let currentScene = 0;

function playSound(sound)
{
    SOUNDS[sound].play();
}

let currentlyActivePlayer = 1;
let currentVideo = 0;

function preloadVideo(scene)
{

    if(scene === 1 || scene === 0)
    {
        video_1.src = `/Videos/${VIDEO_SOURCES_POSES[0]}`;
    }

    else
    {
        video_1.src = `/Videos/${VIDEO_SOURCES_DACH[0]}`;
    }

    currentVideo = 0;
    currentlyActivePlayer = 0;
}

function playVideo()
{
    currentVideo = (currentVideo + 1) %  numVideosInScene;

    if(currentlyActivePlayer === 0)
    {
        video_1.play();
        video_1.classList.remove('hidden');
        
        video_2.classList.add('hidden');
        video_2.src = currentScene === 1 ? `/Videos/${VIDEO_SOURCES_POSES[currentVideo]}` : `/Videos/${VIDEO_SOURCES_DACH[currentVideo]}`;

        currentlyActivePlayer = 1;
    }

    else
    {
        video_2.play();
        video_2.classList.remove('hidden');
        
        video_1.classList.add('hidden');
        video_1.src = currentScene === 1 ? `/Videos/${VIDEO_SOURCES_POSES[currentVideo]}` : `/Videos/${VIDEO_SOURCES_DACH[currentVideo]}`;

        currentlyActivePlayer = 0;
    }
}

function stopVideos()
{
    
}

function stopSound()
{
    SOUNDS[currentScene - 1].pause();

    DBG(`stopping sound ${currentScene - 1}`);
}

function stopAllSound()
{
    for(let sound of SOUNDS)
    {
        sound.pause();
        sound.currentTime = 0;
    }
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

let loadTimeout;

function loadSounds(voiceid)
{
    SOUNDS[0] = loadSound(`Samples/PNO/PNO_H_${voiceid+1}.mp3`);
    SOUNDS[1] = loadSound(`Samples/NOT/NOT_H_${voiceid+1}.mp3`);
    SOUNDS[2] = loadSound(`Samples/FLT/FLT_H_${voiceid+1}.mp3`);
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
    const maxRetries = 5; // Set a max number of retries to avoid infinite loops
    const audio = new Audio(url);
   
    audio.addEventListener('error', () => {
        console.error(`Error loading sound file: ${url}`);

        if (retryCount < maxRetries) {
            console.log(`Attempting to reload sound file. Retry ${retryCount + 1}`);
            loadSound(url, retryCount + 1); // Retry loading the sound
        } else {
            location.reload();
            console.error("ERROR LOADING SOUNDFILES");
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
        goFullscreen();
    }, 1200)

    // wakelock
    if ('wakeLock' in navigator) {
        requestWakeLock();
    } else {

        if(detectMobile())
        {
            enableNoSleep();
        }
            
    }
}


function goFullscreen()
{
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
}

function detectMobile() {
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return true;
    } else {
        return false;
    }
}


function enableNoSleep()
{
    console.log("No sleep");
    noSleep.enable();
}



/*
    Interaction 
*/

/*
    LOGIC Flags
*/

let IsInChat = false;


// DEBUG
// document.getElementById('waitscreen').style.display = "none";
// document.getElementById('startscreen').style.display = "none";
// document.getElementById('content').style.display = "flex";
// document.getElementById('chatscreen').style.display = "none";


function showIncomingChat()
{
    if(IsInChat)
        return;

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
        console.log(msg);
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










