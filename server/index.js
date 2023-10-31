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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

server.listen(3000, () => {
  console.log('listening on *:3000');
});




/*
  Voice-Counter, der entscheidet welche Stimme das nächste sich verbindene Handy bekommt
*/
let voiceCounter = 0;
const numMaxVoices = 5;

function getNextVoice()
{
  voiceCounter = (voiceCounter + 1) % numMaxVoices;
  return voiceCounter;
}






// **********************************************************

let clients = []; // list of all connected clients
let START_TIME = -1; // the startpoint, will get triggered by Max with /start
let isPlaying = false;




// ********************** Socket.IO *************************
io.on('connection', (socket) => {

  socket.voiceid = getNextVoice(); 
  socket.emit('connected', {id: socket.voiceid});
  clients.push(socket);

  if(bStartTimeSet)
    socket.emit('starttime', START_TIME);

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket), 1);

  });

  socket.on('activate', () => {
    socket.emit("activation", { isPlaying: false, time: START_TIME});
 })

});
















// ======================= OSC ADMIN CONTROL =======================

let waveClientIndex = 0;

const OSCserver = require('node-osc').Server;
const OSCClient = require('node-osc').Client;


const oscToMax = new OSCClient('127.0.0.1', 5555);

var oscServer = new OSCserver(3333, '0.0.0.0', () => {
  console.log('OSC Server is listening');
});


oscServer.on('message', function (msg) {

  let AP = msg[0]; // AdressPattern

  switch(AP)
  {
    case '/start':
      startPlayback();
      oscToMax.send('/node', "started");
      break;
    
    case '/stop':
      stopPlayback();
      oscToMax.send('/node', "stopped");
      break;

    case '/stopsync':
      stopSyncing();
      break;

    case '/colorall':
      let R = msg[1];
      let G = msg[2];
      let B = msg[3];

      setClientColors(R,G,B);
      break;

    case '/play':
      let clientID = msg[1];
      playSound(clientID);
      break;

    case '/client':
      routeMaxMessageToClient(msg);
      break;

    case '/broadcast':
      broadcastMaxMessage(msg);
      console.log("broadcast");
      break;
  }

});



function routeMaxMessageToClient(msg)
{
  let clientID = msg[1];
  msg.splice(0,2);

  let client = clients.get(clientID);

  if(client != undefined)
    client.emit('max', msg);
}

function broadcastMaxMessage(msg)
{
  msg.splice(0,1);
  clients.forEach((value, key) => {
    value.emit('max', msg);
    console.log("client plays", key);
  });
}




function startPlayback()
{
  setStartTime();

  clients.forEach((value, key, map) => {
    value.emit('start');
  });
}

function setStartTime()
{
  START_TIME = Date.now();
  bStartTimeSet = true;
  isPlaying = true;

  clients.forEach((value) => {
    value.emit('starttime', START_TIME);
  });
}


function stopPlayback()
{
  isPlaying = false;

  clients.forEach((value, key, map) => {
    value.emit('stop');
  });

  setClientColors(0,0,0);

}


function setClientColors(R,G,B)
{
  clients.forEach((value, key, map) => {
    value.emit('color', R,G,B);
  });
}


