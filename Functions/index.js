let buttonArray = [];

//Event Listeners
window.addEventListener("keydown", function (e) {
  buttonArray = [];
  buttonArray[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
  delete buttonArray[e.keyCode];
  isJumping = false;
});

//For Frog
const frogImage = document.getElementById("frog");
const ctxFrog = frogImage.getContext("2d");
const Frog = 50;
let initialY = 700;
blockWidth = 600;
blockHeight = 600;
frogImage.width = 800;
frogImage.height = 800;
let isJumping = false;
const frog = new Image();
frog.src = "/Public/frog.png";

class myFrog {
  constructor() {
    this.boxWidth = blockWidth / 12;
    this.boxHeight = blockHeight / 12;
    this.xAxis = frogImage.width / 2 - this.boxWidth / 2;
    this.yAxis = frogImage.height - this.boxHeight - 50;
  }
  frogMovement() {
    //Controls Up button Movement
    if (buttonArray[38]) {
      if (isJumping == false) {
        this.yAxis = this.yAxis - Frog;
        if (this.yAxis < initialY && this.yAxis > 0) {
          initialY = this.yAxis;

          increaseScore();
        }
        isJumping = true;
      }
    }
    //controls Down button Movement

    if (buttonArray[40]) {
      if (
        isJumping == false &&
        this.yAxis < frogImage.height - this.boxHeight * 2
      ) {
        this.yAxis += Frog;
        isJumping = true;
      }
    }
    //Controls left button movements
    if (buttonArray[37]) {
      if (isJumping == false && this.xAxis > this.boxWidth) {
        this.xAxis -= Frog;
        isJumping = true;
      }
    }

    //Controls right button Movements
    if (buttonArray[39]) {
      if (
        isJumping == false &&
        this.xAxis < frogImage.width - this.boxWidth * 2
      ) {
        this.xAxis += Frog;
        isJumping = true;
      }
    }

    if (this.yAxis < 150) {
      if (
        (frogObj.xAxis > 25 && frogObj.xAxis < 95) ||
        (frogObj.xAxis > 195 && frogObj.xAxis < 265) ||
        (frogObj.xAxis > 365 && frogObj.xAxis < 435) ||
        (frogObj.xAxis > 540 && frogObj.xAxis < 610) ||
        (frogObj.xAxis > 710 && frogObj.xAxis < 780)
      ) {
        reSpwan();
      } else {
        ctxBugs.drawImage(
          collisions,
          0,
          100,
          100,
          100,
          frogObj.xAxis,
          frogObj.yAxis,
          50,
          50
        );
        resetGame();
      }
    }
  }

  //Drawing Frog in Canvas 3
  frogCanvas() {
    ctxFrog.drawImage(frog, 0, 0, 50, 45, this.xAxis, this.yAxis, 50, 50);
  }
}

let frogObj = new myFrog();

//for bugs

const Bugs = document.getElementById("obstacles");
const ctxBugs = Bugs.getContext("2d");
const turtle = new Image();
turtle.src = "/Public/turtle.png";
const wood = new Image();
wood.src = "/Public/wood.png";
const car = new Image();
car.src = "/Public/car.png";
let gameSpeed = 1;
Bugs.width = 800;
Bugs.height = 800;
let landBugs = [];
let waterBugs = [];

class myBugs {
  constructor(xCordinate, yCordinate, width, height, movingSpeed, type) {
    this.xCordinate = xCordinate;
    this.yCordinate = yCordinate;
    this.width = width;
    this.height = height;
    this.movingSpeed = movingSpeed;
    this.type = type;
    this.changeImage = 0;
  }

  bugsCanvas() {
    if (this.type === "turtle") {
      ctxBugs.drawImage(
        turtle,
        0,
        0,
        100,
        50,
        this.xCordinate,
        this.yCordinate,
        this.width,
        this.height
      );
    } else if (this.type === "wood") {
      ctxBugs.drawImage(
        wood,
        this.xCordinate,
        this.yCordinate,
        this.width,
        this.height
      );
    } else {
      ctxBugs.drawImage(
        car,
        this.changeImage * 50,
        0,
        Frog,
        Frog,
        this.xCordinate,
        this.yCordinate,
        this.width,
        this.height
      );
    }
  }

  //For Horizental Motion of Obstacle
  update() {
    this.xCordinate += this.movingSpeed * gameSpeed;
    //For regenerating obstacle once it goes out of the screen

    if (this.movingSpeed > 0) {
      if (this.xCordinate > Bugs.width + this.width) {
        this.xCordinate = 0 - this.width;
      }
    } else {
      this.changeImage = 1;
      if (this.xCordinate < 0 - this.width) {
        this.xCordinate = Bugs.width + this.width;
      }
    }
  }
}

function createObstacle() {
  //lane 1 Obstacles
  for (let i = 0; i < 2; i++) {
    let x = i * 350;

    landBugs.push(
      new myBugs(x, Bugs.height - Frog * 2 - 49, Frog, Frog - 5, 2, "car")
    );
  }
  //lane 2  Obstacles (here we pass Frog *3  because we are moving to next lane)
  for (let i = 0; i < 3; i++) {
    let x = i * 275;

    landBugs.push(
      new myBugs(x, Bugs.height - Frog * 3 - 49, Frog, Frog - 5, -2, "car")
    );
  }

  // //Lane 3
  for (let i = 0; i < 2; i++) {
    let x = i * 400;

    landBugs.push(
      new myBugs(x, Bugs.height - Frog * 4 - 49, Frog, Frog - 5, 2, "car")
    );
  }
  for (let i = 0; i < 2; i++) {
    let x = i * 350;

    landBugs.push(
      new myBugs(x, Bugs.height - Frog * 5 - 49, Frog, Frog - 5, -2, "car")
    );
  }
  for (let i = 0; i < 3; i++) {
    let x = i * 300;

    landBugs.push(
      new myBugs(x, Bugs.height - Frog * 6 - 49, Frog, Frog - 5, 2, "car")
    );
  }

  //River Obstacles
  for (let i = 0; i < 4; i++) {
    let x = i * 250;

    waterBugs.push(
      new myBugs(x, Bugs.height - Frog * 8 - 49, Frog * 2, Frog - 13, 2, "wood")
    );
  }
  for (let i = 0; i < 3; i++) {
    let x = i * 200;

    waterBugs.push(
      new myBugs(
        x,
        Bugs.height - Frog * 9 - 49,
        Frog * 2,
        Frog - 5,
        -0.7,
        "turtle"
      )
    );
  }
  for (let i = 0; i < 2; i++) {
    let x = i * 400;

    waterBugs.push(
      new myBugs(
        x,
        Bugs.height - Frog * 10 - 49,
        Frog * 2,
        Frog - 5,
        2.5,
        "wood"
      )
    );
  }

  for (let i = 0; i < 2; i++) {
    let x = i * 300;

    waterBugs.push(
      new myBugs(
        x,
        Bugs.height - Frog * 11 - 49,
        Frog * 2,
        Frog - 5,
        -1,
        "turtle"
      )
    );
  }

  for (let i = 0; i < 2; i++) {
    let x = i * 450;

    waterBugs.push(
      new myBugs(x, Bugs.height - Frog * 12 - 49, Frog * 2, Frog - 5, 2, "wood")
    );
  }
}
createObstacle();

const collisions = new Image();
collisions.src = "/Public/collisions.png";
let safeState = false;
function recreateBugs() {
  for (i = 0; i < landBugs.length; i++) {
    landBugs[i].update();
    landBugs[i].bugsCanvas();
  }
  for (i = 0; i < waterBugs.length; i++) {
    waterBugs[i].update();
    waterBugs[i].bugsCanvas();
  }

  for (i = 0; i < landBugs.length; i++) {
    if (detectCollision(frogObj, landBugs[i])) {
      ctxBugs.drawImage(
        collisions,
        0,
        100,
        100,
        100,
        frogObj.xAxis,
        frogObj.yAxis,
        50,
        50
      );
      resetGame();
    }
  }
  if (frogObj.yAxis < 351 && frogObj.yAxis > 100) {
    safeState = false;
    for (i = 0; i < waterBugs.length; i++) {
      if (detectCollision(frogObj, waterBugs[i])) {
        frogObj.xAxis += waterBugs[i].movingSpeed;
        safeState = true;
      }
    }
    if (!safeState) {
      ctxBugs.drawImage(
        collisions,
        0,
        0,
        100,
        100,
        frogObj.xAxis,
        frogObj.yAxis,
        50,
        50
      );
      resetGame();
    }
  }
}
