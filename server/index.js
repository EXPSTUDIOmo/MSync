/*
   SmartSync  
   SWR EXPERIMENTALSTUDIO 
   Maurice Oeser
   2023
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
app.use('/timesync', timesyncServer.requestHandler);


server.listen(3000, () => {
  console.log('listening on *:3000');
});


/*
  If a user connects without a voiceID set, we give him an "anonymous" voiceID.
  To avoid collision with a real voiceID, we start at > maximum Users expected.
  If there is ever a project with more than 1000 voiceIDs set, this number needs to be adjusted.
*/
let anonymousClientCounter = 1001; 


// **********************************************************

let clients = new Map(); // list of all connected clients
let bStartTimeSet = false; // if starttime is initiates or not
let START_TIME = -1; // the startpoint, will get triggered by Max with /start
let isPlaying = false;




// ********************** Socket.IO *************************
io.on('connection', (socket) => {

  let voiceid = parseInt(socket.handshake.query.voiceid);
  
  if(isNaN(voiceid))
  {
    voiceid = anonymousClientCounter++;
  }
    
  socket.voiceid = voiceid;  
  clients.set(socket.voiceid, socket);
  socket.emit('connected', {id: socket.voiceid, isPlaying: false, startTime: START_TIME});

  if(bStartTimeSet)
    socket.emit('starttime', START_TIME);

  socket.on('disconnect', () => {
    clients.delete(socket.voiceid);
  oscToMax.send("/userdisconnect", socket.id, socket.voiceid);
  });

  socket.on('activate', () => {
    oscToMax.send('/userconnect', socket.id, socket.voiceid);
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


function stopSyncing()
{
  clients.forEach((value) => {
    value.emit('stopsync');
    
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


