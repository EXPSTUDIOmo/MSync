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

app.get('/guest/s/default/', (req, res) => {
  res.redirect('http://10.31.13.162:3000');
});





server.listen(3000, () => {
  console.log('listening on *:3000');
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

    case '/users':
      oscToMax.send("/users", clients.length);
      break;

      setClientColors(R,G,B);
      break;
  }

});






// ================================= Client Control =========================

function startPlayback(soundID)
{
  lastStartTime = Date.now();
  isPlaying = true;

  for(let client of clients)
    client.emit('start', soundID);
}



function stopPlayback()
{
  isPlaying = false;

  for(let client of clients)
    client.emit('stop');
}




function setClientColors(R,G,B)
{
  clients.forEach((value, key, map) => {
    value.emit('color', R,G,B);
  });
}


