const writeText = document.getElementById("score");
const ctxScored = writeText.getContext("2d");
writeText.width = 800;
writeText.height = 800;
let score = 0;
let highScore = 0;

function showScore() {
  ctxScored.fillStyle = "white";
  ctxScored.font = "25px serif ";
  ctxScored.fillText("Score: " + score, 380, 25);
  ctxScored.fillText("Lives: " + lives, 680, 25);

  ctxScored.font = "25px serif ";
  ctxScored.fillText("High Score: " + highScore, 10, 25);
}

function animateFrame() {
  ctxScored.clearRect(0, 0, writeText.width, writeText.height);
  ctxFrog.clearRect(0, 0, frogImage.width, frogImage.height);
  ctxBugs.clearRect(0, 0, Bugs.width, Bugs.height);
  recreateBugs();
  showScore();
  frogObj.frogCanvas();
  frogObj.frogMovement();
  requestAnimationFrame(animateFrame);
}
animateFrame();

function detectCollision(rect1, rect2) {
  // Check if the rectangles intersect on the x-axis
  if (
    rect1.xAxis + rect1.boxWidth < rect2.xCordinate ||
    rect2.xCordinate + rect2.width < rect1.xAxis
  ) {
    return false;
  }

  // Check if the rectangles intersect on the y-axis
  if (
    rect1.yAxis + rect1.boxHeight < rect2.yCordinate ||
    rect2.yCordinate + rect2.height < rect1.yAxis
  ) {
    return false;
  }

  // If the rectangles intersect on both the x-axis and y-axis, then they collide
  return true;
}
