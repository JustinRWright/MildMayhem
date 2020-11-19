const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  //console.log('request made');
  //console.log("process env port: " + process.env.PORT);
  //console.log(res.body);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


const io = socketIo(server);
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

//app.listen(port, () => console.log(`Outer Server.js Listening on port ${port}`));
server.listen(port, () => console.log(`Outer Server.js Listening on port ${port}`));
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});