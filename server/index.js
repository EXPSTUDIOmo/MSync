const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const timesyncServer = require('timesync/server');

let bStartTimeSet = false; // if starttime is initiates or not
let START_TIME = 0; // the startpoint, will get triggered by Max with /start
let clients = new Map(); // list of all connected clients


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));
app.use('/timesync', timesyncServer.requestHandler);



io.on('connection', (socket) => {

  const voiceid = parseInt(socket.handshake.query.voiceid);

  socket.on('activate', () => {
    oscToMax.send('/userconnect', socket.id, socket.voiceid);
 })
 
  socket.voiceid = voiceid;
  addClient(socket);

  if(bStartTimeSet)
    socket.emit('starttime', START_TIME);

  socket.on('disconnect', () => {
    removeClient(socket);
  });

});





server.listen(3000, () => {
  console.log('listening on *:3000');
});



function addClient(socket)
{
  clients.set(socket.voiceid, socket);
  socket.emit('connected', socket.voiceid);
 
}


function removeClient(socket)
{
  clients.delete(socket.voiceid);
  oscToMax.send("/userdisconnect", socket.id, socket.voiceid);
}


function setStartTime()
{
  START_TIME = Date.now();
  bStartTimeSet = true;

  clients.forEach((value, key, map) => {
    value.emit('starttime', START_TIME);
  });
}




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
  clients.forEach((value, key, map) => {
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


function stopPlayback()
{
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


