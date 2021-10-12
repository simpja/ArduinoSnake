const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Johnny five goes here
const { Board, Button } = require("johnny-five");

board = new Board();

board.on("ready", function() {
  console.log('board ready');
  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new Button(2);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button
  });

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
    io.emit("turn-left", 1337);
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
  });
});

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});