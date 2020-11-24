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



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  console.log(res.body);
  /*res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
  */
});

server.listen(port, () => console.log(`Outer Server.js Listening on port ${port}`));
//server.listen(port, () => console.log(`Outer Server.js Listening on port ${port}`));
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  let io = socket;
  //identify which player connected
 //console.log(players)
  players[socket.id] = {
    playerId: socket.id
  }
  console.log("players length is: "+ Object.keys(players).length);
  socket.on('subscribeToOnlineRoomCreate', (socket) => {
    
  });
  socket.on('createOnlineRoom', (socket) => {
    console.log('online room created');
    io.broadcast.emit('addRoom','room1');
  })
  socket.on("playerMovement", function(movementData) {
    console.log("playerMoved" + movementData.x);
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete players[socket.id];
  });
});