const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// Socket stuff
const { Server } = require("socket.io");
const io = new Server(server);
// Johnny-Five stuff
const { Board } = require("johnny-five");
// const oneButtonFunctions = require('./ArduinoScripts/OneButton');
const twoButtonFunctions = require('./ArduinoScripts/TwoButtons');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Johnny five goes here
board = new Board();

/* 
Some explanation for the use of function.bind()
    The Arduino scripts are located in a separate 'ArduinoScripts' folder
    The functions in these scripts need the io (Socket) object in order to emit events through the socket connection
    As we want these functions to trigger with the board.on event, we need to attach the functions to the event with io as an argument..
    To solve this we're using function.bind() in order to pass io as an argument to the boardRunFunction without executing it when attaching it to the board.on event
    function.bind() takes as a first argument an object which to point to as 'this', and the scond argument is an array of any input parameters - in our case the io object
*/
// const boardRunFunctionBound = oneButtonFunctions.boardRunFunction.bind(null, io);
const boardRunFunctionBound = twoButtonFunctions.boardRunFunction.bind(null, io);
board.on("ready", boardRunFunctionBound);

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});