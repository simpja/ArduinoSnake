const { Button } = require("johnny-five");

function boardRunFunction(io) {
    console.log('board ready');

    // Create a new `button` hardware instance.
    // This example allows the button module to
    // create a completely default instance
    buttonLeft = new Button(2);
    buttonRight = new Button(12);
  
    // Inject the `buttonLeft` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
      button: buttonLeft,
      button: buttonRight
    });
  
    
    // Button Event API
    // "down" the button is pressed
    buttonLeft.on("down", function() {
      // console.log("down left");
      io.emit("turn-left", 1337);
    });
    
    // "down" the button is pressed
    buttonRight.on("down", function() {
      // console.log("down right");
      io.emit("turn-right", 1337);
    });
}

module.exports = { boardRunFunction }