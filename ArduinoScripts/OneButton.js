const { Button } = require("johnny-five");

function boardRunFunction(io) {
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
}

module.exports = { boardRunFunction }