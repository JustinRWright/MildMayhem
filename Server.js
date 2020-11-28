const express = require('express');
const bodyParser = require('body-parser');
//const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  path: '/socket'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var gameRooms = {};
var roomCount = 0;
var players = {};
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.listen(port, () => console.log(`Outer Server.js Listening on port ${port}`));

let interval;
function destroyRoom(socket){
        
  
  //Loop through all saved gameRooms
  for (let i = 0; i < Object.keys(gameRooms).length; i++) {
    //Check to see if the client was the host of a gameroom
    //(checking for undefined error)
    let gameRoomDataTest = typeof gameRooms[socket.id];
    if (gameRoomDataTest !== 'undefined'){
      //If the player is a host of the gameroom
      if (gameRooms[socket.id].id === socket.id){
        //roomCount --;
        //Disconnect every client from the socketIO Room
        socket.leave(gameRooms[socket.id].name);
        console.log('opponent Socket is: ' + gameRooms[socket.id].opponent);
        //let opponentSocket = io.sockets.connected[gameRooms[socket.id].opponent]
        //opponentSocket.leave(gameRooms[socket.id].name);
        
        console.log('left room');
        //Delete this gameRoom
        delete gameRooms[socket.id];
      }
    }
  }
};

io.on("connection", (socket) => {
  console.log("New client connected");

  let io = socket;
  //identify which player connected
  players[socket.id] = {
    playerId: socket.id
  }
  //console.log("players length is: "+ Object.keys(players).length);
 
  socket.on('createOnlineRoom', () => {
    roomCount++;
    gameRooms[socket.id] = {name: 'room'+roomCount,
      id: socket.id
    }
    socket.join(gameRooms[socket.id].name);

    //Shows all rooms to players
    io.broadcast.emit('showRooms', gameRooms);
  
  });

  socket.on('getRoomName', () => {
    console.log('getRoomName was called here');
    console.log('socket Id is: ' + socket.id);
    console.log('roomname is: ' + gameRooms[socket.id].name);
    socket.emit('yourRoomName', gameRooms[socket.id].name);
  });

  socket.on('joinRoom', function(playerId) {

    //Joins the the room of the opposing player
    socket.join(gameRooms[playerId].name);

    //Save and link opponent id to gameRoom
    gameRooms[playerId].opponent = socket.id;
    
    io.to(playerId).emit('opponentJoined', socket.id);
  });
 
  socket.on('destroyOnlineRoom', () => {
    destroyRoom(socket);
    //Update all user of new rooms
    io.broadcast.emit('showRooms', gameRooms);
  });

  socket.on("playerMovement", function(movementData) {
    
    io.to(movementData.roomName).emit('playerMoved', movementData);
  });
  socket.on("swingSword", function(roomName) {
    console.log('swordswing on server');
    io.to(roomName).emit('swordSwung');
  });
  socket.on("createMagicBlast", function(roomName) {
    console.log('magicBlast on server');
    io.to(roomName).emit('magicBlastCreated');
  });
  socket.on("destroyMagicBlast", function(roomName){
    console.log('blow up magicBlast on server');
    io.to(roomName).emit('magicBlastDestroyed');
  });
  socket.on("createLightningBolt", function(roomName){
    console.log('lightningBolt Created');
    io.to(roomName).emit('lightningBoltCreated');
  });
  socket.on("destroyLightningBolt", function(roomName){
    console.log('lightningBolt destroyed');
    io.to(roomName).emit('lightningBoltDestroyed');
  });
  socket.on("damagePlayer", function(roomName){
    console.log("player damaged");
    io.to(roomName).emit('playerDamaged');
  });
  socket.on("startDodgeCoolDown", function(roomName){
    console.log('dodge activated');
    io.to(roomName).emit('dodgeCoolDownStarted');
  });
  socket.on('destroyOnlineRoom', () => {
    destroyRoom(socket);
    //Update all user of new rooms
    io.broadcast.emit('showRooms', gameRooms);
  });
  socket.on('getRooms', () => {
    destroyRoom(socket);
    console.log('getRooms called');
    console.log('gameRooms are: ' + JSON.stringify(gameRooms));
    //Update user of new rooms
    io.emit('updateRooms', gameRooms);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    //delete any gameRoom that may have been open
    destroyRoom(socket);
    //Update all users of room changes
    io.broadcast.emit('showRooms', gameRooms);
    delete players[socket.id];
  });
});