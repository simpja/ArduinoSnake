//import johnny from 'johnny-five';
const { Board, Button } = require("johnny-five");
var socket = io(); //instantiate socket

console.log('arduino adapter hello');
board = new Board();

/*
var globalVariable={
    isPushed: false
 };
 */

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
    // Try to emit a "is-button-pushed" event with the value 1337
    socket.emit("is-button-pushed", 1337);
    isPushed = true;
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
    isPushed = false;
  });
});