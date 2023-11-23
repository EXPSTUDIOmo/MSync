/*
   MSync
   SWR EXPERIMENTALSTUDIO 
   Maurice Oeser
   2023

   Davor Vincze - FLUCHT

   Smartphone Soundfile Controler

   ermöglicht es Soundfiles synchron auf den Handys des Publikums abzuspielen und zu steuern
*/



// **************** Server setup ****************************
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const timesyncServer = require('timesync/server');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



server.listen(80, () => {
  console.log('listening on *:80');
});



// ==========================================================

/*
  Voice-Counter, der entscheidet welche Stimme das nächste sich verbindene Handy bekommt
*/
let voiceCounter = 0;
const numMaxVoices = 8;

function getNextVoice()
{
  voiceCounter = (voiceCounter + 1) % numMaxVoices;
  return voiceCounter;
}




// ******************* State control ********************************

let clients = []; // list of all connected clients
let lastStartTime= 0; // if we are currently playing, time of last started soundfile
let currentSoundfile = 0;
let isPlaying = false;






// ********************** Socket.IO *************************
io.on('connection', (socket) => {

  socket.voice = getNextVoice(); 
  socket.emit('connected', {voice: socket.voice});
  clients.push(socket);

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket), 1);
  });

  socket.on('activate', () => {

    if(isPlaying)
    {
      let timeToJump = (Date.now() - lastStartTime) / 1000; // Howler wants seconds
      socket.emit("activation", { playing: isPlaying, sound: currentSoundfile, time: timeToJump});
    }
 })

 socket.on('ping', () => {
    socket.emit('pong');
 })

});











// ======================= OSC ADMIN CONTROL (from Max) =======================

const OSCserver = require('node-osc').Server;
const OSCClient = require('node-osc').Client;

const oscToMax = new OSCClient('10.31.13.57', 5555); // TODO evtl. dynamisch wenn nicht auf gleichem Rechner wie Max

let oscServer = new OSCserver(3333, '0.0.0.0', () => {
  console.log('OSC Server is listening');
});


// message handling
oscServer.on('message', function (msg) {

  let AP = msg[0]; // AdressPattern

  switch(AP)
  {
    case '/start':
      
      currentSoundfile = msg[1];
      startPlayback(currentSoundfile);
      oscToMax.send('/server', "started sound");
      break;
    
    case '/stop':
      stopPlayback();
      oscToMax.send('/server', "stopped");
      break;

    case '/colorall':
      let R = msg[1];
      let G = msg[2];
      let B = msg[3];
      setClientColors(R,G,B);
      break;

    case '/users':
      oscToMax.send("/users", clients.length);
      break;

    case '/mode':
      let mode = msg[1];
      setMode(mode);
      break;

    case '/organ':
      let voice = msg[1];
      let pitch = msg[2];
      let velocity = msg[3];
      playOrgan(voice, pitch, velocity);
      break;
  }
});






// ================================= Client Control =========================

function startPlayback(soundID)
{
  lastStartTime = Date.now();
  isPlaying = true;

  io.emit('start', soundID);
}



function stopPlayback()
{
  isPlaying = false;

  io.emit('stop');
}

function playOrgan(voice, pitch, velocity)
{
  if(clients[voice])
  {
    clients[voice].emit('organ', {pitch: pitch, velocity: velocity});
  }
}

function setMode(mode)
{ 
  console.log("mode", mode);
  io.emit('mode', mode);
}



function setClientColors(R,G,B)
{
  io.emit('color', R,G,B);
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
