// Varables for the database
var balloon, balloonPosition, database, position, positionRead;


function setup() {
  //Connects the firebase database (the online realtime database) to the varable.
  database = firebase.database();
  //console.log(database)
  createCanvas(600,600);
  //the is fetches or refers to the ballons position from the database.
  balloonPosition = database.ref("Balloon/position")
  //creates a Listener that listens to any changes in the retrieved data within the varable.
  //this makes detects the values from the listener and picks to either read the position or show an error based on the data.
  balloonPosition.on("value", readPosition, showError)

  //creates balloon sprite
  balloon = createSprite(0, 0, 50, 50);
}

function draw() {
  background("white");

  /*
  this is needed because it takes awhile for the whole code to be read and for the database to retrieve values.
  This will result in an error with the positionRead not being defined.
  If we make this if statement then the code will have to wait until a value for the position of the ball to be defined.
  */
  if(positionRead !== undefined) {

    if(keyDown(LEFT_ARROW)) {
      updatePosition(-10,0)
    }
    else if(keyDown(RIGHT_ARROW)) {
      updatePosition(10,0)
    }
    else if(keyDown(UP_ARROW)) {
      updatePosition(0,-10)
    }
    else if(keyDown(DOWN_ARROW)) {
      updatePosition(0,10)
    }
    drawSprites();
  }
}

function updatePosition(x,y) {
  balloonPosition.set({
    //the code set pushes the changing values back to the realtime database to be changed again.
    //This is kinda a big loop when the buttons are pressed.
    // the 'x' an d 'y' stand for the values within the 'Balloon/position' notes.
    'x' : positionRead.x + x,
    'y' : positionRead.y + y
  })
}

function readPosition(data) {
  //reading the data for the position of the ballon.
  //val means to read.
  positionRead = data.val();
  //conecting the positon read from data to the position of the balloon
  balloon.x = positionRead.x;
  balloon.y = positionRead.y;

  console.log(positionRead)
}

function showError() {
  //Shows an error when there is something wrong with the connection to the database
  console.log("Error in database connection")
}